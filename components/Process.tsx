"use client";
import { processSteps } from "@/content/process";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 relative inline-block">
            <span className="block text-sm font-sans text-accent tracking-widest uppercase mb-2">Simple Steps</span>
            How It Works
          </h2>
        </div>
        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <motion.div 
              key={step.id}
              className="glass p-6 md:p-8 rounded-2xl flex flex-row items-center gap-6 cursor-pointer"
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgb(var(--accent) / 0.28)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 w-14 h-14 bg-[#AC9350] text-white rounded-full flex items-center justify-center font-serif font-bold text-2xl shadow-[0_4px_12px_rgba(172,147,80,0.3)]">
                {step.id}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-ink-dim leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
