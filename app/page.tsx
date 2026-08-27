import Image from "next/image";
import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import TurkeyTeaser from "@/components/TurkeyTeaser";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/content/faqs";
import { places } from "@/content/turkey/places";
import { siteConfig } from "@/lib/siteConfig";

// Daytime skyline reads far better under a scrim than the night bridge shot.
const istanbul = places.find((p) => p.id === "istanbul");

export default function Home() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      email: siteConfig.contact.email,
      telephone: `+${siteConfig.contact.whatsappE164}`,
      foundingDate: siteConfig.stats.founded,
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
      sameAs: [siteConfig.contact.instagram, siteConfig.contact.tiktok],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structured} />
      <Hero />
      <StatBand />
      <Services />
      <Destinations />
      <TurkeyTeaser />
      <Process />
      <Testimonials />
      <Faq />

      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border hairline bg-surface/60">
          <div className="grid lg:grid-cols-[minmax(0,26rem)_1fr]">
            {/* Image panel: makes "we are in Istanbul" something you can see */}
            <div
              className="relative min-h-[18rem] p-8 sm:p-10 lg:min-h-full"
              style={{ backgroundColor: istanbul?.image.color ?? "#1b2733" }}
            >
              {istanbul && (
                <Image
                  src={istanbul.image.src}
                  alt="The historic peninsula and skyline of Istanbul"
                  fill
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="object-cover"
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12,5,1,0.92) 0%, rgba(12,5,1,0.78) 42%, rgba(12,5,1,0.30) 78%, rgba(12,5,1,0.12) 100%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-end">
                <p className="on-photo text-xs font-bold uppercase tracking-[0.18em] opacity-85">
                  Start your journey
                </p>
                <h2 className="on-photo mt-2 font-serif text-4xl leading-tight">
                  Tell us where you are trying to get to
                </h2>
                <p className="on-photo mt-4 leading-relaxed opacity-90">
                  The first conversation costs nothing, and we will tell you
                  straight whether we can help. If we cannot, we will say so.
                </p>

                <dl className="mt-7 space-y-3.5 border-t border-white/20 pt-6">
                  <div>
                    <dt className="on-photo text-[0.68rem] font-bold uppercase tracking-wider opacity-70">
                      WhatsApp
                    </dt>
                    <dd>
                      <a
                        href={siteConfig.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="on-photo underline-offset-4 hover:underline"
                      >
                        {siteConfig.contact.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="on-photo text-[0.68rem] font-bold uppercase tracking-wider opacity-70">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="on-photo break-all underline-offset-4 hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="on-photo text-[0.68rem] font-bold uppercase tracking-wider opacity-70">
                      Find us
                    </dt>
                    <dd className="on-photo">{siteConfig.contact.location}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
