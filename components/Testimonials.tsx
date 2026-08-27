import { testimonials, type Testimonial } from "@/content/testimonials";

/**
 * Only quotes marked `verified: true` are rendered.
 *
 * The placeholder rows in content/testimonials.ts exist so the marquee can be
 * designed against a realistic number of cards. They are invented quotes with
 * invented names, and publishing those on a live site means showing fabricated
 * customer reviews to real customers, so they stay out of the DOM until someone
 * flips the flag on a quote they actually received.
 *
 * To publish one: set `verified: true` on that entry. Nothing else to change.
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
  // The track holds the list twice, so the -50% keyframe lands on an identical
  // frame and the loop has no seam.
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
  const published = testimonials.filter((t) => t.verified);

  // Nothing to show is better than padding the section out with invented quotes.
  if (published.length === 0) return null;

  // Two opposing rows need enough cards to look deliberate rather than sparse.
  const twoRows = published.length >= 6;
  const half = Math.ceil(published.length / 2);

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

      {twoRows ? (
        <>
          <Row items={published.slice(0, half)} duration="65s" />
          <Row items={published.slice(half)} duration="80s" reverse />
        </>
      ) : (
        <Row items={published} duration="55s" />
      )}
    </section>
  );
}
