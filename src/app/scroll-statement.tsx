import { useId } from "react";
import { ContentWidthCard } from "./content-width-card";
import { SectionRuleTicks } from "./structural-frame";

export function ScrollStatement({
  eyebrow,
  headline,
  subhead,
  body,
  featureCard,
}: {
  eyebrow?: string;
  headline: string;
  subhead: string;
  body?: readonly string[];
  featureCard: {
    stepIndex: number;
    headline: string;
    body: string;
  };
}) {
  const headlineId = useId();

  return (
    <section
      id="right-now"
      aria-labelledby={headlineId}
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--bg)] py-[calc(var(--section-pad-y)/2)] md:py-[calc(var(--section-pad-y-spacious)/2)]"
    >
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[var(--page-max)]">
        <div className="flex flex-col gap-10 px-6 md:gap-12 md:px-10">
          {eyebrow ? <p className="label">{eyebrow}</p> : null}

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-x-10 md:gap-y-0 lg:gap-x-12">
            <h2
              id={headlineId}
              className="type-statement max-w-[42ch] text-[var(--ink)] md:col-span-8 lg:col-span-8"
            >
              {headline}
            </h2>
            <p className="body max-w-[40ch] text-[var(--ink-soft)] md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
              {subhead}
            </p>
          </div>

          {body && body.length > 0 ? (
            <div className="flex max-w-[52ch] flex-col gap-5">
              {body.map((paragraph, i) => (
                <p key={i} className="body text-[var(--ink-soft)]">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <ContentWidthCard
          className="mt-8 md:mt-10"
          stepIndex={featureCard.stepIndex}
          headline={featureCard.headline}
          body={featureCard.body}
        />
      </div>
    </section>
  );
}
