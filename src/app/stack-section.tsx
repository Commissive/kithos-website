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
import { StackLogoCloud } from "./stack-band";
import { SectionRule } from "./section-rule";
import "./stack-section.css";

const STACK_LEAD =
  "Accounts, conversations, emails, meeting notes, outcomes and internal knowledge are brought into one commercial picture, so every recommendation reflects what the team knows, not just what was entered into a prompt.";

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
              <div className="stack-section__column">
                <SectionHeadingBand center>
                  <SectionHeadingStack center>
                    <SectionEyebrow>Integrations</SectionEyebrow>
                    <SectionHeadingTitle id="stack-section-heading" center>
                      Kithos works from the context your team already creates.
                    </SectionHeadingTitle>
                    <SectionHeadingSupport>{STACK_LEAD}</SectionHeadingSupport>
                  </SectionHeadingStack>
                </SectionHeadingBand>

                <StackLogoCloud />
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>

      <SectionRule placement="end" />
    </section>
  );
}
