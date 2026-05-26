const GRID_CELL = "16px";

export function SectionGridBackground({
  tone = "bone",
  className = "",
}: {
  tone?: "bone" | "forest";
  className?: string;
}) {
  const forest = tone === "forest";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${
        forest ? "opacity-[0.35]" : "opacity-[0.35]"
      } ${className}`}
      style={{
        backgroundImage: forest
          ? "var(--surface-grid-forest)"
          : "var(--surface-grid-bone)",
        backgroundSize: `${GRID_CELL} ${GRID_CELL}`,
        ...(forest
          ? {
              maskImage:
                "radial-gradient(ellipse 90% 80% at 20% 0%, black 20%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 80% at 20% 0%, black 20%, transparent 72%)",
            }
          : {}),
      }}
    />
  );
}

export function GridTick({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--rule-strong)]" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--rule-strong)]" />
    </span>
  );
}

export function SectionRuleTicks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-[var(--page-gutter)]"
    >
      <div className="relative h-0 w-full max-w-[var(--page-max)]">
        <GridTick className="left-0 top-0" />
        <GridTick className="left-full top-0" />
      </div>
    </div>
  );
}

export function PageStructuralFrame() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 flex justify-center px-[var(--page-gutter)]"
      >
        <div className="relative h-full w-full max-w-[var(--page-max)]">
          <GridTick className="left-0 top-full" />
          <GridTick className="left-full top-full" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[var(--rule)]"
      />
    </>
  );
}
