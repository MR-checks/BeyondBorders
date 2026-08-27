"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useScroll, AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavItem = { href: string; label: string; section?: string; feature?: boolean };

const items: NavItem[] = [
  { href: "/#services", label: "Services", section: "services" },
  { href: "/#destinations", label: "Destinations", section: "destinations" },
  { href: "/turkey", label: "Turkey Tours", feature: true },
  { href: "/#process", label: "How it works", section: "process" },
  { href: "/#testimonials", label: "Stories", section: "testimonials" },
  { href: "/#faq", label: "FAQ", section: "faq" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const onHome = pathname === "/";

  useEffect(() => scrollY.on("change", (v) => setIsScrolled(v > 40)), [scrollY]);

  // Close the menu when the route changes, otherwise it hangs open over the new
  // page. Adjusting during render rather than in an effect avoids a second pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsOpen(false);
  }

  // Hold the page still while the menu covers it.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Highlight whichever homepage section is in view. Only meaningful on "/".
  useEffect(() => {
    if (!onHome) return;
    const ids = items.map((i) => i.section).filter(Boolean) as string[];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Band across the middle of the viewport, so the active item tracks
      // what you are actually reading rather than what just touched the edge.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [onHome]);

  const isActive = (item: NavItem) => {
    if (item.href === "/turkey") return pathname.startsWith("/turkey");
    return onHome && item.section != null && item.section === active;
  };

  return (
    /* Plain header on purpose. It used to enter on a Framer Motion spring from
       y:-100, which meant the server shipped the whole navigation translated
       off-screen and it only came back once JS ran. */
    <header
      className={`fixed top-0 w-full z-[940] transition-all duration-300 ${
        isScrolled
          ? "bg-bg/80 backdrop-blur-md shadow-[0_4px_24px_rgb(var(--ink)/0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => {
            if (onHome) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-serif text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Beyond<span className="text-logo-gold">Borders</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex gap-6 items-center text-sm font-medium">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className={[
                  "nav-link transition-colors",
                  item.feature ? "text-accent-strong dark:text-accent font-semibold" : "",
                  isActive(item) ? "text-accent" : "hover:text-accent",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-20 bg-black/40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden absolute top-20 left-0 w-full overflow-hidden bg-[#F5EDDA]/95 dark:bg-[#2E1408]/95 backdrop-blur-md shadow-lg border-t border-glass-border/10"
            >
              <nav className="flex flex-col py-6 px-6 gap-5 font-medium text-lg">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      "nav-link self-start",
                      item.feature ? "text-accent-strong dark:text-accent font-semibold" : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
