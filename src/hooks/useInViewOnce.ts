import { useEffect, useState, type RefObject } from 'react';

/**
 * True once the element comes within `rootMargin` of the viewport (fires once, then disconnects).
 * Used for in-view reveals and to defer mounting heavy WebGL effects until they are about to be seen.
 */
export function useInViewOnce(ref: RefObject<Element | null>, rootMargin = '0px 0px -20% 0px'): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}
