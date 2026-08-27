import { siteConfig } from "./siteConfig";

/**
 * Builds a wa.me link carrying a pre-written message.
 *
 * The short wa.me/message/<id> link in siteConfig cannot take a `text` parameter,
 * so anything that needs to arrive with context already typed has to go through
 * the E.164 form. Keep both: this one for structured enquiries, the short link
 * for a plain "hello".
 */
export function whatsappLink(message: string): string {
  const to = siteConfig.contact.whatsappE164;
  return `https://wa.me/${to}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string): string {
  const to = siteConfig.contact.email;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
