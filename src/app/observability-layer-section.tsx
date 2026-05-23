import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { SectionStatementHeadline } from "./section-statement-headline";
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

export function ObservabilityLayerSection() {
  const [step01, step02, step03, step04] = STEPS;

  return (
    <section
      id="how-it-works"
      aria-labelledby="observability-layer-heading"
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--bone)]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <h2
                id="observability-layer-heading"
                className="type-statement text-balance"
              >
                <SectionStatementHeadline
                  lead="The observability layer for sales."
                  support="Engineered for teams turning product conviction into market traction."
                />
              </h2>
            </PageGridProse>
          </PageGrid>

          <ol
            aria-label="Observability layer steps"
            className="flex flex-col gap-[var(--section-gap-xl)]"
          >
            <SplitFeatureStep step={step01} index={0} />
            <SplitFeatureStep step={step02} index={1} flipped />
            <SplitFeatureStep step={step03} index={2} />
            <SplitFeatureStep step={step04} index={3} flipped />
          </ol>
        </PageColumn>
      </PageShell>
    </section>
  );
}
