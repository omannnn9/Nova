import ScrollReveal from '../reactbits/ScrollReveal/ScrollReveal';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import NovaMark from '../brand/NovaMark';
import './WhyNova.css';

const PRINCIPLES = [
  {
    title: 'Built around your business',
    text: 'Solutions shaped around how your business works and what your customers need, not the other way round.'
  },
  {
    title: 'Modern, intuitive experiences',
    text: 'Clean, fast interfaces that feel natural on a phone, a tablet or a desktop.'
  },
  {
    title: 'Clear communication',
    text: 'Plain language and regular updates, so you always know where your project stands.'
  },
  {
    title: 'Practical technology',
    text: 'The right tools for the job, chosen for what they do for you, never complexity for its own sake.'
  },
  {
    title: 'Thoughtful implementation',
    text: 'Care for the details that are easy to skip: speed, accessibility and the small interactions that make a site feel considered.'
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
          baseOpacity={0.1}
          enableBlur
          blurStrength={6}
          baseRotation={0}
          highlightColor="#7C3AED"
          containerClassName="why__statement"
          textClassName="why__statement-text display"
          wordAnimationEnd="center center"
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
        {PRINCIPLES.map((item, index) => (
          <article key={item.title} className="principle">
            <span className="principle__index">0{index + 1}</span>
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
