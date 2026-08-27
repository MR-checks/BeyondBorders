import { testimonials, type Testimonial } from "@/content/testimonials";

/**
 * Two rows sliding in opposite directions. Each track holds the list twice, so
 * the -50% keyframe lands on an identical frame and the loop has no seam.
 *
 * All CSS: no JS, no rAF, nothing to get stuck. Hovering or tabbing into a row
 * pauses it, and prefers-reduced-motion turns it into a plain scroll rail.
 */
function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="glass mx-2.5 flex w-[19rem] shrink-0 flex-col justify-between rounded-2xl p-6 sm:w-[22rem]">
      <blockquote className="text-[0.975rem] leading-relaxed text-ink">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/20 font-bold text-accent-strong dark:text-accent"
        >
          {t.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-bold leading-tight">{t.name}</span>
          <span className="block truncate text-sm text-ink-dim">
            {t.service} &middot; {t.location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  duration,
  reverse,
}: {
  items: Testimonial[];
  duration: string;
  reverse?: boolean;
}) {
  return (
    <div className="marquee-viewport no-scrollbar rail-fade overflow-x-auto md:overflow-hidden">
      <div
        className="marquee-track flex py-2.5"
        style={{
          ["--marquee-duration" as string]: duration,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const top = testimonials.slice(0, half);
  const bottom = testimonials.slice(half);

  return (
    <section id="testimonials" className="overflow-hidden bg-surface py-24">
      <div className="mx-auto mb-12 max-w-7xl px-6 text-center">
        <p className="eyebrow mb-2">What people say</p>
        <h2 className="font-serif text-4xl md:text-5xl">
          Six thousand of these, and counting
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-dim">
          Some came for a degree, some for a week on the coast. This is what they
          said afterwards.
        </p>
      </div>

      <Row items={top} duration="65s" />
      <Row items={bottom} duration="80s" reverse />
    </section>
  );
}
