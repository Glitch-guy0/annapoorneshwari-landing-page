import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { WhatsAppSetupDialog } from "@/components/common/whatsapp-setup-dialog";
import { WHATSAPP } from "@/constants/site";
import { logger } from "@/lib/logger";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
  type WhatsAppMessageOptions,
} from "@/lib/whatsapp";

type WhatsAppContextValue = {
  isConfigured: boolean;
  /** Open WhatsApp when configured, otherwise the guided fallback dialog. */
  enquire: (options?: WhatsAppMessageOptions) => void;
};

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewMessage, setPreviewMessage] = useState(WHATSAPP.prefilledMessage);
  const isConfigured = isWhatsAppConfigured();

  const enquire = useCallback((options: WhatsAppMessageOptions = {}) => {
    const message = buildWhatsAppMessage(options);
    const url = buildWhatsAppUrl(message);

    logger.event("whatsapp:enquire", {
      context: options.context ?? null,
      topic: options.topic ?? null,
      configured: Boolean(url),
    });

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    setPreviewMessage(message);
    setDialogOpen(true);
  }, []);

  const value = useMemo(() => ({ isConfigured, enquire }), [isConfigured, enquire]);

  return (
    <WhatsAppContext.Provider value={value}>
      {children}
      <WhatsAppSetupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        message={previewMessage}
      />
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("useWhatsApp must be used inside a WhatsAppProvider");
  }
  return context;
}
