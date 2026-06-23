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
const HERO_GRID_LIT_RATIO = 0.14;
const HERO_GRID_PATTERN = (() => {
  let seed = 0x9e3779b1 % 0x7fffffff;
  return Array.from({ length: HERO_GRID_CELL_COUNT }, () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const tall = seed / 0x7fffffff < HERO_GRID_TALL_RATIO;
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const lit = seed / 0x7fffffff < HERO_GRID_LIT_RATIO;
    return { tall, lit };
  });
})();

export function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="hero w-full"
    >
      <div className="hero__inset">
        <div data-on-accent className="hero__frame">
          <div className="hero__copy">
            <p data-hero-rise className="hero__pill">
              The commercial decision layer for B2B teams.
            </p>
            <h1 id="hero-headline" data-hero-rise className="type-hero">
              Build a repeatable way to win&nbsp;customers.
            </h1>
            <div className="hero__lead">
              <SectionHeadingSupport
                data-hero-rise
                className="hero__subhead"
              >
                Kithos gives your team the context to pursue better-fit
                accounts, move opportunities forward, and learn what to repeat.
              </SectionHeadingSupport>
              <div data-hero-rise className="hero__actions">
                <AccessButton size="lg" tone="on-forest" />
              </div>
            </div>
          </div>
          <div aria-hidden className="hero__grid">
            {HERO_GRID_PATTERN.map(({ tall, lit }, i) => (
              <span
                key={i}
                className="hero__grid-cell"
                data-tall={tall ? "" : undefined}
                data-lit={lit ? "" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
