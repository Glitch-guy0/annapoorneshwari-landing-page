import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { Pill } from "@/components/ui/pill";
import { useReveal } from "@/hooks/use-reveal";
import type { GalleryItem } from "@/types/content";

type ServiceRowProps = {
  item: GalleryItem;
  index: number;
};

/**
 * One service in the zig-zag showcase. The overlap and responsive stacking
 * live in `styles/index.css` so both directions stay in sync.
 */
export function ServiceRow({ item, index }: ServiceRowProps) {
  const revealRef = useReveal<HTMLElement>({ delay: 0.04 });
  const headingId = `gallery-heading-${item.id}`;
  const direction = index % 2 === 0 ? "image-left" : "image-right";

  return (
    <article
      ref={revealRef}
      id={item.id}
      data-direction={direction}
      aria-labelledby={headingId}
      className="gallery-row"
    >
      <div className="gallery-media-frame">
        <div className="gallery-media-stage">
          <img
            src={item.image.src}
            width={item.image.width}
            height={item.image.height}
            alt={item.image.alt}
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            className="gallery-media"
          />
        </div>
      </div>

      <div className="gallery-card">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand">{item.eyebrow}</p>

        <h2
          id={headingId}
          className="text-h2 font-bold leading-[1.16] tracking-[-0.022em] text-ink"
        >
          {item.title}
        </h2>

        <p className="max-w-[54ch] text-base leading-relaxed text-muted">{item.description}</p>

        {item.highlights.length > 0 ? (
          <ul className="mt-1 flex flex-wrap gap-2">
            {item.highlights.map((highlight) => (
              <li key={highlight}>
                <Pill>{highlight}</Pill>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-2">
          <WhatsAppCta
            source={`gallery:${item.id}`}
            topic={item.whatsappTopic}
            variant="secondary"
            className="max-sm:w-full"
          >
            {item.ctaLabel}
          </WhatsAppCta>
        </div>
      </div>
    </article>
  );
}
