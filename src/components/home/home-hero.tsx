import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { Container } from "@/components/ui/container";
import { WHATSAPP } from "@/constants/site";
import { useHeroIntro } from "@/hooks/use-hero-intro";
import type { HeroContent } from "@/types/content";

/** Home hero: full-bleed photographic backdrop on large landscape screens. */
export function HomeHero({ content }: { content: HeroContent }) {
  const introRef = useHeroIntro<HTMLDivElement>();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-section relative isolate overflow-hidden"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <img
          src={content.image.src}
          width={content.image.width}
          height={content.image.height}
          alt=""
          decoding="async"
          loading="eager"
          className="block h-full w-full object-cover"
        />
        <div className="hero-scrim" />
      </div>

      <Container className="hero-grid">
        <div ref={introRef} className="flex flex-col items-start gap-6">
          <p
            data-hero-item
            className="text-sm font-semibold tracking-[0.01em] text-brand min-[1024px]:landscape:text-[#c7ddd0]"
          >
            {content.eyebrow}
          </p>

          <h1
            data-hero-item
            id="hero-title"
            className="max-w-[14ch] text-hero font-bold leading-[1.08] tracking-[-0.028em] text-ink min-[1024px]:landscape:text-white max-lg:max-w-[18ch]"
          >
            {content.title}
          </h1>

          <p
            data-hero-item
            className="max-w-[50ch] text-lg leading-relaxed text-muted min-[1024px]:landscape:text-[#e4ece7] max-sm:text-base"
          >
            {content.copy}
          </p>

          <div data-hero-item className="mt-2 w-full">
            <WhatsAppCta
              source="home-hero"
              context="homeHero"
              size="lg"
              className="min-[1024px]:landscape:border-white/25 min-[1024px]:landscape:bg-sage min-[1024px]:landscape:text-brand-active min-[1024px]:landscape:hover:bg-white max-sm:w-full"
            >
              {WHATSAPP.primaryCtaLabel}
            </WhatsAppCta>
          </div>
        </div>

        <figure className="hero-media-frame">
          <img
            src={content.image.src}
            width={content.image.width}
            height={content.image.height}
            alt={content.image.alt}
            decoding="async"
            className="hero-media"
          />
        </figure>
      </Container>
    </section>
  );
}
