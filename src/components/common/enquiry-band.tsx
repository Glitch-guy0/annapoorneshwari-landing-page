import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { Container } from "@/components/ui/container";
import { WHATSAPP } from "@/constants/site";
import type { CtaBandContent } from "@/types/content";
import { cn } from "@/lib/utils";

type EnquiryBandProps = {
  content: CtaBandContent;
  titleId: string;
  context: string;
  source: string;
  className?: string;
};

/** Full-width sage band with a single, focused WhatsApp action. */
export function EnquiryBand({
  content,
  titleId,
  context,
  source,
  className,
}: EnquiryBandProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={cn("border-y border-line bg-sage py-16 max-sm:py-12", className)}
    >
      <Container className="flex flex-wrap items-center justify-between gap-8">
        <div className="flex max-w-[60ch] flex-col gap-2">
          <p className="text-sm font-semibold text-brand">{content.eyebrow}</p>
          <h2
            id={titleId}
            className="text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.022em] text-ink"
          >
            {content.title}
          </h2>
          <p className="text-base text-ink-sage">{content.lead}</p>
        </div>

        <WhatsAppCta
          source={source}
          context={context}
          size="lg"
          className="max-sm:w-full"
        >
          {WHATSAPP.primaryCtaLabel}
        </WhatsAppCta>
      </Container>
    </section>
  );
}
