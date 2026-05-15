import type { Metadata } from "next";
import { Nav } from "../nav";
import { MetaStrip } from "../meta-strip";

export const metadata: Metadata = {
  title: "FAQ — Kithos",
  description:
    "Common questions about Kithos — the commercial reasoning system for early B2B teams.",
  alternates: { canonical: "/faq" },
};

type QA = { q: string; a: React.ReactNode; aText: string };

const faqs: QA[] = [
  {
    q: "What is Kithos?",
    aText:
      "Kithos is a commercial reasoning system for early B2B teams. It connects the context already happening across the stack — CRM fields, call notes, inboxes, Slack threads, decks — and tells each seller what to do next on each account.",
    a: (
      <>
        Kithos is a commercial reasoning system for early B2B teams. It
        connects the context already happening across the stack — CRM
        fields, call notes, inboxes, Slack threads, decks — and tells each
        seller what to do next on each account.
      </>
    ),
  },
  {
    q: "Who is Kithos for?",
    aText:
      "Founder-led commercial teams at early B2B startups, typically two to five sellers. Teams that have product-market fit signal, are running real deals, and need their motion to scale beyond what individual memory can hold.",
    a: (
      <>
        Founder-led commercial teams at early B2B startups, typically two
        to five sellers. Teams that have product-market fit signal, are
        running real deals, and need their motion to scale beyond what
        individual memory can hold.
      </>
    ),
  },
  {
    q: "How is Kithos different from a CRM?",
    aText:
      "A CRM is a database — it records the activity. Kithos reasons over that activity. It pulls together the relevant context across CRM fields, call notes, inboxes, and Slack threads, then recommends the next move for each account.",
    a: (
      <>
        A CRM is a database — it records the activity. Kithos reasons over
        that activity. It pulls together the relevant context across CRM
        fields, call notes, inboxes, and Slack threads, then recommends
        the next move for each account.
      </>
    ),
  },
  {
    q: "How is Kithos different from Gong or Clari?",
    aText:
      "Conversation intelligence captures what happened in calls. Forecasting tools predict where pipeline will land. Kithos focuses on the in-between: given everything we know about this account right now, what should this seller do next?",
    a: (
      <>
        Conversation intelligence captures what happened in calls.
        Forecasting tools predict where pipeline will land. Kithos focuses
        on the in-between: given everything we know about this account
        right now, what should this seller do next?
      </>
    ),
  },
  {
    q: "What does “commercial reasoning” mean?",
    aText:
      "The judgment a senior seller applies before each move: where to focus this week, who really matters in the buying committee, why they should care, and how to advance the deal. Kithos systematizes that judgment so the whole team has access to it.",
    a: (
      <>
        The judgment a senior seller applies before each move: where to
        focus this week, who really matters in the buying committee, why
        they should care, and how to advance the deal. Kithos
        systematizes that judgment so the whole team has access to it.
      </>
    ),
  },
  {
    q: "How do I get access?",
    aText:
      "Kithos is in early access. Apply through the form on the home page and we'll review and reply within a few business days.",
    a: (
      <>
        Kithos is in early access. Apply through the form on the{" "}
        <a
          href="/"
          className="font-medium text-[var(--ink)] underline-offset-[4px] hover:underline"
        >
          home page
        </a>{" "}
        and we&apos;ll review and reply within a few business days.
      </>
    ),
  },
];

function ldJson(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.aText },
    })),
  };

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto w-full max-w-[78rem] px-6 pt-20 pb-28 md:px-10 md:pt-28 md:pb-36">
        <article className="mx-auto max-w-[70ch]">
          <p className="label">Common questions</p>
          <h1 className="display-3 mt-4">FAQ</h1>

          <p className="body mt-10 text-[var(--ink-soft)]">
            Short answers about what Kithos is, who it&apos;s for, and how
            it fits next to the tools your team already uses.
          </p>

          <div className="mt-16 space-y-14">
            {faqs.map((f) => (
              <section key={f.q}>
                <h2 className="display-5">{f.q}</h2>
                <p className="body mt-4 text-[var(--ink-soft)]">{f.a}</p>
              </section>
            ))}
          </div>

          <p className="body mt-20 text-[var(--ink-soft)]">
            Something missing —{" "}
            <a
              href="mailto:hello@kithos.ai"
              className="font-medium text-[var(--ink)] underline-offset-[4px] hover:underline"
            >
              hello@kithos.ai
            </a>
            .
          </p>
        </article>
      </main>

      <footer className="bg-[var(--accent)]">
        <div className="mx-auto w-full max-w-[78rem] px-6 py-8 md:px-10 md:py-10">
          <MetaStrip />
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(faqSchema) }}
      />
    </>
  );
}
