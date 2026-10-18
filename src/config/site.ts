/**
 * Site-wide content and contact configuration.
 *
 * The WhatsApp number is read from VITE_WHATSAPP_NUMBER (see .env.example).
 * The brand pack only shows "+230 [number]" as a placeholder, so no number is
 * hard-coded here. Set the verified business number before deploying.
 */

export const site = {
  name: 'Nova',
  tagline: 'Building the future.',
  parent: 'OD Holdings',
  location: 'Mauritius'
} as const;

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'Contact', href: '#contact' }
] as const;

/** Digits only, international format without "+" (e.g. 230XXXXXXXX). Empty when not configured. */
export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export const whatsappMessages = {
  general: "Hi Nova, I'd like to talk about building something for my business.",
  website: "Hi Nova, I'm interested in a new website (or a redesign) for my business.",
  conversation: "Hi Nova, I'd like to start a conversation about a project."
} as const;

export type WhatsAppIntent = keyof typeof whatsappMessages;
