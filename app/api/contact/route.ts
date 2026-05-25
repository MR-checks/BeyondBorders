import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check honeypot
    if (body.honeypot) {
      return NextResponse.json({ success: true }); // Fake success for bots
    }

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Important for owner:
    // 1. RESEND_API_KEY must be set in Vercel.
    // 2. Until a custom domain is verified in Resend, use onboarding@resend.dev as the from address.
    // 3. To send from hello@divebeyondborders.com in the future, verify the domain in Resend dashboard.
    await resend.emails.send({
      from: 'BeyondBorders Contact <onboarding@resend.dev>', 
      to: 'divebeyondborders@gmail.com',
      replyTo: body.email,
      subject: `New enquiry from ${body.name} — ${body.destination}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || 'Not provided'}\nDestination / Visa type: ${body.destination}\n\nMessage:\n${body.message}`
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 });
  }
}
