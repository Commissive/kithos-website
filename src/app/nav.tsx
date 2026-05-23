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

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-6 w-px" />

      <nav
        ref={navRef}
        aria-label="Primary"
        data-on-accent={overClosing || undefined}
        className={`sticky top-0 z-[var(--z-nav)] w-full border-b bg-[var(--bone)] transition-[border-color] duration-200 ease-out ${
          scrolled ? "border-[var(--rule)]" : "border-transparent"
        }`}
      >
        <div className="page-shell flex w-full items-center justify-between py-3 md:py-3.5">
          <Link
            href="/"
            aria-label="Kithos"
            className="flex items-center gap-2 text-[var(--ink)]"
          >
            <BrandMark className="h-7 w-7" />
            <Wordmark className="h-5 w-auto" />
          </Link>

          <div className="flex items-center gap-1.5 md:gap-3">
            <AccessButton tone="forest" />
          </div>
        </div>
      </nav>
    </>
  );
}
