"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Plus, X } from "lucide-react";
import type { Place } from "@/content/turkey/types";
import { regionById } from "@/content/turkey/regions";
import { experienceLabel } from "@/content/turkey/experiences";
import { useTrip } from "./TripContext";

type Props = {
  place: Place | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function PlaceDrawer({ place, onClose, onPrev, onNext }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const open = Boolean(place);

  // Keyboard: Escape closes, arrows move between places.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  // Hold the page still behind the panel, and put focus back where it came from.
  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = "";
      restoreTo.current?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {place && (
        <div className="fixed inset-0 z-[950] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0E0601]/70 backdrop-blur-sm"
          />

          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="place-drawer-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-surface shadow-2xl sm:rounded-3xl"
          >
            <div
              className="relative aspect-[16/9] w-full shrink-0"
              style={{ backgroundColor: place.image.color }}
            >
              <Image
                src={place.image.src}
                alt={place.name}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(14,6,1,0.9) 0%, rgba(14,6,1,0.25) 46%, rgba(14,6,1,0.12) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="on-photo text-[0.68rem] font-bold uppercase tracking-[0.16em] opacity-85">
                  {place.area} &middot; {regionById[place.region]?.name}
                </p>
                <h2
                  id="place-drawer-title"
                  className="on-photo font-serif text-3xl leading-tight sm:text-4xl"
                >
                  {place.name}
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[rgba(247,239,221,0.9)] text-[#2C1506] transition-colors hover:bg-white"
              >
                <X size={19} />
              </button>

              <div className="absolute left-3 top-3 flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous place"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(247,239,221,0.75)] text-[#2C1506] transition-colors hover:bg-white"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next place"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(247,239,221,0.75)] text-[#2C1506] transition-colors hover:bg-white"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
              <p className="text-lg leading-relaxed text-ink">{place.description}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="eyebrow mb-3">What people do here</h3>
                  <ul className="space-y-2 text-ink-dim">
                    {place.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="eyebrow mb-3">When to go</h3>
                  <p className="text-ink-dim">{place.window}</p>
                  {place.note && (
                    <p className="mt-3 rounded-xl border-l-2 border-cta bg-cta/5 px-3.5 py-3 text-sm leading-relaxed text-ink-dim">
                      {place.note}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {place.experiences.map((e) => (
                      <span
                        key={e}
                        className="rounded-full border hairline px-2.5 py-1 text-xs text-ink-dim"
                      >
                        {experienceLabel[e]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DrawerActions place={place} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DrawerActions({ place }: { place: Place }) {
  const { isSelected, toggle } = useTrip();
  const added = isSelected(place.id);

  return (
    <div className="shrink-0 border-t hairline bg-surface p-4 sm:px-7 sm:py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-dim">
          {added
            ? "Saved. Add more places, then send the list over when you are ready."
            : "Building a shortlist? Save it and send the whole list at once."}
        </p>
        <button
          type="button"
          onClick={() => toggle(place.id)}
          className={[
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition-colors",
            added
              ? "bg-accent/15 text-accent-strong dark:text-accent"
              : "bg-cta text-white hover:bg-cta-hover",
          ].join(" ")}
        >
          {added ? <Check size={17} strokeWidth={3} /> : <Plus size={17} strokeWidth={2.5} />}
          {added ? "Saved to your trip" : "Add to my trip"}
        </button>
      </div>
    </div>
  );
}
