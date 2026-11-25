import { BRAND, WHATSAPP } from "@/constants/site";

export type WhatsAppMessageOptions = {
  /** Explicit message wins over every other option. */
  message?: string;
  /** Key into `WHATSAPP.contextMessages`. */
  context?: string;
  /** Human readable topic used to compose a default sentence. */
  topic?: string;
};

/** Strip everything except digits so `wa.me` always receives a valid number. */
export function normalisePhoneNumber(raw: string) {
  return raw.replace(/\D/g, "");
}

export function isWhatsAppConfigured() {
  return normalisePhoneNumber(WHATSAPP.phoneNumber).length > 0;
}

export function buildWhatsAppMessage(options: WhatsAppMessageOptions = {}) {
  const directMessage = options.message?.trim();
  if (directMessage) return directMessage;

  const contextMessage = options.context
    ? WHATSAPP.contextMessages[options.context]?.trim()
    : undefined;
  if (contextMessage) return contextMessage;

  const topic = options.topic?.trim();
  if (topic) {
    return `Hello ${BRAND.name}, I would like to enquire about ${topic}.`;
  }

  return WHATSAPP.prefilledMessage;
}

export function buildWhatsAppUrl(message: string) {
  const phone = normalisePhoneNumber(WHATSAPP.phoneNumber);
  if (!phone) return "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
