import type { ReactNode } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { SectionRule } from "./section-rule";
import "./shared-context-section.css";

/* "A single platform to define, coordinate and improve how your team sells." —
   centered heading + subhead, then a joined three-cell grid (Unify / Reason /
   Learn), each cell a
   faint-forest tint with a line-art graphic above a title + body anchored at the
   foot. The cells share 1px rules and span the full section width. */

const STEPS: { title: string; body: string; art: ReactNode }[] = [
  {
    title: "Unify",
    body: "Kithos brings together what matters across your product, market, accounts, buyers and outcomes into one commercial picture.",
    art: (
      <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
          <line x1="32" y1="22" x2="126" y2="60" />
          <line x1="32" y1="41" x2="126" y2="60" />
          <line x1="32" y1="60" x2="126" y2="60" />
          <line x1="32" y1="79" x2="126" y2="60" />
          <line x1="32" y1="98" x2="126" y2="60" />
        </g>
        <g stroke="currentColor" strokeWidth="1.25">
          <circle className="shared-context__art-node" cx="32" cy="22" r="4" />
          <circle className="shared-context__art-node" cx="32" cy="41" r="4" />
          <circle className="shared-context__art-node" cx="32" cy="60" r="4" />
          <circle className="shared-context__art-node" cx="32" cy="79" r="4" />
          <circle className="shared-context__art-node" cx="32" cy="98" r="4" />
        </g>
        <circle cx="128" cy="60" r="7" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Reason",
    body: "Kithos interprets the signals, weighs the options and surfaces the strongest next move, with the reasoning behind it.",
    art: (
      <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
          <line x1="34" y1="60" x2="126" y2="26" />
          <line x1="34" y1="60" x2="126" y2="60" />
          <line x1="34" y1="60" x2="126" y2="94" />
        </g>
        <circle
          className="shared-context__art-node"
          cx="32"
          cy="60"
          r="6"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <circle
          className="shared-context__art-node"
          cx="128"
          cy="26"
          r="4"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <circle cx="128" cy="60" r="7" fill="currentColor" />
        <circle
          className="shared-context__art-node"
          cx="128"
          cy="94"
          r="4"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    ),
  },
  {
    title: "Learn",
    body: "Every outcome updates the picture, so each new decision starts from what your team has already learned.",
    art: (
      <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.25">
          <circle cx="80" cy="60" r="15" />
          <circle cx="80" cy="60" r="30" />
          <circle cx="80" cy="60" r="45" />
        </g>
        <circle cx="80" cy="60" r="4" fill="currentColor" />
      </svg>
    ),
  },
];

export function SharedContextSection() {
  return (
    <section
      aria-labelledby="shared-context-heading"
      className="shared-context relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <SectionHeadingBand>
                <SectionHeadingStack className="shared-context__stack">
                  <SectionHeadingTitle id="shared-context-heading">
                    A single platform to define, coordinate and improve how your
                    team sells.
                  </SectionHeadingTitle>
                  <SectionHeadingSupport>
                    Get the context you need to decide which accounts to pursue,
                    how to approach each opportunity, and what will move it
                    forward. Every outcome sharpens the next decision.
                  </SectionHeadingSupport>
                </SectionHeadingStack>
              </SectionHeadingBand>

              <SectionRule />

              <ul className="shared-context__grid" aria-label="How Kithos works">
                {STEPS.map((step) => (
                  <li key={step.title} className="shared-context__card">
                    <span className="shared-context__art" aria-hidden="true">
                      {step.art}
                    </span>
                    <h3 className="shared-context__card-title type-subhead">
                      {step.title}
                    </h3>
                    <p className="shared-context__card-body body">{step.body}</p>
                  </li>
                ))}
              </ul>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>

      <SectionRule placement="end" />
    </section>
  );
}
