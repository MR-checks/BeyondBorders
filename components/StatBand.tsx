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
    <section className="px-6 pb-20" ref={ref}>
      <div className="max-w-6xl mx-auto glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-medium tracking-wider uppercase text-ink-dim">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
