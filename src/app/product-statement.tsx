"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import "./product-statement.css";
import {
  PageColumn,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { PRODUCT_STATEMENT_ICONS } from "./product-statement-icons";
import { useSiteGridCells, type SiteGridCell } from "./site-grid-cells";

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
  const frameRef = useRef<HTMLDivElement>(null);
  const gridCells = useSiteGridCells(
    frameRef,
    "--ps-grid-cols",
    "var(--bone-shade)",
  );
  const [panelGridCells, setPanelGridCells] = useState<SiteGridCell[]>([]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const syncPanelCells = () => {
      const styles = getComputedStyle(frame);
      const gutterCols =
        Number.parseInt(styles.getPropertyValue("--ps-grid-gutter-cols"), 10) || 2;
      const trailCols =
        Number.parseInt(styles.getPropertyValue("--ps-grid-trail-cols"), 10) || 2;
      const cols = Number.parseInt(styles.getPropertyValue("--ps-grid-cols"), 10) || 8;

      setPanelGridCells(
        gridCells.filter(
          (cell) => cell.col > gutterCols && cell.col <= cols - trailCols,
        ),
      );
    };

    syncPanelCells();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(syncPanelCells);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [gridCells]);

  return (
    <section
      aria-labelledby="product-statement-heading"
      className="product-statement page-section-alt relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div ref={frameRef} className="product-statement__frame">
        <div aria-hidden className="product-statement__grid-cells">
          {panelGridCells.map((cell) => (
            <span
              key={`${cell.col}-${cell.row}`}
              className="product-statement__cell"
              style={{
                gridColumn: cell.col,
                gridRow: cell.row,
                backgroundColor: cell.color,
              }}
            />
          ))}
        </div>
        <div aria-hidden className="product-statement__grid" />
        <div
          aria-hidden
          className="product-statement__grid-vline product-statement__grid-vline--panel-start"
        />
        <div
          aria-hidden
          className="product-statement__grid-vline product-statement__grid-vline--panel-end"
        />
        <div aria-hidden className="product-statement__grid-row-top" />
        <div aria-hidden className="product-statement__panel" />
        <div
          aria-hidden
          className="product-statement__grid-hline product-statement__grid-hline--row3"
        />

        <div className="product-statement__content">
          <div className="product-statement__headline-copy">
            <PageShell>
              <PageColumn>
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
              </PageColumn>
            </PageShell>
          </div>

          <div
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
                <ProductStatementIcon src={row.icon.src} />
                <h3 className="product-statement__row-title type-card-title">
                  {row.title}
                </h3>
                <p className="product-statement__row-body body">{row.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
