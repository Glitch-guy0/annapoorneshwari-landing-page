import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  titleId?: string;
  as?: "h1" | "h2";
  size?: "hero" | "section";
  className?: string;
  eyebrowClassName?: string;
  leadClassName?: string;
  children?: ReactNode;
};

/** Shared eyebrow + heading + lead block used across both pages. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  titleId,
  as = "h2",
  size = "section",
  className,
  eyebrowClassName,
  leadClassName,
  children,
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <div className={cn("flex flex-col items-start gap-4", className)}>
      <p className={cn("text-sm font-semibold text-brand", eyebrowClassName)}>{eyebrow}</p>
      <Heading
        id={titleId}
        className={cn(
          "max-w-[20ch] font-bold leading-[1.08] tracking-[-0.028em] text-ink",
          size === "hero" ? "text-hero" : "text-h2",
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "max-w-[58ch] text-base leading-relaxed text-muted",
            size === "hero" && "text-lg",
            leadClassName,
          )}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
