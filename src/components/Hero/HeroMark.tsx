import { useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MARK_PARTS } from '../brand/markGeometry';
import DecryptedText from '../reactbits/DecryptedText/DecryptedText';

gsap.registerPlugin(useGSAP);

const LABELS = [
  { text: 'Built', position: 'left' },
  { text: 'Ignition', position: 'center' },
  { text: 'Next', position: 'right' }
] as const;

/**
 * The hero visual: Nova's mark assembling itself.
 * Stems rise (what is built), the diagonal is drawn by light from above (execution),
 * then flares and settles — the moment a nova becomes impossible to miss.
 * The whole mark tilts with the pointer as one rigid object, so the gaps never change.
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
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(el);

      if (reduce) {
        setLit(true);
        return;
      }

      const tl = gsap.timeline({ delay: 0.35, defaults: { ease: 'expo.out' } });
      tl.from(q('[data-stem="left"]'), { yPercent: 18, opacity: 0, duration: 1.3 })
        .from(q('[data-stem="right"]'), { yPercent: -18, opacity: 0, duration: 1.3 }, 0.12)
        .fromTo(
          q('[data-draw]'),
          { attr: { height: 0 } },
          { attr: { height: 100 }, duration: 1.1, ease: 'power3.inOut' },
          0.55
        )
        .fromTo(
          q('[data-glow]'),
          { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' },
          { opacity: 1, scale: 1.12, duration: 0.5, ease: 'power2.out' },
          1.45
        )
        .to(q('[data-glow]'), { opacity: 0.78, scale: 1, duration: 1.6, ease: 'power3.out' })
        .add(() => setLit(true), 2.1);

      // Pointer tilt for fine pointers only. The mark moves as one rigid body.
      if (!window.matchMedia('(pointer: fine)').matches) return;
      const body = q('[data-tilt]')[0];
      const rotateX = gsap.quickTo(body, 'rotationX', { duration: 0.9, ease: 'power3.out' });
      const rotateY = gsap.quickTo(body, 'rotationY', { duration: 0.9, ease: 'power3.out' });
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        rotateY(nx * 14);
        rotateX(-ny * 10);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`hero-mark${lit ? ' is-lit' : ''}`} aria-hidden="true">
      <div className="hero-mark__body" data-tilt>
        <svg className="hero-mark__svg" viewBox="-20 -20 140 140" overflow="visible" focusable="false">
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
          <rect data-stem="left" {...MARK_PARTS.left} fill="#F8FAFC" />
          <rect data-stem="right" {...MARK_PARTS.right} fill="#F8FAFC" />
          <polygon points={MARK_PARTS.diagonal} fill={`url(#${ids.gradient})`} clipPath={`url(#${ids.clip})`} />
        </svg>
      </div>

      <ul className="hero-mark__labels">
        {lit &&
          LABELS.map((label, index) => (
            <li key={label.text} className={`hero-mark__label hero-mark__label--${label.position}`}>
              <span className="hero-mark__tick" />
              <DecryptedText
                text={label.text}
                animateOn="view"
                sequential
                speed={45}
                revealDirection="start"
                characters="NOVA01/\\_"
                className={index === 1 ? 'accent' : undefined}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HeroMark;
