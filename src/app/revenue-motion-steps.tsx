import { BrandMark } from "./brand-mark";
import { SplitStepCard } from "./split-step-card";
import { SectionRuleTicks } from "./structural-frame";

const STEPS = [
  {
    headline: "Unify context into a commercial system of action.",
    body: [
      "Context lives across CRM fields, call notes, inboxes, Slack, decks, and founder memory.",
      "Kithos brings product, market, and accounts into one place the team can trust.",
      "Outcomes and rationale stay tied to one shared commercial foundation.",
    ],
  },
  {
    headline: "Find the right accounts and move them forward.",
    body: [
      "Teams waste time on accounts that were never likely to move.",
      "Kithos shows where commercial time should go.",
      "Research, signals, and history surface in one view.",
    ],
  },
  {
    headline: "Build the playbook as you sell.",
    body: [
      "Every reply, meeting, objection, win, and loss should sharpen the next move.",
      "Kithos turns outcomes into shared commercial memory.",
      "The whole team can use what worked—and what did not.",
    ],
    illustration: "/brand/illustrations/07_sprout.svg",
    illustrationAlt: "A sprout — growth from accumulated learning",
  },
  {
    headline: "Get your reps in.",
    body: [
      "Know-how usually walks out the door when people do.",
      "In Kithos, every outcome compounds into one base.",
      "New reps inherit it on day one.",
    ],
    illustration: "/brand/illustrations/14_hand.svg",
    illustrationAlt: "An open hand — knowledge shared across the team",
  },
] as const;

function SplitFeatureStep({
  step,
  index,
  flipped = false,
}: {
  step: (typeof STEPS)[number] & {
    illustration?: string;
    illustrationAlt?: string;
  };
  index: number;
  flipped?: boolean;
}) {
  return (
    <li className="w-full">
      <SplitStepCard
        stepIndex={index}
        headline={step.headline}
        body={step.body}
        illustration={step.illustration}
        illustrationAlt={step.illustrationAlt}
        flipped={flipped}
      />
    </li>
  );
}

export function RevenueMotionSteps() {
  const [step01, step02, step03, step04] = STEPS;

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--bone-shade)] py-[var(--section-pad-y)] md:py-[var(--section-pad-y-spacious)]"
    >
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[var(--page-max)] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-10 md:items-end">
          <h2
            id="how-it-works-heading"
            className="type-statement max-w-[16ch] text-[var(--ink)] md:col-span-6 lg:col-span-5"
          >
            Tools, context, and confidence for every deal
          </h2>
          <div className="flex items-end justify-between gap-6 md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
            <p className="lead max-w-[34ch] font-medium text-[var(--ink-soft)]">
              Four moves that turn scattered GTM work into a system your team
              can run and improve.
            </p>
            <BrandMark className="hidden h-16 w-16 shrink-0 text-[var(--forest-muted)] sm:block md:h-[4.5rem] md:w-[4.5rem]" />
          </div>
        </header>

        <ol
          aria-label="Revenue motion steps"
          className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-14"
        >
          <SplitFeatureStep step={step01} index={0} />
          <SplitFeatureStep step={step02} index={1} flipped />
          <SplitFeatureStep step={step03} index={2} />
          <SplitFeatureStep step={step04} index={3} flipped />
        </ol>
      </div>
    </section>
  );
}
