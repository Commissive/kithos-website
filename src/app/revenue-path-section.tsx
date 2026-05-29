import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import {
  ScrollLinkedTour,
  type ScrollLinkedPanel,
} from "./scroll-linked-tour";

const REVENUE_PATH_HEADLINE =
  "A reasoning layer for the revenue workflow.";
const REVENUE_PATH_SUBHEAD =
  "Kithos builds a working understanding of your market, accounts, buyers, actions, and outcomes, then helps you make sharper commercial decisions.";

const COMMERCIAL_REASONING_PANELS: readonly ScrollLinkedPanel[] = [
  {
    id: "knowledge",
    navLabel: "Knowledge",
    titleVariant: "statement",
    title:
      "Kithos builds a commercial understanding of your market, accounts, buyers, and past outcomes.",
    cards: [
      {
        title: "Collects the raw context",
        body: "Kithos gathers product context, positioning, sales activity, customer evidence, team assumptions, account data, and market signals from connected tools, external sources, and interactions with your team.",
      },
      {
        title: "Curates the context",
        body: "Kithos understands what matters at each point in the commercial lifecycle. It separates useful signal from background noise, identifies the details that can change a decision, and knows which context matters for each account, action, and moment.",
      },
    ],
  },
  {
    id: "accounts",
    navLabel: "Accounts",
    title: "Find the accounts worth pursuing",
    body: "Move from broad market possibility to the accounts, segments, and buying signals worth your team's attention. Kithos weighs fit, timing, evidence, and buyer context, so the team spends less time chasing maybes and more time where there is a real reason to engage.",
  },
  {
    id: "path",
    navLabel: "Path",
    title: "Understand the path through each account",
    body: "See who matters, why they care, what proof they need, and how the deal is likely to move. Kithos maps stakeholders, priorities, risks, timing signals, and entry points, so outreach, meetings, and follow-ups start with the context needed to move the conversation forward.",
  },
  {
    id: "outcomes",
    navLabel: "Outcomes",
    title: "Kithos is always learning.",
    body: "Every reply, silence, objection, meeting, win, and loss produces evidence. Kithos turns that evidence into commercial memory, so the next account, message, follow-up, and deal decision starts sharper than the last.",
  },
];

export function RevenuePathSection() {
  return (
    <section
      id="revenue-path"
      aria-labelledby="revenue-path-heading"
      className="revenue-path page-section-alt relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <header className="section-heading-band">
                <div className="section-heading-row">
                  <div className="section-heading-row__title">
                    <h2
                      id="revenue-path-heading"
                      className="type-statement section-heading-title"
                    >
                      {REVENUE_PATH_HEADLINE}
                    </h2>
                  </div>
                  <p className="lead section-heading-support section-heading-row__support">
                    {REVENUE_PATH_SUBHEAD}
                  </p>
                </div>
              </header>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>

      <ScrollLinkedTour
        navLabel="Commercial reasoning"
        panels={COMMERCIAL_REASONING_PANELS}
      />
    </section>
  );
}
