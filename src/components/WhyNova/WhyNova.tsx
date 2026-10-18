import ScrollReveal from '../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import NovaMark from '../brand/NovaMark';
import './WhyNova.css';

// Concrete working commitments rather than adjectives: each one is something a client can check.
const PRINCIPLES = [
  {
    title: 'Plain language, not jargon',
    text: 'We explain options and trade-offs in everyday terms, so you can make decisions without a technical background.'
  },
  {
    title: 'Designed for phones first',
    text: 'Many customers will find you on their phone, so every page is designed for a small screen before a large one.'
  },
  {
    title: 'Built to make contact easy',
    text: 'Every page points to a clear next step, such as a WhatsApp message, a call or a form, so interested customers know how to reach you.'
  },
  {
    title: 'You approve before we build',
    text: 'You see and agree the structure and design before development starts.'
  },
  {
    title: 'Fast, accessible and yours',
    text: 'Pages that load quickly and work with keyboards and screen readers, handed over with what you need to manage them.'
  }
];

const WhyNova = () => (
  <section id="why-nova" className="why" aria-labelledby="why-title" data-nav-theme="light">
    <div className="container">
      <p className="why__eyebrow">
        <NovaMark tone="light" className="why__mark" />
        Why Nova
      </p>

      <div id="why-title">
        <ScrollReveal
          mode="enter"
          duration={0.7}
          stagger={0.035}
          baseOpacity={0}
          enableBlur
          blurStrength={6}
          baseRotation={0}
          highlightColor="#7C3AED"
          containerClassName="why__statement"
          textClassName="why__statement-text display"
        >
          A nova isn’t a new star. It’s one that has been building energy all along, until it becomes impossible to
          miss.
        </ScrollReveal>
      </div>

      <AnimatedContent distance={30} duration={1} className="why__intro">
        <p>
          That is how we approach every project. We build your digital presence deliberately, part by part, so it does
          its job: helping the right customers understand what you offer and get in touch.
        </p>
      </AnimatedContent>

      <AnimatedContent distance={40} duration={1} stagger={0.08} className="why__principles" threshold={0.05}>
        {PRINCIPLES.map(item => (
          <article key={item.title} className="principle">
            <h3 className="principle__title display">{item.title}</h3>
            <p className="principle__text">{item.text}</p>
          </article>
        ))}
      </AnimatedContent>

      <p className="why__signoff">
        <span>From Mauritius,</span> <span className="why__signoff-accent">for everywhere.</span>
      </p>
    </div>
  </section>
);

export default WhyNova;
