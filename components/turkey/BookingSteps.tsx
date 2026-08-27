const steps = [
  {
    n: 1,
    title: "Tell us what you like",
    body: "Save the places that appeal to you, pick roughly when you want to travel, and send it over. Two minutes, and no account to create.",
  },
  {
    n: 2,
    title: "We come back with a plan",
    body: "Usually within a day. A route that actually works, real dates, hotels, what is included, and a price in writing. If something on your list does not fit the season, we say so.",
  },
  {
    n: 3,
    title: "You change whatever you want",
    body: "Swap a city, add days, upgrade the rooms, bring another couple. We rework it until it is right. Nothing is charged while this is going on.",
  },
  {
    n: 4,
    title: "We handle it from there",
    body: "Visas, flights, transfers, guides and bookings. You get one point of contact who stays reachable for the whole trip, not a call centre.",
  },
];

export default function BookingSteps() {
  return (
    <section id="how" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">What happens next</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            From a shortlist to a booked trip
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-5 rounded-2xl border hairline p-6">
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2C1506] font-serif text-lg font-bold text-[#F5EDDA] dark:bg-[#3E1E09] dark:text-accent dark:ring-1 dark:ring-accent/40"
              >
                {s.n}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-dim">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
