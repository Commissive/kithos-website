"use client";

import { useEffect, useState } from "react";

type UseScrollSpyOptions = {
  /** IntersectionObserver rootMargin (default biases active section toward upper viewport). */
  rootMargin?: string;
};

/**
 * Tracks which section id is currently in view for scroll-linked nav highlighting.
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  { rootMargin = "-15% 0px -60% 0px" }: UseScrollSpyOptions = {},
) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const firstId = sectionIds[0];
    if (!firstId) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (elements.length === 0) return;

    const pickActive = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length === 0) return;

      const best = visible.reduce((current, candidate) => {
        const currentTop = Math.abs(current.boundingClientRect.top);
        const candidateTop = Math.abs(candidate.boundingClientRect.top);
        return candidateTop < currentTop ? candidate : current;
      });

      setActiveId(best.target.id);
    };

    const observer = new IntersectionObserver(pickActive, {
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [rootMargin, sectionIds.join("|")]);

  return activeId;
}
