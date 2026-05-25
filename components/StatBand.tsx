"use client";
import { siteConfig } from "@/lib/siteConfig";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StatBand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { label: "Applicants placed", value: siteConfig.stats.applicants },
    { label: "Visa success rate", value: siteConfig.stats.successRate },
    { label: "Since", value: siteConfig.stats.founded },
    { label: "Core services", value: siteConfig.stats.services },
  ];

  return (
    <section className="px-6 pb-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-cta/5 to-accent/10 max-w-6xl mx-auto rounded-3xl -z-10 blur-xl"></div>
      <div className="max-w-6xl mx-auto glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cta mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-bold tracking-widest uppercase text-ink-dim">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
