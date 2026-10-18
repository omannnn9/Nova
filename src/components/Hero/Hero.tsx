import { lazy, Suspense } from 'react';
import SplitText from '../reactbits/SplitText/SplitText';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import Magnet from '../reactbits/Magnet/Magnet';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import Deferred from '../ui/Deferred';
import HeroMark from './HeroMark';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { prefersLiteEffects } from '../../lib/device';
import { hasWhatsApp } from '../../lib/whatsapp';
import { whatsappDisplay } from '../../config/site';
import './Hero.css';

// WebGL atmosphere is non-essential: loaded as a separate chunk and mounted once the main thread is idle.
const Particles = lazy(() => import('../reactbits/Particles/Particles'));

const PARTICLE_COLORS = ['#C084FC', '#A855F7', '#F8FAFC'];
const HEADLINE = ['Your business.', 'Built for', 'what’s next.'];
const SERVICES = [
  { label: 'Websites', href: '#websites' },
  { label: 'Web applications', href: '#web-applications' },
  { label: 'Automation & AI', href: '#automation' }
];
const LITE = prefersLiteEffects();

/**
 * Composition: everything stands on one horizon line. The headline block rests on it at the
 * left; Nova's mark rises out of it at the right, where the light pools. Below the line, a
 * quiet ground strip names the three services and annotates the mark.
 */
const Hero = () => {
  // WebGL particles only on desktop-class devices: on phones they cost GPU, battery and scroll
  // smoothness for a barely visible effect. The horizon, mark and light are pure CSS/SVG.
  const desktop = useMediaQuery('(min-width: 768px) and (pointer: fine)');

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <div className="grain" />
        {!LITE && desktop && (
          <div className="hero__particles">
            <Deferred placeholderHeight="0">
              <Suspense fallback={null}>
                <Particles
                  particleCount={110}
                  particleSpread={11}
                  speed={0.04}
                  particleColors={PARTICLE_COLORS}
                  particleBaseSize={95}
                  sizeRandomness={1.2}
                  alphaParticles
                  shape="sparkle"
                  glow={0.5}
                  twinkle={0.5}
                  drift="up"
                  driftSpeed={0.18}
                  hoverEffect="repel"
                  hoverRadius={150}
                  particleHoverFactor={0.5}
                  clickBurst={false}
                  disableRotation
                />
              </Suspense>
            </Deferred>
          </div>
        )}
      </div>

      <div className="hero__stage container">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title display" aria-label={HEADLINE.join(' ')}>
            {HEADLINE.map((line, index) => (
              <span key={line} className={`hero__line${index === 2 ? ' hero__line--lit' : ''}`} aria-hidden="true">
                <SplitText
                  text={line}
                  tag="span"
                  trigger="load"
                  splitType="words"
                  mask
                  textAlign="left"
                  delay={80}
                  duration={1.3}
                  ease="expo.out"
                  from={{ yPercent: 105 }}
                  to={{ yPercent: 0, delay: 0.1 + index * 0.12 }}
                />
              </span>
            ))}
          </h1>

          {/* Visible on the first frame (it is the LCP element): it only settles into place, never fades in. */}
          <AnimatedContent
            trigger="mount"
            distance={10}
            duration={0.8}
            delay={0.3}
            animateOpacity={false}
            className="hero__support"
          >
            <p className="hero__lede">
              We design and build professional websites and digital solutions that help businesses in Mauritius move
              forward.
            </p>
            <div className="hero__actions">
              <Magnet padding={60} magnetStrength={4} maxOffset={10}>
                <ContactLink intent="general" fallbackHref="#contact" className="btn btn--primary btn--lg">
                  Let’s Build Something
                  <ArrowIcon />
                </ContactLink>
              </Magnet>
              <a href="#services" className="text-link hero__secondary">
                Explore our services
                <ArrowIcon />
              </a>
            </div>
            {hasWhatsApp && (
              <p className="hero__contact-note">
                Opens a WhatsApp chat with Nova · <span className="hero__contact-number">{whatsappDisplay}</span>
              </p>
            )}
          </AnimatedContent>
        </div>

        <HeroMark />
      </div>

      <div className="hero__ground container">
        <span className="hero__horizon" aria-hidden="true" />
        <nav className="hero__index" aria-label="Services">
          {SERVICES.map(service => (
            <a key={service.href} href={service.href}>
              {service.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Hero;
