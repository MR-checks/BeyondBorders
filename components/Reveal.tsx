"use client";

import { useEffect, useRef, useState } from "react";

const DELAY_CLASS = ["", "anim-d2", "anim-d3", "anim-d4"] as const;

type Props = {
  children: React.ReactNode;
  /** 0-3, staggers the entrance. Baked into the keyframes, not animation-delay. */
  step?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * Scroll-in entrance that cannot hide anything.
 *
 * The old approach was Framer Motion's `initial={{opacity:0}} whileInView`,
 * which server-renders `opacity:0` into the HTML. If JS never runs, or the
 * renderer is suspended, whole sections stay blank. That is what happened to
 * Services, Destinations and Process.
 *
 * Here the element is visible by default and JS only ever *adds* a
 * transform-only animation. No JS means no animation and fully visible content.
 */
export default function Reveal({
  children,
  step = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // Already on screen at mount: skip the animation rather than replay it.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${className} ${shown ? `anim-rise ${DELAY_CLASS[step % 4]}` : ""}`}
    >
      {children}
    </Tag>
  );
}
