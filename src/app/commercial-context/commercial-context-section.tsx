import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "../page-layout";
import { CommercialContextTabs } from "./commercial-context-tabs";
import "./commercial-context.css";

export function CommercialContextSection() {
  return (
    <section
      aria-labelledby="commercial-context-heading"
      className="relative z-10 w-full scroll-mt-[var(--scroll-anchor-offset)] overflow-hidden"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <header className="section-heading-band">
                <div className="section-heading-row">
                  <div className="section-heading-row__title">
                    <h2
                      id="commercial-context-heading"
                      className="type-statement section-heading-title"
                    >
                      The Commercial Context Engine.
                    </h2>
                  </div>
                  <p className="lead section-heading-support section-heading-row__support">
                    Kithos collects what your team knows, curates what matters, and
                    brings the right context to every commercial move.
                  </p>
                </div>
              </header>
              <CommercialContextTabs />
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
