import Link from "next/link";

/**
 * No client JS. The headline used to start at opacity 0 and wait for Framer
 * Motion, which meant the first thing anyone sees on the site could fail to
 * appear at all. The entrance is CSS now and the copy is in the HTML.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pb-20 pt-32">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,200 Q400,100 800,300 T1600,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="text-accent"
        />
      </svg>

      <div className="z-10 mx-auto max-w-4xl text-center">
        <h1 className="anim-rise mb-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-tight">
          Some people wait years for the trip. You could go this one.
        </h1>

        <p className="anim-rise anim-d2 mx-auto mb-10 max-w-2xl text-lg text-ink-dim md:text-xl">
          Study, work, a holiday, a hospital appointment abroad. Whatever the
          reason you need to cross a border, we have taken about six thousand
          people through it, and we have not lost a visa yet.
        </p>

        <div className="anim-rise anim-d3 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="rounded-xl bg-cta px-8 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:bg-cta-hover hover:shadow-[0_8px_24px_rgb(var(--cta)/0.35)] motion-reduce:hover:translate-y-0"
          >
            Talk to us, free
          </Link>
          <Link
            href="/turkey"
            className="glass px-8 py-4 font-medium transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(var(--accent)/0.2)] motion-reduce:hover:translate-y-0"
          >
            See our Turkey trips
          </Link>
        </div>
      </div>
    </section>
  );
}
