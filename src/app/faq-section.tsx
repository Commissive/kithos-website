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
import { faqJsonLd } from "./faq-content";
import { FaqAccordion } from "./faq-accordion";
import "./faq-section.css";

const FAQ_SUBHEAD =
  "Quick answers on early access, product scope, and your data.";

function faqLdJsonString(): string {
  return JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c");
}

export function FaqSection() {
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {faqLdJsonString()}
      </script>
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="faq-section page-section-alt relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
      >
        <PageShell>
          <PageColumn className="page-section-top pb-[var(--section-pad-bottom-lg)]">
            <PageGrid>
              <PageGridProse>
                <SectionHeadingBand>
                  <SectionHeadingStack>
                    <SectionEyebrow>FAQ</SectionEyebrow>
                    <SectionHeadingTitle id="faq-heading">
                      Frequently Asked Questions
                    </SectionHeadingTitle>
                    <SectionHeadingSupport>{FAQ_SUBHEAD}</SectionHeadingSupport>
                  </SectionHeadingStack>
                </SectionHeadingBand>

                <FaqAccordion />

                <p className="body faq-section__contact">
                  Something missing? Write to{" "}
                  <a
                    href="mailto:hello@kithos.ai"
                    className="interactive-text-link underline-offset-[4px]"
                  >
                    hello@kithos.ai
                  </a>
                  .
                </p>
              </PageGridProse>
            </PageGrid>
          </PageColumn>
        </PageShell>
      </section>
    </>
  );
}
