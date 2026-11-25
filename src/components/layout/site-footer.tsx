import { Link } from "react-router-dom";
import { CallCta } from "@/components/common/call-cta";
import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { NavItemLink } from "@/components/layout/nav-item-link";
import { Container } from "@/components/ui/container";
import { BRAND, CONTACT_ENTRIES, FOOTER_COPY, NAV_ITEMS, WHATSAPP } from "@/constants/site";
import type { ContactEntry } from "@/types/content";

function ContactValue({ entry }: { entry: ContactEntry }) {
  if (!entry.hrefPrefix) return <>{entry.value}</>;

  const href =
    entry.hrefPrefix === "tel:"
      ? `tel:${entry.value.replace(/[^\d+]/g, "")}`
      : `mailto:${entry.value}`;

  return (
    <a
      href={href}
      className="font-medium text-brand underline underline-offset-2 transition-colors hover:text-brand-hover"
    >
      {entry.value}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-surface py-16 pb-10 max-sm:py-12 max-sm:pb-8">
      <Container>
        <div className="grid items-start gap-10 border-b border-line pb-10 max-lg:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold tracking-[-0.015em] text-ink">{BRAND.name}</p>
            <p className="max-w-[48ch] text-sm leading-relaxed text-muted">
              {FOOTER_COPY.description}
            </p>

            {CONTACT_ENTRIES.length > 0 ? (
              <ul className="flex flex-col gap-2 pt-1 text-sm text-muted">
                {CONTACT_ENTRIES.map((entry) => (
                  <li key={entry.label}>
                    {entry.label}: <ContactValue entry={entry} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-4 max-lg:items-start">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-end gap-3 max-lg:justify-start"
            >
              {NAV_ITEMS.map((item) => (
                <NavItemLink key={item.to} item={item} />
              ))}
            </nav>

            <div className="flex flex-wrap items-center justify-end gap-3 max-sm:w-full max-sm:flex-col max-sm:items-stretch">
              <CallCta className="max-sm:w-full" />

              <WhatsAppCta source="footer" context="footer" className="max-sm:w-full">
                {WHATSAPP.headerCtaLabel}
              </WhatsAppCta>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-sm text-muted">
          <p>{FOOTER_COPY.copyright}</p>
          <div className="flex items-center gap-4">
            <Link
              to="/license"
              className="text-xs text-muted underline underline-offset-2 transition-colors hover:text-ink"
            >
              Terms & License
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
