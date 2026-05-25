"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Decorative dashed path (SVG motif) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,200 Q400,100 800,300 T1600,200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-accent"/>
      </svg>
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.h1 
          className="text-[clamp(2.4rem,5vw,4rem)] font-serif leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Journey to Global Travel & Opportunities Starts Here
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-ink-dim mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From Study and Work to Tourist and Medical visas, we guide you through the entire travel process: simple, clear, and stress-free.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="#contact" className="bg-ink text-surface hover:bg-[#1A0B03] dark:hover:bg-cta-hover px-8 py-4 rounded-xl font-medium transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgb(var(--ink)/0.35)] dark:bg-cta dark:text-white dark:hover:shadow-[0_8px_24px_rgb(var(--cta)/0.35)]">
            Get Free Consultation
          </Link>
          <Link href="#services" className="glass px-8 py-4 rounded-xl font-medium transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(var(--accent)/0.2)]">
            Explore Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
