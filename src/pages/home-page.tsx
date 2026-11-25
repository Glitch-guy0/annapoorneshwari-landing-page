import { FaqSection } from "@/components/home/faq-section";
import { HomeHero } from "@/components/home/home-hero";
import { PageShell } from "@/components/layout/page-shell";
import { HOME_HERO } from "@/constants/home";
import { PAGE_META } from "@/constants/site";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function HomePage() {
  useDocumentMeta(PAGE_META.home);

  return (
    <PageShell headerOverlay>
      <HomeHero content={HOME_HERO} />
      <FaqSection />
    </PageShell>
  );
}
