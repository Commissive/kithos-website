import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { SectionStatementHeadline } from "./section-statement-headline";
import { SectionRuleTicks } from "./structural-frame";

export function ObservabilityLayerSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="observability-layer-heading"
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--surface)]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="pb-0">
              <h2
                id="observability-layer-heading"
                className="type-statement section-heading-title text-balance"
              >
                <SectionStatementHeadline
                  lead="The observability layer for sales."
                  support="Engineered for teams turning product conviction into market traction."
                />
              </h2>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
