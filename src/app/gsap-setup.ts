import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Matches site CSS breakpoint (`--bp-md`). */
export const MOBILE_MQ = "(max-width: 47.999rem)";

const STATIC_REVEAL_MQ = `${MOBILE_MQ}, (prefers-reduced-motion: reduce)`;
const DESKTOP_REVEAL_MQ =
  "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

/** Show scroll-reveal targets immediately on mobile and when motion is reduced. */
export function bindScrollReveal(
  mm: gsap.MatchMedia,
  targets: HTMLElement[],
  bindDesktop: () => (() => void) | void,
) {
  mm.add(STATIC_REVEAL_MQ, () => {
    if (targets.length === 0) return;
    gsap.set(targets, { clearProps: "opacity,transform,visibility" });
  });

  mm.add(DESKTOP_REVEAL_MQ, () => bindDesktop());
}

export { gsap, ScrollTrigger, useGSAP };
