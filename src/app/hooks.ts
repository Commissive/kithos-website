"use client";

import { useSyncExternalStore } from "react";

/* Reads `prefers-reduced-motion: reduce` reactively. Uses
   useSyncExternalStore so the value is correctly tracked across
   renders (and across the OS-preference change event), with a stable
   SSR fallback of `false`. This is the React-19-idiomatic
   alternative to a `useEffect` that calls `setState(matches)` — it
   doesn't trigger the `react-hooks/set-state-in-effect` lint and
   doesn't cause a post-mount re-render for the false case. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
