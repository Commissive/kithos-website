import { useId } from "react";

/* Below-the-fold focal section — the bridge between the hero's
   promise and TabbedSections' how-it-works. Structure:

     eyebrow                                                  (label)
     ───
     headline (5-col on lg+)        body paragraphs (6-col, lg:col-start-7)
                                    problem.
                                    solution.

   On lg+ the headline anchors the left rail while the body explains
   in the right rail — claim → explanation in a single eye sweep.
   On mobile everything stacks: eyebrow → headline → problem → solution.

   Server-rendered, no JS. Component name kept (`ScrollStatement`)
   so the import in v2/page.tsx doesn't churn; comment notes it no
   longer scrolls. */

export function ScrollStatement({
  eyebrow,
  headline,
  body,
}: {
  eyebrow: string;
  headline: string;
  body: readonly string[];
}) {
  const headlineId = useId();

  return (
    <section
      id="right-now"
      aria-labelledby={headlineId}
      className="relative w-full scroll-mt-20 bg-[var(--surface)] py-[var(--section-pad-y-spacious)]"
    >
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          {/* Eyebrow — full width above the asymmetric pair so it reads
              as the section's label, not a sub-heading of one column. */}
          <span className="label lg:col-span-12">{eyebrow}</span>

          {/* Headline — anchors the left rail. v2-statement keeps it
              the same scale as MotionStatement's synthesis line later
              in the page (consistent display ladder across beats). */}
          <h2
            id={headlineId}
            className="v2-statement text-[var(--ink)] lg:col-span-5"
          >
            {headline}
          </h2>

          {/* Body — right rail, top-aligned with the headline. max-w
              caps the line length comfortably for sustained reading. */}
          <div className="lg:col-span-6 lg:col-start-7 lg:max-w-[58ch]">
            {body.map((paragraph, i) => (
              <p
                key={i}
                className={`lead text-[var(--ink-soft)]${i > 0 ? " mt-5" : ""}`}
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
