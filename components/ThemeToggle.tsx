"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHasMounted } from "@/lib/useHasMounted";
import { Moon, Sun } from "lucide-react";

/**
 * Keeps the iOS status bar tinted to match the top of the page.
 *
 * Safari reads theme-color once and latches onto it. Editing the `content`
 * attribute of a tag it has already seen does not make it look again, which is
 * why switching theme only took effect in a freshly opened tab. Replacing the
 * element does force a re-read, so this removes every theme-color tag and
 * inserts one new one on each change rather than mutating in place.
 *
 * Clearing them all also removes the ambiguity of the two media-scoped tags
 * app/layout.tsx renders for the system preference: those give the correct
 * colour before JS runs, and from the first sync onwards a single unscoped tag
 * carries the theme the user actually has.
 *
 * The colour comes from --bg-center, the top stop of the page background, so it
 * cannot drift if the palette changes.
 */
function syncStatusBarColor() {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg-center")
    .trim();
  if (!color) return;

  const existing = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  // Nothing to do if a single tag already carries this exact colour: pointless
  // DOM churn on every render, and Safari can flicker when the tag is replaced.
  if (existing.length === 1 && existing[0].content === color) return;

  existing.forEach((m) => m.remove());
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = color;
  document.head.appendChild(meta);
}

export default function ThemeToggle() {
  const mounted = useHasMounted();
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (!mounted) return;
    // Once now, and once after a frame. next-themes writes the class in its own
    // effect and the ordering is not guaranteed, so the second pass catches the
    // value that actually landed. The first pass matters because a backgrounded
    // tab never runs the frame callback at all.
    syncStatusBarColor();
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
