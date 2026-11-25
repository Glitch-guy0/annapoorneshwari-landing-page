import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/common/whatsapp-icon";
import { buttonVariants } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useWhatsApp } from "@/providers/whatsapp-provider";

type WhatsAppCtaProps = {
  children?: ReactNode;
  /** Stable identifier for development logs and analytics. */
  source: string;
  /** Key into `WHATSAPP.contextMessages`. */
  context?: string;
  /** Topic used to build a contextual enquiry sentence. */
  topic?: string;
  /** Explicit message; wins over `context` and `topic`. */
  message?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  full?: boolean;
  showIcon?: boolean;
  className?: string;
};

/**
 * The site's primary conversion control. When WhatsApp is configured it is a
 * real link (open-in-new-tab friendly); otherwise it opens the copy dialog.
 */
export function WhatsAppCta({
  children,
  source,
  context,
  topic,
  message,
  variant = "primary",
  size = "md",
  full = false,
  showIcon = true,
  className,
}: WhatsAppCtaProps) {
  const { enquire, isConfigured } = useWhatsApp();

  const resolvedMessage = buildWhatsAppMessage({ message, context, topic });
  const url = isConfigured ? buildWhatsAppUrl(resolvedMessage) : "";

  const classes = cn(buttonVariants({ variant, size, full }), className);
  const content = (
    <>
      {showIcon ? <WhatsAppIcon /> : null}
      <span>{children ?? "Chat on WhatsApp"}</span>
    </>
  );

  const handleClick = () => {
    logger.event("cta:whatsapp:click", {
      source,
      context: context ?? null,
      topic: topic ?? null,
      configured: isConfigured,
    });
  };

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={() => {
        handleClick();
        enquire({ message, context, topic });
      }}
    >
      {content}
    </button>
  );
}
