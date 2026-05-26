export function SectionStatementHeadline({
  lead,
  support,
}: {
  lead: string;
  support: string | readonly string[];
}) {
  const supportParts = typeof support === "string" ? [support] : support;

  return (
    <>
      <span className="font-normal text-[var(--ink)]">{lead}</span>
      {supportParts.map((part) => (
        <span key={part}>
          {" "}
          <span className="font-light text-[var(--ink-muted)]">{part}</span>
        </span>
      ))}
    </>
  );
}
