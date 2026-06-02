"use client";

import { useRef } from "react";
import { AccessButton } from "./access-modal";
import { PageColumn, PageShell } from "./page-layout";
import "./problem-section.css";
import { gsap, ScrollTrigger, useGSAP } from "./gsap-setup";

const PROBLEM_BODY =
  "Instead, context fragments across tools, every account gets re-explained from scratch, and wins and losses rarely sharpen the next move.";

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
          <div className="problem-section__panel">
            <div className="problem-section__copy">
              <h2
                id="problem-heading"
                data-problem-intro
                className="type-statement problem-section__title"
              >
                <span className="problem-section__title-line">
                  Finding and converting the right customers
                </span>
                <span className="problem-section__title-line">
                  should get sharper with every interaction.
                </span>
              </h2>
              <p
                data-problem-intro
                className="type-body-lg problem-section__body"
              >
                {PROBLEM_BODY}
              </p>
              <div data-problem-intro className="problem-section__actions">
                <AccessButton tone="on-forest" size="lg" />
              </div>
            </div>

            <figure
              className="problem-section__media"
              data-problem-intro
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROBLEM_IMAGE.src}
                alt=""
                width={PROBLEM_IMAGE.width}
                height={PROBLEM_IMAGE.height}
                loading="lazy"
                decoding="async"
                className="problem-section__image"
              />
            </figure>
          </div>
        </PageColumn>
      </PageShell>
    </section>
  );
}
