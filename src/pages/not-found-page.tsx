import { Link } from "react-router-dom";
import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { PageShell } from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function NotFoundPage() {
  useDocumentMeta({
    title: "Page not found — Annapoorneshwari Tours & Travellers",
    description: "The page you are looking for does not exist. Return to the home page.",
  });

  return (
    <PageShell>
      <Container className="flex flex-col items-start gap-6 py-24 max-sm:py-16">
        <p className="text-sm font-semibold text-brand">Page not found</p>
        <h1 className="text-h2 font-bold tracking-[-0.024em] text-ink">
          This route does not exist.
        </h1>
        <p className="max-w-[52ch] text-base text-muted">
          The link may be outdated. Head back to the home page, explore our service gallery, or
          message us directly on WhatsApp.
        </p>

        <div className="flex flex-wrap items-center gap-3 max-sm:w-full max-sm:flex-col">
          <Link to="/" className={buttonVariants()}>
            Back to home
          </Link>
          <Link to="/gallery" className={buttonVariants({ variant: "secondary" })}>
            View services
          </Link>
          <WhatsAppCta
            source="404"
            context="notFound"
            className="max-sm:w-full"
          >
            Chat on WhatsApp
          </WhatsAppCta>
        </div>
      </Container>
    </PageShell>
  );
}
