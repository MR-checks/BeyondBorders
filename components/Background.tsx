"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function Background() {
  const shouldReduceMotion = useReducedMotion();

  // Drift animations for orbs
  const drift1 = shouldReduceMotion
    ? { x: "-20vw", y: "-20vh" }
    : {
        x: ["-20vw", "10vw", "-10vw", "-20vw"],
        y: ["-20vh", "5vh", "20vh", "-20vh"],
        transition: { duration: 25, repeat: Infinity, ease: "linear" as const },
      };

  const drift2 = shouldReduceMotion
    ? { x: "30vw", y: "10vh" }
    : {
        x: ["30vw", "-10vw", "20vw", "30vw"],
        y: ["10vh", "-15vh", "20vh", "10vh"],
        transition: { duration: 30, repeat: Infinity, ease: "linear" as const },
      };

  const drift3 = shouldReduceMotion
    ? { x: "0vw", y: "30vh" }
    : {
        x: ["0vw", "20vw", "-20vw", "0vw"],
        y: ["30vh", "-10vh", "10vh", "30vh"],
        transition: { duration: 28, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgb(var(--ink)) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[100vw] max-h-[100vh]">
        <motion.div
          animate={drift1}
          className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-15 dark:opacity-20 filter blur-[100px]"
          style={{ backgroundColor: 'rgb(var(--accent))' }}
        />
        <motion.div
          animate={drift2}
          className="absolute top-[40%] left-[60%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-15 dark:opacity-20 filter blur-[100px]"
          style={{ backgroundColor: 'rgb(var(--cta))' }}
        />
        <motion.div
          animate={drift3}
          className="absolute top-[60%] left-[30%] w-[55vw] h-[55vw] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-15 filter blur-[120px]"
          style={{ backgroundColor: 'rgb(var(--accent-strong))' }}
        />
      </div>
    </div>
  );
}
