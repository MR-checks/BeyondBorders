import type { Region } from "./types";

export const regions: Region[] = [
  {
    id: "marmara",
    name: "Istanbul and Marmara",
    tagline: "Where the country introduces itself",
    blurb:
      "Istanbul plus everything within a few hours of it: the islands, Bursa, and the Gallipoli peninsula. Almost every first trip starts in this corner.",
  },
  {
    id: "cappadocia",
    name: "Cappadocia and Central Anatolia",
    tagline: "Rock valleys, balloons and underground cities",
    blurb:
      "The high plateau in the middle of the country. Cappadocia is the headline, and Konya and Ankara sit close enough to fold into the same week.",
  },
  {
    id: "aegean",
    name: "The Aegean",
    tagline: "Ruins, olive groves and market towns",
    blurb:
      "The west coast and the country behind it. Classical sites at their best, whitewashed villages, and a long stretch of good swimming.",
  },
  {
    id: "turquoise",
    name: "The Turquoise Coast",
    tagline: "Sailing, lagoons and Lycian ruins",
    blurb:
      "The Mediterranean shore from Fethiye round to Antalya. Boats, paragliding, canyons, and Roman theatres a short drive from the beach.",
  },
  {
    id: "blacksea",
    name: "The Black Sea and the highlands",
    tagline: "Green plateaus, mist and tea",
    blurb:
      "The north coast and the mountains behind it. Wetter, greener and far quieter than the south, and completely different in feel.",
  },
  {
    id: "anatolia",
    name: "Eastern and Southeastern Anatolia",
    tagline: "The oldest corners of the country",
    blurb:
      "The part most visitors never reach. Stone cities, the first temple ever built, and landscapes that run to the Syrian and Armenian borders.",
  },
];

export const regionById = Object.fromEntries(regions.map((r) => [r.id, r]));
