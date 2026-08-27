"use client";

import { useMemo, useState } from "react";
import { Check, Mail, X } from "lucide-react";
import { places } from "@/content/turkey/places";
import { travelStyles } from "@/content/turkey/travelStyles";
import { buildTripMessage, buildTripSubject } from "@/lib/tripMessage";
import { whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/siteConfig";
import { useTrip } from "./TripContext";

const FLEXIBLE = "Flexible, still deciding";

/** Next 18 months as plain labels. Built after mount so SSR and client agree. */
function upcomingMonths(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < 18; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push(d.toLocaleString("en-GB", { month: "long", year: "numeric" }));
  }
  return out;
}

const field =
  "w-full rounded-xl border hairline bg-surface px-4 py-3 text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";

export default function TripPlanner() {
  const { selected, remove, style, setStyle, ready } = useTrip();

  // Built only after mount: the month list depends on today's date, which the
  // server and the browser can disagree about across a month boundary.
  const months = useMemo(() => (ready ? upcomingMonths() : []), [ready]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timing, setTiming] = useState(FLEXIBLE);
  const [travellers, setTravellers] = useState("2 adults");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [touched, setTouched] = useState(false);

  // `selected` is already empty until the provider is ready, so no extra gate here.
  const chosen = useMemo(
    () => places.filter((p) => selected.includes(p.id)),
    [selected]
  );

  const enquiry = {
    name,
    email,
    phone,
    style,
    timing,
    travellers,
    notes,
    places: chosen,
  };

  const nameOk = name.trim().length > 1;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const sendWhatsApp = () => {
    setTouched(true);
    if (!nameOk) return;
    window.open(whatsappLink(buildTripMessage(enquiry)), "_blank", "noopener,noreferrer");
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!nameOk || !emailOk) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          destination: "Turkey travel and tours",
          message: buildTripMessage(enquiry),
          subject: buildTripSubject(enquiry),
          honeypot,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section id="plan" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-3xl border hairline bg-surface p-10 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent-strong dark:text-accent">
            <Check size={26} strokeWidth={2.5} />
          </div>
          <h2 className="font-serif text-3xl">Got it, {name.split(" ")[0]}</h2>
          <p className="mt-3 text-ink-dim">
            Your enquiry is with us. We usually reply within a day, and we will
            come back with real dates, a route, and what it costs.
          </p>
          <p className="mt-6 text-sm text-ink-dim">
            If you would rather talk it through now, message us on WhatsApp at{" "}
            <a
              href={whatsappLink(buildTripMessage(enquiry))}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-strong underline underline-offset-4 dark:text-accent"
            >
              {siteConfig.contact.whatsappDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="plan" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Tell us what you want</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Start your trip here
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Fill this in and it turns into one clear message. Nothing is charged
            here and nothing is locked in. We reply with dates, a route and a
            price, and you decide from there.
          </p>
        </div>

        <form onSubmit={sendEmail} className="mt-10 space-y-8">
          {/* Places */}
          <div>
            <h3 className="eyebrow mb-3">Places you saved</h3>
            {chosen.length ? (
              <div className="flex flex-wrap gap-2">
                {chosen.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => remove(p.id)}
                    title={`Remove ${p.name}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border hairline px-3 py-1.5 text-sm text-ink-dim transition-colors hover:border-cta hover:text-cta"
                  >
                    {p.name}
                    <X size={12} className="opacity-50 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-ink-dim">
                Nothing saved yet, which is completely fine.{" "}
                <a
                  href="#places"
                  className="font-medium text-accent-strong underline underline-offset-4 dark:text-accent"
                >
                  Browse the places
                </a>{" "}
                and save a few, or leave this empty and we will suggest a route.
              </p>
            )}
          </div>

          {/* Travel style */}
          <fieldset>
            <legend className="eyebrow mb-3">How you want to travel</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {travelStyles.map((s) => {
                const active = style === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(active ? null : s.id)}
                    aria-pressed={active}
                    className={[
                      "rounded-2xl border p-4 text-left transition-colors duration-200",
                      active
                        ? "border-accent bg-accent/10"
                        : "hairline hover:border-accent",
                    ].join(" ")}
                  >
                    <span className="block font-bold">{s.name}</span>
                    <span className="mt-1 block text-sm text-ink-dim">
                      {s.bestFor}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Timing and party */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tp-timing" className={labelCls}>
                Roughly when
              </label>
              <select
                id="tp-timing"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className={field}
              >
                <option value={FLEXIBLE}>{FLEXIBLE}</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tp-travellers" className={labelCls}>
                Who is coming
              </label>
              <input
                id="tp-travellers"
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                placeholder="2 adults, 1 child"
                className={field}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tp-name" className={labelCls}>
                Your name <span className="text-cta">*</span>
              </label>
              <input
                id="tp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                aria-invalid={touched && !nameOk}
                className={field}
              />
              {touched && !nameOk && (
                <p className="mt-1.5 text-sm text-cta">
                  We need a name to reply to.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="tp-phone" className={labelCls}>
                Phone or WhatsApp
              </label>
              <input
                id="tp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="Optional"
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="tp-email" className={labelCls}>
              Email <span className="text-ink-dim font-normal">(needed for the email route)</span>
            </label>
            <input
              id="tp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              aria-invalid={touched && email !== "" && !emailOk}
              className={field}
            />
          </div>

          <div>
            <label htmlFor="tp-notes" className={labelCls}>
              Anything else we should know
            </label>
            <textarea
              id="tp-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Budget, dietary needs, mobility, a birthday, somewhere you have always wanted to see."
              className={field}
            />
          </div>

          {/* Bot trap. Real people never see or fill this. */}
          <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
            <label htmlFor="tp-company">Company</label>
            <input
              id="tp-company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {status === "error" && (
            <p className="rounded-xl border-l-2 border-cta bg-cta/5 px-4 py-3 text-sm text-ink-dim">
              That did not send. Please try WhatsApp instead, or write to{" "}
              {siteConfig.contact.email}.
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={sendWhatsApp}
              className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#158740] px-6 py-4 font-bold text-white transition-colors hover:bg-[#0F612D]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send on WhatsApp
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-cta px-6 py-4 font-bold text-white transition-colors hover:bg-cta-hover disabled:opacity-70"
            >
              <Mail size={19} />
              {status === "sending" ? "Sending" : "Send by email"}
            </button>
          </div>

          <p className="text-sm text-ink-dim">
            WhatsApp opens with everything above already written out, so you can
            read it before you send it.
          </p>
        </form>
      </div>
    </section>
  );
}
