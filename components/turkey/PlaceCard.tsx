"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import type { Place } from "@/content/turkey/types";
import { useTrip } from "./TripContext";

type Props = {
  place: Place;
  onOpen: (id: string) => void;
  /** First row loads eagerly so the gallery has something on screen immediately. */
  eager?: boolean;
  /** Wide cards break the grid rhythm so it reads like a spread, not a spreadsheet. */
  wide?: boolean;
};

export default function PlaceCard({ place, onOpen, eager, wide }: Props) {
  const { isSelected, toggle } = useTrip();
  const added = isSelected(place.id);

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl lift",
        "ring-1 ring-inset",
        added ? "ring-2 ring-accent" : "ring-black/10 dark:ring-white/10",
        wide ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onOpen(place.id)}
        aria-label={`Read about ${place.name}`}
        className="block w-full text-left"
      >
        <div
          className={wide ? "relative aspect-[16/10] sm:aspect-[2/1]" : "relative aspect-[4/3]"}
          style={{ backgroundColor: place.image.color }}
        >
          <Image
            src={place.image.src}
            alt={place.name}
            fill
            sizes={
              wide
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 760px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            }
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />

          {/* Scrim: strong enough to carry text, light enough to keep the photo */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(14,6,1,0.86) 0%, rgba(14,6,1,0.42) 34%, rgba(14,6,1,0) 62%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="on-photo text-[0.68rem] font-bold uppercase tracking-[0.16em] opacity-80">
              {place.area}
            </p>
            <h3 className="on-photo font-serif text-xl sm:text-2xl leading-tight">
              {place.name}
            </h3>
            <p className="on-photo mt-1 text-sm leading-snug opacity-90 line-clamp-2">
              {place.teaser}
            </p>
          </div>

          <span
            className={[
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider backdrop-blur-sm",
              place.season === "year-round"
                ? "bg-[rgba(247,239,221,0.9)] text-[#2C1506]"
                : "bg-[rgba(200,88,40,0.92)] text-white",
            ].join(" ")}
          >
            {place.season === "year-round" ? "All year" : "Seasonal"}
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => toggle(place.id)}
        aria-pressed={added}
        aria-label={
          added ? `Remove ${place.name} from your trip` : `Add ${place.name} to your trip`
        }
        title={added ? "Remove from your trip" : "Add to your trip"}
        className={[
          "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full",
          "transition-colors duration-200",
          added
            ? "bg-accent text-[#2C1506]"
            : "bg-[rgba(247,239,221,0.88)] text-[#2C1506] hover:bg-white",
        ].join(" ")}
      >
        {added ? <Check size={17} strokeWidth={3} /> : <Plus size={17} strokeWidth={2.5} />}
      </button>
    </article>
  );
}
