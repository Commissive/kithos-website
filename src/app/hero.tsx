"use client";

import { AccessButton } from "./access-modal";
import { SectionHeadingSupport } from "./page-layout";
import "./hero.css";

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
          <div aria-hidden className="hero__grid" />
        </div>
      </div>
    </section>
  );
}
