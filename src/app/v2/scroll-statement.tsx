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
  /* The resolving clause — emphasised as heavier weight (not colour;
     yellow/terracotta text on the light surface fails contrast) as the
     scroll's focal payoff. */
  accent: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Each "\n" in `text` forces a hard line break between segments.
  const leadLines = text
    .split("\n")
    .map((l) => l.split(/\s+/).filter(Boolean))
    .filter((l) => l.length);
  const lead = leadLines.flat();
  const tail = accent.split(/\s+/).filter(Boolean);
  const words = [...lead, ...tail];
  const accentStart = lead.length;
  // Indexes of the last word on each non-final lead line → <br/> after.
  const breakAfter = new Set<number>();
  let cursor = 0;
  leadLines.forEach((l, li) => {
    cursor += l.length;
    if (li < leadLines.length - 1) breakAfter.add(cursor - 1);
  });

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const spans = wordRefs.current;

    // Reduced motion: leave every word at the default (lit/ink) — no
    // dimming, no scroll listeners.
    if (reduce) return;

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
        // Dim only the words not yet reached; default stays ink.
        if (s) s.dataset.dim = i < lit ? "" : "1";
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
      aria-label={eyebrow}
      className="relative w-full scroll-mt-20 lg:min-h-[240svh]"
      style={{
        // Continue the hero's ending colour, easing into --surface.
        background:
          "linear-gradient(to bottom, var(--bg) 0, var(--surface) clamp(7rem,16svh,13rem))",
      }}
    >
      <style>{`
        .scroll-stmt{font-family:var(--font-display);font-weight:400;letter-spacing:-0.011em;font-size:clamp(1.55rem,2.9vw,2.6rem);line-height:1.2;text-wrap:balance}
        /* Default is fully readable (ink). JS dims the not-yet-reached
           words; with no JS / before scroll the statement stays legible. */
        .scroll-word{color:var(--ink);transition:color .24s cubic-bezier(.4,0,.2,1)}
        .scroll-word[data-dim="1"]{color:color-mix(in oklch, var(--ink) 12%, transparent)}
        /* Accent emphasis = weight, not colour (accent text on the
           bone surface fails contrast). */
        .scroll-word[data-accent="1"]{font-weight:600}
        @media (prefers-reduced-motion:reduce){.scroll-word{transition:none}}
      `}</style>

      {/* Top-rail registration ticks — matches the site grid / other
          sections. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
      >
        <div className="relative mx-auto h-0 max-w-[86rem]">
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
        <div className="mx-auto w-full max-w-[86rem] px-6 py-24 text-center md:px-10 md:py-32">
          {/* Hairline frame around the text content — a single 1px
              rule wrapping eyebrow + statement, intrinsic-width via
              inline-block so it hugs the content. */}
          <div className="mx-auto inline-block border border-[var(--rule)] px-8 py-10 md:px-14 md:py-14">
            <span className="label">{eyebrow}</span>
            <p className="scroll-stmt mx-auto mt-8 max-w-[22ch] md:max-w-[34ch]">
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
                  {breakAfter.has(i) ? (
                    <br />
                  ) : i < words.length - 1 ? (
                    " "
                  ) : (
                    ""
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
