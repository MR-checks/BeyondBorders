import type { Experience } from "./types";

/** Filter vocabulary for the places gallery. Order is the order they appear. */
export const experiences: Experience[] = [
  { id: "balloon", label: "Hot air ballooning" },
  { id: "boat", label: "Boats and sailing" },
  { id: "beach", label: "Beaches and swimming" },
  { id: "ruins", label: "Ancient sites" },
  { id: "hike", label: "Walking and nature" },
  { id: "food", label: "Food and markets" },
  { id: "culture", label: "Culture and worship" },
  { id: "thermal", label: "Thermal springs" },
  { id: "snow", label: "Snow and winter" },
  { id: "city", label: "City life" },
];

export const experienceLabel = Object.fromEntries(
  experiences.map((e) => [e.id, e.label])
) as Record<string, string>;
