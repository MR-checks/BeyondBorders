import type { Metadata } from "next";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import BookingSteps from "@/components/turkey/BookingSteps";
import PlaceGallery from "@/components/turkey/PlaceGallery";
import RegionsStrip from "@/components/turkey/RegionsStrip";
import SeasonGuide from "@/components/turkey/SeasonGuide";
import TravelStylesSection from "@/components/turkey/TravelStylesSection";
import TripPlanner from "@/components/turkey/TripPlanner";
import { TripProvider } from "@/components/turkey/TripContext";
import TripTray from "@/components/turkey/TripTray";
import TurkeyHero from "@/components/turkey/TurkeyHero";
import { places } from "@/content/turkey/places";
import { tourFaqs } from "@/content/turkey/tourFaqs";
import { siteConfig } from "@/lib/siteConfig";

const title = "Turkey Travel & Tours";
const description =
  "Group departures, private trips and VIP travel across Turkey. 36 places from Istanbul and Cappadocia to the Black Sea highlands and the southeast, planned around your dates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/turkey" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/turkey`,
    type: "website",
    images: [{ url: "/images/turkey/cappadocia.webp", width: 1200, height: 800 }],
  },
};

export default function TurkeyPage() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "Turkey travel and tours with BeyondBorders",
      description,
      touristType: [
        "Group travellers",
        "Couples and families",
        "Luxury and VIP travellers",
      ],
      provider: {
        "@type": "TravelAgency",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        telephone: `+${siteConfig.contact.whatsappE164}`,
      },
      itinerary: {
        "@type": "ItemList",
        numberOfItems: places.length,
        itemListElement: places.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristAttraction",
            name: p.name,
            description: p.teaser,
            address: {
              "@type": "PostalAddress",
              addressRegion: p.area,
              addressCountry: "TR",
            },
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tourFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structured} />
      <TurkeyHero />
      <TripProvider>
        <RegionsStrip />
        <PlaceGallery />
        <SeasonGuide />
        <TravelStylesSection />
        <BookingSteps />
        <TripPlanner />
        <TripTray />
      </TripProvider>
      <Faq
        items={tourFaqs}
        id="tour-faq"
        eyebrow="Before you ask"
        title="Questions we get a lot"
      />
    </>
  );
}
