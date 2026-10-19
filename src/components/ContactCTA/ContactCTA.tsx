import { lazy, Suspense, useRef } from 'react';
import SplitText from '../reactbits/SplitText/SplitText';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import Magnet from '../reactbits/Magnet/Magnet';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import CopyNumber from './CopyNumber';
import { hasWhatsApp } from '../../lib/whatsapp';
import { whatsappDisplay } from '../../config/site';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { prefersLiteEffects } from '../../lib/device';
import './ContactCTA.css';

const LightRays = lazy(() => import('../reactbits/LightRays/LightRays'));
const LITE = prefersLiteEffects();

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const near = useInViewOnce(sectionRef, '600px 0px');
  // WebGL rays on desktop-class devices only; phones keep the CSS light from above (see .cta__light).
  const desktop = useMediaQuery('(min-width: 768px) and (pointer: fine)');
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section ref={sectionRef} id="contact" className="cta" aria-labelledby="cta-title">
      <div className="cta__light" aria-hidden="true">
        {near && !LITE && desktop && (
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#A855F7"
              raysSpeed={reduceMotion ? 0 : 0.6}
              lightSpread={0.7}
              rayLength={1.3}
              fadeDistance={0.9}
              intensity={0.85}
              saturation={1}
              followMouse={!reduceMotion}
              mouseInfluence={0.06}
              cursorShadow={false}
              clickPulse={false}
              maxDevicePixelRatio={1.75}
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
            <ContactLink intent="general" className="btn btn--primary btn--lg cta__button">
              Start a Conversation
              <ArrowIcon />
            </ContactLink>
          </Magnet>
          {hasWhatsApp ? (
            <>
              <p className="cta__note">Opens WhatsApp with a short message you can edit before sending.</p>
              <div className="cta__channel">
                <span className="cta__channel-name">
                  <WhatsAppIcon className="wa-icon cta__channel-icon" />
                  <span className="cta__channel-label">WhatsApp</span>
                </span>
                <span className="cta__channel-number">
                  <span className="cta__number">{whatsappDisplay}</span>
                  <CopyNumber value={whatsappDisplay} />
                </span>
              </div>
              <div className="cta__hints">
                <p className="cta__hints-title">Useful to mention</p>
                <ul>
                  <li>What your business does</li>
                  <li>What you would like the website to do</li>
                  <li>Your current website, if you have one</li>
                </ul>
              </div>
            </>
          ) : (
            <p className="cta__note">WhatsApp contact is being set up.</p>
          )}
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
