import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import { projects, statusLabels } from '../../config/projects';
import './Work.css';

const ExternalIcon = () => (
  <svg className="btn__icon work__arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M7 13 14 6M8 6h6v6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Delivered projects as a short list: logo, name, one line on what it is, and a link when it is live. */
const Work = () => {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="container">
        <AnimatedContent distance={24} duration={1} className="work__inner">
          <div className="work__intro">
            <p className="eyebrow">Work</p>
            <h2 id="work-title" className="work__title display">
              Live <span className="accent">projects.</span>
            </h2>
          </div>

          <ul className="work__list">
            {projects.map(project => {
              const body = (
                <>
                  <img className="work__logo" src={project.logo} width={72} height={72} alt="" loading="lazy" />
                  <span className="work__text">
                    <span className="work__name">{project.name}</span>
                    <span className="work__summary">{project.summary}</span>
                    <span className="work__meta">
                      <span className={`work__status work__status--${project.status}`}>
                        {statusLabels[project.status]}
                      </span>
                      <span>{project.kind}</span>
                      <span>{project.year}</span>
                    </span>
                  </span>
                  {project.url && (
                    <span className="work__link">
                      {project.urlLabel ?? 'Visit'}
                      <ExternalIcon />
                    </span>
                  )}
                </>
              );

              return (
                <li key={project.id}>
                  {project.url ? (
                    <a className="work__item" href={project.url} target="_blank" rel="noopener noreferrer">
                      {body}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className="work__item">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default Work;
