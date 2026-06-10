type ProblemSectionCellGridProps = {
  cols: number;
  rows?: number;
  className?: string;
};

export function ProblemSectionCellGrid({
  cols,
  rows = 1,
  className,
}: ProblemSectionCellGridProps) {
  const cellCount = cols * rows;

  return (
    <div aria-hidden className={className}>
      {Array.from({ length: cellCount }, (_, index) => (
        <span
          key={index + 1}
          className={[
            "problem-section__cell",
            rows > 1 && index >= cols && "problem-section__cell--row-break",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </div>
  );
}

type ProblemSectionCellRowProps = {
  cols: number;
};

export function ProblemSectionCellRow({ cols }: ProblemSectionCellRowProps) {
  return (
    <ProblemSectionCellGrid
      cols={cols}
      rows={1}
      className="problem-section__cell-row"
    />
  );
}
