import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Outer shell: 1200px max width plus inline gutters. */
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

/** Content column inside the shell (shell max 1200px minus gutters). */
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
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("page-grid-full", className)} {...rest}>
      {children}
    </div>
  );
}
