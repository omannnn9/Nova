import { useEffect } from 'react';

/**
 * Scrolls to the URL's #fragment once the page has loaded. The browser's own fragment scroll
 * happens before the app has rendered and ScrollTrigger has refreshed, so it lands at the top.
 */
export function useHashLanding() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const land = () =>
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
    if (document.readyState === 'complete') {
      land();
      return undefined;
    }
    window.addEventListener('load', land, { once: true });
    return () => window.removeEventListener('load', land);
  }, []);
}
