import type { TravelStyle } from "./types";

export const travelStyles: TravelStyle[] = [
  {
    id: "group",
    name: "Join a group departure",
    cta: "Enquire about a group departure",
    bestFor: "Solo travellers, friends, and anyone who likes company on the road",
    description:
      "We put trips together through the year and you take a seat on one. Costs are shared, the route is already worked out, and you travel with a small group rather than on your own.",
    includes: [
      "Shared transport and a guide throughout",
      "Hotels booked and paid before you arrive",
      "A fixed route with the main sites built in",
      "Lower cost per person than travelling alone",
      "A small group, not a coach of fifty",
    ],
  },
  {
    id: "private",
    name: "Private trip",
    cta: "Enquire about a private trip",
    bestFor: "Couples, families, and small groups travelling together",
    description:
      "The same country, at your own pace. Your own guide and vehicle, your own dates, and a route built around what you actually want to see rather than a fixed itinerary.",
    includes: [
      "Your own guide and driver",
      "Dates chosen by you",
      "Route and pace adjusted as you go",
      "Family rooms, connecting rooms, and child seats arranged",
      "Quieter times of day at the busy sites",
    ],
  },
  {
    id: "vip",
    name: "VIP and concierge",
    cta: "Enquire about VIP travel",
    bestFor: "Travellers who want the arrangements handled discreetly and properly",
    description:
      "For clients who travel at a different level. Business or first class flights, private transfers, the better rooms in the better hotels, and someone reachable at any hour of your trip.",
    includes: [
      "Business or first class flights arranged",
      "Private airport handling and transfers",
      "Suites and upper category rooms",
      "Private guides, private boats, private balloon baskets",
      "Restaurant tables and closed-door access where it can be arranged",
      "One point of contact for the whole trip",
    ],
  },
];
