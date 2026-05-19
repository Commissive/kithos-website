"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { AccessButton } from "./access-modal";

export function Nav() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  // The computed background of the section currently under the nav
  // band — the nav tints its translucent surface toward this so it
  // "adopts" each section's colour as you scroll. null = use --bg.
  const [sectionBg, setSectionBg] = useState<string | null>(null);
  // True when that section is the accent (yellow) surface. Drives a
  // tone swap so the nav reads against the accent rather than putting
  // a translucent warm-white tile on top of saturated yellow.
  const [onAccent, setOnAccent] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Track the section directly under the nav band and read its
    // computed background. Generic: any <section> (or an element
    // tagged [data-nav-surface]) on any page works, no per-section
    // wiring. data-on-accent marks the yellow surface for the tone
    // swap. rAF-throttled scroll/resize — no layout thrash.
    let raf = 0;
    const transparent = /^rgba?\(0,\s*0,\s*0,\s*0\)$|^transparent$/;

    const measure = () => {
      raf = 0;
      const navEl = navRef.current;
      if (!navEl) return;
      const band = navEl.getBoundingClientRect().height + 2;
      const candidates = document.querySelectorAll<HTMLElement>(
        "section, [data-nav-surface]"
      );
      let current: HTMLElement | null = null;
      for (const el of candidates) {
        const r = el.getBoundingClientRect();
        // The deepest section whose box straddles the nav band.
        if (r.top <= band && r.bottom > band) {
          if (!current || r.top >= current.getBoundingClientRect().top) {
            current = el;
          }
        }
      }
      if (!current) return;
      const bg = getComputedStyle(current).backgroundColor;
      setSectionBg(bg && !transparent.test(bg) ? bg : null);
      setOnAccent(!!current.closest("[data-on-accent]"));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const surface = onAccent
    ? "border-b border-[color-mix(in_oklch,var(--accent)_70%,var(--on-accent))] bg-[color-mix(in_oklch,var(--accent)_92%,transparent)] backdrop-blur-md"
    : scrolled
      ? "border-b border-[var(--rule)] backdrop-blur-md"
      : "border-b border-transparent bg-transparent";

  const accentStyle = {
    color: "var(--on-accent)",
    "--wordmark-fill": "var(--on-accent)",
    "--mark-tile": "var(--on-accent)",
    "--mark-cutout": "var(--accent)",
  } as React.CSSProperties;

  const navStyle: React.CSSProperties | undefined = onAccent
    ? accentStyle
    : scrolled
      ? {
          backgroundColor: `color-mix(in oklch, ${
            sectionBg ?? "var(--bg)"
          } 68%, transparent)`,
        }
      : undefined;

  return (
    <>
      {/* Sentinel — when this leaves the viewport, the nav becomes
          "scrolled" and gains its border + opaque background. */}
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-6 w-px" />

      <nav
        ref={navRef}
        data-on-accent={onAccent || undefined}
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${surface}`}
        style={navStyle}
      >
        <div className="mx-auto flex w-full max-w-[78rem] items-center justify-between px-6 py-3 md:px-10 md:py-3.5">
          <a
            href="/"
            aria-label="Kithos"
            className="flex items-center gap-2 text-[var(--ink)]"
          >
            {/* Brand-kit horizontal lockup: mark visible height ≈
                wordmark ascender height. Mark's viewBox content sits
                ~17.32 in from the 120 edges, so the box is sized
                larger than the wordmark to land the same optical
                height; gap = ~1u. */}
            <BrandMark className="h-7 w-7" />
            <Wordmark className="h-5 w-auto" />
          </a>

          <div className="flex items-center gap-1.5 md:gap-3">
            <AccessButton />
          </div>
        </div>
      </nav>
    </>
  );
}
