import "./section-rule.css";

/* SectionRule — a horizontal gridline in the vline tint that spans between the
   section vlines (see site-grid.css), continuing the grid frame. Desktop-only.

   - placement="inline" (default): an in-flow rule. Drop it between a section's
     heading band and its content; its own margins centre it in the gap (the
     adjacent margins are neutralised in section-rule.css).
   - placement="end": pinned to the section's bottom edge. Render it as a child
     of the section, which must be position: relative. */
export function SectionRule({
  placement = "inline",
}: {
  placement?: "inline" | "end";
}) {
  return (
    <div
      aria-hidden
      className={placement === "end" ? "section-rule-end" : "section-rule"}
    />
  );
}
