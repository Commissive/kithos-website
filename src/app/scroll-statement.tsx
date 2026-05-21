import { useId } from "react";
import { SectionRuleTicks } from "./structural-frame";

export function ScrollStatement({
  eyebrow,
  headline,
  body,
}: {
  eyebrow?: string;
  headline: string;
  body: readonly string[];
}) {
  const headlineId = useId();

  return (
    <section
      id="right-now"
      aria-labelledby={headlineId}
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--bg)] py-[var(--section-pad-y)] md:py-[var(--section-pad-y-spacious)]"
    >
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[var(--page-max)] px-6 md:px-10">
        <div className="flex w-full max-w-[75%] flex-col gap-8 md:gap-10">
          {eyebrow ? <p className="label">{eyebrow}</p> : null}

          <h2
            id={headlineId}
            className="type-statement max-w-[42ch] text-[var(--ink)]"
          >
            {headline}
          </h2>

          <div className="flex max-w-[52ch] flex-col gap-5">
            {body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "lead font-medium text-[var(--ink)]"
                    : "body text-[var(--ink-soft)]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
