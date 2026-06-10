"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./product-statement.css";
import {
  PageGridProse,
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
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
    examples: [
      "Infrastructure",
      "Developer tools",
      "Security",
      "Data pipelines",
    ],
  },
  {
    title: "Regulated markets",
    body: "When buyers care about risk, compliance, data handling, and credibility.",
    examples: ["Fintech", "Insurance", "Healthcare", "Compliance"],
  },
  {
    title: "Emerging categories",
    body: "When the team is still learning who buys, and what turns interest into revenue.",
    examples: [
      "AI applications",
      "Climate tech",
      "Vertical SaaS",
      "Marketplaces",
    ],
  },
  {
    title: "Operational workflow",
    body: "When buying depends on change management and multiple internal users.",
    examples: ["People ops", "Procurement", "Field service", "Internal tools"],
  },
] as const;

const STRIP_LAYOUT_MEDIA = [
  "(max-width: 47.999rem)",
  "(min-width: 48rem)",
  "(min-width: 64rem)",
] as const;

export function ProductStatement() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [stripLayout, setStripLayout] = useState<ProductStatementStripLayout>({
    contentCols: 1,
    rowColCells: 4,
    contentRowCells: 2,
    headlineRows: 3,
    stripColOffset: 0,
    expandColCells: 0,
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
        <div className="product-statement__content">
          <div className="product-statement__headline-copy">
            <PageGridProse className="product-statement__heading">
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionHeadingTitle id="product-statement-heading">
                    {HEADLINE}
                  </SectionHeadingTitle>
                  <SectionHeadingSupport>{SUBHEAD}</SectionHeadingSupport>
                </SectionHeadingStack>
              </SectionHeadingBand>
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
              const expandDirection = index % 2 === 0 ? "left" : "right";
              const isExpanded = expandedIndex === index;
              const hasHoverReveal = stripLayout.expandColCells > 0;

              return (
                <article
                  key={row.title}
                  role="listitem"
                  tabIndex={hasHoverReveal ? 0 : undefined}
                  aria-expanded={hasHoverReveal ? isExpanded : undefined}
                  onMouseEnter={() => setExpandedIndex(index)}
                  onMouseLeave={() =>
                    setExpandedIndex((current) =>
                      current === index ? null : current,
                    )
                  }
                  onFocus={() => setExpandedIndex(index)}
                  onBlur={() =>
                    setExpandedIndex((current) =>
                      current === index ? null : current,
                    )
                  }
                  className={[
                    "product-statement__row",
                    placement.isStripColEnd &&
                      "product-statement__row--strip-col-end",
                    placement.isStripRowEnd &&
                      "product-statement__row--strip-row-end",
                    expandDirection === "left" &&
                      "product-statement__row--expand-left",
                    expandDirection === "right" &&
                      "product-statement__row--expand-right",
                    isExpanded && "product-statement__row--is-expanded",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    {
                      "--ps-row-grid-column": placement.gridColumn,
                      "--ps-row-grid-row": placement.gridRow,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="product-statement__row-vertices"
                    aria-hidden="true"
                  >
                    <span className="product-statement__row-vertex product-statement__row-vertex--tl">
                      +
                    </span>
                    <span className="product-statement__row-vertex product-statement__row-vertex--tr">
                      +
                    </span>
                    <span className="product-statement__row-vertex product-statement__row-vertex--bl">
                      +
                    </span>
                    <span className="product-statement__row-vertex product-statement__row-vertex--br">
                      +
                    </span>
                  </div>
                  <div className="product-statement__row-inner">
                    <div
                      className="product-statement__row-spacer"
                      aria-hidden="true"
                    />
                    <div className="product-statement__row-copy">
                    <h3 className="product-statement__row-title type-card-title">
                      {row.title}
                    </h3>
                    <p className="product-statement__row-body body">{row.body}</p>
                    <div
                      className="product-statement__row-detail"
                      aria-hidden={hasHoverReveal ? !isExpanded : true}
                    >
                      <div className="product-statement__row-detail-inner">
                        <ul className="product-statement__row-examples">
                          {row.examples.map((example) => (
                            <li
                              key={example}
                              className="product-statement__row-example"
                            >
                              <span className="product-statement__row-example-label ui">
                                {example}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
