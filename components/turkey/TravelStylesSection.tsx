"use client";

import { Check } from "lucide-react";
import { travelStyles } from "@/content/turkey/travelStyles";
import { useTrip } from "./TripContext";

export default function TravelStylesSection() {
  const { style, setStyle } = useTrip();

  const choose = (id: (typeof travelStyles)[number]["id"]) => {
    setStyle(id);
    document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="styles" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Three ways to do it</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Who is coming with you?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Same country, same guides, three quite different trips. Most people
            know which one is theirs before they finish reading it.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {travelStyles.map((s) => {
            const active = style === s.id;
            return (
              <article
                key={s.id}
                className={[
                  "flex flex-col rounded-3xl border p-7 transition-colors duration-300",
                  active ? "border-accent bg-accent/[0.07]" : "hairline",
                ].join(" ")}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-accent-strong dark:text-accent">
                  {s.bestFor}
                </p>
                <h3 className="mt-2.5 font-serif text-2xl leading-snug">{s.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-dim">{s.description}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-dim">
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        aria-hidden
                        className="mt-0.5 shrink-0 text-accent-strong dark:text-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => choose(s.id)}
                  className={[
                    "mt-7 rounded-xl px-5 py-3.5 font-bold transition-colors",
                    active
                      ? "bg-accent text-[#2C1506]"
                      : "bg-[#2C1506] text-[#F5EDDA] hover:bg-cta dark:bg-accent/15 dark:text-accent dark:hover:bg-accent dark:hover:text-[#2C1506]",
                  ].join(" ")}
                >
                  {active ? "Chosen, continue below" : s.cta}
                </button>
              </article>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl leading-relaxed text-ink-dim">
          Not sure which fits? Say so in the form and we will tell you what makes
          sense for your dates and your group. Nothing here is fixed until you
          agree to it in writing.
        </p>
      </div>
    </section>
  );
}
