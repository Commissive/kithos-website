import "./product-statement.css";
import {
  PageGridProse,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { ProductStatementEnvironmentGrid } from "./product-statement-environment-grid";

const SUBHEAD =
  "Where the right account is not always obvious and generic outreach is often punished.";

const ENVIRONMENTS = [
  "Finance",
  "Compliance",
  "Manufacturing",
  "Procurement",
  "Applied AI & ML",
  "Data Infrastructure",
  "Developer Tools",
  "Supply Chain",
  "Legal",
  "Healthcare",
  "Energy",
  "Defence",
  "Cybersecurity",
  "Construction",
] as const;

export function ProductStatement() {
  return (
    <section
      aria-labelledby="product-statement-heading"
      className="product-statement relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div className="product-statement__frame">
        <div className="product-statement__content">
          <div className="product-statement__headline-copy">
            <PageGridProse className="product-statement__heading">
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow>Where Kithos fits</SectionEyebrow>
                  <SectionHeadingTitle id="product-statement-heading">
                    Engineered for teams selling into{" "}
                    <em>complex buying environments.</em>
                  </SectionHeadingTitle>
                  <SectionHeadingSupport>{SUBHEAD}</SectionHeadingSupport>
                </SectionHeadingStack>
              </SectionHeadingBand>
            </PageGridProse>
          </div>

          <div className="product-statement__strip">
            <ProductStatementEnvironmentGrid labels={ENVIRONMENTS} />
          </div>
        </div>
      </div>
    </section>
  );
}
