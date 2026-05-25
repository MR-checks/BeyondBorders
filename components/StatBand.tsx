"use client";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ from, to, duration, prefix = "", suffix = "" }: { from: number, to: number, duration: number, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    if (shouldReduceMotion) {
      if (nodeRef.current) nodeRef.current.textContent = `${prefix}${Math.round(to).toLocaleString()}${suffix}`;
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
        }
      }
    });
    return () => controls.stop();
  }, [from, to, duration, prefix, suffix, shouldReduceMotion]);

  return <div ref={nodeRef} className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2 tracking-tight">{prefix}{Math.round(from).toLocaleString()}{suffix}</div>;
}

export default function StatBand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { label: "Applicants placed", value: 6000, suffix: "+", duration: 1.2, from: 0 },
    { label: "Visa success rate", value: 100, suffix: "%", duration: 1.2, from: 0 },
    { label: "Since", value: 2019, from: new Date().getFullYear(), duration: 1.2 },
    { label: "Core services", value: 6, duration: 1.0, from: 0 },
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
            {isInView ? <Counter from={stat.from} to={stat.value} duration={stat.duration} suffix={stat.suffix} /> : <div className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2 tracking-tight">&nbsp;</div>}
            <div className="text-sm font-bold tracking-widest uppercase text-ink-dim">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
