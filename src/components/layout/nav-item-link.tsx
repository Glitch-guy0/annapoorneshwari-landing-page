import { NavLink } from "react-router-dom";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/content";

export const navLinkClassName =
  "inline-flex min-h-11 items-center justify-center rounded-btn px-3.5 py-2 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-sage hover:text-ink max-sm:px-2.5";

export function NavItemLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      onClick={() => logger.event("nav:click", { to: item.to, label: item.label })}
      className={({ isActive }) =>
        cn(
          navLinkClassName,
          isActive && "bg-sage font-semibold text-brand hover:bg-sage hover:text-brand",
        )
      }
    >
      {item.label}
    </NavLink>
  );
}
