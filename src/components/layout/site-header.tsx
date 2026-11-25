import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/common/brand-logo";
import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { NavItemLink } from "@/components/layout/nav-item-link";
import { Container } from "@/components/ui/container";
import { BRAND, NAV_ITEMS, WHATSAPP } from "@/constants/site";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /** Overlays the hero on large landscape screens (home page only). */
  overlay?: boolean;
};

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  return (
    <header className={cn("site-header", overlay && "site-header--overlay")}>
      <Container className="flex min-h-[72px] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 max-sm:min-h-16">
        <Link
          to="/"
          aria-label={`${BRAND.name} — home`}
          onClick={() => logger.event("brand:click", { location: "header" })}
          className="inline-flex min-h-11 min-w-0 items-center gap-3 text-ink"
        >
          <BrandLogo />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex flex-none items-center gap-2 max-sm:w-full max-sm:justify-between"
        >
          <div className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <NavItemLink key={item.to} item={item} />
            ))}
          </div>

          <WhatsAppCta source="header" context="header" className="max-sm:px-3.5 max-sm:text-[0.8125rem]">
            <span className="max-[419px]:hidden">{WHATSAPP.headerCtaLabel}</span>
            <span className="min-[420px]:hidden">{WHATSAPP.shortCtaLabel}</span>
          </WhatsAppCta>
        </nav>
      </Container>
    </header>
  );
}
