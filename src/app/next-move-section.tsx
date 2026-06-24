import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingRow,
  SectionHeadingRowTitle,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { SectionRule } from "./section-rule";
import {
  NextMoveIllustrationContext,
  NextMoveIllustrationEvidence,
  NextMoveIllustrationOutcomes,
} from "./next-move-illustrations";
import "./next-move-section.css";

const INTRO = {
  eyebrow: "Commercial decisions",
  headline: "Make better decisions before more activity.",
  support:
    "Kithos is built around the decisions that determine where your team spends its time, how it approaches each opportunity, and what it learns from the outcome. So more of your team’s effort turns into revenue.",
} as const;

const PILLARS = [
  {
    title: "Start with context",
    body: "Ground the search in what the company sells, who may care, and what the evidence suggests.",
    Illustration: NextMoveIllustrationContext,
    tone: "forest",
  },
  {
    title: "Decide with evidence",
    body: "Identify the markets and accounts that warrant attention, with a clear case for each.",
    Illustration: NextMoveIllustrationEvidence,
    tone: "terracotta",
  },
  {
    title: "Learn from outcomes",
    body: "Carry what happens forward so the next commercial decision starts stronger.",
    Illustration: NextMoveIllustrationOutcomes,
    tone: "bone",
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
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow>{INTRO.eyebrow}</SectionEyebrow>
                  <SectionHeadingRow>
                    <SectionHeadingRowTitle>
                      <SectionHeadingTitle id="next-move-heading">
                        {INTRO.headline}
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport className="next-move__heading-support">
                      {INTRO.support}
                    </SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>

              <SectionRule />

              <div className="next-move__pillars-wrap">
                <ul className="next-move__pillars" role="list">
                  {PILLARS.map(({ title, body, Illustration, tone }, index) => (
                    <li
                      key={title}
                      className="next-move__pillar"
                      data-pillar-tone={tone}
                    >
                      <div className="next-move__pillar-stage">
                        <span className="next-move__pillar-index label" aria-hidden>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="next-move__pillar-art">
                          <Illustration />
                        </div>
                      </div>
                      <div className="next-move__pillar-copy">
                        <h3 className="next-move__pillar-title body">{title}</h3>
                        <p className="next-move__pillar-body ui">{body}</p>
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
