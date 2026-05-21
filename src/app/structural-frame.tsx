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
      className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
    >
      <div className="relative mx-auto h-0 max-w-[var(--page-max)]">
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
        className="pointer-events-none absolute inset-0 z-10 px-6 md:px-10"
      >
        <div className="relative mx-auto h-full max-w-[var(--page-max)] border-x border-[var(--rule)]">
          <GridTick className="left-0 top-0" />
          <GridTick className="left-full top-0" />
          <GridTick className="left-0 top-full" />
          <GridTick className="left-full top-full" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[var(--rule)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[var(--rule)]"
      />
    </>
  );
}
