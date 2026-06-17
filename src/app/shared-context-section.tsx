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
import "./shared-context-section.css";

/* "One shared context for every commercial decision." — the section directly
   below the problem framing. Centered heading band (stack-section idiom) with
   subhead copy; full panel width, not the narrow stack logo column. */

const PARAGRAPHS = [
  "Kithos brings together what matters across your product, market, accounts, buyers and outcomes. It interprets the signals, weighs the options and helps your team decide where to focus, how to shape each opportunity and what will move it forward.",
  "Every outcome feeds back into the system, so each decision starts from what your team has already learned.",
] as const;

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
              <SectionHeadingBand center>
                <SectionHeadingStack center className="shared-context__stack">
                  <SectionHeadingTitle id="shared-context-heading" center>
                    One shared context for every commercial decision.
                  </SectionHeadingTitle>
                  {PARAGRAPHS.map((paragraph, index) => (
                    <SectionHeadingSupport key={index}>
                      {paragraph}
                    </SectionHeadingSupport>
                  ))}
                </SectionHeadingStack>
              </SectionHeadingBand>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
