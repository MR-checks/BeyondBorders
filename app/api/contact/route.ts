import { NextResponse } from "next/server";
import { z } from "zod";

const Payload = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z.string().trim().max(60).optional().default(""),
  destination: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1).max(6000),
  subject: z.string().trim().max(200).optional(),
  honeypot: z.string().optional(),
});

const TO = process.env.CONTACT_EMAIL || "divebeyondborders@gmail.com";

// divebeyondborders.com is verified in Resend, so send from it rather than the
// shared onboarding domain. onboarding@resend.dev only delivers to the Resend
// account owner's own address and lands in spam far more often.
const FROM = process.env.CONTACT_FROM || "BeyondBorders <hello@divebeyondborders.com>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = Payload.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again" }, { status: 400 });
  }
  const data = parsed.data;

  // Bots fill hidden fields. Answer as if it worked so they stop retrying.
  if (data.honeypot) return NextResponse.json({ success: true });

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set, cannot send mail");
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject:
        data.subject ||
        `New enquiry from ${data.name}${data.destination ? `, ${data.destination}` : ""}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Interested in: ${data.destination || "Not specified"}`,
        "",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend rejected the message", error);
      return NextResponse.json({ error: "Could not send message" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // Log the detail, return something generic. Provider errors can contain keys.
    console.error("[contact] send failed", err);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
