import { SectionStatementHeadline } from "./section-statement-headline";

export type CommercialReasoningCardContent = {
  step: number;
  lead: string;
  support: string | readonly string[];
};

export function CommercialReasoningCard({
  feature,
}: {
  feature: CommercialReasoningCardContent;
}) {
  const headingId = `commercial-reasoning-${feature.step}-${feature.lead.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article aria-labelledby={headingId} className="commercial-reasoning-card">
      <h3
        id={headingId}
        className="commercial-reasoning-card__copy text-pretty"
      >
        <SectionStatementHeadline lead={feature.lead} support={feature.support} />
      </h3>
    </article>
  );
}
