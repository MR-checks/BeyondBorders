"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 40);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-bg/75 backdrop-blur-md shadow-[0_4px_24px_rgb(var(--ink)/0.06)]" : "bg-transparent"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
          Beyond<span className="text-accent">Borders</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link href="/#services" className="hover:text-accent transition-colors">Services</Link>
            <Link href="/#destinations" className="hover:text-accent transition-colors">Destinations</Link>
            <Link href="/#process" className="hover:text-accent transition-colors">How It Works</Link>
            <Link href="/#testimonials" className="hover:text-accent transition-colors">Success Stories</Link>
            <Link href="/#faq" className="hover:text-accent transition-colors">FAQ</Link>
            <Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link>
          </nav>
          <ThemeToggle />
          <button className="md:hidden p-2 -mr-2 text-ink dark:text-surface" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 w-full overflow-hidden bg-[#F5EDDA]/[0.97] dark:bg-[#2E1408]/[0.97] shadow-lg border-t border-glass-border/10 z-50"
          >
            <div className="flex flex-col py-6 px-6 gap-6 font-medium text-lg">
              <Link href="/#services" onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/#destinations" onClick={() => setIsOpen(false)}>Destinations</Link>
              <Link href="/#process" onClick={() => setIsOpen(false)}>How It Works</Link>
              <Link href="/#testimonials" onClick={() => setIsOpen(false)}>Success Stories</Link>
              <Link href="/#faq" onClick={() => setIsOpen(false)}>FAQ</Link>
              <Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
