import { ScrollToSectionLink } from "@/components/common/scroll-to-section-link";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/ui/container";
import { GALLERY_INTRO, GALLERY_ITEMS } from "@/constants/gallery";

export function GalleryIntro() {
  return (
    <section
      aria-labelledby="gallery-title"
      className="pb-10 pt-16 max-lg:pt-12 max-sm:pb-6 max-sm:pt-8"
    >
      <Container>
        <SectionHeading
          as="h1"
          size="hero"
          eyebrow={GALLERY_INTRO.eyebrow}
          title={GALLERY_INTRO.title}
          lead={GALLERY_INTRO.lead}
          titleId="gallery-title"
          className="max-w-[720px]"
          leadClassName="max-w-[58ch]"
        >
          <nav aria-label="Service sections" className="mt-2 flex flex-wrap items-center gap-2">
            {GALLERY_ITEMS.map((item) => (
              <ScrollToSectionLink
                key={item.id}
                targetId={item.id}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-pill border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:border-brand hover:bg-sage hover:text-brand-active"
              >
                <span className="font-bold text-brand">{item.number}</span>
                <span>{item.eyebrow}</span>
              </ScrollToSectionLink>
            ))}
          </nav>
        </SectionHeading>
      </Container>
    </section>
  );
}
