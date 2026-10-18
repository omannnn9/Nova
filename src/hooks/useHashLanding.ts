import { useEffect } from 'react';

const GIVE_UP_MS = 6000;

/**
 * Scrolls to the URL's #fragment once the target exists and every section above it has mounted.
 * The browser's own fragment scroll runs before the app renders, and sections arrive progressively
 * as lazy chunks (see Deferred), so the native scroll lands at the top or at a stale position.
 */
export function useHashLanding() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;

    const settled = () => !document.querySelector('[data-deferred]') && document.getElementById(id);
    const land = () => {
      const target = settled();
      if (!target) return false;
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' }));
      return true;
    };

    const observer = new MutationObserver(() => {
      if (land()) stop();
    });
    const timer = window.setTimeout(() => stop(), GIVE_UP_MS);
    function stop() {
      observer.disconnect();
      window.clearTimeout(timer);
    }

    if (!land()) observer.observe(document.body, { childList: true, subtree: true });
    else stop();
    return stop;
  }, []);
}
