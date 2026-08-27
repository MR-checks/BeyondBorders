import type { Metadata } from "next";
import Link from "next/link";
import { places } from "@/content/turkey/places";

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution for the photography used on the Turkey travel and tours pages.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const credited = places.filter((p) => p.image.credit);

  return (
    <div className="mx-auto max-w-3xl px-6 py-28 sm:py-32">
      <p className="eyebrow mb-3">Attribution</p>
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Photo credits</h1>

      {credited.length === 0 ? (
        <p className="mt-6 text-lg leading-relaxed text-ink-dim">
          All photography on these pages is our own.
        </p>
      ) : (
        <>
          <p className="mt-6 text-lg leading-relaxed text-ink-dim">
            While we finish photographing our own trips, some images on the{" "}
            <Link
              href="/turkey"
              className="font-medium text-accent-strong underline underline-offset-4 dark:text-accent"
            >
              Turkey pages
            </Link>{" "}
            come from Wikimedia Commons under free licences. Credit where it is
            due, listed below.
          </p>

          <ul className="mt-10 divide-y divide-[rgb(var(--ink)/0.12)] dark:divide-[rgb(var(--accent)/0.22)]">
            {credited.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5"
              >
                <span className="font-semibold">{p.name}</span>
                <span className="text-sm text-ink-dim">
                  {p.image.credit!.source ? (
                    <a
                      href={p.image.credit!.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-accent"
                    >
                      {p.image.credit!.author}
                    </a>
                  ) : (
                    p.image.credit!.author
                  )}
                  {", "}
                  {p.image.credit!.license}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
