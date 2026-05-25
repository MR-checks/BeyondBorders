"use client";
import { siteConfig } from "@/lib/siteConfig";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  // Drop and pendulum swing
  const dropIn = shouldReduceMotion 
    ? { y: 0, opacity: 1 } 
    : {
        y: [-200, 0],
        rotate: [-15, 12, -8, 5, -2, 0],
        opacity: [0, 1]
      };

  const dropTransition = shouldReduceMotion 
    ? { duration: 0.5 }
    : {
        y: { type: "spring", stiffness: 100, damping: 15, delay: 1 },
        rotate: { duration: 2, ease: "easeOut", delay: 1.2 },
        opacity: { duration: 0.5, delay: 1 }
      };

  // Continuous pulse and bob
  const continuousAnim = shouldReduceMotion 
    ? {} 
    : {
        scale: [1, 1.06, 1],
        y: [0, -4, 0],
        transition: {
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
        }
      };

  return (
    <motion.div
      initial={shouldReduceMotion ? { y: 0, opacity: 0 } : { y: -200, opacity: 0 }}
      animate={dropIn}
      transition={dropTransition}
      onAnimationComplete={() => {
        // After drop in, start the continuous animation if not reduced motion
        if (!shouldReduceMotion) {
          // Framer motion allows chaining, but simple way is to use a state or let CSS handle hover
          // We will use whileHover instead for scale, but for continuous pulse we can just rely on a wrapper or separate motion element.
        }
      }}
      className="fixed bottom-6 right-6 z-[900]"
      style={{ transformOrigin: "top center" }}
    >
      <motion.a
        href={siteConfig.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BeyondBorders on WhatsApp"
        className="flex items-center justify-center gap-2 bg-[#158740] text-white px-4 py-3 md:px-5 md:py-3 rounded-full shadow-[0_4px_20px_rgba(21,135,64,0.4)] hover:shadow-[0_8px_30px_rgba(21,135,64,0.6)] focus:ring-4 focus:ring-accent transition-shadow group"
        animate={continuousAnim}
        whileHover={shouldReduceMotion ? {} : { scale: 1.15, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={28} />
        <span className="hidden md:inline-block font-sans font-semibold text-[14px] text-white">Contact us</span>
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 glass px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:hidden delay-100">
          Chat with us
        </span>
      </motion.a>
    </motion.div>
  );
}
