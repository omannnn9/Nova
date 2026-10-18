import { lazy, Suspense, useRef } from 'react';
import SplitText from '../reactbits/SplitText/SplitText';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import Magnet from '../reactbits/Magnet/Magnet';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import { hasWhatsApp } from '../../lib/whatsapp';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { prefersLiteEffects } from '../../lib/device';
import './ContactCTA.css';

const LightRays = lazy(() => import('../reactbits/LightRays/LightRays'));
const LITE = prefersLiteEffects();

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const near = useInViewOnce(sectionRef, '600px 0px');
  const compact = useMediaQuery('(max-width: 767.98px)');
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section ref={sectionRef} id="contact" className="cta" aria-labelledby="cta-title">
      <div className="cta__light" aria-hidden="true">
        {near && !LITE && (
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#A855F7"
              raysSpeed={reduceMotion ? 0 : 0.6}
              lightSpread={compact ? 0.9 : 0.7}
              rayLength={compact ? 1.6 : 1.3}
              fadeDistance={0.9}
              intensity={0.85}
              saturation={1}
              followMouse={!compact && !reduceMotion}
              mouseInfluence={0.06}
              cursorShadow={false}
              clickPulse={false}
              maxDevicePixelRatio={compact ? 1.25 : 1.75}
            />
          </Suspense>
        )}
      </div>

      <div className="cta__inner container">
        <p className="cta__eyebrow eyebrow">Contact</p>

        <h2 id="cta-title" className="cta__title display" aria-label="Have something in mind?">
          <span aria-hidden="true">
            <SplitText
              text="Have something"
              tag="span"
              splitType="words"
              effect="blur"
              delay={120}
              duration={1.2}
              textAlign="center"
              rootMargin="-60px"
            />
          </span>
          <span aria-hidden="true" className="cta__title-lit">
            <SplitText
              text="in mind?"
              tag="span"
              splitType="words"
              effect="blur"
              delay={120}
              duration={1.2}
              textAlign="center"
              rootMargin="-60px"
            />
          </span>
        </h2>

        <AnimatedContent distance={30} duration={1.1} delay={0.2} className="cta__body">
          <p className="cta__lede">
            Tell us about your business and what you’d like to build. Let’s explore the right solution.
          </p>
          <Magnet padding={70} magnetStrength={4} maxOffset={12} wrapperClassName="cta__magnet">
            <ContactLink intent="conversation" className="btn btn--primary btn--lg cta__button">
              Start a Conversation
              <ArrowIcon />
            </ContactLink>
          </Magnet>
          <p className="cta__note">
            {hasWhatsApp
              ? 'Opens WhatsApp with a short message you can edit before sending.'
              : 'WhatsApp contact is being set up.'}
          </p>
          {import.meta.env.DEV && !hasWhatsApp && (
            <p className="cta__dev-note" role="note">
              Dev note: set <code>VITE_WHATSAPP_NUMBER</code> in <code>.env.local</code> to enable the WhatsApp links.
            </p>
          )}
        </AnimatedContent>
      </div>
    </section>
  );
};

export default ContactCTA;
