/**
 * ⚠️  PLACEHOLDER CONTENT, REPLACE BEFORE LAUNCH  ⚠️
 *
 * The first three entries are the real ones that were already on the site.
 * Everything below the marker is written stand-in copy, put here so the
 * marquee has enough cards to look right while you dig the real quotes out of
 * your chats. Published as-is these would be invented reviews of a real
 * business, so swap them out (or delete them) before this goes live.
 *
 * Shape: keep `service` short, it renders as the little tag on the card.
 */
export type Testimonial = {
  id: number;
  name: string;
  location: string;
  service: string;
  quote: string;
  /** Real quotes only. Placeholder rows stay `false` so they are easy to find. */
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  // ---- Real ----
  {
    id: 1,
    name: "Melody Success",
    location: "USA",
    service: "Student visa",
    quote:
      "BeyondBorders made my US university application seamless. Their guidance was invaluable!",
    verified: true,
  },
  {
    id: 2,
    name: "Peter Oko",
    location: "Canada",
    service: "Tourist visa",
    quote:
      "Got my 10-year tourist visa without any hassle. Highly recommend their services.",
    verified: true,
  },
  {
    id: 3,
    name: "Betty Phillip",
    location: "Australia",
    service: "Study abroad",
    quote:
      "From test prep to visa success, they were with me every step of the way.",
    verified: true,
  },

  // ---- Placeholder, replace ----
  {
    id: 4,
    name: "Ayşe Demir",
    location: "Türkiye",
    service: "Cappadocia trip",
    quote:
      "We were up at four in the morning and freezing and none of us cared. My mother has not stopped talking about it since.",
    verified: false,
  },
  {
    id: 5,
    name: "Daniel Mensah",
    location: "Germany",
    service: "Study visa",
    quote:
      "Third agency I tried. First one that actually answered on a Sunday and told me the truth about my chances.",
    verified: false,
  },
  {
    id: 6,
    name: "Grace Adeyemi",
    location: "UK",
    service: "Post-study work",
    quote:
      "They rewrote my statement of purpose twice without me asking. I got the offer three weeks later.",
    verified: false,
  },
  {
    id: 7,
    name: "Ibrahim Yusuf",
    location: "Türkiye",
    service: "Family trip",
    quote:
      "Seven of us, two grandparents, one toddler. I do not know how they made that work, but nobody complained once.",
    verified: false,
  },
  {
    id: 8,
    name: "Chidinma Okoro",
    location: "Canada",
    service: "Work permit",
    quote:
      "I had been rejected once before and assumed that was it. They talked me through exactly what went wrong and we fixed it.",
    verified: false,
  },
  {
    id: 9,
    name: "Marcus Ellery",
    location: "Türkiye",
    service: "Private tour",
    quote:
      "Booked business class through them and had a driver waiting at arrivals. Zero admin on my side the entire week.",
    verified: false,
  },
  {
    id: 10,
    name: "Fatima Bello",
    location: "USA",
    service: "Scholarship",
    quote:
      "Nobody told me scholarships like that existed. They found it, I applied, it covered most of my first year.",
    verified: false,
  },
  {
    id: 11,
    name: "Kwame Boateng",
    location: "Türkiye",
    service: "Medical visa",
    quote:
      "Hospital appointment, visa and hotel all sorted in under two weeks. My father was seen on time.",
    verified: false,
  },
];
