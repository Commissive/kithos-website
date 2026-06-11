"use client";

import { useRef } from "react";
import { AccessButton } from "./access-modal";
import { SectionHeadingSupport } from "./page-layout";
import { useSiteGridCells } from "./site-grid-cells";
import "./hero.css";

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const bandCells = useSiteGridCells(frameRef, "--hero-grid-cols", "var(--bg)", {
    filter: "panel",
    gutterFromHeadlineStartVar: "--hero-headline-col-start",
    trailColsVar: "--hero-grid-trail-cols",
    staticOnce: true,
    accentRowsVar: "--hero-accent-rows",
    accentBandOnly: true,
  });

  // Glyph vocabulary: an outline field with one filled square — promote the
  // first tinted cell to solid Forest so the band reads composed, not random.
  const anchorIndex = bandCells.findIndex((cell) => cell.color !== "var(--bg)");
  const gridCells =
    anchorIndex === -1
      ? bandCells
      : bandCells.map((cell, index) =>
          index === anchorIndex ? { ...cell, color: "var(--forest)" } : cell,
        );

  return (
    <section
      aria-labelledby="hero-headline"
      className="hero w-full bg-[var(--bg)]"
    >
      <div className="hero__inset">
        <div ref={frameRef} className="hero__frame">
          <div aria-hidden className="hero__grid-cells">
            {gridCells.map((cell) => (
              <span
                key={`${cell.col}-${cell.row}`}
                className="hero__cell"
                style={{
                  gridColumn: cell.col,
                  gridRow: cell.row,
                  backgroundColor: cell.color,
                }}
              />
            ))}
          </div>
          <div aria-hidden className="hero__grid" />
          <div aria-hidden className="hero__grid-gutter hero__grid-gutter--start" />
          <div aria-hidden className="hero__grid-gutter hero__grid-gutter--end" />
          <div aria-hidden className="hero__grid-row1-top" />
          <div aria-hidden className="hero__headline-band" />
          <div className="hero__headline-copy">
            <p data-hero-rise className="hero__pill label">
              The platform for commercial reasoning
            </p>
            <h1 id="hero-headline" data-hero-rise className="type-hero">
              <span className="hero__headline-line">Repeatable&nbsp;revenue.</span>
              <span className="hero__headline-line hero__headline-line--support">
                <em>Without&nbsp;the&nbsp;guesswork.</em>
              </span>
            </h1>
          </div>
          <div aria-hidden className="hero__content-band" />
          <div className="hero__content">
            <div data-hero-rise className="hero__lead">
              <SectionHeadingSupport className="hero__subhead">
                Kithos helps teams identify the&nbsp;right commercial opportunities
                and sell with more&nbsp;confidence.
              </SectionHeadingSupport>
              <div className="hero__actions">
                <AccessButton size="lg" tone="accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
