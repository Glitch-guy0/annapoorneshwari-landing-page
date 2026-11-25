import { SectionHeading } from "@/components/common/section-heading";
import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { FAQ_HELP, FAQS, FAQ_SECTION } from "@/constants/home";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-y border-line bg-canvas py-20 max-lg:py-16 max-sm:py-12"
    >
      <Container className="grid items-start gap-12 max-lg:gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <SectionHeading
          eyebrow={FAQ_SECTION.eyebrow}
          title={FAQ_SECTION.title}
          lead={FAQ_SECTION.lead}
          titleId="faq-heading"
          leadClassName="max-w-[38ch]"
        />

        <div className="flex flex-col gap-5">
          <Accordion
            type="multiple"
            className="flex flex-col gap-3"
            aria-label="Frequently asked questions"
          >
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex flex-col gap-4 rounded-card border border-line-strong bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-ink">{FAQ_HELP.title}</p>
              <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{FAQ_HELP.copy}</p>
            </div>

            <WhatsAppCta
              source="faq"
              context="faq"
              variant="secondary"
              className="shrink-0 max-sm:w-full"
            >
              {FAQ_HELP.ctaLabel}
            </WhatsAppCta>
          </div>
        </div>
      </Container>
    </section>
  );
}
