import { type CSSProperties, type ReactNode } from "react";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** 1440px cap + 24px gutters — Attio `lg:px-6` outer track. */
export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("page-shell flex w-full flex-col items-center", className)}>
      {children}
    </div>
  );
}

/** 1392px column inside the shell — Attio `max-w-[1392px]`. */
export function PageColumn({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("page-column flex w-full flex-col", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/** 12-column grid with 24px gutters at lg — Attio `lg:grid-cols-12 lg:gap-x-6`. */
export function PageGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("page-grid w-full", className)}>{children}</div>;
}

/**
 * Primary copy column — Attio `col-span-10 col-start-2 max-w-[28em]`
 * with `pt-20 pb-16 lg:pt-[120px]`.
 */
export function PageGridProse({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("page-grid-prose", className)}>{children}</div>;
}

/** Full-width row inside the 12-col grid (cards, demos). */
export function PageGridFull({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("page-grid-full", className)}>{children}</div>;
}
