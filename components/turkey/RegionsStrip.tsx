import Link from "next/link";
import { regions } from "@/content/turkey/regions";
import { places } from "@/content/turkey/places";

export default function RegionsStrip() {
  return (
    <section id="regions" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">The lay of the land</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Six regions, six completely different countries
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Turkey is larger than it looks on a map, and the north has almost
            nothing in common with the south. Knowing which part you are drawn
            to is usually the fastest way to shape a trip.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => {
            const count = places.filter((p) => p.region === r.id).length;
            return (
              <Link
                key={r.id}
                href="#places"
                className="group rounded-2xl border hairline p-6 transition-colors hover:border-accent"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-accent-strong dark:text-accent">
                  {r.tagline}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-snug">{r.name}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{r.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-ink-dim">
                  {count} places on this page
                  <span
                    aria-hidden
                    className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
