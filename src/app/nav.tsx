"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./wordmark";
import { AccessButton } from "./access-modal";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      aria-hidden
      className={className}
    >
      <rect width="240" height="240" rx="12" fill="var(--mark-tile)" />
      <g transform="scale(2)">
        <path
          d="M 18 18 L 68 18 L 102 52 L 102 102 L 52 102 L 18 68 Z"
          fill="var(--mark-cutout)"
        />
      </g>
    </svg>
  );
}

export function Nav() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  // True when the nav strip is over the yellow closing section. Drives
  // a tone swap so the nav reads against the accent rather than putting
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
    // The nav reserves the top ~72px of the viewport. Observe the
    // closing section: when its top crosses below that line, we're
    // on the yellow surface.
    const closing = document.getElementById("access");
    if (!closing) return;
    const navH = 72;
    const observer = new IntersectionObserver(
      ([entry]) => setOnAccent(entry.isIntersecting),
      { rootMargin: `-${navH}px 0px -100% 0px`, threshold: 0 }
    );
    observer.observe(closing);
    return () => observer.disconnect();
  }, []);

  const surface = onAccent
    ? "border-b border-[color-mix(in_oklch,var(--accent)_70%,var(--on-accent))] bg-[color-mix(in_oklch,var(--accent)_92%,transparent)] backdrop-blur-md"
    : scrolled
      ? "border-b border-[var(--rule)] bg-[color-mix(in_oklch,var(--bg)_92%,transparent)] backdrop-blur-md"
      : "border-b border-transparent bg-transparent";

  return (
    <>
      {/* Sentinel — when this leaves the viewport, the nav becomes
          "scrolled" and gains its border + opaque background. */}
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-6 w-px" />

      <nav
        data-on-accent={onAccent || undefined}
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${surface}`}
        style={
          onAccent
            ? ({
                color: "var(--on-accent)",
                "--wordmark-fill": "var(--on-accent)",
                "--mark-tile": "var(--on-accent)",
                "--mark-cutout": "var(--accent)",
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className="mx-auto flex w-full max-w-[78rem] items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <a
            href="/"
            aria-label="Kithos"
            className="flex items-center gap-2 text-[var(--wordmark-fill)]"
          >
            <BrandMark className="h-[18px] w-[18px]" />
            <Wordmark className="h-[18px] w-auto" />
          </a>

          <div className="flex items-center gap-1.5 md:gap-3">
            <AccessButton />
          </div>
        </div>
      </nav>
    </>
  );
}
