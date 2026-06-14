"use client";

import { useRef } from "react";
import {
  SectionEyebrow,
  SectionHeadingStack,
  SectionHeadingTitle,
} from "./page-layout";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import "./kithos-intro-section.css";

const RISE_SELECTOR = "[data-intro-rise]";

export function KithosIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>(RISE_SELECTOR, root);
      const mm = gsap.matchMedia();

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
        <div aria-hidden className="kithos-intro__rule kithos-intro__rule--top" />
        <div aria-hidden className="kithos-intro__rule kithos-intro__rule--bottom" />
        <div aria-hidden className="kithos-intro__rule kithos-intro__rule--outer-left" />
        <div aria-hidden className="kithos-intro__rule kithos-intro__rule--inner-left" />
        <div aria-hidden className="kithos-intro__rule kithos-intro__rule--inner-right" />
        <div aria-hidden className="kithos-intro__rule kithos-intro__rule--outer-right" />
        <div className="kithos-intro__box">
          <SectionHeadingStack center className="kithos-intro__stack">
            <SectionEyebrow data-intro-rise>Product</SectionEyebrow>
            <SectionHeadingTitle id="kithos-intro-heading" center data-intro-rise>
              The platform for commercial reasoning
            </SectionHeadingTitle>
          </SectionHeadingStack>
        </div>
      </div>
    </section>
  );
}
