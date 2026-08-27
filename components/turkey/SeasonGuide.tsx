import { places } from "@/content/turkey/places";

const seasons = [
  {
    name: "Spring",
    months: "March to May",
    good: "Wildflowers over the ruins, comfortable walking weather, balloons flying most mornings, and the southeast before it turns hot.",
    watch: "The sea is still cold until well into May.",
  },
  {
    name: "Summer",
    months: "June to August",
    good: "Coast season. Boats, swimming, gulet cruises, and the Black Sea highlands at their greenest.",
    watch: "The classical sites and the southeast get genuinely punishing at midday.",
  },
  {
    name: "Autumn",
    months: "September to November",
    good: "The sea is still warm, the crowds thin out, the light is at its best, and the forests turn. A lot of people's favourite window.",
    watch: "Rain arrives on the Black Sea coast earlier than elsewhere.",
  },
  {
    name: "Winter",
    months: "December to February",
    good: "Cappadocia under snow, skiing at Uludağ, Istanbul quiet and cheaper, and thermal springs at their best.",
    watch: "Some coastal towns close down, and mountain roads can shut with snow.",
  },
];

export default function SeasonGuide() {
  const allYear = places.filter((p) => p.season === "year-round").length;
  const seasonal = places.length - allYear;

  return (
    <section id="seasons" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">When to come</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              The country changes every few months
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-dim">
              Cappadocia under snow is a different holiday from Cappadocia in
              May. We run trips right through the year and set the dates with
              you, so the only thing worth knowing is what each season gives you.
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-baseline gap-3 rounded-xl border hairline px-4 py-3">
                <span className="font-serif text-2xl text-accent-strong dark:text-accent">
                  {allYear}
                </span>
                <span className="text-sm text-ink-dim">
                  places you can visit in any month
                </span>
              </div>
              <div className="flex items-baseline gap-3 rounded-xl border hairline px-4 py-3">
                <span className="font-serif text-2xl text-cta">{seasonal}</span>
                <span className="text-sm text-ink-dim">
                  places with a season worth planning around
                </span>
              </div>
            </div>

            <p className="mt-7 rounded-2xl border-l-2 border-cta bg-cta/5 px-5 py-4 leading-relaxed text-ink-dim">
              Treat all of this as a guide rather than a promise. Weather shifts
              year to year, balloons and paragliders get grounded, and mountain
              roads open later than they used to. We will tell you honestly what
              is realistic for your dates, and we build in room to move when we
              can.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {seasons.map((s) => (
              <article key={s.name} className="rounded-2xl border hairline p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl">{s.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-dim">
                    {s.months}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-ink-dim">{s.good}</p>
                <p className="mt-3 border-t hairline pt-3 text-sm text-ink-dim">
                  <span className="font-semibold text-ink">Worth knowing. </span>
                  {s.watch}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
