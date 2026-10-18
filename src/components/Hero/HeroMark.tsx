import { useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MARK_PARTS } from '../brand/markGeometry';
import DecryptedText from '../reactbits/DecryptedText/DecryptedText';

gsap.registerPlugin(useGSAP);

// The pack's meaning of the three parts, annotated beneath the horizon once the mark is lit.
const LABELS = ['Built', 'Ignition', 'Next'] as const;

/**
 * The hero's signature moment: Nova's mark rising out of the horizon.
 * The stems emerge from below the horizon line (what has been built), the diagonal is drawn by
 * light from above (execution), then flares and settles — the moment a nova becomes impossible
 * to miss. The element is clipped at its bottom edge, which sits exactly on the horizon line.
 * Pointer response is a small rotation about the base, so the mark moves as one rigid body and
 * the gaps between its parts never change.
 */
const HeroMark = () => {
  const root = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const uid = useId().replace(/:/g, '');
  const ids = { gradient: `lit-${uid}`, clip: `draw-${uid}`, blur: `glow-${uid}` };

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const light = () => setLit(true);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        light();
        return;
      }

      gsap
        .timeline({ delay: 0.2, defaults: { ease: 'expo.out' } })
        .from(q('[data-stem]'), { yPercent: 104, duration: 1.4, stagger: 0.12 })
        .fromTo(
          q('[data-draw]'),
          { attr: { height: 0 } },
          { attr: { height: 100 }, duration: 0.9, ease: 'power3.inOut' },
          0.75
        )
        .fromTo(q('[data-glow]'), { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 1.5)
        .to(q('[data-glow]'), { opacity: 0.75, duration: 1.4, ease: 'power3.out' })
        .add(light, 1.7);

      if (!window.matchMedia('(pointer: fine)').matches) return;
      const body = q('[data-tilt]')[0];
      const turn = gsap.quickTo(body, 'rotationY', { duration: 1, ease: 'power3.out' });
      const onMove = (event: PointerEvent) => turn((event.clientX / window.innerWidth - 0.5) * 16);
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="hero-mark" aria-hidden="true">
      <div className="hero-mark__frame">
        <div className="hero-mark__body" data-tilt>
          {/* viewBox leaves room above and beside the mark for its glow; the bottom edge is the horizon. */}
          <svg className="hero-mark__svg" viewBox="-24 -24 148 124" overflow="visible" focusable="false">
            <defs>
              <linearGradient id={ids.gradient} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#C084FC" />
                <stop offset="0.45" stopColor="#A855F7" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
              <clipPath id={ids.clip}>
                <rect data-draw x="0" y="0" width="100" height="100" />
              </clipPath>
              {/* Mark glow: only the diagonal glows, blur ≈ 15% of mark size. */}
              <filter id={ids.blur} x="-80%" y="-40%" width="260%" height="180%">
                <feGaussianBlur stdDeviation="7.5" />
              </filter>
            </defs>
            <polygon
              data-glow
              className="hero-mark__glow"
              points={MARK_PARTS.diagonal}
              fill="#A855F7"
              filter={`url(#${ids.blur})`}
            />
            <rect data-stem {...MARK_PARTS.left} fill="#F8FAFC" />
            <rect data-stem {...MARK_PARTS.right} fill="#F8FAFC" />
            <polygon points={MARK_PARTS.diagonal} fill={`url(#${ids.gradient})`} clipPath={`url(#${ids.clip})`} />
          </svg>
        </div>
      </div>
      <ul className="hero-mark__labels">
        {lit &&
          LABELS.map(label => (
            <li key={label} className="hero-mark__label">
              <DecryptedText text={label} animateOn="view" sequential speed={45} characters="NOVA/\\_" />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HeroMark;
