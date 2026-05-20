"use client";

/* RIGHT NOW — fragments variant.

   The section's job is the page's tension point: make the reader feel
   their own scattered commercial context before Kithos is offered. So
   the visual IS the fragmentation — real artefacts of split context
   (an unfinished CRM field, a call note that trails off, an unanswered
   Slack thread, a versioned-final deck, the bit that only lives in
   someone's head), arranged deliberately off-grid so the eye can't
   settle. The headline makes the claim; the fragments prove it.

   One accent only: a live caret blinking on the unfinished CRM field —
   the work that was never finished, still waiting. */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";
import { Highlight } from "./highlight";

type Fragment = {
  tag: string;
  /* Desktop scatter position + tilt. Intentionally irregular — no two
     share an edge, rotations are small but never zero. */
  pos: { top: string; left: string; rotate: number; z: number };
  render: () => React.ReactNode;
};

const fragments: Fragment[] = [
  {
    tag: "CRM",
    pos: { top: "0%", left: "6%", rotate: -2.4, z: 3 },
    render: () => (
      <>
        <span className="text-[var(--muted)]">Stage</span>
        <span className="mx-2 text-[var(--rule-strong)]">·</span>
        <span className="text-[var(--ink-soft)]">Discovery?</span>
        <span className="caret" aria-hidden />
      </>
    ),
  },
  {
    tag: "Call · 14 Apr",
    pos: { top: "20%", left: "44%", rotate: 1.8, z: 5 },
    render: () => (
      <span className="text-[var(--ink-soft)]">
        “…said budget isn’t the real blocker, it’s that
        <span className="text-[var(--muted)]"> ———</span>”
      </span>
    ),
  },
  {
    tag: "#deals",
    pos: { top: "46%", left: "0%", rotate: 1.2, z: 4 },
    render: () => (
      <>
        <span className="text-[var(--ink-soft)]">who owns Acme now?</span>
        <span className="mt-2 block text-[var(--muted)]">
          3 days ago · no replies
        </span>
      </>
    ),
  },
  {
    tag: "Drive",
    pos: { top: "62%", left: "48%", rotate: -1.6, z: 2 },
    render: () => (
      <span className="text-[var(--ink-soft)]">
        Q3_pricing_v3_final_FINAL.key
      </span>
    ),
  },
  {
    tag: "Memory",
    pos: { top: "82%", left: "12%", rotate: 2.6, z: 1 },
    render: () => (
      <span className="text-[var(--muted)]">
        why we really lost Brightwave — in someone’s head
      </span>
    ),
  },
];

export function RightNowFragments() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [intersected, setIntersected] = useState(false);
  const visible = reducedMotion || intersected;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      id="now"
      className="w-full overflow-hidden bg-[var(--surface)] py-28 md:py-40 lg:py-48"
    >
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <div className="flex items-baseline gap-6 border-t border-[var(--rule-strong)] pt-6">
          <span className="label">Right now</span>
          <div
            aria-hidden
            className="h-px flex-1 self-center bg-[var(--rule)]"
          />
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-8 md:mt-20">
          {/* Claim — left, holds its column. */}
          <div className="col-span-12 lg:col-span-5">
            <h2 className="display-2 max-w-[15ch]">
              Revenue decisions, made from{" "}
              <Highlight>fragments</Highlight>.
            </h2>
            <p className="body mt-8 max-w-[40ch] text-[var(--ink-soft)]">
              The context that should drive the next move is scattered —
              and nothing pulls it together. Deals slip, lessons don’t
              compound, the team doesn’t scale.
            </p>
          </div>

          {/* Proof — the scattered context itself. Desktop: an absolute
              scatter that bleeds left under the headline column. Mobile:
              a staggered stack with alternating offsets so it still
              reads unsettled without overlap. */}
          <div
            ref={ref}
            data-frag-visible={visible || undefined}
            className="col-span-12 mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0"
          >
            {/* Mobile / tablet — stacked, offset, no overlap */}
            <div className="flex flex-col gap-5 lg:hidden">
              {fragments.map((f, i) => (
                <figure
                  key={f.tag}
                  className="frag-card frag-in"
                  style={{
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: "30rem",
                    ["--frag-delay" as string]: `${i * 90}ms`,
                    ["--frag-rot" as string]: `${f.pos.rotate * 0.5}deg`,
                  }}
                >
                  <figcaption className="frag-tag">{f.tag}</figcaption>
                  <div className="frag-body">{f.render()}</div>
                </figure>
              ))}
            </div>

            {/* Desktop — deliberate off-grid scatter */}
            <div className="relative hidden h-[30rem] lg:block">
              {fragments.map((f, i) => (
                <figure
                  key={f.tag}
                  className="frag-card frag-in absolute w-[clamp(15rem,22vw,19rem)]"
                  style={{
                    top: f.pos.top,
                    left: f.pos.left,
                    zIndex: f.pos.z,
                    ["--frag-delay" as string]: `${i * 110}ms`,
                    ["--frag-rot" as string]: `${f.pos.rotate}deg`,
                  }}
                >
                  <figcaption className="frag-tag">{f.tag}</figcaption>
                  <div className="frag-body">{f.render()}</div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .frag-card {
          background: var(--bg);
          border: 1px solid var(--rule);
          border-radius: 2px;
          padding: 0.875rem 1.125rem 1rem;
          box-shadow: 0 1px 0 0 var(--rule);
          transform: rotate(var(--frag-rot, 0deg));
        }
        .frag-tag {
          font-family: var(--font-mono);
          font-size: var(--text-meta);
          letter-spacing: var(--track-meta);
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
          padding-bottom: 0.5rem;
          margin-bottom: 0.625rem;
          border-bottom: 1px solid var(--rule);
        }
        .frag-body {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          line-height: 1.5;
        }
        /* The one accent: a live caret on the unfinished CRM value. */
        .caret {
          display: inline-block;
          width: 2px;
          height: 1.05em;
          margin-left: 4px;
          vertical-align: -0.18em;
          background: var(--accent);
          animation: frag-blink 1.15s steps(1) infinite;
        }
        /* Entrance: each fragment fades in and unrotates slightly past
           its resting tilt, then settles — like a card tossed onto a
           pile, not a tidy grid sweep. Irregular per-fragment delay. */
        .frag-in {
          opacity: 0;
          will-change: opacity, transform;
        }
        [data-frag-visible] .frag-in {
          animation: frag-drop 620ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--frag-delay, 0ms);
        }
        @keyframes frag-drop {
          from {
            opacity: 0;
            transform: rotate(calc(var(--frag-rot, 0deg) * 2.4))
              translateY(-14px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: rotate(var(--frag-rot, 0deg)) translateY(0) scale(1);
          }
        }
        @keyframes frag-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .frag-in {
            opacity: 1;
            animation: none !important;
          }
          .caret { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
