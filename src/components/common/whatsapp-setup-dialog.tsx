import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { logger } from "@/lib/logger";

type WhatsAppSetupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
};

/**
 * Fallback shown while `WHATSAPP.phoneNumber` is empty. It preserves the
 * enquiry flow by letting the visitor copy a ready-made message.
 */
export function WhatsAppSetupDialog({ open, onOpenChange, message }: WhatsAppSetupDialogProps) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!open) setFeedback("");
  }, [open]);

  async function copyMessage() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(message);
      setFeedback("Message copied.");
      logger.event("whatsapp:copy", { ok: true });
    } catch (error) {
      setFeedback("Copy unavailable — please select the message text above.");
      logger.warn("WhatsApp message could not be copied", error);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        logger.event("whatsapp:dialog", { open: nextOpen });
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent aria-describedby="whatsapp-setup-description">
        <div className="flex flex-col gap-4 p-6">
          <div className="pr-12">
            <DialogTitle className="text-lg font-bold leading-snug">
              WhatsApp number not configured yet
            </DialogTitle>
          </div>

          <DialogDescription
            id="whatsapp-setup-description"
            className="text-sm leading-relaxed text-muted"
          >
            Add your verified WhatsApp phone number (including country code, digits only) to{" "}
            <code className="rounded bg-canvas px-1 py-0.5 text-[0.8125rem] text-ink">
              whatsapp.phoneNumber
            </code>{" "}
            in <code className="rounded bg-canvas px-1 py-0.5 text-[0.8125rem] text-ink">src/constants/site.ts</code>{" "}
            to activate direct WhatsApp redirection.
          </DialogDescription>

          <p className="rounded-btn border border-line bg-canvas px-4 py-3 text-sm leading-relaxed text-ink">
            {message}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <Button type="button" onClick={copyMessage}>
              Copy enquiry message
            </Button>
            <span role="status" aria-live="polite" className="text-sm font-medium text-brand">
              {feedback}
            </span>
          </div>

          <p className="text-xs text-muted">
            Prefer to call? Add verified contact details to <code>CONTACT</code> in the same file.
            They appear in the footer automatically.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
