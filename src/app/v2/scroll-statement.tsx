"use client";

import { useEffect, useRef } from "react";

/* Progressive-brighten scroll statement (Stripe/Anthropic pattern):
   the statement sits dim and pinned; each word catches full ink as
   the section scrolls through. Reduced-motion: fully lit, static, no
   pinning. The eyebrow stays a plain header above it (the section
   still reads eyebrow -> statement). /v2-only. */

export function ScrollStatement({
  eyebrow,
  text,
  accent,
}: {
  eyebrow: string;
  text: string;
  /* The resolving clause — reveals in signal yellow as the scroll's
     focal payoff (the brand's one assertive accent). */
  accent: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lead = text.split(/\s+/).filter(Boolean);
  const tail = accent.split(/\s+/).filter(Boolean);
  const words = [...lead, ...tail];
  const accentStart = lead.length;

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const spans = wordRefs.current;

    if (reduce) {
      spans.forEach((s) => s && (s.dataset.lit = "1"));
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let lastLit = -1;

    const measure = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      // 0 when the section pins, 1 when it releases; brighten a touch
      // early (÷0.82) so the last word lands before the unpin.
      const p =
        runway <= 0 ? 1 : Math.min(Math.max(-rect.top / runway, 0), 1);
      const lit = Math.round(
        Math.min(p / 0.82, 1) * spans.length,
      );
      if (lit === lastLit) return;
      const lo = Math.min(lit, lastLit < 0 ? 0 : lastLit);
      const hi = Math.max(lit, lastLit < 0 ? spans.length : lastLit);
      for (let i = lo; i <= hi && i < spans.length; i++) {
        const s = spans[i];
        if (s) s.dataset.lit = i < lit ? "1" : "";
      }
      lastLit = lit;
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
  }, [words.length]);

  return (
    <section
      ref={sectionRef}
      id="right-now"
      className="relative w-full scroll-mt-20 lg:min-h-[240svh]"
      style={{
        // Continue the hero's ending colour, easing into --surface.
        background:
          "linear-gradient(to bottom, var(--bg) 0, var(--surface) clamp(7rem,16svh,13rem))",
      }}
    >
      <style>{`
        .scroll-stmt{font-family:var(--font-display);font-weight:400;letter-spacing:-0.011em;font-size:clamp(1.85rem,3.6vw,3.25rem);line-height:1.16}
        .scroll-word{color:color-mix(in oklch, var(--ink) 12%, transparent);transition:color .24s cubic-bezier(.4,0,.2,1)}
        .scroll-word[data-lit="1"]{color:var(--ink)}
        .scroll-word[data-accent="1"][data-lit="1"]{color:var(--accent)}
        @media (prefers-reduced-motion:reduce){.scroll-word{transition:none}}
      `}</style>

      {/* Top-rail registration ticks — matches the site grid / other
          sections. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
      >
        <div className="relative mx-auto h-0 max-w-[78rem]">
          {["left-0", "left-full"].map((p) => (
            <span
              key={p}
              className={`absolute top-0 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 ${p}`}
            >
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--rule-strong)]" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--rule-strong)]" />
            </span>
          ))}
        </div>
      </div>

      {/* Pinned viewport — the statement holds centre while the tall
          section scrolls past, driving the brighten. */}
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center">
        <div className="mx-auto w-full max-w-[78rem] px-6 py-24 text-center md:px-10 md:py-32">
          <span className="label">{eyebrow}</span>
          <p className="scroll-stmt mx-auto mt-10 max-w-[20ch] md:max-w-[26ch]">
            {words.map((w, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                data-accent={i >= accentStart ? "1" : undefined}
                className="scroll-word"
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
