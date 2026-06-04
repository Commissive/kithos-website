"use client";

import { useRef } from "react";
import Image from "next/image";
import { AccessButton } from "./access-modal";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { gsap, useGSAP } from "./gsap-setup";
import "./hero.css";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-hero-rise]", root);
      if (items.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { clearProps: "opacity,transform,visibility" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { y: 10, autoAlpha: 0 });
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        });
      });

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
        <div className="hero__frame">
          <div aria-hidden data-hero-surface className="hero__surface">
            <Image
              src="/hero/hero-bg.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero__image"
              aria-hidden
            />
          </div>
          <div className="hero__content">
            <PageShell>
              <PageColumn>
                <PageGrid>
                  <PageGridProse className="page-grid-prose--hero flex flex-col items-start text-left">
                    <h1
                      id="hero-headline"
                      data-hero-rise
                      className="type-hero"
                    >
                      Commercial reasoning for repeatable revenue.
                    </h1>
                    <div data-hero-rise className="hero__lead">
                      <p className="hero__subhead type-subhead text-[var(--ink-body)]">
                        Kithos helps teams identify the right commercial
                        opportunities, shape the path through them, and sell with
                        more confidence and less guesswork.
                      </p>
                      <div className="hero__actions">
                        <AccessButton tone="accent" />
                      </div>
                    </div>
                  </PageGridProse>
                </PageGrid>
              </PageColumn>
            </PageShell>
          </div>
        </div>
      </div>
    </section>
  );
}
