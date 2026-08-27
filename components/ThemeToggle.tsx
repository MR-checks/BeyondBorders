"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHasMounted } from "@/lib/useHasMounted";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const mounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!mounted) return;
    const color = theme === 'dark' ? '#180A02' : '#F5EDDA';
    let meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', color);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', color);
      document.head.appendChild(meta);
    }
  }, [theme, mounted]);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full glass hover:text-accent transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgb(var(--accent)/0.3)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
