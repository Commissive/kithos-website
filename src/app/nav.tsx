"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { AccessButton } from "./access-modal";

export function Nav() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [overClosing, setOverClosing] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;

    const refreshCandidates = () => {
      return Array.from(
        document.querySelectorAll<HTMLElement>("section, [data-nav-surface]"),
      );
    };

    let candidates = refreshCandidates();
    const mo = new MutationObserver(() => {
      candidates = refreshCandidates();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const measure = () => {
      raf = 0;
      const navEl = navRef.current;
      if (!navEl) return;
      const band = navEl.getBoundingClientRect().height + 2;
      let current: HTMLElement | null = null;
      let currentTop = -Infinity;
      for (const el of candidates) {
        const r = el.getBoundingClientRect();
        if (r.top <= band && r.bottom > band && r.top >= currentTop) {
          current = el;
          currentTop = r.top;
        }
      }
      setOverClosing(!!current?.closest("[data-on-accent]"));
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

  const surface = overClosing
    ? "bg-[var(--forest)]"
    : scrolled
      ? "backdrop-blur-md"
      : "bg-transparent";

  const forestStyle = {
    color: "var(--bone)",
    "--wordmark-fill": "var(--bone)",
    "--mark-tile": "var(--bone)",
    "--mark-cutout": "var(--forest)",
  } as React.CSSProperties;

  const navStyle: React.CSSProperties | undefined = overClosing
    ? forestStyle
    : scrolled
      ? {
          backgroundColor:
            "color-mix(in oklch, var(--bg) 68%, transparent)",
        }
      : undefined;

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-6 w-px" />

      <nav
        ref={navRef}
        aria-label="Primary"
        data-on-accent={overClosing || undefined}
        className={`sticky top-0 z-[var(--z-nav)] w-full transition-[background-color,backdrop-filter,color] duration-200 ease-out ${surface}`}
        style={navStyle}
      >
        <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between px-6 py-3 md:px-10 md:py-3.5">
          <Link
            href="/"
            aria-label="Kithos"
            className={`flex items-center gap-2 ${
              overClosing ? "text-[var(--bone)]" : "text-[var(--ink)]"
            }`}
          >
            <BrandMark className="h-7 w-7" />
            <Wordmark className="h-5 w-auto" />
          </Link>

          <div className="flex items-center gap-1.5 md:gap-3">
            <AccessButton tone={overClosing ? "on-forest" : "forest"} />
          </div>
        </div>
      </nav>
    </>
  );
}
