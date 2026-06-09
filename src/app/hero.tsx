"use client";

import { useRef } from "react";
import { AccessButton } from "./access-modal";
import { useSiteGridCells } from "./site-grid-cells";
import "./hero.css";

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const gridCells = useSiteGridCells(frameRef, "--hero-grid-cols", "var(--bg)", {
    filter: "panel",
    gutterFromHeadlineStartVar: "--hero-headline-col-start",
    trailColsVar: "--hero-grid-trail-cols",
    staticOnce: true,
    accentRowsVar: "--hero-accent-rows",
    accentBandOnly: true,
  });

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
          <div aria-hidden className="hero__grid-vline hero__grid-vline--trail-start" />
          <div aria-hidden className="hero__grid-row1-top" />
          <div aria-hidden className="hero__headline-band" />
          <div className="hero__headline-copy">
            <p data-hero-rise className="hero__pill ui">
              The Platform For Commercial Reasoning
            </p>
            <h1 id="hero-headline" data-hero-rise className="type-hero">
              <span className="hero__headline-line">Repeatable&nbsp;revenue.</span>
              <span className="hero__headline-line hero__headline-line--support">
                Without&nbsp;the&nbsp;guesswork.
              </span>
            </h1>
          </div>
          <div aria-hidden className="hero__content-band" />
          <div className="hero__content">
            <div data-hero-rise className="hero__lead">
              <p className="hero__subhead section-heading-support">
                Kithos helps teams identify the&nbsp;right commercial opportunities
                and sell with more&nbsp;confidence.
              </p>
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
