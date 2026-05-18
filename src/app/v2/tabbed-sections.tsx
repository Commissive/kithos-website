"use client";

import { useEffect, useRef, useState } from "react";

/* Vertical scroll-spy — the three sequenced statements. All content
   stays present and scrollable (nothing hidden behind a tab); a sticky
   side list tracks the section in view and jumps to it on click.
   Rendered in Kithos's restrained identity. Reduced-motion safe. */

const ITEMS = [
  {
    label: "Find accounts",
    headline: "Find the right accounts.",
    subhead:
      "Early teams decide where revenue might come from using fragments scattered across CRM fields, call notes, inboxes, Slack, spreadsheets, decks, customer conversations, and founder memory.",
    body: "Kithos connects your product, market, accounts, customers, and outcomes to show where scarce commercial time should go — and where it should not.",
  },
  {
    label: "Move deals",
    headline: "Move the right deals forward.",
    subhead: "Good accounts stall when the team has fragments instead of context.",
    body: "Kithos brings account research, buyer priorities, market signals, previous outreach, objections, and deal history into one view of the opportunity, so the team knows who matters, why they should care, and what should happen next.",
  },
  {
    label: "Build the playbook",
    headline: "Build the playbook as you sell.",
    subhead:
      "Every reply, meeting, objection, win, and loss teaches the team something.",
    body: "Kithos finds the patterns that work, turns them into shared commercial memory, and carries that learning into the next account, message, qualification call, follow-up, and playbook decision.",
  },
];

export function TabbedSections() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = blockRefs.current.indexOf(
            visible.target as HTMLElement,
          );
          if (i !== -1) setActive(i);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    blockRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const jump = (i: number) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    blockRefs.current[i]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--bg)]">
      {/* Section rule ticks at the column rails (matches the site grid) */}
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

      <div className="mx-auto grid w-full max-w-[78rem] grid-cols-12 gap-x-8 px-6 md:px-10">
        {/* Sticky side index — desktop only */}
        <nav
          aria-label="What Kithos does"
          className="col-span-4 hidden self-start lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center"
        >
          <ul className="flex w-full flex-col gap-3">
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <li key={it.label}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={on ? "true" : undefined}
                    className="group flex w-full items-center gap-5 py-3 text-left"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center font-display text-[1.375rem] font-medium leading-none transition-colors ${
                        on
                          ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                          : "border border-[var(--rule)] text-[var(--muted)] group-hover:border-[var(--ink-soft)] group-hover:text-[var(--ink-soft)]"
                      }`}
                      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span
                      className={`label transition-colors ${
                        on
                          ? "text-[var(--ink)]"
                          : "text-[var(--muted)] group-hover:text-[var(--ink-soft)]"
                      }`}
                    >
                      {it.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content — all blocks present and scrollable */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          {ITEMS.map((it, i) => (
            <div
              key={it.label}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="flex scroll-mt-20 flex-col justify-center py-16 md:py-20 lg:min-h-[100svh] lg:py-20"
            >
              {/* Mobile-only sequence marker — the sticky index is
                  desktop-only, so keep the 01/02/03 affordance here. */}
              <span
                className="mb-6 flex h-10 w-10 items-center justify-center bg-[var(--accent)] font-display text-[1.125rem] font-medium leading-none text-[var(--accent-ink)] lg:hidden"
                style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                aria-hidden
              >
                {`0${i + 1}`}
              </span>
              <h2 className="display-3 max-w-[20ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em]">
                {it.headline}
              </h2>
              <p className="lead mt-6 max-w-[52ch] text-[var(--ink-soft)]">
                {it.subhead}
              </p>
              <p className="body mt-5 max-w-[52ch] text-[var(--ink-soft)]">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
