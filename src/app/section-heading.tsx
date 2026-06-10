import {
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function SectionHeadingBand({
  children,
  className = "",
  center = false,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <header
      className={cn(
        "section-heading-band",
        center && "section-heading-band--center",
        className,
      )}
    >
      {children}
    </header>
  );
}

export function SectionHeadingStack({
  children,
  className = "",
  center = false,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "section-heading-stack",
        center && "section-heading-stack--center",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeadingRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("section-heading-row", className)}>{children}</div>
  );
}

export function SectionHeadingRowTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("section-heading-row__title", className)}>{children}</div>
  );
}

export type SectionHeadingTitleProps = ComponentPropsWithoutRef<"h2"> & {
  center?: boolean;
};

export function SectionHeadingTitle({
  children,
  className = "",
  center = false,
  ...rest
}: SectionHeadingTitleProps) {
  return (
    <h2
      className={cn(
        "type-statement section-heading-title",
        center && "section-heading-title--center",
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

export type SectionHeadingSupportProps = ComponentPropsWithoutRef<"p">;

/** Section subhead — typography and width from globals (do not add per-section classes). */
export function SectionHeadingSupport({
  children,
  className = "",
  ...rest
}: SectionHeadingSupportProps) {
  return (
    <p className={cn("section-heading-support", className)} {...rest}>
      {children}
    </p>
  );
}
