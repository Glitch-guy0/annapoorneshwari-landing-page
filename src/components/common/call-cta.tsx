import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT, WHATSAPP } from "@/constants/site";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";

/**
 * Click-to-call action, rendered only when a verified phone number exists.
 * `tel:` needs a dial-safe value, so display formatting is stripped.
 */
export function CallCta({ className }: { className?: string }) {
  const dialNumber = CONTACT.phoneDisplay.replace(/[^\d+]/g, "");
  if (!dialNumber) return null;

  return (
    <a
      href={`tel:${dialNumber}`}
      aria-label={`Call ${CONTACT.phoneDisplay}`}
      className={cn(buttonVariants({ variant: "secondary" }), className)}
      onClick={() => logger.event("cta:call:click", { number: dialNumber })}
    >
      <Phone className="size-4" aria-hidden="true" />
      <span>{WHATSAPP.callCtaLabel}</span>
    </a>
  );
}
