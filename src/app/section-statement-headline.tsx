export function SectionStatementHeadline({
  lead,
  support,
}: {
  lead: string;
  support: string;
}) {
  return (
    <>
      <span className="font-medium text-[var(--ink)]">{lead}</span>{" "}
      <span className="font-normal text-[var(--ink-muted)]">{support}</span>
    </>
  );
}
