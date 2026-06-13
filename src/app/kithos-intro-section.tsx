"use client";

import { useRef, type CSSProperties } from "react";
import {
  SectionEyebrow,
  SectionHeadingStack,
  SectionHeadingTitle,
} from "./page-layout";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import "./kithos-intro-section.css";

const RISE_SELECTOR = "[data-intro-rise]";

/* Concentric rings — radii in a 1600-unit frame, fading outward. */
const RING_RADII = [180, 300, 440, 600, 780] as const;

function IntroRings() {
  return (
    <div aria-hidden className="kithos-intro__rings" data-intro-rings>
      <svg viewBox="0 0 1600 1600" className="kithos-intro__rings-svg">
        {RING_RADII.map((radius, index) => (
          <circle
            key={radius}
            cx={800}
            cy={800}
            r={radius}
            fill="none"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
            className="kithos-intro__ring"
            style={
              {
                "--ring-o": 0.5 - index * 0.09,
                animationDelay: `${index * 0.7}s`,
              } as CSSProperties
            }
          />
        ))}
        {/* Orbiting brand atoms — filled squares riding two of the outer
            rings, kept clear of the centred headline so they read as ambient
            depth rather than crossing the type. */}
        <g data-intro-orbit="slow">
          <rect
            x={800 - 7}
            y={800 - 600 - 7}
            width={14}
            height={14}
            className="kithos-intro__orbit-node kithos-intro__orbit-node--terracotta"
          />
        </g>
        <g data-intro-orbit="slower">
          <rect
            x={800 - 5}
            y={800 - 780 - 5}
            width={10}
            height={10}
            className="kithos-intro__orbit-node kithos-intro__orbit-node--forest"
          />
        </g>
      </svg>
    </div>
  );
}

export function KithosIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>(RISE_SELECTOR, root);
      const mm = gsap.matchMedia();

      // Rings drift slower than the page — quiet depth behind the statement.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rings = root.querySelector<HTMLElement>("[data-intro-rings]");
        if (!rings) return;

        const drift = gsap.fromTo(
          rings,
          { yPercent: -6, scale: 1.04 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // Brand atoms orbit their rings — opposite directions, long periods.
        const slow = gsap.to('[data-intro-orbit="slow"]', {
          rotation: 360,
          svgOrigin: "800 800",
          duration: 64,
          repeat: -1,
          ease: "none",
        });
        const slower = gsap.to('[data-intro-orbit="slower"]', {
          rotation: -360,
          svgOrigin: "800 800",
          duration: 110,
          repeat: -1,
          ease: "none",
        });

        return () => {
          drift.scrollTrigger?.kill();
          drift.kill();
          slow.kill();
          slower.kill();
        };
      });

      bindScrollReveal(mm, targets, () => {
        gsap.set(targets, { y: 16, autoAlpha: 0 });

        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top 72%",
          once: true,
          onEnter: () => {
            gsap.to(targets, {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: "auto",
            });
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kithos-intro-heading"
      className="kithos-intro relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div className="kithos-intro__frame">
        <IntroRings />
        <div className="kithos-intro__band">
          <SectionHeadingStack center className="kithos-intro__stack">
            <SectionEyebrow data-intro-rise>What Kithos is</SectionEyebrow>
            <SectionHeadingTitle id="kithos-intro-heading" center data-intro-rise>
              Kithos understands your product, reasons across your market and
              buyers, and points your team at <em>winnable opportunities.</em>
            </SectionHeadingTitle>
          </SectionHeadingStack>
        </div>
      </div>
    </section>
  );
}
