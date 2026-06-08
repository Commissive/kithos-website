"use client";

import { useRef } from "react";
import { AccessButton } from "./access-modal";
import { gsap, MOBILE_MQ, useGSAP } from "./gsap-setup";
import { useSiteGridCells } from "./site-grid-cells";
import "./hero.css";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const gridCells = useSiteGridCells(frameRef, "--hero-grid-cols", "var(--bone)");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-hero-rise]", root);
      if (items.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(`${MOBILE_MQ}, (prefers-reduced-motion: reduce)`, () => {
        gsap.set(items, { clearProps: "opacity,transform,visibility" });
      });

      mm.add(
        "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(items, { y: 10, autoAlpha: 0 });
          gsap.to(items, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-headline"
      className="hero w-full bg-[var(--bone)]"
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
              Repeatable revenue without the guesswork.
            </h1>
          </div>
          <div aria-hidden className="hero__content-band" />
          <div className="hero__content">
            <div data-hero-rise className="hero__lead">
              <p className="hero__subhead type-subhead text-[var(--ink-body)]">
                Kithos helps teams identify the right commercial
                opportunities and sell with more confidence.
              </p>
              <div className="hero__actions">
                <AccessButton tone="accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
