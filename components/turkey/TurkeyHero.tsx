import Image from "next/image";
import Link from "next/link";
import { places } from "@/content/turkey/places";
import { regions } from "@/content/turkey/regions";

const hero = places.find((p) => p.id === "cappadocia")!;

export default function TurkeyHero() {
  return (
    <section className="px-4 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ backgroundColor: hero.image.color }}
        >
          <div className="relative h-[78vh] min-h-[30rem] w-full sm:h-[80vh]">
            <Image
              src={hero.image.src}
              alt="Hot air balloons over the rock valleys of Cappadocia at sunrise"
              fill
              // `priority` is deprecated in Next 16. This is the LCP image, so
              // load it immediately and tell the browser it matters.
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(12,5,1,0.92) 0%, rgba(12,5,1,0.58) 38%, rgba(12,5,1,0.18) 70%, rgba(12,5,1,0.28) 100%)",
              }}
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <div className="max-w-3xl">
                <p className="on-photo text-xs font-bold uppercase tracking-[0.2em] opacity-90">
                  Travel and tours
                </p>
                <h1 className="on-photo mt-3 font-serif text-[clamp(2.2rem,6vw,4.25rem)] leading-[1.05]">
                  Turkey, the way we would show a friend
                </h1>
                <p className="on-photo mt-5 max-w-xl text-base leading-relaxed opacity-95 sm:text-lg">
                  We live in Istanbul. We know which month the coast is worth it,
                  which village does the good breakfast, and how far you really
                  get in a week. Tell us who is coming and roughly when, and we
                  will take it from there.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#places"
                    className="rounded-xl bg-cta px-7 py-4 text-center font-bold text-white transition-colors hover:bg-cta-hover"
                  >
                    Start with the places
                  </Link>
                  <Link
                    href="#plan"
                    className="rounded-xl border border-white/40 bg-white/10 px-7 py-4 text-center font-bold text-[#F7EFDD] backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Plan a trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: `${places.length}`, v: "places worth your time" },
            { k: `${regions.length}`, v: "regions, all different" },
            { k: "3", v: "ways to travel" },
            // Our whole model in one number: we build dates around you.
            { k: "0", v: "fixed departure dates" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border hairline px-4 py-4 text-center sm:text-left"
            >
              <dt className="font-serif text-2xl text-accent-strong dark:text-accent">
                {s.k}
              </dt>
              <dd className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-ink-dim">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
