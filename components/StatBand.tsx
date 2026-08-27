"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  from: number;
  suffix?: string;
  format?: boolean;
  duration: number;
};

/**
 * The final value is rendered as real text on the server. The count-up only
 * overwrites it once the band scrolls into view, so if JS is slow, blocked, or
 * the tab is backgrounded, the numbers are still correct and visible.
 */
function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const node = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const done = useRef(false);
  const [tick, setTick] = useState(0);

  const render = (v: number) =>
    `${stat.format === false ? Math.round(v) : Math.round(v).toLocaleString()}${stat.suffix ?? ""}`;

  useEffect(() => {
    if (!run || reduce || done.current) return;
    // A hidden tab suspends the animation frame loop, which would freeze the
    // count part-way and display a number that is simply wrong. Wait for the
    // tab, and whatever happens, land on the real figure.
    if (document.visibilityState !== "visible") {
      const onVisible = () => {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", onVisible);
          setTick((t) => t + 1);
        }
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => document.removeEventListener("visibilitychange", onVisible);
    }

    done.current = true;
    const el = node.current;
    const controls = animate(stat.from, stat.value, {
      duration: stat.duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (el) el.textContent = render(v);
      },
    });
    return () => {
      controls.stop();
      if (el) el.textContent = render(stat.value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, reduce, tick]);

  return (
    <div
      ref={node}
      className="mb-2 font-serif text-4xl font-bold tracking-tight text-accent md:text-5xl"
    >
      {render(stat.value)}
    </div>
  );
}

const DELAYS = ["", "anim-d2", "anim-d3", "anim-d4"];

const stats: Stat[] = [
  { label: "People we have placed", value: 6000, suffix: "+", duration: 1.2, from: 0 },
  { label: "Visas approved", value: 100, suffix: "%", duration: 1.2, from: 0 },
  // Counts down from this year to 2019, so it never needs updating.
  { label: "Doing this since", value: 2019, from: new Date().getFullYear(), duration: 1.2, format: false },
  { label: "Countries we cover", value: 6, duration: 1, from: 0 },
];

export default function StatBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative px-6 pb-20" ref={ref}>
      <div className="absolute inset-0 -z-10 mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-accent/10 via-cta/5 to-accent/10 blur-xl" />
      <div className="glass relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-8 rounded-2xl p-8 text-center md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`anim-rise ${DELAYS[i]}`}>
            <Counter stat={stat} run={inView} />
            <div className="text-sm font-bold uppercase tracking-widest text-ink-dim">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
