import type { ReactNode } from 'react';
import type { WhatsAppIntent } from '../../config/site';
import { whatsappUrlFor } from '../../lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import './Button.css';

interface ContactLinkProps {
  intent: WhatsAppIntent;
  children: ReactNode;
  className?: string;
  /** Where to send people when no WhatsApp number is configured. Omit to render a disabled control. */
  fallbackHref?: string;
  /** Lead with the WhatsApp glyph, so it is clear where the link goes. Shown only when WhatsApp is configured. */
  icon?: boolean;
}

/**
 * The primary conversion path. Opens WhatsApp with a prefilled, URL-encoded message.
 * Without a configured number it degrades to `fallbackHref` (usually the contact section).
 */
const ContactLink = ({ intent, children, className = 'btn btn--primary', fallbackHref, icon = true }: ContactLinkProps) => {
  const url = whatsappUrlFor(intent);

  if (url) {
    return (
      <a className={className} href={url} target="_blank" rel="noopener noreferrer">
        {icon && <WhatsAppIcon />}
        {children}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
    );
  }

  if (fallbackHref) {
    return (
      <a className={className} href={fallbackHref}>
        {children}
      </a>
    );
  }

  return (
    <a className={className} role="link" aria-disabled="true" title="WhatsApp number not configured yet">
      {children}
    </a>
  );
};

export default ContactLink;
