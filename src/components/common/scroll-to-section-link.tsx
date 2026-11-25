import type { ReactNode } from "react";
import { logger } from "@/lib/logger";
import { prefersReducedMotion } from "@/lib/motion";

type ScrollToSectionLinkProps = {
  targetId: string;
  children: ReactNode;
  className?: string;
};

/**
 * In-page jump link that works with hash-based routing on GitHub Pages.
 * A plain `href="#id"` would be read as a route change by HashRouter.
 */
export function ScrollToSectionLink({
  targetId,
  children,
  className,
}: ScrollToSectionLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        if (!target) {
          logger.warn(`Scroll target not found: ${targetId}`);
          return;
        }
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        logger.event("scroll:section", { targetId });
      }}
    >
      {children}
    </a>
  );
}
