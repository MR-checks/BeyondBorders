"use client";
import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { destinations } from "@/content/destinations";
import { siteConfig } from "@/lib/siteConfig";
import { whatsappLink } from "@/lib/whatsapp";

const field =
  "w-full rounded-xl border hairline bg-bg/60 px-4 py-3.5 text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-dim focus:border-accent focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.15)] focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";

const empty = { name: "", email: "", phone: "", destination: "", message: "" };

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState(empty);
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState(false);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const nameOk = form.name.trim().length > 1;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const messageOk = form.message.trim().length > 4;

  const composed = () =>
    [
      `Hello BeyondBorders, I would like to enquire.`,
      ``,
      `Name: ${form.name || "(not given)"}`,
      `Email: ${form.email || "(not given)"}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Interested in: ${form.destination || "(not chosen)"}`,
      ``,
      form.message,
    ]
      .filter((l) => l !== null)
      .join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!nameOk || !emailOk || !messageOk) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const openWhatsApp = () => {
    setTouched(true);
    if (!nameOk) return;
    window.open(whatsappLink(composed()), "_blank", "noopener,noreferrer");
  };

  if (status === "success") {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent-strong dark:text-accent">
          <Check size={24} strokeWidth={2.5} />
        </div>
        <h3 className="font-serif text-2xl">Message sent</h3>
        <p className="mt-2 text-ink-dim">
          Thanks {form.name.split(" ")[0]}. We usually reply within a day.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setTouched(false);
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-accent-strong underline underline-offset-4 dark:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cf-name" className={labelCls}>
          Name <span className="text-cta">*</span>
        </label>
        <input
          id="cf-name"
          value={form.name}
          onChange={set("name")}
          autoComplete="name"
          aria-invalid={touched && !nameOk}
          className={field}
        />
        {touched && !nameOk && (
          <p className="mt-1.5 text-sm text-cta">Please tell us your name.</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email <span className="text-cta">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            aria-invalid={touched && !emailOk}
            className={field}
          />
          {touched && !emailOk && (
            <p className="mt-1.5 text-sm text-cta">Check the email address.</p>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Phone <span className="font-normal text-ink-dim">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            autoComplete="tel"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-destination" className={labelCls}>
          What can we help with
        </label>
        <select
          id="cf-destination"
          value={form.destination}
          onChange={set("destination")}
          className={field}
        >
          <option value="">Choose one</option>
          <optgroup label="Study, work and visas">
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Another country">Another country</option>
          </optgroup>
          <optgroup label="Travel">
            <option value="Turkey travel and tours">Turkey travel and tours</option>
          </optgroup>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message <span className="text-cta">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Where you are now, where you want to get to, and any dates you have in mind."
          aria-invalid={touched && !messageOk}
          className={field}
        />
        {touched && !messageOk && (
          <p className="mt-1.5 text-sm text-cta">Add a line or two so we can help properly.</p>
        )}
      </div>

      {/* Bot trap. The API discards anything that fills this in. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border-l-2 border-cta bg-cta/5 px-4 py-3 text-sm text-ink-dim">
          That did not send. Try WhatsApp below, or write to {siteConfig.contact.email}.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-cta py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-[0_8px_24px_rgb(var(--cta)/0.35)] disabled:translate-y-0 disabled:opacity-70 motion-reduce:hover:translate-y-0"
        >
          <Mail size={18} />
          {status === "submitting" ? "Sending" : "Send message"}
        </button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="rounded-xl bg-[#158740] py-4 font-bold text-white transition-colors hover:bg-[#0F612D]"
        >
          Send on WhatsApp instead
        </button>
        <p className="pt-1 text-center text-sm text-ink-dim">
          A real person reads these. We usually come back within a day.
        </p>
      </div>
    </form>
  );
}
