"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealRange = {
  /** Viewport fraction where reveal begins (section top at or below this Y). */
  start?: number;
  /** Viewport fraction where reveal completes. */
  end?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

export function useScrollRevealProgress<T extends HTMLElement = HTMLElement>({
  start = 0.9,
  end = 0.28,
}: ScrollRevealRange = {}) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const startY = viewport * start;
      const endY = viewport * end;
      const raw = (startY - rect.top) / (startY - endY);
      setProgress(clamp(raw, 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [start, end]);

  return { ref, progress };
}

/** Map scroll progress to a single word's 0–1 reveal (scroll-scrubbed, not time-based). */
export function wordRevealAmount(
  wordIndex: number,
  totalWords: number,
  scrollProgress: number,
  options?: { groupWordCount?: number; groupShare?: number },
) {
  const groupWords = options?.groupWordCount ?? totalWords;
  const groupShare = options?.groupShare ?? 0.62;
  const inGroup = wordIndex < groupWords;

  let local = 0;
  if (inGroup) {
    const scaled = clamp(scrollProgress / groupShare, 0, 1);
    const span = groupWords + 0.75;
    local = scaled * span - wordIndex;
  } else {
    const lineIndex = wordIndex - groupWords;
    const lineTotal = totalWords - groupWords;
    const scaled = clamp((scrollProgress - groupShare) / (1 - groupShare), 0, 1);
    const span = lineTotal + 0.75;
    local = scaled * span - lineIndex;
  }

  return easeOutCubic(clamp(local, 0, 1));
}

/** Scroll lights up existing copy — ghost color → lit color (no fade-in). */
export function wordLitColor(
  reveal: number,
  lit: string,
  ghost = "var(--bridge-word-ghost)",
) {
  const mix = Math.round(clamp(reveal, 0, 1) * 100);
  return `color-mix(in oklch, ${lit} ${mix}%, ${ghost})`;
}
