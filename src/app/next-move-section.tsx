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
import "./next-move-section.css";

/* "The hardest part of selling is the next move." — eyebrow + headline row, then
   an inset filled card with display copy inside (hero card shape, no border rule). */

const SUBHEAD =
  "Every market, account and buyer presents a different set of signals, risks and possibilities. Teams have to decide where to focus, how to approach the opportunity and what will move it forward.";

const BODY_LEAD =
  "Most sales tools record what happened. They do little to help teams interpret the context, weigh their options or decide what should happen next.";

const BODY_TAIL =
  "So teams rely on instinct, repeat avoidable mistakes and relearn the same lessons from one opportunity to the next.";

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
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow>The decision problem</SectionEyebrow>
                  <SectionHeadingRow>
                    <SectionHeadingRowTitle>
                      <SectionHeadingTitle id="next-move-heading">
                        The hardest part of selling is the next move.
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport>{SUBHEAD}</SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>

              <SectionRule />

              <div className="next-move__cards">
                <div className="next-move__card next-move__card--body">
                  <div aria-hidden className="next-move__frame" />
                  <p className="next-move__body type-rule">{BODY_LEAD}</p>
                </div>
                <div className="next-move__card next-move__card--aside">
                  <p className="next-move__aside-text type-rule">{BODY_TAIL}</p>
                </div>
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>

      <SectionRule placement="end" />
    </section>
  );
}
