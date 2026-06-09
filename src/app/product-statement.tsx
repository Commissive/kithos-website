"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./product-statement.css";
import { PageGridProse } from "./page-layout";
import {
  readProductStatementStripLayout,
  resolveProductStatementRowPlacement,
  type ProductStatementStripLayout,
} from "./product-statement-grid";

const HEADLINE =
  "Engineered for teams selling into complex buying environments.";
const SUBHEAD =
  "Where the right account is not always obvious and generic outreach is often punished.";

const ROWS = [
  {
    title: "Technical products",
    body: "When technical evaluation, unclear budget ownership, and buyer education shape the sale.",
  },
  {
    title: "Regulated markets",
    body: "When buyers care about risk, compliance, data handling, and credibility.",
  },
  {
    title: "Emerging categories",
    body: "When the team is still learning who buys, and what turns interest into revenue.",
  },
  {
    title: "Operational workflow",
    body: "When buying depends on change management and multiple internal users.",
  },
] as const;

/** Brand pastels — one surface per strip column (see kithos-brand-kit/tokens/colors.css). */
const ROW_SURFACES = [
  "var(--forest-tint)",
  "var(--terracotta-tint)",
  "var(--bone-shade)",
  "var(--forest-soft)",
] as const;

const STRIP_LAYOUT_MEDIA = [
  "(max-width: 47.999rem)",
  "(min-width: 48rem)",
  "(min-width: 64rem)",
] as const;

export function ProductStatement() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [stripLayout, setStripLayout] = useState<ProductStatementStripLayout>({
    contentCols: 1,
    rowColCells: 4,
    contentRowCells: 3,
    headlineRows: 3,
  });

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const syncLayout = () => {
      setStripLayout(readProductStatementStripLayout(frame));
    };

    syncLayout();

    const mediaQueries = STRIP_LAYOUT_MEDIA.map((query) =>
      window.matchMedia(query),
    );
    const onBreakpointChange = () => syncLayout();

    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", onBreakpointChange);
    }

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncLayout)
        : null;
    observer?.observe(frame);

    return () => {
      observer?.disconnect();
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", onBreakpointChange);
      }
    };
  }, []);

  return (
    <section
      aria-labelledby="product-statement-heading"
      className="product-statement relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div ref={frameRef} className="product-statement__frame">
        <div
          aria-hidden
          className="product-statement__grid-vline product-statement__grid-vline--content-start"
        />
        <div
          aria-hidden
          className="product-statement__grid-vline product-statement__grid-vline--content-end"
        />
        <div className="product-statement__content">
          <div className="product-statement__headline-copy">
            <PageGridProse className="product-statement__heading">
              <header className="section-heading-band">
                <div className="section-heading-stack">
                  <h2
                    id="product-statement-heading"
                    className="type-statement section-heading-title"
                  >
                    {HEADLINE}
                  </h2>
                  <p className="section-heading-support">{SUBHEAD}</p>
                </div>
              </header>
            </PageGridProse>
          </div>

          <div
            className="product-statement__strip"
            role="list"
            aria-label="Contexts for teams in complex buying environments"
          >
            {ROWS.map((row, index) => {
              const placement = resolveProductStatementRowPlacement(
                index,
                ROWS.length,
                stripLayout,
              );

              return (
                <article
                  key={row.title}
                  role="listitem"
                  className={[
                    "product-statement__row",
                    placement.isStripColEnd &&
                      "product-statement__row--strip-col-end",
                    placement.isStripRowEnd &&
                      "product-statement__row--strip-row-end",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    gridColumn: placement.gridColumn,
                    gridRow: placement.gridRow,
                    "--ps-row-surface": ROW_SURFACES[index],
                  }}
                >
                  <div className="product-statement__row-head">
                    <h3 className="product-statement__row-title type-card-title">
                      {row.title}
                    </h3>
                  </div>
                  <p className="product-statement__row-body body">{row.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
