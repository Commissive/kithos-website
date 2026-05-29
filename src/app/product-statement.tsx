import type { CSSProperties } from "react";
import "./product-statement.css";
import {
  PageColumn,
  PageGrid,
  PageGridFull,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { PRODUCT_STATEMENT_ICONS } from "./product-statement-icons";
const PRODUCT_STATEMENT_HEADLINE =
  "Engineered for teams selling into complex buying environments.";
const PRODUCT_STATEMENT_SUBHEAD =
  "Where the right account is not obvious, the buyer is not always the user, and the problem has to be understood before the product can be sold.";

const CATEGORIES = [
  {
    title: "Technical products",
    tone: "ink-muted",
    icon: PRODUCT_STATEMENT_ICONS.settings,
    body: "When workflow detail, product proof, and buyer education shape the sale.",
  },
  {
    title: "Regulated markets",
    tone: "ink-body",
    icon: PRODUCT_STATEMENT_ICONS.check,
    body: "When credibility, risk, compliance, and timing change how deals move.",
  },
  {
    title: "Emerging categories",
    tone: "ink",
    icon: PRODUCT_STATEMENT_ICONS.signal,
    body: "When the team is still learning who buys, and what turns interest into revenue.",
  },
] as const;

export function ProductStatement() {
  return (
    <section
      aria-labelledby="product-statement-heading"
      className="product-statement page-section-alt relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <header className="section-heading-band">
                <div className="section-heading-row">
                  <div className="section-heading-row__title">
                    <h2
                      id="product-statement-heading"
                      className="type-statement section-heading-title"
                    >
                      {PRODUCT_STATEMENT_HEADLINE}
                    </h2>
                  </div>
                  <p className="lead section-heading-support section-heading-row__support">
                    {PRODUCT_STATEMENT_SUBHEAD}
                  </p>
                </div>
              </header>
            </PageGridProse>
            <PageGridFull
              className="product-statement__strip"
              role="list"
              aria-label="Contexts for teams in complex buying environments"
            >
              {CATEGORIES.map((category) => (
                <article
                  key={category.title}
                  role="listitem"
                  className="product-statement__card"
                  data-tone={category.tone}
                >
                  <header className="product-statement__card-head">
                    <figure
                      className="product-statement__icon"
                      aria-hidden
                      style={
                        {
                          "--product-statement-icon-src": `url(${category.icon.src})`,
                        } as CSSProperties
                      }
                    />
                    <h3 className="product-statement__card-title type-card">
                      {category.title}
                    </h3>
                  </header>
                  <p className="product-statement__card-body type-body-lg">
                    {category.body}
                  </p>
                </article>
              ))}
            </PageGridFull>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
