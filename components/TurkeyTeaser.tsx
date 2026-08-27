import Image from "next/image";
import Link from "next/link";
import { places } from "@/content/turkey/places";

const featured = [
  "cappadocia",
  "oludeniz",
  "pamukkale",
  "sumela",
  "mardin",
  "kekova",
  "safranbolu",
  "istanbul",
]
  .map((id) => places.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function TurkeyTeaser() {
  return (
    <section id="turkey" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-center lg:gap-14">
          <div>
            <p className="eyebrow mb-3">Turkey</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Come and see where we live
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-dim">
              Sunrise over Cappadocia from inside the basket. A boat drifting
              above a town the sea took fifteen centuries ago. Bread out of a
              village oven at seven in the morning, still too hot to hold.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-dim">
              We are in Istanbul. We know which month each of these is actually
              worth doing, and we put the whole trip together so you only have to
              turn up.
            </p>

            <Link
              href="/turkey"
              className="mt-8 inline-block rounded-xl bg-cta px-7 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:bg-cta-hover hover:shadow-[0_8px_24px_rgb(var(--cta)/0.35)] motion-reduce:hover:translate-y-0"
            >
              See where we would take you
            </Link>
          </div>

          <div className="no-scrollbar rail-fade -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
            {featured.map((p) => (
              <Link
                key={p.id}
                href="/turkey#places"
                className="group relative w-[15rem] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[17rem]"
                style={{ backgroundColor: p.image.color }}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={p.image.src}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 60vw, 17rem"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(14,6,1,0.85) 0%, rgba(14,6,1,0.3) 40%, rgba(14,6,1,0) 68%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="on-photo text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-80">
                      {p.area}
                    </p>
                    <h3 className="on-photo font-serif text-xl leading-tight">
                      {p.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
