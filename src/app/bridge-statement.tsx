"use client";

import { PageColumn, PageShell } from "./page-layout";
import { SectionGridBackground, SectionRuleTicks } from "./structural-frame";
import {
  useScrollRevealProgress,
  wordLitColor,
  wordRevealAmount,
} from "./use-scroll-reveal-progress";

function wordsFromSentence(sentence: string) {
  return sentence.trim().split(/\s+/);
}

const LIT = "var(--ink)";

const PARAGRAPH = [
  ...wordsFromSentence("You built something people want."),
  ...wordsFromSentence(
    "You shouldn't need six tools to find the right customers, or have to run GTM on vibes.",
  ),
];

const TOTAL_WORDS = PARAGRAPH.length;

export function BridgeStatement() {
  const { ref, progress } = useScrollRevealProgress<HTMLQuoteElement>({
    start: 0.92,
    end: 0.22,
  });

  return (
    <section
      aria-label="From product to revenue"
      className="sticky top-[var(--stack-overlap-top)] z-0 flex min-h-[80svh] w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--bone)] py-[var(--section-pad-y)]"
    >
      <SectionGridBackground />
      <SectionRuleTicks />
      <PageShell className="relative z-[1] flex-1">
        <PageColumn className="flex flex-1 items-center justify-center">
          <blockquote
            ref={ref}
            className="mx-auto w-full max-w-[42em] px-[var(--page-gutter)] text-center"
          >
            <p className="type-statement font-medium text-balance">
              {PARAGRAPH.map((text, index) => {
                const reveal = wordRevealAmount(index, TOTAL_WORDS, progress);

                return (
                  <span
                    key={`${index}-${text}`}
                    className="bridge-reveal-word inline-block"
                    style={{ color: wordLitColor(reveal, LIT) }}
                  >
                    {text}
                    {index < PARAGRAPH.length - 1 ? "\u00a0" : null}
                  </span>
                );
              })}
            </p>
          </blockquote>
        </PageColumn>
      </PageShell>
    </section>
  );
}
