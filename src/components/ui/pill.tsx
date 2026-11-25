import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-line bg-sage px-3 py-1.5 text-xs font-semibold leading-tight text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
