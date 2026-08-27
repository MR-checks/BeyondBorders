import type { Place, TravelStyleId } from "@/content/turkey/types";
import { travelStyles } from "@/content/turkey/travelStyles";
import { siteConfig } from "./siteConfig";

export type TripEnquiry = {
  name: string;
  email: string;
  phone?: string;
  style: TravelStyleId | null;
  timing: string;
  travellers: string;
  notes?: string;
  places: Place[];
};

const styleName = (id: TravelStyleId | null) =>
  travelStyles.find((s) => s.id === id)?.name ?? "Not decided yet";

/**
 * One plain-text body used for both WhatsApp and email, so an enquiry reads the
 * same whichever route it arrives by and nothing has to be re-asked.
 */
export function buildTripMessage(e: TripEnquiry): string {
  const lines: string[] = [
    "Hello BeyondBorders, I would like to plan a trip to Turkey.",
    "",
    `Name: ${e.name || "(not given)"}`,
    `Email: ${e.email || "(not given)"}`,
  ];

  if (e.phone?.trim()) lines.push(`Phone: ${e.phone.trim()}`);

  lines.push(
    "",
    `Travelling as: ${styleName(e.style)}`,
    `When: ${e.timing || "Flexible"}`,
    `Travellers: ${e.travellers || "(not given)"}`
  );

  if (e.places.length) {
    lines.push("", `Places I am interested in (${e.places.length}):`);
    // Skip the area when it just repeats the name, e.g. "Istanbul, Istanbul".
    for (const p of e.places)
      lines.push(p.area && p.area !== p.name ? `- ${p.name}, ${p.area}` : `- ${p.name}`);
  } else {
    lines.push("", "Places: not chosen yet, happy to be guided.");
  }

  if (e.notes?.trim()) lines.push("", "Notes:", e.notes.trim());

  lines.push("", `Sent from ${siteConfig.url.replace(/^https?:\/\//, "")}`);
  return lines.join("\n");
}

export function buildTripSubject(e: TripEnquiry): string {
  const where = e.places.length
    ? `${e.places.length} place${e.places.length === 1 ? "" : "s"}`
    : "open plan";
  return `Turkey trip enquiry from ${e.name || "a visitor"} (${where})`;
}
