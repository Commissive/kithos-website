import type { ReactNode } from "react";

export type FaqItem = {
  q: string;
  aText: string;
  answer: ReactNode;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is Kithos?",
    aText:
      "Kithos is a commercial reasoning system for B2B teams selling into complex buying environments. It researches activity, assumptions, and signals from across the stack and remembers what each outcome teaches the team — so the whole team can win today's deals with sharper context and get better on the next one.",
    answer: (
      <>
        Kithos is a commercial reasoning system for B2B teams selling into
        complex buying environments. It researches activity, assumptions,
        and signals from across the stack and remembers what each outcome
        teaches the team — so the whole team can win today&apos;s deals
        with sharper context and get better on the next one.
      </>
    ),
  },
  {
    q: "Who is Kithos for?",
    aText:
      "B2B teams selling into complex buying environments — where the right account is not obvious, the buyer is not always the user, and the problem has to be understood before the product can be sold. That includes technical products, regulated markets, and emerging categories where commercial judgment has to stay sharp across the whole team.",
    answer: (
      <>
        B2B teams selling into complex buying environments — where the
        right account is not obvious, the buyer is not always the user,
        and the problem has to be understood before the product can be
        sold. That includes technical products, regulated markets, and
        emerging categories where commercial judgment has to stay sharp
        across the whole team.
      </>
    ),
  },
  {
    q: "How is Kithos different from a CRM?",
    aText:
      "A CRM records activity. Kithos reasons over it — connecting market, account, and buyer signals into a clearer view of who to pursue and what to do next. The CRM stays your system of record; Kithos is the reasoning layer on top.",
    answer: (
      <>
        A CRM records activity. Kithos reasons over it — connecting
        market, account, and buyer signals into a clearer view of who to
        pursue and what to do next. The CRM stays your system of record;
        Kithos is the reasoning layer on top.
      </>
    ),
  },
  {
    q: "How is Kithos different from conversation intelligence or forecasting tools?",
    aText:
      "Conversation intelligence captures what happened on calls. Forecasting tools predict where pipeline will land. Kithos researches the full account picture, remembers what outcomes teach the team, and answers what this seller should do next — across market focus, account priority, and the buying path.",
    answer: (
      <>
        Conversation intelligence captures what happened on calls.
        Forecasting tools predict where pipeline will land. Kithos
        researches the full account picture, remembers what outcomes teach
        the team, and answers what this seller should do next — across
        market focus, account priority, and the buying path.
      </>
    ),
  },
  {
    q: "What does “commercial reasoning” mean?",
    aText:
      "The judgment a strong seller applies before each move: which segment to focus on, which accounts deserve attention, who matters in the deal, and what should happen next. Kithos makes that judgment repeatable — research builds the context to win; memory carries the intelligence to win forward.",
    answer: (
      <>
        The judgment a strong seller applies before each move: which
        segment to focus on, which accounts deserve attention, who
        matters in the deal, and what should happen next. Kithos makes
        that judgment repeatable — research builds the context to win;
        memory carries the intelligence to win forward.
      </>
    ),
  },
  {
    q: "How do I get access?",
    aText:
      "Kithos is in early access. Apply through the form below and we'll review and reply within a few business days.",
    answer: (
      <>
        Kithos is in early access. Apply through the{" "}
        <a
          href="#access"
          className="interactive-text-link underline-offset-[4px]"
        >
          form below
        </a>{" "}
        and we&apos;ll review and reply within a few business days.
      </>
    ),
  },
];

export function faqJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.aText },
    })),
  };
}
