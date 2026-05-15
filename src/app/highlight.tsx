"use client";

import { useEffect, useRef } from "react";

/**
 * The recurring yellow highlight motif. Renders as an inline background
 * gradient on the text span, which means it wraps naturally across
 * multiple lines (each line gets its own highlight bar via
 * `box-decoration-break: clone`). At narrow viewports the headline
 * can break without overflowing.
 *
 * The bar animates in via `background-size` going from 0% to 100% when
 * the element enters the viewport. Respects prefers-reduced-motion.
 */
export function Highlight({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const setActive = () => {
      el.style.setProperty("--highlight-size", "100% 100%");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive();
      return;
    }

    let timeoutId: number | undefined;
    const fire = () => {
      timeoutId = window.setTimeout(setActive, delay);
    };

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) {
      fire();
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fire();
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <span
      ref={ref}
      className="highlight-text"
      style={
        {
          // CSS custom prop drives the highlight scale; flipped by JS
          // when the element enters view.
          "--highlight-size": "0% 100%",
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
