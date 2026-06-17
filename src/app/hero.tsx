"use client";

import { AccessButton } from "./access-modal";
import { SectionHeadingSupport } from "./page-layout";
import "./hero.css";

/* Deterministic shape pattern for the decorative hero grid. A tiny LCG keeps
   the layout looking scattered while producing the exact same sequence on every
   render (server and client), so hydration matches. Each entry is a `tall` flag:
   tall cells span two rows to become taller rectangles, the rest stay square.
   The cell count overfills the largest plausible grid area; .hero__frame clips
   the overflow. */
const HERO_GRID_CELL_COUNT = 480;
const HERO_GRID_TALL_RATIO = 0.32;
const HERO_GRID_PATTERN = (() => {
  let seed = 0x9e3779b1 % 0x7fffffff;
  return Array.from({ length: HERO_GRID_CELL_COUNT }, () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff < HERO_GRID_TALL_RATIO;
  });
})();

export function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="hero w-full"
    >
      <div className="hero__inset">
        <div className="hero__frame">
          <div className="hero__copy">
            <p data-hero-rise className="hero__pill">
              The platform for commercial reasoning.
            </p>
            <h1 id="hero-headline" data-hero-rise className="type-hero">
              <span className="hero__headline-line">Repeatable&nbsp;revenue.</span>
              <span className="hero__headline-line">
                Without&nbsp;the&nbsp;guesswork.
              </span>
            </h1>
            <div data-hero-rise className="hero__lead">
              <SectionHeadingSupport className="hero__subhead">
                Kithos helps teams selling into complex buying environments
                make the commercial decisions that win the right&nbsp;customers.
              </SectionHeadingSupport>
              <div className="hero__actions">
                <AccessButton size="lg" tone="forest" />
              </div>
            </div>
          </div>
          <div aria-hidden className="hero__grid">
            {HERO_GRID_PATTERN.map((tall, i) => (
              <span
                key={i}
                className="hero__grid-cell"
                data-tall={tall ? "" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
