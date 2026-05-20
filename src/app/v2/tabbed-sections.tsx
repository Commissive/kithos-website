import { IntegrationGrid } from "./integration-grid";

/* Two-column section that recreates the brand mark's top row as the
   UI: a forest pentagon (chamfered) pinned on the left, and a sticky
   stack of bone squares on the right that the user scrolls through.

   ── How the scroll mechanism works (lg+ only — mobile is a plain
   ── stacked list, no sticky behaviour):

   1. Pentagon and the cards' <ol> are grid siblings (items-stretch),
      so both column cells stretch to the row's height = the right
      column's flow height = 5 × 100svh.
   2. Each card and the pentagon are wrapped in 100svh sticky shells,
      all pinned at `top: var(--sticky-stack-top)` — defined as
      `calc(--nav-h + --section-pad-y)` so the line sits below the
      nav AND below the section's own top breathing room, leaving
      the section bg visible as breathing space above the pinned
      content for the entire active cycle.
   3. Cards share a parent so they pile via z-index (card N covers
      N-1); pentagon is sole-child in its column so it just pins.
   4. With sticky offset = `nav_h + pt` and container = 5 × 100svh,
      card 5's engage and release scrolls coincide
      (scroll ≈ section_top + 400svh − nav_h) — the same scroll at
      which the pentagon releases. Cards and pentagon exit the
      section in lockstep.

   ── Reduced motion: the stack is scroll-driven, not animated; no
   ── transitions to skip. The marquee inside step 01 honours
   ── `prefers-reduced-motion` separately (see IntegrationGrid).

   ── A11y: the steps are an <ol> of <li>s with explicit `role="list"`
   ── (Safari strips list semantics when `list-style: none` is set
   ── via Tailwind preflight). The visible "0N" number tile is
   ── aria-hidden because the list semantics already convey position.
   ── The section is `aria-labelledby` the pentagon's <h2>, which is
   ── the visible heading. */

type Step = {
  readonly label: string;
  readonly headline: string;
  readonly subhead: string;
  readonly body: string;
};

const ITEMS: readonly Step[] = [
  {
    label: "Unify context",
    headline: "Unify context into a commercial system of action.",
    subhead:
      "Commercial context is scattered across CRM fields, call notes, inboxes, Slack, spreadsheets, decks, customer conversations, and founder memory — so the team never has one place to decide what to do next.",
    body: "Kithos brings the context behind your product, market, accounts, customers, and outcomes into one shared commercial foundation, so every account decision, conversation, follow-up, and lesson can shape the next move.",
  },
  {
    label: "Find accounts",
    headline: "Find the right accounts.",
    subhead:
      "Without unified context, teams waste scarce commercial time on accounts that were never likely to move, then compensate with more activity: more targets, more calls, and more messages.",
    body: "Kithos reads the unified context to show where commercial time should go: which accounts fit, which signals matter, and which opportunities to leave alone.",
  },
  {
    label: "Move deals",
    headline: "Move the right deals forward.",
    subhead: "Good accounts stall when every touch starts from scratch.",
    body: "Kithos brings account research, buyer priorities, market signals, previous outreach, objections, and deal history into one view of the opportunity, so the team knows who matters, why they should care, and what should happen next.",
  },
  {
    label: "Build the playbook",
    headline: "Build the playbook as you sell.",
    subhead:
      "Every reply, meeting, objection, win, and loss should make the next move sharper.",
    body: "Kithos captures what happened, finds the patterns that work, and turns them into shared commercial memory the whole team can use across targeting, messaging, qualification, follow-up, and the playbook itself.",
  },
  {
    label: "Get your reps in",
    headline: "Get your reps in.",
    subhead:
      "Commercial know-how usually lives in individuals — so it walks out the door when they do, and every new hire starts from zero.",
    body: "When the team works in Kithos, every account worked, message sent, and outcome learned compounds into one shared base everyone draws on — so new reps inherit the team's hard-won context on day one, and the motion gets sharper the more people run it.",
  },
];

/* Sticky shell — full-viewport slot pinned at the sticky-stack line.
   Applied to both the pentagon wrapper and each card's <li>. */
const STICKY_SHELL =
  "relative lg:h-[100svh] lg:sticky lg:top-[var(--sticky-stack-top)]";

/* Visible-square sizing for both pentagon and card content. The
   `max-w` cap guards against short laptop heights (e.g. 1366×768):
   if the column's natural width would produce an aspect-square
   taller than the available viewport area below the pin line, the
   square shrinks to fit instead of clipping at the bottom. `mx-auto`
   centres the smaller square inside the column when that happens. */
const VISIBLE_SQUARE =
  "relative aspect-square lg:mx-auto lg:max-w-[calc(100svh_-_var(--sticky-stack-top)_-_2rem)]";

const SECTION_HEADING_ID = "kithos-mechanism-heading";

/* Forest pentagon — left column. The chamfered silhouette is the
   brand mark's TL segment; the section heading sits in the
   bottom-right corner (the solid side of the chamfer, where the
   visual mass concentrates). */
function PentagonPanel() {
  return (
    <div className="relative">
      <div className={STICKY_SHELL}>
        <div className={VISIBLE_SQUARE}>
          <svg
            viewBox="17.32 17.32 39.68 39.68"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M 54.840 17.320 A 2.160 2.160 0 0 1 57.000 19.480 L 57.000 53.000 A 4.000 4.000 0 0 1 53.000 57.000 L 19.480 57.000 A 2.160 2.160 0 0 1 17.320 54.840 L 17.320 54.840 A 2.160 2.160 0 0 1 18.847 51.153 L 51.153 18.847 A 2.160 2.160 0 0 1 54.840 17.320 Z"
              fill="var(--forest)"
            />
          </svg>
          <div className="absolute inset-0 flex items-end justify-end overflow-hidden p-8 md:p-12 lg:p-14">
            <h2
              id={SECTION_HEADING_ID}
              className="v2-heading max-w-[20ch] text-right text-[var(--bone)]"
            >
              Kithos gives you the tools, insights, and confidence you
              need to crush sales
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Step card — bone-filled square (brand-mark TR segment) carrying
   one step's number tile, headline, subhead, body, and an optional
   embed (the integration marquee on step 01). Rendered as an <li>
   so the stack reads as an ordered list to assistive tech. */
function StepCard({
  step,
  index,
  embed,
}: {
  step: Step;
  index: number;
  embed?: React.ReactNode;
}) {
  return (
    <li className={STICKY_SHELL} style={{ zIndex: index + 1 }}>
      <div className={VISIBLE_SQUARE}>
        <svg
          viewBox="63 17.32 39.68 39.68"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M 63.000 21.320 A 4.000 4.000 0 0 1 67.000 17.320 L 98.680 17.320 A 4.000 4.000 0 0 1 102.680 21.320 L 102.680 53.000 A 4.000 4.000 0 0 1 98.680 57.000 L 67.000 57.000 A 4.000 4.000 0 0 1 63.000 53.000 Z"
            fill="var(--bone)"
            stroke="var(--rule-strong)"
            strokeWidth="0.45"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col overflow-hidden p-8 md:p-12 lg:p-14">
          {/* Tile + headline. items-start keeps the tile against the
              first line when the headline wraps. */}
          <div className="flex items-start gap-5">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--accent)] font-display text-[1.375rem] font-medium leading-none text-[var(--accent-ink)]"
              style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
              aria-hidden
            >
              {`0${index + 1}`}
            </span>
            <h3 className="v2-heading text-[var(--ink)]">{step.headline}</h3>
          </div>
          <p className="lead mt-6 text-[var(--ink-soft)]">{step.subhead}</p>
          <p className="body mt-4 text-[var(--ink-soft)]">{step.body}</p>
          {embed && (
            <div className="mt-8 flex flex-1 items-center justify-center overflow-hidden">
              {embed}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/* Top-rail registration ticks — the 9×9 crosshair at each column
   rail (consistent with the rest of the /v2 page). */
function RailTicks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
    >
      <div className="relative mx-auto h-0 max-w-[86rem]">
        {["left-0", "left-full"].map((p) => (
          <span
            key={p}
            className={`absolute top-0 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 ${p}`}
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--rule-strong)]" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--rule-strong)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function TabbedSections() {
  return (
    <section
      aria-labelledby={SECTION_HEADING_ID}
      className="relative w-full border-t border-[var(--rule)]"
    >
      <RailTicks />
      <div className="bg-[var(--bg)] px-3 py-[var(--section-pad-y)] md:px-5">
        <div className="mx-auto grid w-full max-w-[86rem] grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2">
          <PentagonPanel />
          {/* role="list" is required — Safari drops list semantics
              once Tailwind preflight removes the default marker. */}
          <ol role="list" className="relative">
            {ITEMS.map((step, i) => (
              <StepCard
                key={step.label}
                step={step}
                index={i}
                embed={i === 0 ? <IntegrationGrid /> : undefined}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
