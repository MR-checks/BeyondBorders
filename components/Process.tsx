import { processSteps } from "@/content/process";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="relative mb-4 inline-block font-serif text-4xl md:text-5xl">
            <span className="mb-2 block font-sans text-sm uppercase tracking-widest text-accent">
              How it works
            </span>
            Four steps, and we do most of them
          </h2>
        </div>

        <ol className="space-y-6">
          {processSteps.map((step, i) => (
            <Reveal
              key={step.id}
              step={i}
              as="li"
              className="glass flex flex-row items-center gap-6 rounded-2xl p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgb(var(--accent)/0.25)] motion-reduce:hover:translate-y-0 md:p-8"
            >
              <span
                aria-hidden
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-transparent bg-[#2C1506] font-serif text-2xl font-bold text-[#F5EDDA] shadow-md dark:border-[rgba(200,135,42,0.4)] dark:bg-[#3E1E09] dark:text-[#C8872A]"
              >
                {step.id}
              </span>
              <div className="flex-grow">
                <h3 className="mb-1 text-xl font-bold">{step.title}</h3>
                <p className="leading-relaxed text-ink-dim">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
