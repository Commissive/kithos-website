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

const HEADLINE =
  "Engineered for teams selling into complex buying environments.";
const SUBHEAD =
  "Where the right account is not obvious, the buyer is not always the user, and the problem has to be understood before the product can be sold.";

const ROWS = [
  {
    title: "Technical products",
    icon: PRODUCT_STATEMENT_ICONS.settings,
    body: "When workflow detail, product proof, and buyer education shape the sale.",
  },
  {
    title: "Regulated markets",
    icon: PRODUCT_STATEMENT_ICONS.check,
    body: "When credibility, risk, compliance, and timing change how deals move.",
  },
  {
    title: "Emerging categories",
    icon: PRODUCT_STATEMENT_ICONS.signal,
    body: "When the team is still learning who buys, and what turns interest into revenue.",
  },
] as const;

function ProductStatementIcon({
  src,
}: {
  src: string;
}) {
  return (
    <figure
      className="product-statement__icon"
      aria-hidden
      style={
        { "--ps-icon-src": `url(${src})` } as CSSProperties & {
          "--ps-icon-src": string;
        }
      }
    />
  );
}

export function ProductStatement() {
  return (
    <section
      aria-labelledby="product-statement-heading"
      className="product-statement page-section-alt relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="product-statement__heading">
              <header className="section-heading-band">
                <div className="section-heading-stack">
                  <h2
                    id="product-statement-heading"
                    className="type-statement section-heading-title"
                  >
                    {HEADLINE}
                  </h2>
                  <p className="lead section-heading-support">{SUBHEAD}</p>
                </div>
              </header>
            </PageGridProse>

            <PageGridFull
              className="product-statement__strip"
              role="list"
              aria-label="Contexts for teams in complex buying environments"
            >
              {ROWS.map((row) => (
                <article
                  key={row.title}
                  role="listitem"
                  className="product-statement__row"
                >
                  <div className="product-statement__row-copy">
                    <div className="product-statement__row-head">
                      <ProductStatementIcon src={row.icon.src} />
                      <h3 className="product-statement__row-title type-card-title">
                        {row.title}
                      </h3>
                    </div>
                    <p className="product-statement__row-body body">
                      {row.body}
                    </p>
                  </div>
                </article>
              ))}
            </PageGridFull>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
