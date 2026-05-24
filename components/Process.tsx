"use client";
import { processSteps } from "@/content/process";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">How It Works</h2>
        </div>
        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <motion.div 
              key={step.id}
              className="glass p-6 md:p-8 rounded-2xl flex gap-6 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.id}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-ink-dim leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
