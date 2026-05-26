"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { AccessButton } from "./access-modal";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [overClosing, setOverClosing] = useState(false);
  const inverse = !scrolled || overClosing;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const root = document.documentElement;

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

    const syncNavHeight = () => {
      const navEl = navRef.current;
      if (!navEl) return;
      root.style.setProperty("--nav-h", `${Math.ceil(navEl.getBoundingClientRect().height)}px`);
    };

    const measure = () => {
      raf = 0;
      const navEl = navRef.current;
      if (!navEl) return;
      syncNavHeight();
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

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncNavHeight();
            onScroll();
          })
        : null;
    if (navRef.current && resizeObserver) resizeObserver.observe(navRef.current);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      resizeObserver?.disconnect();
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        data-on-accent={overClosing || undefined}
        className={`sticky top-0 z-[var(--z-nav)] w-full transition-[padding,transform] duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] motion-reduce:transition-none ${
          inverse ? "py-3 md:py-4" : "py-2.5 md:py-3"
        }`}
      >
        <div className="page-shell">
          <div className="page-column">
            <div className="page-grid">
              <div
                data-nav-frame
                className={`flex w-full items-center justify-between rounded-[1rem] transition-[background-color,border-color,backdrop-filter,box-shadow,transform,padding] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:col-start-2 lg:col-span-10 ${
                  inverse
                    ? "translate-y-0 scale-100 border-transparent bg-transparent px-2 py-1 shadow-none md:px-3 md:py-1"
                    : "-translate-y-px scale-[0.992] border border-[var(--rule)] bg-[var(--bone)] px-2.5 py-1.5 shadow-[var(--shadow-elev-2)] md:px-3.5 md:py-2"
                }`}
              >
                <Link
                  href="/"
                  aria-label="Kithos"
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-[color,opacity,background-color,border-color,box-shadow] duration-[180ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] hover:opacity-85 ${
                    inverse
                      ? "border border-white/18 bg-black/20 text-[var(--on-forest)] shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                      : "border border-transparent text-[var(--ink)]"
                  }`}
                >
                  <BrandMark className="h-7 w-7" />
                  <Wordmark className="h-5 w-auto" />
                </Link>

                <div className="flex items-center gap-1.5 md:gap-3">
                  <AccessButton
                    tone={inverse ? "on-forest" : "forest"}
                    className="min-h-10 rounded-lg px-3 py-2 text-[0.8125rem] shadow-[0_10px_30px_rgba(17,24,39,0.25)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
