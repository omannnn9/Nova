import { useRef } from 'react';
import SpotlightCard from '../reactbits/SpotlightCard/SpotlightCard';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import SectionHeader from '../ui/SectionHeader';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SiteVisual, ModulesVisual, FlowVisual } from './ServiceVisuals';
import './Services.css';

const WEBSITE_INCLUDES = [
  'New business websites',
  'Redesigns of existing sites',
  'Mobile-first, responsive layouts',
  'Clear routes to enquire: WhatsApp, calls, forms',
  'Search-friendly foundations'
];

const CARD_LIGHT = {
  spotlightColor: '#A855F7',
  intensity: 0.22,
  spotlightSize: 360,
  borderGlow: 0.9,
  softness: 0.8,
  style: { '--spotlight-card-surface': 'var(--surface-1)' } as React.CSSProperties
};

const Services = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(gridRef);

  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader
          id="services-title"
          index="01"
          eyebrow="Services"
          title={
            <>
              What we <span className="accent">build.</span>
            </>
          }
          lede="Three focused services. Websites come first, because for most businesses that is where customers decide whether to get in touch."
        />

        <div ref={gridRef} className={`services__grid${inView ? ' is-in' : ''}`}>
          <AnimatedContent distance={60} duration={1.2} className="services__cell services__cell--featured">
            <SpotlightCard {...CARD_LIGHT} className="service service--featured">
              <div className="service__edge" aria-hidden="true" />
              <div className="service__content">
                <div className="service__meta">
                  <span className="service__index">01</span>
                  <span className="service__tag">Core service</span>
                </div>
                <h3 className="service__title display">Websites</h3>
                <p className="service__text">
                  Professional websites and redesigns that help businesses communicate their services and make it easy
                  for customers to get in touch.
                </p>
                <ul className="service__list">
                  {WEBSITE_INCLUDES.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ContactLink intent="website" fallbackHref="#contact" className="text-link service__cta">
                  Start a website project
                  <ArrowIcon />
                </ContactLink>
              </div>
              <SiteVisual />
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent distance={60} duration={1.2} delay={0.12} className="services__cell">
            <SpotlightCard {...CARD_LIGHT} className="service">
              <div className="service__content">
                <div className="service__meta">
                  <span className="service__index">02</span>
                </div>
                <h3 className="service__title display">Web Applications</h3>
                <p className="service__text">
                  Custom web-based tools and applications designed around business requirements.
                </p>
              </div>
              <ModulesVisual />
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent distance={60} duration={1.2} delay={0.24} className="services__cell">
            <SpotlightCard {...CARD_LIGHT} className="service">
              <div className="service__content">
                <div className="service__meta">
                  <span className="service__index">03</span>
                </div>
                <h3 className="service__title display">Automation &amp; AI</h3>
                <p className="service__text">
                  Practical digital solutions that can simplify repetitive processes and improve workflows.
                </p>
              </div>
              <FlowVisual />
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default Services;
