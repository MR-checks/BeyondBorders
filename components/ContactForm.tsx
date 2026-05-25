"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", destination: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hi BeyondBorders! 👋 I'm ${formData.name}. I'm interested in ${formData.destination}. ${formData.message}`);
    window.open(`https://wa.me/${siteConfig.contact.whatsappE164}?text=${text}`, "_blank");
  };

  if (status === "success") {
    return <div className="glass p-8 rounded-3xl text-center">
      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
      <p className="text-ink-dim">We'll be in touch with you shortly.</p>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-4">
      <input type="text" placeholder="Name" required className="w-full p-4 rounded-xl bg-surface border border-glass-border/10 focus:outline-none focus:ring-2 focus:ring-accent" onChange={e => setFormData({...formData, name: e.target.value})} />
      <div className="grid grid-cols-2 gap-4">
        <input type="email" placeholder="Email" required className="w-full p-4 rounded-xl bg-surface border border-glass-border/10 focus:outline-none focus:ring-2 focus:ring-accent" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="tel" placeholder="Phone (optional)" className="w-full p-4 rounded-xl bg-surface border border-glass-border/10 focus:outline-none focus:ring-2 focus:ring-accent" onChange={e => setFormData({...formData, phone: e.target.value})} />
      </div>
      <select required className="w-full p-4 rounded-xl bg-surface border border-glass-border/10 focus:outline-none focus:ring-2 focus:ring-accent" onChange={e => setFormData({...formData, destination: e.target.value})}>
        <option value="">Select Destination / Visa Type</option>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
        <option value="uk">UK</option>
        <option value="other">Other</option>
      </select>
      <textarea placeholder="Message" required rows={4} className="w-full p-4 rounded-xl bg-surface border border-glass-border/10 focus:outline-none focus:ring-2 focus:ring-accent" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
      
      <div className="flex flex-col gap-3 pt-2">
        {status === "error" && <p className="text-red-500 text-sm">Failed to send message. Please try WhatsApp instead.</p>}
        <button type="submit" disabled={status === "submitting"} className="bg-cta text-white hover:bg-cta-hover py-4 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgb(var(--cta)/0.35)] dark:bg-cta dark:text-white">
          Send Message
        </button>
        <button type="button" onClick={openWhatsApp} className="bg-[#1DAA54] hover:bg-[#188D45] text-white py-4 rounded-xl font-bold transition-colors">
          Send via WhatsApp instead
        </button>
      </div>
    </form>
  );
}
