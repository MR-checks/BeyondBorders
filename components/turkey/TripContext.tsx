"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { TravelStyleId } from "@/content/turkey/types";
import { useHasMounted } from "@/lib/useHasMounted";

const STORAGE_KEY = "bb.trip.v1";

type Saved = { selected: string[]; style: TravelStyleId | null };

/**
 * Runs on the server (returning the empty trip) and again on the client during
 * hydration. Consumers gate on `ready`, so the restored trip never paints until
 * after the hydrating render, and server and client HTML stay identical.
 */
function readSaved(): Saved {
  if (typeof window === "undefined") return { selected: [], style: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { selected: [], style: null };
    const parsed = JSON.parse(raw);
    return {
      selected: Array.isArray(parsed?.selected)
        ? parsed.selected.filter((v: unknown) => typeof v === "string")
        : [],
      style: parsed?.style ?? null,
    };
  } catch {
    // Corrupt or blocked storage is not worth breaking the page over.
    return { selected: [], style: null };
  }
}

type TripState = {
  selected: string[];
  style: TravelStyleId | null;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setStyle: (id: TravelStyleId | null) => void;
  isSelected: (id: string) => boolean;
  /** True once it is safe to render the restored trip. */
  ready: boolean;
};

const TripCtx = createContext<TripState | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const ready = useHasMounted();
  const [{ selected, style }, setSaved] = useState<Saved>(readSaved);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, style }));
    } catch {
      // Private browsing can refuse writes. The trip still works in memory.
    }
  }, [selected, style, ready]);

  const toggle = useCallback((id: string) => {
    setSaved((s) => ({
      ...s,
      selected: s.selected.includes(id)
        ? s.selected.filter((p) => p !== id)
        : [...s.selected, id],
    }));
  }, []);

  const remove = useCallback((id: string) => {
    setSaved((s) => ({ ...s, selected: s.selected.filter((p) => p !== id) }));
  }, []);

  const clear = useCallback(() => setSaved({ selected: [], style: null }), []);

  const setStyle = useCallback(
    (id: TravelStyleId | null) => setSaved((s) => ({ ...s, style: id })),
    []
  );

  // Everything the UI reads is gated on `ready` here rather than in each
  // consumer. The restored trip exists in state during the hydrating render,
  // and any component that painted it then would not match the server HTML.
  // Memoised so the empty pre-ready array keeps a stable identity.
  const visibleSelected = useMemo(() => (ready ? selected : []), [ready, selected]);
  const visibleStyle = ready ? style : null;

  const isSelected = useCallback(
    (id: string) => ready && selected.includes(id),
    [selected, ready]
  );

  const value = useMemo(
    () => ({
      selected: visibleSelected,
      style: visibleStyle,
      toggle,
      remove,
      clear,
      setStyle,
      isSelected,
      ready,
    }),
    [visibleSelected, visibleStyle, toggle, remove, clear, setStyle, isSelected, ready]
  );

  return <TripCtx.Provider value={value}>{children}</TripCtx.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripCtx);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}
