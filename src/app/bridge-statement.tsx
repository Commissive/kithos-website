"use client";

import {
  PageColumn,
  PageGrid,
  PageGridFull,
  PageShell,
} from "./page-layout";
import "./bridge-statement.css";
import {
  useScrollRevealProgress,
  wordLitColor,
  wordRevealAmount,
} from "./use-scroll-reveal-progress";

function wordsFromSentence(sentence: string) {
  return sentence.trim().split(/\s+/);
}

function normalizeBridgeToken(token: string) {
  return token.replace(/\u2011/g, "-").replace(/^[,;:.!?]+|[,;:.!?]+$/g, "");
}

function phraseWordIndices(tokens: string[], phrase: string) {
  const needle = wordsFromSentence(phrase).map(normalizeBridgeToken);
  const haystack = tokens.map(normalizeBridgeToken);
  const indices = new Set<number>();

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((word, j) => haystack[i + j] === word)) {
      for (let j = 0; j < needle.length; j++) indices.add(i + j);
      break;
    }
  }

  return indices;
}

const LIT_INK = "var(--on-forest)";
const LIT_ACCENT = "var(--terracotta-soft)";

const BRIDGE_HEADLINE =
  "Your stack should help you decide the next move, not just record the last one.";
const BRIDGE_HIGHLIGHT = "decide the next move";

const HEADLINE_WORDS = wordsFromSentence(BRIDGE_HEADLINE);
const HEADLINE_HIGHLIGHT = phraseWordIndices(HEADLINE_WORDS, BRIDGE_HIGHLIGHT);
const TOTAL_WORDS = HEADLINE_WORDS.length;

export function BridgeStatement() {
  const { ref, progress } = useScrollRevealProgress<HTMLQuoteElement>({
    start: 0.92,
    end: 0.22,
  });

  return (
    <section
      id="bridge-statement"
      aria-label={BRIDGE_HEADLINE}
      className="bridge-statement relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="bridge-statement__column">
          <PageGrid>
            <PageGridFull>
              <div className="bridge-statement__card">
                <div aria-hidden className="bridge-statement__grid" />
                <blockquote ref={ref} className="bridge-statement__quote">
                  <p className="bridge-statement__line type-rule text-[var(--on-forest)]">
                    {HEADLINE_WORDS.map((text, index) => {
                      const reveal = wordRevealAmount(
                        index,
                        TOTAL_WORDS,
                        progress,
                      );
                      const highlighted = HEADLINE_HIGHLIGHT.has(index);

                      return (
                        <span
                          key={`${index}-${text}`}
                          className="bridge-reveal-word"
                          style={{
                            color: highlighted
                              ? wordLitColor(
                                  reveal,
                                  LIT_ACCENT,
                                  "var(--bridge-highlight-ghost)",
                                )
                              : wordLitColor(
                                  reveal,
                                  LIT_INK,
                                  "var(--bridge-word-ghost)",
                                ),
                          }}
                        >
                          {text}
                          {index < HEADLINE_WORDS.length - 1 ? " " : null}
                        </span>
                      );
                    })}
                  </p>
                </blockquote>
              </div>
            </PageGridFull>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
