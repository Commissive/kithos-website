import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { StackMarquee } from "./stack-band";
import "./stack-section.css";

const STACK_LEAD =
  "Kithos reads from the tools your team already uses — CRM, inbox, calendar, call recordings, and notes — and writes useful output back where you work. Nothing gets ripped out.";

export function StackSection() {
  return (
    <section
      id="integrations"
      aria-labelledby="stack-section-heading"
      className="stack-section relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <SectionHeadingBand center>
                <SectionHeadingStack center>
                  <SectionEyebrow index="04">Integrations</SectionEyebrow>
                  <SectionHeadingTitle id="stack-section-heading" center>
                    Works with your <em>stack.</em>
                  </SectionHeadingTitle>
                  <SectionHeadingSupport>{STACK_LEAD}</SectionHeadingSupport>
                </SectionHeadingStack>
              </SectionHeadingBand>

              <StackMarquee />
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
