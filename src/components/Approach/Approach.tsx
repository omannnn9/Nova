import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '../ui/SectionHeader';
import './Approach.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    title: 'Understand',
    text: 'We learn how your business works, who your customers are and what the project needs to achieve.',
    detail: 'Goals · Audience · Requirements'
  },
  {
    title: 'Design',
    text: 'We design a solution around those requirements: structure, content and a look that fits your brand, agreed with you before we build.',
    detail: 'Structure · Content · Visual design'
  },
  {
    title: 'Build',
    text: 'We build it with modern, maintainable technology, then test and refine it across phones, tablets and desktops.',
    detail: 'Development · Testing · Refinement'
  },
  {
    title: 'Launch',
    text: 'We prepare it for launch, put it live and hand it over with what you need to keep it running.',
    detail: 'Launch · Handover · Next steps'
  }
];

const Approach = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const steps = gsap.utils.toArray<HTMLElement>('.step', track);
      const fill = track.querySelector('.approach__rail-fill');
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Light travels down the rail as the reader moves through the stages.
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: track, start: 'top 62%', end: 'bottom 62%', scrub: 0.6 }
          }
        );
        steps.forEach(step => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 62%',
            onEnter: () => step.classList.add('is-active'),
            onLeaveBack: () => step.classList.remove('is-active')
          });
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(fill, { scaleY: 1 });
        steps.forEach(step => step.classList.add('is-active'));
      });
    },
    { scope: trackRef }
  );

  return (
    <section id="approach" className="approach section" aria-labelledby="approach-title">
      <div className="approach__inner container">
        <div className="approach__intro">
          <SectionHeader
            id="approach-title"
            eyebrow="Our approach"
            layout="stacked"
            title={
              <>
                A clear path from idea <span className="accent">to launch.</span>
              </>
            }
            lede="Four stages, each with a clear outcome, so you always know what is happening and what comes next."
          />
          <p className="approach__sequence" aria-hidden="true">
            {STEPS.map((step, index) => (
              <span key={step.title}>
                {step.title}
                {index < STEPS.length - 1 && <span className="approach__arrow">→</span>}
              </span>
            ))}
          </p>
        </div>

        <div ref={trackRef} className="approach__track">
          <span className="approach__rail" aria-hidden="true">
            <span className="approach__rail-fill" />
          </span>
          <ol className="approach__steps">
            {STEPS.map((step, index) => (
              <li key={step.title} className="step">
                <span className="step__node" aria-hidden="true" />
                <span className="step__number display" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="step__body">
                  <h3 className="step__title display">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="step__text">{step.text}</p>
                  <p className="step__detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Approach;
