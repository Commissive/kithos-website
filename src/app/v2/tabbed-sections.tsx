import { IntegrationGrid } from "./integration-grid";

/* Pinned stack — the four sequenced statements. Each panel pins to
   the viewport and the next scrolls up and covers it, so exactly one
   step (and one left-side marker) is visible at a time and they pile
   on top of each other. Pure CSS sticky stacking — no scroll JS,
   reduced-motion safe. Desktop pins; mobile falls back to a normal
   stacked scroll. Rendered in Kithos's restrained identity. */

const ITEMS = [
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
    headline: "Every rep makes the whole team sharper.",
    subhead:
      "Commercial know-how usually lives in individuals — so it walks out the door when they do, and every new hire starts from zero.",
    body: "When the team works in Kithos, every account worked, message sent, and outcome learned compounds into one shared base everyone draws on — so new reps inherit the team's hard-won context on day one, and the motion gets sharper the more people run it.",
  },
];

export function TabbedSections() {
  return (
    <section
      aria-label="What Kithos does"
      className="relative w-full border-t border-[var(--rule)]"
    >
      {/* Section rule ticks at the column rails (matches the site grid) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
      >
        <div className="relative mx-auto h-0 max-w-[78rem]">
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

      {ITEMS.map((it, i) => {
        const isFirst = i === 0;
        return (
          <div
            key={it.label}
            // Sticky stack: each panel pins at the top; the next panel
            // (later in the DOM, higher z) scrolls up and covers it.
            // Opaque bg so it fully hides the panel beneath; hairline
            // top rule reads as the card edge sliding over.
            className="relative overflow-hidden border-t border-[var(--rule)] bg-[var(--bg)] first:border-t-0 lg:sticky lg:top-0 lg:h-[100svh]"
            style={{ zIndex: i + 1 }}
          >
            <div
              className="mx-auto grid w-full max-w-[78rem] grid-cols-12 gap-x-8 px-6 py-20 md:px-10 lg:h-full lg:items-start lg:py-0 lg:pt-[18svh]"
            >
              {/* Single left marker — only this step's number+label,
                  one at a time. */}
              <div className="col-span-12 mb-8 flex items-center gap-5 lg:col-span-3 lg:mb-0">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--accent)] font-display text-[1.375rem] font-medium leading-none text-[var(--accent-ink)]"
                  style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                  aria-hidden
                >
                  {`0${i + 1}`}
                </span>
                <span className="label text-[var(--ink)]">{it.label}</span>
              </div>

              {/* Content */}
              <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                <h2 className="v2-heading max-w-[28ch]">{it.headline}</h2>
                <p className="lead mt-6 max-w-[52ch] text-[var(--ink-soft)]">
                  {it.subhead}
                </p>
                <p className="body mt-5 max-w-[52ch] text-[var(--ink-soft)]">
                  {it.body}
                </p>
                {isFirst && (
                  // The lattice visualises "unify scattered context
                  // into one foundation". Its radial mask + the
                  // panel's overflow-hidden dissolve/clip it cleanly
                  // so the panel stays exactly one viewport.
                  <div className="mt-12 flex justify-center lg:mt-16 lg:justify-start">
                    <IntegrationGrid />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
