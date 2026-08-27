import { services } from "@/content/services";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="relative mb-4 inline-block font-serif text-4xl md:text-5xl">
            <span className="mb-2 block font-sans text-sm uppercase tracking-widest text-accent">
              What we do
            </span>
            Everything between the idea and the plane
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-dim">
            You bring the goal. We deal with the forms, the embassies, the
            deadlines and the bits nobody warns you about.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              step={i}
              as="article"
              className="glass group rounded-3xl p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_16px_44px_rgb(var(--accent)/0.25)] motion-reduce:hover:translate-y-0"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/20 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <service.icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="leading-relaxed text-ink-dim">{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
