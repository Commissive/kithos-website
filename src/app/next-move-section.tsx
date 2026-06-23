import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { SectionRule } from "./section-rule";
import {
  NextMoveIllustrationContext,
  NextMoveIllustrationEvidence,
  NextMoveIllustrationOutcomes,
} from "./next-move-illustrations";
import "./next-move-section.css";

const INTRO = {
  headline: "Better decisions, not more activity.",
  support:
    "Bring the right context to finding and winning customers, so more of your team’s effort turns into revenue.",
} as const;

const PILLARS = [
  {
    fig: "FIG 0.1",
    title: "Start with context",
    body: "Ground the search in what the company sells, who may care, and what the evidence suggests.",
    Illustration: NextMoveIllustrationContext,
  },
  {
    fig: "FIG 0.2",
    title: "Decide with evidence",
    body: "Identify the markets and accounts that warrant attention, with a clear case for each.",
    Illustration: NextMoveIllustrationEvidence,
  },
  {
    fig: "FIG 0.3",
    title: "Learn from outcomes",
    body: "Carry what happens forward so the next commercial decision starts stronger.",
    Illustration: NextMoveIllustrationOutcomes,
  },
] as const;

export function NextMoveSection() {
  return (
    <section
      aria-labelledby="next-move-heading"
      className="next-move relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="next-move__content">
              <h2
                id="next-move-heading"
                className="next-move__statement type-statement type-statement--flow"
              >
                <strong className="next-move__statement-lead">
                  {INTRO.headline}
                </strong>{" "}
                <span className="next-move__statement-support">
                  {INTRO.support}
                </span>
              </h2>

              <div className="next-move__pillars-wrap">
                <ul className="next-move__pillars" role="list">
                  {PILLARS.map(({ fig, title, body, Illustration }) => (
                    <li key={title} className="next-move__pillar">
                      <div className="next-move__pillar-stage">
                        <p className="next-move__pillar-fig" aria-hidden="true">
                          {fig}
                        </p>
                        <div className="next-move__pillar-art">
                          <Illustration />
                        </div>
                      </div>
                      <div className="next-move__pillar-copy">
                        <h3 className="next-move__pillar-title">{title}</h3>
                        <p className="next-move__pillar-body">{body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>

      <SectionRule placement="end" />
    </section>
  );
}
