"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { AccessButton } from "./access-modal";
import "./nav.css";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [overAccent, setOverAccent] = useState(false);

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
      root.style.setProperty(
        "--nav-h",
        `${Math.ceil(navEl.getBoundingClientRect().height)}px`,
      );
    };

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
      setOverAccent(!!current?.closest("[data-on-accent]"));
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
        data-on-accent={overAccent || undefined}
        className="nav-site"
      >
        <div ref={innerRef} className="nav-site__inner">
          <Link href="/" aria-label="Kithos" className="nav-site__brand">
            <BrandMark className="h-7 w-7 shrink-0" aria-hidden />
            <Wordmark className="h-5 w-auto" />
          </Link>

          <AccessButton
            tone={overAccent ? "on-accent" : "accent"}
            className="nav-site__cta"
          />
        </div>
      </nav>
      <div className="nav-site__spacer" aria-hidden />
    </>
  );
}
