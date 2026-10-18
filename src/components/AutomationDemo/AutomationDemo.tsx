import { useCallback, useEffect, useRef, useState } from 'react';
import TextType from '../reactbits/TextType/TextType';
import SectionHeader from '../ui/SectionHeader';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { CLASSIFICATION, ENQUIRY, FOLLOW_UP, STEPS, STEP_DELAYS, SUGGESTED_REPLY, TYPING_MS } from './demoScript';
import './AutomationDemo.css';

type Phase = 'idle' | 'running' | 'done';

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * An illustrative, fully local simulation of an enquiry workflow: arrive → sort → draft → follow up.
 * Steps are revealed on a fixed timeline (no randomness, no network). Under reduced motion the
 * finished state is shown at once. The status line is a polite live region for screen readers.
 */
const AutomationDemo = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0); // number of steps revealed, 0–4
  const timers = useRef<number[]>([]);
  const runButton = useRef<HTMLButtonElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    if (reduceMotion) {
      setStep(STEPS.length);
      setPhase('done');
      return;
    }
    setStep(0);
    setPhase('running');
    let at = 0;
    STEP_DELAYS.forEach((delay, index) => {
      at += delay;
      timers.current.push(
        window.setTimeout(() => {
          setStep(index + 1);
          if (index === STEPS.length - 1) setPhase('done');
        }, at)
      );
    });
  }, [clearTimers, reduceMotion]);

  const reset = useCallback(() => {
    clearTimers();
    setStep(0);
    setPhase('idle');
    // The Reset button disappears in the idle state, so hand keyboard focus back to Run.
    requestAnimationFrame(() => runButton.current?.focus());
  }, [clearTimers]);

  const status =
    phase === 'idle'
      ? 'Ready. Press “Run the demo” to follow a sample enquiry.'
      : phase === 'done' && reduceMotion
        ? 'Demo complete: all four steps are shown.'
        : (STEPS[step - 1]?.status ?? 'Starting…');

  const typing = phase === 'running' && step === 3;
  const shown = (n: number) => (step >= n ? ' is-shown' : '');
  // Unrevealed cards are decorative outlines, hidden from the accessibility tree.
  const cardProps = (n: number) => ({ 'aria-hidden': step < n || undefined });

  return (
    <section id="demo" className="demo section" aria-labelledby="demo-title">
      <div className="container">
        <SectionHeader
          id="demo-title"
          className="demo__header"
          eyebrow="See the possibilities."
          title={
            <>
              Less manual work. <span className="accent">More momentum.</span>
            </>
          }
          lede="See how AI and automation can help a business handle enquiries, prepare replies and organise follow-ups."
        />

        <div className="demo__stage">
          <div className="demo__bar">
            <p className="demo__label">
              <span className="demo__label-tag">Illustrative demo</span>
              Simulated with sample data. Nothing is sent or booked.
            </p>
            <div className="demo__controls">
              <button
                ref={runButton}
                type="button"
                className="btn btn--light btn--sm"
                // Stays focusable while running (aria-disabled) so keyboard focus is never lost.
                onClick={() => phase !== 'running' && run()}
                aria-disabled={phase === 'running' || undefined}
              >
                {phase === 'idle' ? 'Run the demo' : phase === 'running' ? 'Running…' : 'Replay the demo'}
              </button>
              {phase !== 'idle' && (
                <button type="button" className="demo__reset" onClick={reset}>
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="demo__body">
            <ol className="demo__steps" aria-label="Workflow steps">
              {STEPS.map((item, index) => {
                const state =
                  index < step - (phase === 'running' ? 1 : 0) ? 'done' : index === step - 1 ? 'active' : 'pending';
                return (
                  <li
                    key={item.title}
                    className={`demo-step demo-step--${state}`}
                    aria-current={state === 'active' ? 'step' : undefined}
                  >
                    <span className="demo-step__marker" aria-hidden="true">
                      {state === 'done' ? <CheckIcon /> : index + 1}
                    </span>
                    <span className="demo-step__copy">
                      <span className="demo-step__title">{item.title}</span>
                      <span className="demo-step__text">{item.description}</span>
                    </span>
                    <span className="sr-only">
                      {state === 'done' ? ' (completed)' : state === 'active' ? ' (in progress)' : ' (not started)'}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="demo__workspace">
              <p className="demo__status" role="status" aria-live="polite">
                {status}
              </p>

              <div className="demo__cards">
                {/* All cards are always laid out, as labelled outlines until reached, so revealing them never shifts the page. */}
                <article {...cardProps(1)} className={`demo-card demo-card--enquiry${shown(1)}`}>
                  <header className="demo-card__head">
                    <h3 className="demo-card__kicker">New enquiry</h3>
                    <span className="demo-card__meta">
                      {ENQUIRY.from} · {ENQUIRY.channel} · {ENQUIRY.time}
                    </span>
                  </header>
                  <p className="demo-card__message">{ENQUIRY.text}</p>
                </article>

                <article {...cardProps(2)} className={`demo-card${shown(2)}`}>
                  <header className="demo-card__head">
                    <h3 className="demo-card__kicker">Sorted as</h3>
                    <span className="demo-card__tag">{CLASSIFICATION.label}</span>
                  </header>
                  <dl className="demo-card__details">
                    {CLASSIFICATION.details.map(detail => (
                      <div key={detail.term}>
                        <dt>{detail.term}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>

                <article {...cardProps(3)} className={`demo-card${shown(3)}`}>
                  <header className="demo-card__head">
                    <h3 className="demo-card__kicker">Suggested reply</h3>
                    <span className="demo-card__meta">Waiting for a person to review</span>
                  </header>
                  <div className="demo-card__typed">
                    {/* The full text reserves the final height; the typing layer sits on top of it. */}
                    <p
                      className="demo-card__message"
                      aria-hidden={typing || undefined}
                      style={typing ? { visibility: 'hidden' } : undefined}
                    >
                      {SUGGESTED_REPLY}
                    </p>
                    {typing && (
                      <TextType
                        as="p"
                        className="demo-card__message demo-card__typing"
                        text={SUGGESTED_REPLY}
                        typingSpeed={TYPING_MS}
                        loop={false}
                        cursorCharacter="▍"
                      />
                    )}
                  </div>
                </article>

                <article {...cardProps(4)} className={`demo-card demo-card--task${shown(4)}`}>
                  <header className="demo-card__head">
                    <h3 className="demo-card__kicker">Follow-up task</h3>
                    <span className="demo-card__title">{FOLLOW_UP.title}</span>
                  </header>
                  <dl className="demo-card__details">
                    {FOLLOW_UP.details.map(detail => (
                      <div key={detail.term}>
                        <dt>{detail.term}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className="demo__footnote">
          <p>
            In a real setup, the steps are designed around the tools a business already uses, and a person can approve
            each reply before it goes out.
          </p>
          <ContactLink intent="general" fallbackHref="#contact" className="text-link">
            Talk to us about automation
            <ArrowIcon />
          </ContactLink>
        </div>
      </div>
    </section>
  );
};

export default AutomationDemo;
