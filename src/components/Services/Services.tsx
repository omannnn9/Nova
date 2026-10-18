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
  'Layouts designed for phones first',
  'Clear ways to enquire: WhatsApp, calls, forms',
  'Search-friendly foundations'
];

const MORE_SERVICES = [
  {
    title: 'Web Applications',
    text: 'Custom web-based tools and applications designed around business requirements.',
    Visual: ModulesVisual
  },
  {
    title: 'Automation & AI',
    text: 'Practical digital solutions that can simplify repetitive processes and improve workflows.',
    Visual: FlowVisual
  }
];

/**
 * Composition: Websites, the commercial priority, is the one lit panel on the page.
 * The other two services sit beneath it as an open editorial row divided by hairlines.
 */
const Services = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(bodyRef);

  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title={
            <>
              What we <span className="accent">build.</span>
            </>
          }
          lede="Websites come first. For most businesses, the website is where a customer decides whether to get in touch."
        />

        <div ref={bodyRef} className={`services__body${inView ? ' is-in' : ''}`}>
          <AnimatedContent distance={40} duration={1.1}>
            <SpotlightCard
              className="feature"
              spotlightColor="#A855F7"
              intensity={0.2}
              spotlightSize={420}
              borderGlow={0.9}
              softness={0.8}
              style={{ '--spotlight-card-surface': 'var(--surface-1)' } as React.CSSProperties}
            >
              <div className="feature__edge" aria-hidden="true" />
              <div className="feature__copy">
                <p className="feature__tag">Our core service</p>
                <h3 className="feature__title display">Websites</h3>
                <p className="feature__text">
                  Professional websites and redesigns that help businesses communicate their services and make it easy
                  for customers to get in touch.
                </p>
                <ul className="feature__list">
                  {WEBSITE_INCLUDES.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ContactLink intent="website" fallbackHref="#contact" className="btn btn--primary feature__cta">
                  Start a website project
                  <ArrowIcon />
                </ContactLink>
              </div>
              <SiteVisual />
            </SpotlightCard>
          </AnimatedContent>

          <div className="services__more">
            <p className="services__more-label">When you need more than a website</p>
            <div className="services__more-grid">
              {MORE_SERVICES.map(({ title, text, Visual }) => (
                <article key={title} className="service">
                  <div className="service__visual">
                    <Visual />
                  </div>
                  <h3 className="service__title display">{title}</h3>
                  <p className="service__text">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
