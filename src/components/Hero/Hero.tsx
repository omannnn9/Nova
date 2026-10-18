import { lazy, Suspense } from 'react';
import SplitText from '../reactbits/SplitText/SplitText';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import Magnet from '../reactbits/Magnet/Magnet';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import HeroMark from './HeroMark';
import Deferred from '../ui/Deferred';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { prefersLiteEffects } from '../../lib/device';
import './Hero.css';

// WebGL atmosphere is non-essential: loaded as a separate chunk and mounted once the main thread is idle.
const Particles = lazy(() => import('../reactbits/Particles/Particles'));

const PARTICLE_COLORS = ['#C084FC', '#A855F7', '#F8FAFC'];
const HEADLINE = ['Your business.', 'Built for', 'what’s next.'];
const WORD_RISE = { from: { yPercent: 110, opacity: 0 }, ease: 'expo.out', duration: 1.4 };

const LITE = prefersLiteEffects();

const Hero = () => {
  const compact = useMediaQuery('(max-width: 767.98px)');

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <div className="hero__grid" />
        {!LITE && (
          <div className="hero__particles">
            <Deferred placeholderHeight="0">
              <Suspense fallback={null}>
                <Particles
                  particleCount={compact ? 80 : 180}
                  particleSpread={12}
                  speed={0.05}
                  particleColors={PARTICLE_COLORS}
                  particleBaseSize={compact ? 90 : 110}
                  sizeRandomness={1.2}
                  alphaParticles
                  shape="sparkle"
                  glow={0.6}
                  twinkle={0.5}
                  drift="up"
                  driftSpeed={0.22}
                  hoverEffect="repel"
                  hoverRadius={160}
                  particleHoverFactor={0.6}
                  clickBurst={false}
                  disableRotation
                  pixelRatio={compact ? 1.5 : undefined}
                />
              </Suspense>
            </Deferred>
          </div>
        )}
        <div className="hero__horizon" />
      </div>

      <div className="hero__inner container">
        <div className="hero__copy">
          <AnimatedContent trigger="mount" distance={16} duration={1} delay={0.1} className="hero__kicker-wrap">
            <p className="hero__kicker">
              <span className="hero__pulse" />
              <span>
                Websites, web apps &amp; automation<span className="hero__kicker-place"> · Mauritius</span>
              </span>
            </p>
          </AnimatedContent>

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
                  delay={90}
                  duration={WORD_RISE.duration}
                  ease={WORD_RISE.ease}
                  from={WORD_RISE.from}
                  to={{ yPercent: 0, opacity: 1, delay: 0.15 + index * 0.14 }}
                />
              </span>
            ))}
          </h1>

          <AnimatedContent trigger="mount" distance={24} duration={0.9} delay={0.4} className="hero__support">
            <p className="hero__lede">
              We design and build professional websites and digital solutions that help businesses move forward.
            </p>
            <div className="hero__actions">
              <Magnet padding={60} magnetStrength={4} maxOffset={10}>
                <ContactLink intent="general" fallbackHref="#contact" className="btn btn--primary btn--lg">
                  Let’s Build Something
                  <ArrowIcon />
                </ContactLink>
              </Magnet>
              <a href="#services" className="btn btn--ghost btn--lg">
                Explore Our Services
              </a>
            </div>
          </AnimatedContent>
        </div>

        <HeroMark />
      </div>

      <a href="#services" className="hero__scroll" aria-label="Scroll to services">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </a>
    </section>
  );
};

export default Hero;
