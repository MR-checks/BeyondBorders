"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHasMounted } from "@/lib/useHasMounted";
import { Moon, Sun } from "lucide-react";

/**
 * Keeps the iOS status bar tinted to match the top of the page.
 *
 * app/layout.tsx emits two media-scoped theme-color tags for the system
 * preference. A browser uses the FIRST theme-color whose media matches, so a
 * manual override has to be an unscoped tag placed ahead of those rather than
 * an edit to one of them: editing the light-media tag would leave it applying a
 * dark colour on a light system.
 *
 * The colour is read from --bg-center, the top stop of the page background, so
 * it cannot drift if the palette changes.
 */
function syncStatusBarColor() {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg-center")
    .trim();
  if (!color) return;

  let meta = document.querySelector<HTMLMetaElement>("meta[data-theme-color-override]");
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.setAttribute("data-theme-color-override", "");
    // First in head, so it wins over the media-scoped tags Next renders.
    document.head.prepend(meta);
  }
  meta.content = color;
}

export default function ThemeToggle() {
  const mounted = useHasMounted();
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (!mounted) return;
    // next-themes writes the class in its own effect; wait a frame so the
    // custom property we read reflects the theme that just landed.
    const id = requestAnimationFrame(syncStatusBarColor);
    return () => cancelAnimationFrame(id);
  }, [resolvedTheme, mounted]);

  if (!mounted) return <div className="h-8 w-8" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass rounded-full p-2 transition-all hover:-translate-y-1 hover:text-accent hover:shadow-[0_4px_12px_rgb(var(--accent)/0.3)] motion-reduce:hover:translate-y-0"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={
        theme === "system"
          ? `Following your system (${isDark ? "dark" : "light"})`
          : undefined
      }
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
