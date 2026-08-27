import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/content/destinations";
import Reveal from "./Reveal";

const DEST_IMAGES: Record<string, string> = {
  usa: "https://images.unsplash.com/photo-1545328805-926d6a0950ca?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0",
  canada:
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0",
  uk: "https://images.unsplash.com/photo-1488747279002-c8523379faaa?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  australia:
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0",
  turkey: "/images/turkey/istanbul.webp",
  germany:
    "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
};

export default function Destinations() {
  return (
    <section id="destinations" className="bg-surface py-24 px-6">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="relative mb-4 inline-block font-serif text-4xl md:text-5xl">
            <span className="mb-2 block font-sans text-sm uppercase tracking-widest text-accent">
              Destinations
            </span>
            Six countries we know inside out
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-dim">
            Different embassies, different tricks, different waiting times. These
            are the ones we run most often, so we are fastest here.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {destinations.map((dest, i) => {
            const card = (
              <>
                <Image
                  src={DEST_IMAGES[dest.id]}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(20, 8, 2, 0.40) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 rounded-b-2xl border-t border-[rgba(200,135,42,0.30)] bg-[rgba(20,8,2,0.20)] p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-[#F5EDDA] drop-shadow-md">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-[#F5EDDA]/90 drop-shadow-sm">
                    {dest.description}
                  </p>
                </div>
              </>
            );

            const shell =
              "glass group relative block h-80 w-full overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_16px_44px_rgb(var(--accent)/0.25)] motion-reduce:hover:translate-y-0";

            return (
              <Reveal
                key={dest.id}
                step={i}
                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                {dest.id === "turkey" ? (
                  <Link href="/turkey" className={shell}>
                    {card}
                  </Link>
                ) : (
                  <Link href="/#contact" className={shell}>
                    {card}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
