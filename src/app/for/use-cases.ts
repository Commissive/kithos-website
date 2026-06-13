/* The three buying-environment archetypes from the home page, given a
   standalone page each. The four-pillar spine is fixed — only the body
   copy is reasoned from how buying works in each environment. */

export type UseCasePillar = {
  phase: string;
  body: string;
};

export type UseCase = {
  slug: string;
  name: string;
  eyebrow: string;
  /** Headline split — the em phrase renders in serif italic. */
  headline: string;
  headlineEm: string;
  support: string;
  metaTitle: string;
  metaDescription: string;
  pillars: UseCasePillar[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "regulated-markets",
    name: "Regulated markets",
    eyebrow: "Kithos for regulated markets",
    headline: "Selling where trust gates",
    headlineEm: "every deal.",
    support:
      "In healthcare, finance, legal, defence, and energy, the product is never the whole sale. Procurement, security, legal, and compliance each hold a veto — and the seller who respects the process, and never drops a thread, wins.",
    metaTitle: "Kithos for Regulated Markets",
    metaDescription:
      "Commercial reasoning for teams selling into healthcare, finance, legal, defence, and energy — where trust and process gate every deal.",
    pillars: [
      {
        phase: "Find the right accounts",
        body: "Regulatory change is a buying signal. Kithos watches the markets you serve — new mandates, audit cycles, compliance hires, leadership changes — and ranks the accounts where the pressure to act is already building.",
      },
      {
        phase: "Shape the opportunity",
        body: "First contact has to sound like you understand the stakes. Kithos drafts outreach in the language of the regulated buyer — careful, specific, evidence-led — and maps who will actually carry the decision through review.",
      },
      {
        phase: "Move the deal forward",
        body: "Long cycles punish dropped threads. Kithos tracks every stakeholder from champion to security reviewer, keeps each follow-up moving, and prepares the proof each gate demands before it is asked for.",
      },
      {
        phase: "Learn what to repeat",
        body: "Every completed review teaches the next one. Kithos remembers which paths cleared procurement fastest, which objections legal raised, and what evidence closed them — so the second deal in a market moves faster than the first.",
      },
    ],
  },
  {
    slug: "technical-products",
    name: "Technical products",
    eyebrow: "Kithos for technical products",
    headline: "Selling what has to be",
    headlineEm: "understood first.",
    support:
      "In developer tools, cybersecurity, infrastructure, and applied AI, nothing sells until the problem is understood — and the buyer who signs is rarely the engineer who evaluates. Kithos handles both conversations without losing either.",
    metaTitle: "Kithos for Technical Products",
    metaDescription:
      "Commercial reasoning for teams selling developer tools, cybersecurity, infrastructure, and applied AI — where nothing sells until the problem is understood.",
    pillars: [
      {
        phase: "Find the right accounts",
        body: "The strongest signal is technical: stack choices, incidents, hiring for the problem you solve. Kithos reads those signals and ranks the accounts already feeling the pain your product removes.",
      },
      {
        phase: "Shape the opportunity",
        body: "Engineers punish generic outreach. Kithos drafts the first message in your market's technical language — anchored to what the account actually runs and what just changed — so it earns a reply instead of a delete.",
      },
      {
        phase: "Move the deal forward",
        body: "The evaluation lives with engineering; the budget lives upstairs. Kithos keeps a strategy for both — proof for the practitioner, a value case for the buyer — and plans the move that connects them.",
      },
      {
        phase: "Learn what to repeat",
        body: "Which proof actually converts — the benchmark, the pilot, the architecture review? Kithos learns from every win and loss which path turned evaluators into champions, and makes it your team's default.",
      },
    ],
  },
  {
    slug: "industrial-operations",
    name: "Industrial operations",
    eyebrow: "Kithos for industrial operations",
    headline: "Selling where the user",
    headlineEm: "doesn't sign.",
    support:
      "In manufacturing, supply chain, procurement, and construction, the person who feels the problem is rarely the person who approves the spend — and the cycle runs through budgets, committees, and seasons. Kithos keeps the whole long arc moving.",
    metaTitle: "Kithos for Industrial Operations",
    metaDescription:
      "Commercial reasoning for teams selling into manufacturing, supply chain, procurement, and construction — where the buyer is rarely the user and cycles run long.",
    pillars: [
      {
        phase: "Find the right accounts",
        body: "Operational change is the trigger: a new facility, a supply disruption, a cost mandate, a leadership change. Kithos watches for it across your territories and ranks the accounts where now is real.",
      },
      {
        phase: "Shape the opportunity",
        body: "The operator's pain and the buyer's case are different stories. Kithos maps both — who runs the line, who owns the budget — and shapes outreach each can forward to the other.",
      },
      {
        phase: "Move the deal forward",
        body: "Committee buying runs on patience and proof. Kithos tracks every stakeholder across the months, times each move to budget windows, and never lets a quiet quarter become a dead deal.",
      },
      {
        phase: "Learn what to repeat",
        body: "Kithos learns how your wins actually sequence — site-level proof before the corporate conversation, which references travel between plants — and turns it into the playbook for the next region.",
      },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((useCase) => useCase.slug === slug);
}
