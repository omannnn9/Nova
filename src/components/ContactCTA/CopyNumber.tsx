import { useEffect, useRef, useState } from 'react';

/** Copies the number for visitors who would rather message from their phone than open WhatsApp here. */
const CopyNumber = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // Clipboard unavailable (insecure context or denied): the number stays visible to copy by hand.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button type="button" className="cta__copy" onClick={copy} aria-label={`Copy the number ${value}`}>
        <span aria-hidden="true">{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? 'Number copied' : ''}
      </span>
    </>
  );
};

export default CopyNumber;
