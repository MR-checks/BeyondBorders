"use client";
import { faqs } from "@/content/faqs";
import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

type Props = {
  items?: FaqItem[];
  id?: string;
  eyebrow?: string;
  title?: string;
};

export default function Faq({
  items = faqs,
  id = "faq",
  eyebrow = "Questions",
  title = "The things people ask first",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const uid = useId();

  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 relative inline-block">
            <span className="block text-sm font-sans text-accent tracking-widest uppercase mb-2">
              {eyebrow}
            </span>
            {title}
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((faq, i) => {
            const open = openIndex === i;
            const panelId = `${uid}-panel-${i}`;
            const buttonId = `${uid}-button-${i}`;
            return (
              <div key={faq.question} className="glass rounded-xl overflow-hidden">
                <button
                  id={buttonId}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 font-bold"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                >
                  {faq.question}
                  <ChevronDown
                    aria-hidden
                    className={`shrink-0 transition-transform motion-reduce:transition-none ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed text-ink-dim">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
