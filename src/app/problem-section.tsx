"use client";

import { useRef } from "react";
import { AccessButton } from "./access-modal";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import "./problem-section.css";
import { gsap, ScrollTrigger, useGSAP } from "./gsap-setup";

const PROBLEM_BODY =
  "Find the right market, pursue the right accounts, engage the right buyers, and use every outcome to make the next move sharper.";

const PROBLEM_IMAGE = {
  src: "/hero/growth.png",
  width: 1254,
  height: 1254,
} as const;

const INTRO_SELECTOR = "[data-problem-intro]";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(intro, {
          clearProps: "opacity,transform,visibility",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(intro, { y: 18, autoAlpha: 0 });

        const introTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(intro, {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: "auto",
            });
          },
        });

        return () => {
          introTrigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-labelledby="problem-heading"
      className="problem-section relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <header className="section-heading-band problem-section__heading-band">
                <h2
                  id="problem-heading"
                  data-problem-intro
                  className="type-statement section-heading-title section-heading-title--center"
                >
                  Make sharper revenue decisions across the commercial
                  workflow.
                </h2>
                <p
                  data-problem-intro
                  className="lead section-heading-support problem-section__subhead"
                >
                  {PROBLEM_BODY}
                </p>
              </header>

              <figure
                data-problem-intro
                className="problem-section__media"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROBLEM_IMAGE.src}
                  alt="Abstract growth pattern representing sharper commercial decisions over time."
                  width={PROBLEM_IMAGE.width}
                  height={PROBLEM_IMAGE.height}
                  loading="lazy"
                  decoding="async"
                  className="problem-section__image"
                />
                <div aria-hidden className="problem-section__scrim" />
              </figure>

              <div data-problem-intro className="problem-section__actions">
                <AccessButton tone="accent" size="lg" />
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
