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
        className="flex items-center justify-center bg-[#158740] text-white w-14 h-14 p-0 md:w-max md:h-auto md:px-5 md:py-3 md:gap-2 rounded-full shadow-[0_4px_20px_rgba(21,135,64,0.4)] hover:shadow-[0_8px_30px_rgba(21,135,64,0.6)] focus:ring-4 focus:ring-accent transition-shadow group"
        animate={continuousAnim}
        whileHover={shouldReduceMotion ? {} : { scale: 1.15, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="28"
          height="28"
          aria-hidden="true"
          style={{ display: 'block', flexShrink: 0 }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline-block font-sans font-semibold text-[14px] text-white">Contact us</span>
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 glass px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block delay-100">
          Chat with us
        </span>
      </motion.a>
    </motion.div>
  );
}
