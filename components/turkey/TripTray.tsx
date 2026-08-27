"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { places } from "@/content/turkey/places";
import { useTrip } from "./TripContext";

export default function TripTray() {
  const { selected, remove, clear, ready } = useTrip();
  const chosen = places.filter((p) => selected.includes(p.id));
  const show = ready && chosen.length > 0;

  const goToPlanner = () => {
    document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 34 }}
          /* Stops short of the right edge so it never sits under the WhatsApp button. */
          className="fixed bottom-3 left-3 right-[5.75rem] z-[880] sm:left-1/2 sm:right-auto sm:w-[min(44rem,calc(100vw-10rem))] sm:-translate-x-1/2"
        >
          <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-strong dark:text-accent">
                Your trip &middot; {chosen.length}{" "}
                {chosen.length === 1 ? "place" : "places"}
              </p>
              <div className="no-scrollbar mt-1 flex gap-1.5 overflow-x-auto">
                {chosen.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => remove(p.id)}
                    title={`Remove ${p.name}`}
                    className="group inline-flex shrink-0 items-center gap-1 rounded-full border hairline px-2.5 py-1 text-xs text-ink-dim transition-colors hover:border-cta hover:text-cta"
                  >
                    {p.name}
                    <X size={11} className="opacity-50 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={clear}
                className="hidden text-xs text-ink-dim underline-offset-4 hover:underline sm:block"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={goToPlanner}
                className="rounded-xl bg-cta px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
              >
                Plan this
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
