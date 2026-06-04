import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { faqJsonLd } from "./faq-content";
import { FaqAccordion } from "./faq-accordion";
import "./faq-section.css";

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
                <p className="label">FAQ</p>
                <header className="section-heading-band">
                  <h2
                    id="faq-heading"
                    className="type-statement section-heading-title"
                  >
                    Frequently Asked Questions
                  </h2>
                </header>

                <FaqAccordion />

                <p className="body faq-section__contact">
                  Something missing —{" "}
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
