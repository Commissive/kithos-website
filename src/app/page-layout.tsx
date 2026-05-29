import { type CSSProperties, type ReactNode } from "react";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Outer shell: page max cap plus inline gutters (24px). */
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

/** 1110px content column inside the shell. */
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

/** Twelve-column grid with 24px gutters at lg. */
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
 * Primary copy column — full width of the 12-col grid at lg.
 * Section vertical rhythm uses 80px / 120px steps via layout tokens.
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
