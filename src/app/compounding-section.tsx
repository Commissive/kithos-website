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
import "./compounding-section.css";

/* "Build a revenue motion that gets sharper with every outcome." — the
   compounding thesis (pillar five, "Learn what to repeat", widened into its
   own section). Rather than draw an abstract loop that merely asserts Kithos
   learns, the visual follows ONE concrete piece of commercial memory through
   its lifecycle: a pattern observed across real opportunities → the playbook
   rule it produces → the live surfaces that now apply it. Copy-led — the
   capability section owns the product UI, so this stays typographic. */

const SURFACES = [
  "Account scoring",
  "Meeting preparation",
  "Next-step recommendations",
] as const;

export function CompoundingSection() {
  return (
    <section
      id="compounding"
      aria-labelledby="compounding-heading"
      className="compounding relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow>Compounding</SectionEyebrow>
                  <SectionHeadingRow>
                    <SectionHeadingRowTitle>
                      <SectionHeadingTitle id="compounding-heading">
                        Build a revenue motion that gets sharper with every
                        outcome.
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport>
                      Kithos connects what happened to the context and decisions
                      that produced it. The patterns become shared commercial
                      memory and are applied to every account, conversation and
                      opportunity that follows. Every outcome sharpens the next
                      decision.
                    </SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>

              {/* One concrete pattern, captured once and applied everywhere —
                  observed → rule → applied, read left to right. */}
              <ol
                className="compounding__memory"
                aria-label="One pattern becomes shared commercial memory"
              >
                <li className="compounding__stage compounding__stage--observed">
                  <p className="compounding__stage-label label">
                    Observed across six opportunities
                  </p>
                  <p className="compounding__stage-body body">
                    Deals that reached procurement before an internal finance
                    sponsor was in place stalled{" "}
                    <span className="compounding__stat">2.3×</span> more often.
                  </p>
                </li>

                <li className="compounding__stage compounding__stage--rule">
                  <p className="compounding__stage-label label">
                    Playbook update proposed
                  </p>
                  <p className="compounding__rule">
                    Confirm budget ownership before introducing procurement.
                  </p>
                </li>

                <li className="compounding__stage compounding__stage--applied">
                  <p className="compounding__stage-label label">
                    Applied going forward
                  </p>
                  <ul
                    className="compounding__surfaces"
                    aria-label="Surfaces now applying this rule"
                  >
                    {SURFACES.map((surface) => (
                      <li key={surface} className="compounding__surface">
                        <span className="compounding__surface-check" aria-hidden>
                          ✓
                        </span>
                        {surface}
                      </li>
                    ))}
                  </ul>
                  <p className="compounding__applied-note ui">
                    Each now checks for finance sponsorship before procurement.
                  </p>
                </li>
              </ol>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
