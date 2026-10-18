/**
 * Small, CSS-driven illustrations for each service. Decorative only (aria-hidden).
 * They animate when the services grid gains `.is-in` (see Services.css).
 */

/** A website assembling itself: chrome, nav, headline, then the one lit action. */
export const SiteVisual = () => (
  <div className="visual visual--site" aria-hidden="true">
    <div className="site-frame">
      <div className="site-frame__bar">
        <i />
        <i />
        <i />
        <span className="site-frame__url" />
      </div>
      <div className="site-frame__page">
        <div className="site-frame__nav">
          <span className="site-frame__logo" />
          <span className="site-frame__links">
            <i />
            <i />
            <i />
          </span>
        </div>
        <span className="sf-line sf-line--xl" />
        <span className="sf-line sf-line--lg" />
        <span className="sf-line sf-line--text" />
        <span className="sf-line sf-line--text sf-line--short" />
        <span className="site-frame__action" />
        <div className="site-frame__cards">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  </div>
);

/** Modules of a web application; one is lit at a time. */
export const ModulesVisual = () => (
  <div className="visual visual--modules" aria-hidden="true">
    {Array.from({ length: 6 }, (_, index) => (
      <span key={index} className="module" style={{ '--i': index } as React.CSSProperties}>
        <i />
        <i />
      </span>
    ))}
  </div>
);

/** A workflow: light travels from one step to the next. */
export const FlowVisual = () => (
  <div className="visual visual--flow" aria-hidden="true">
    <span className="flow__rail">
      <span className="flow__pulse" />
    </span>
    {['In', 'Process', 'Done'].map(step => (
      <span key={step} className="flow__node">
        <span className="flow__dot" />
        <span className="flow__label">{step}</span>
      </span>
    ))}
  </div>
);
