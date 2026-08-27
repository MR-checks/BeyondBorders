"use client";

import { useCallback, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { places } from "@/content/turkey/places";
import { regions } from "@/content/turkey/regions";
import { experiences } from "@/content/turkey/experiences";
import type { ExperienceId, RegionId, SeasonKind } from "@/content/turkey/types";
import PlaceCard from "./PlaceCard";
import PlaceDrawer from "./PlaceDrawer";

type SeasonFilter = "all" | SeasonKind;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
        "border",
        active
          ? "border-transparent bg-[#2C1506] text-[#F5EDDA] dark:bg-accent dark:text-[#2C1506]"
          : "hairline text-ink-dim hover:border-accent hover:text-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function PlaceGallery() {
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [exp, setExp] = useState<ExperienceId | "all">("all");
  const [season, setSeason] = useState<SeasonFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter((p) => {
      if (region !== "all" && p.region !== region) return false;
      if (exp !== "all" && !p.experiences.includes(exp)) return false;
      if (season !== "all" && p.season !== season) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.teaser.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [region, exp, season, query]);

  const dirty = region !== "all" || exp !== "all" || season !== "all" || query !== "";

  const reset = () => {
    setRegion("all");
    setExp("all");
    setSeason("all");
    setQuery("");
  };

  const openPlace = useMemo(
    () => places.find((p) => p.id === openId) ?? null,
    [openId]
  );

  // Arrow keys walk the filtered list, so browsing does not jump to a hidden place.
  const step = useCallback(
    (delta: number) => {
      if (!openId || filtered.length === 0) return;
      const i = filtered.findIndex((p) => p.id === openId);
      if (i === -1) return;
      const next = (i + delta + filtered.length) % filtered.length;
      setOpenId(filtered[next].id);
    },
    [openId, filtered]
  );

  return (
    <section id="places" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Where to go</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Somewhere in here is your trip
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Every one of these is a place we would happily lose a day in. Open
            the ones that catch you and save them. Your shortlist is where the
            itinerary starts.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Search
                size={17}
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-dim"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search places or activities"
                aria-label="Search places or activities"
                className="w-full rounded-full border hairline bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Chip active={season === "all"} onClick={() => setSeason("all")}>
                Any time
              </Chip>
              <Chip
                active={season === "year-round"}
                onClick={() => setSeason("year-round")}
              >
                Open all year
              </Chip>
              <Chip
                active={season === "seasonal"}
                onClick={() => setSeason("seasonal")}
              >
                Seasonal
              </Chip>
            </div>
          </div>

          <div className="no-scrollbar rail-fade -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
            <Chip active={region === "all"} onClick={() => setRegion("all")}>
              All regions
            </Chip>
            {regions.map((r) => (
              <Chip
                key={r.id}
                active={region === r.id}
                onClick={() => setRegion(r.id)}
              >
                {r.name}
              </Chip>
            ))}
          </div>

          <div className="no-scrollbar rail-fade -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
            <Chip active={exp === "all"} onClick={() => setExp("all")}>
              Anything
            </Chip>
            {experiences.map((e) => (
              <Chip key={e.id} active={exp === e.id} onClick={() => setExp(e.id)}>
                {e.label}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <p className="text-sm text-ink-dim" aria-live="polite">
              {filtered.length === places.length
                ? `${places.length} places`
                : `${filtered.length} of ${places.length} places`}
            </p>
            {dirty && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong underline-offset-4 hover:underline dark:text-accent"
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <PlaceCard
                key={p.id}
                place={p}
                onOpen={setOpenId}
                eager={i < 3}
                wide={i % 7 === 0}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border hairline p-10 text-center">
            <p className="font-serif text-2xl">Nothing matches that combination</p>
            <p className="mt-2 text-ink-dim">
              Try widening the filters. If you are after something specific and
              it is not listed, ask us anyway. The list here is not everywhere we go.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-xl bg-cta px-5 py-3 font-bold text-white transition-colors hover:bg-cta-hover"
            >
              Show me everything
            </button>
          </div>
        )}
      </div>

      <PlaceDrawer
        place={openPlace}
        onClose={() => setOpenId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  );
}
