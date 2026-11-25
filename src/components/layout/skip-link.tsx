import { logger } from "@/lib/logger";
import { prefersReducedMotion } from "@/lib/motion";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main-content");
        if (!main) return;
        main.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        main.focus({ preventScroll: true });
        logger.event("a11y:skip-link");
      }}
    >
      Skip to main content
    </a>
  );
}
