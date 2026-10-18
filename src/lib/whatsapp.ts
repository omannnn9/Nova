import { whatsappMessages, whatsappNumber, type WhatsAppIntent } from '../config/site';

/**
 * Builds a WhatsApp click-to-chat URL (https://wa.me/<number>?text=<message>).
 * wa.me works on mobile (opens the app) and desktop (WhatsApp Desktop or Web).
 * Returns null when no number is configured, so callers can fall back gracefully.
 */
export function buildWhatsAppUrl(message: string, number: string = whatsappNumber): string | null {
  const digits = number.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrlFor(intent: WhatsAppIntent): string | null {
  return buildWhatsAppUrl(whatsappMessages[intent]);
}

export const hasWhatsApp = whatsappNumber.length > 0;
