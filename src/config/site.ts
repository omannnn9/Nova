/**
 * Site-wide content and contact configuration.
 *
 * The WhatsApp number is read from VITE_WHATSAPP_NUMBER, set in `.env` (committed, because the
 * number is published on the site) and overridable in `.env.local`.
 */

export const site = {
  name: 'Nova',
  tagline: 'Building the future.',
  location: 'Mauritius'
} as const;

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'Contact', href: '#contact' }
] as const;

/** Digits only, international format without "+" (e.g. 230XXXXXXXX). Empty when not configured. */
export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

/** Human-readable form, e.g. "+230 5908 4943" for a Mauritian mobile number. */
export const whatsappDisplay = /^230\d{8}$/.test(whatsappNumber)
  ? `+230 ${whatsappNumber.slice(3, 7)} ${whatsappNumber.slice(7)}`
  : whatsappNumber && `+${whatsappNumber}`;

// Prefilled WhatsApp messages; the visitor can edit them before sending.
export const whatsappMessages = {
  general: 'Hi Nova! I’m interested in your services and would like to discuss a project.',
  website: 'Hi Nova! I’m interested in a website for my business and would like to discuss a project.'
} as const;

export type WhatsAppIntent = keyof typeof whatsappMessages;
