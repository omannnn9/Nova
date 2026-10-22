import { useId, useRef, useState, type KeyboardEvent } from 'react';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import { statusLabels, type Project } from '../../config/projects';

const DESKTOP_SIZES = '(min-width: 1360px) 1000px, (min-width: 640px) 74vw, 92vw';
const PHONE_SIZES = '(min-width: 1360px) 290px, (min-width: 640px) 22vw, 92vw';

const ExternalIcon = () => (
  <svg className="btn__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M7 13 14 6M8 6h6v6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * One project, given the room to be read: a header line with its status and address, real screenshots
 * of the site at desktop and phone widths (switchable by view), then the brief, Nova's part and the stack.
 */
const ProjectCase = ({ project }: { project: Project }) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const titleId = `${uid}-title`;
  const panelId = `${uid}-panel`;
  const view = project.views[active];

  // WAI-ARIA tabs: arrow keys move between views, Home/End jump to the ends.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = project.views.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? active === last ? 0 : active + 1
        : event.key === 'ArrowLeft'
          ? active === 0 ? last : active - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <article className="case" aria-labelledby={titleId}>
      <AnimatedContent distance={32} duration={1.1}>
        <header className="case__head">
          <p className="case__meta">
            <span className={`case__status case__status--${project.status}`}>{statusLabels[project.status]}</span>
            <span>{project.kind}</span>
            <span>{project.sector}</span>
            <span>{project.year}</span>
          </p>
          <h3 id={titleId} className="case__title display">
            {project.name}
          </h3>
          <p className="case__summary">{project.summary}</p>
          {project.url && (
            <a className="btn btn--light case__visit" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit {project.urlLabel ?? 'the site'}
              <ExternalIcon />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </header>

        <div
          id={panelId}
          className="case__stage"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`${uid}-tab-${active}`}
        >
          <figure className="case__shot case__shot--desktop">
            <div className="case__frame case__frame--desktop">
              {project.views.map((v, i) => (
                <img
                  key={v.id}
                  className={i === active ? 'is-active' : undefined}
                  src={v.desktop.small}
                  srcSet={`${v.desktop.small} 1200w, ${v.desktop.large} 1920w`}
                  sizes={DESKTOP_SIZES}
                  width={1920}
                  height={1200}
                  alt={i === active ? v.desktop.alt : ''}
                  aria-hidden={i === active ? undefined : true}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <figcaption className="case__frame-label">Desktop · 1440 px</figcaption>
          </figure>
          <figure className="case__shot case__shot--phone">
            <div className="case__frame case__frame--phone">
              {project.views.map((v, i) => (
                <img
                  key={v.id}
                  className={i === active ? 'is-active' : undefined}
                  src={v.phone.small}
                  srcSet={`${v.phone.small} 480w, ${v.phone.large} 780w`}
                  sizes={PHONE_SIZES}
                  width={780}
                  height={1688}
                  alt={i === active ? v.phone.alt : ''}
                  aria-hidden={i === active ? undefined : true}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <figcaption className="case__frame-label">Phone · 390 px</figcaption>
          </figure>
        </div>

        <div className="case__views">
          <div className="case__tabs" role="tablist" aria-label={`${project.name} screenshots`} onKeyDown={onKeyDown}>
            {project.views.map((v, i) => (
              <button
                key={v.id}
                ref={el => {
                  tabRefs.current[i] = el;
                }}
                id={`${uid}-tab-${i}`}
                type="button"
                role="tab"
                className="case__tab"
                aria-selected={i === active}
                aria-controls={panelId}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p className="case__caption" aria-live="polite">
            {view.caption}
          </p>
        </div>

        <dl className="case__facts">
          <div className="case__fact">
            <dt>The brief</dt>
            <dd>{project.brief}</dd>
          </div>
          <div className="case__fact">
            <dt>What Nova did</dt>
            <dd>
              <ul className="case__list">
                {project.contribution.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="case__fact">
            <dt>Built with</dt>
            <dd>
              <ul className="case__stack">
                {project.stack.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {project.credits && <p className="case__credits">{project.credits}</p>}
            </dd>
          </div>
        </dl>
      </AnimatedContent>
    </article>
  );
};

export default ProjectCase;
