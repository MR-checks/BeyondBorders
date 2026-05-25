"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion, useScroll } from "framer-motion";

export default function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <Link href="/#services" className="hover:text-accent transition-colors">Services</Link>
          <Link href="/#destinations" className="hover:text-accent transition-colors">Destinations</Link>
          <Link href="/#process" className="hover:text-accent transition-colors">How It Works</Link>
          <Link href="/#testimonials" className="hover:text-accent transition-colors">Success Stories</Link>
          <Link href="/#faq" className="hover:text-accent transition-colors">FAQ</Link>
          <Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
}
