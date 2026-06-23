import type { ReactNode } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { SectionRule } from "./section-rule";
import "./next-move-section.css";

const INTRO = {
  headline: "Better decisions, not more activity.",
  support:
    "Kithos brings the right context to finding and winning customers, so more of your team’s effort turns into revenue.",
} as const;

const PILLARS: {
  title: string;
  body: string;
  art: ReactNode;
}[] = [
  {
    title: "Start with context",
    body: "Ground the search in what the company sells, who may care, and what the evidence suggests.",
    art: (
      <svg viewBox="0 0 200 160" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
          <path d="M100 28 L156 60 V116 L100 148 L44 116 V60 Z" />
          <path d="M100 28 V88 M44 60 L100 88 L156 60" />
          <path d="M100 88 L100 148" />
        </g>
      </svg>
    ),
  },
  {
    title: "Decide with evidence",
    body: "Identify the markets and accounts that warrant attention, with a clear case for each.",
    art: (
      <svg viewBox="0 0 200 160" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <ellipse cx="100" cy="80" rx="52" ry="20" />
          <ellipse cx="100" cy="80" rx="52" ry="20" transform="rotate(60 100 80)" />
          <ellipse cx="100" cy="80" rx="52" ry="20" transform="rotate(120 100 80)" />
        </g>
      </svg>
    ),
  },
  {
    title: "Learn from outcomes",
    body: "Carry what happens forward so the next commercial decision starts stronger.",
    art: (
      <svg viewBox="0 0 200 160" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <line x1="48" y1="40" x2="152" y2="88" />
          <line x1="48" y1="80" x2="152" y2="40" />
          <line x1="48" y1="120" x2="152" y2="72" />
          <line x1="100" y1="32" x2="100" y2="128" />
        </g>
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="48" cy="40" r="3" />
          <circle cx="48" cy="80" r="3" />
          <circle cx="48" cy="120" r="3" />
          <circle cx="152" cy="40" r="3" />
          <circle cx="152" cy="72" r="3" />
          <circle cx="152" cy="88" r="3" />
          <circle cx="100" cy="32" r="3" />
          <circle cx="100" cy="128" r="3" />
        </g>
      </svg>
    ),
  },
];

export function NextMoveSection() {
  return (
    <section
      aria-labelledby="next-move-heading"
      className="next-move relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <h2
                id="next-move-heading"
                className="next-move__statement type-statement"
              >
                <span className="next-move__statement-lead">
                  {INTRO.headline}
                </span>{" "}
                <span className="next-move__statement-support">
                  {INTRO.support}
                </span>
              </h2>

              <ul className="next-move__pillars" role="list">
                {PILLARS.map((pillar) => (
                  <li key={pillar.title} className="next-move__pillar">
                    <div className="next-move__pillar-art">{pillar.art}</div>
                    <h3 className="next-move__pillar-title type-subhead">
                      {pillar.title}
                    </h3>
                    <p className="next-move__pillar-body body">{pillar.body}</p>
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
