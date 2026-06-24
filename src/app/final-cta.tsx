import { AccessButton } from "./access-modal";
import { GridField } from "./grid-field";
import {
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import "./final-cta.css";

/* Closing call-to-action — echoes the hero's grid motif (via the shared
   GridField primitive) but composes it as a deliberate counterpoint, not a
   repeat: a full-bleed snow band (vs the hero's forest card) with the copy held
   to the page's content column so it lines up with every section above, while
   the mosaic sits at a larger, architectural scale in one zone that dissolves
   toward the copy — a right-hand field on desktop, a bottom horizon on mobile.
   The footer below shares the snow surface. */
export function FinalCta() {
  return (
    <section
      id="access"
      aria-labelledby="final-cta-heading"
      className="final-cta w-full"
    >
      <div className="final-cta__band">
        {/* Clip box bounds the mosaic to the content column so it never bleeds
            past the page content width; the copy overlaps its left edge. */}
        <div className="final-cta__field">
          <GridField
            className="final-cta__grid"
            cellCount={220}
            tallRatio={0.36}
            litRatio={0.16}
          />
        </div>
        {/* Reuse the page shell so the copy sits in the exact content column
            (aligned to the site grid) as every section heading above it. */}
        <div className="page-shell final-cta__shell">
          <div className="final-cta__inner">
            <SectionHeadingStack className="final-cta__copy">
              <SectionHeadingTitle id="final-cta-heading">
                Make sharper decisions. Win the right customers.
              </SectionHeadingTitle>
              <SectionHeadingSupport>
                Join teams using Kithos to find the right customers, move deals
                forward with sharper context, and turn every outcome into a
                better next move.
              </SectionHeadingSupport>
            </SectionHeadingStack>
            <div className="final-cta__actions">
              <AccessButton size="lg" tone="accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
