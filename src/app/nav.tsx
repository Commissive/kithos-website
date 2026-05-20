"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { AccessButton } from "./access-modal";

export function Nav() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  // Cached list of sections the bg tracker reads from. Rebuilt only
  // when the DOM changes (route nav, modal open, etc.) — the previous
  // implementation re-queried + measured every rAF tick.
  const candidatesRef = useRef<HTMLElement[]>([]);
  const [scrolled, setScrolled] = useState(false);
  // The computed background of the section currently under the nav
  // band — the nav tints its translucent surface toward this so it
  // "adopts" each section's colour as you scroll. null = use --bg.
  const [sectionBg, setSectionBg] = useState<string | null>(null);
  // True when that section is the accent (terracotta) surface. Drives
  // a tone swap so the nav reads against the accent rather than putting
  // a translucent bone tile on top of saturated terracotta.
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
    // wiring. data-on-accent marks the terracotta surface for the
    // tone swap. rAF-throttled scroll/resize — no layout thrash.
    let raf = 0;
    const transparent = /^rgba?\(0,\s*0,\s*0,\s*0\)$|^transparent$/;

    const refreshCandidates = () => {
      candidatesRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("section, [data-nav-surface]"),
      );
    };
    refreshCandidates();

    // Rebuild the list only when the DOM structure of <main> changes
    // — covers SPA navigations and dynamic section mounts. Cheap: the
    // observer is on a single subtree and only fires on childList.
    const mo = new MutationObserver(refreshCandidates);
    mo.observe(document.body, { childList: true, subtree: true });

    const measure = () => {
      raf = 0;
      const navEl = navRef.current;
      if (!navEl) return;
      const band = navEl.getBoundingClientRect().height + 2;
      let current: HTMLElement | null = null;
      let currentTop = -Infinity;
      for (const el of candidatesRef.current) {
        const r = el.getBoundingClientRect();
        // The deepest section whose box straddles the nav band.
        if (r.top <= band && r.bottom > band && r.top >= currentTop) {
          current = el;
          currentTop = r.top;
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
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Border-lines removed per design directive. The scrolled / on-
     accent states differentiate via tinted bg + backdrop-blur alone. */
  const surface = onAccent
    ? "bg-[color-mix(in_oklch,var(--accent)_92%,transparent)] backdrop-blur-md"
    : scrolled
      ? "backdrop-blur-md"
      : "bg-transparent";

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
        aria-label="Primary"
        data-on-accent={onAccent || undefined}
        className={`sticky top-0 z-[var(--z-nav)] w-full transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${surface}`}
        style={navStyle}
      >
        <div className="mx-auto flex w-full max-w-[86rem] items-center justify-between px-6 py-3 md:px-10 md:py-3.5">
          <Link
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
          </Link>

          <div className="flex items-center gap-1.5 md:gap-3">
            <AccessButton />
          </div>
        </div>
      </nav>
    </>
  );
}
