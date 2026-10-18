import { useCallback, useEffect, useRef, useState } from 'react';
import { navLinks } from '../../config/site';
import NovaLogo from '../brand/NovaLogo';
import ContactLink from '../ui/ContactLink';
import ArrowIcon from '../ui/ArrowIcon';
import './Navigation.css';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Scroll state, light-section theming and the active nav item. Sections mount progressively
  // (see Deferred), so they are re-collected whenever <main>'s children change.
  useEffect(() => {
    const main = document.getElementById('main');
    if (!main) return undefined;
    let lightSections: HTMLElement[] = [];

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const line = (headerRef.current?.offsetHeight ?? 72) / 2;
      setOnLight(
        lightSections.some(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= line && rect.bottom >= line;
        })
      );
    };

    // Every section is observed, so sections without a nav item (hero, Why Nova) clear the highlight.
    const visibility = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    const collect = () => {
      visibility.disconnect();
      main.querySelectorAll<HTMLElement>('section[id]').forEach(section => visibility.observe(section));
      lightSections = Array.from(main.querySelectorAll<HTMLElement>('[data-nav-theme="light"]'));
      onScroll();
    };

    const mutations = new MutationObserver(collect);
    mutations.observe(main, { childList: true });
    collect();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      mutations.disconnect();
      visibility.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Mobile menu: scroll lock, Escape to close, focus trap, restore focus.
  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    document.body.classList.add('is-locked');
    // Tab cycles through the toggle (which precedes the panel in the DOM) and the panel's controls.
    const focusables = () => [
      ...(toggle ? [toggle] : []),
      ...Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    ];
    focusables()[1]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 860px)').matches) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`nav${scrolled ? ' is-scrolled' : ''}${onLight && !open ? ' is-on-light' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="nav__bar container">
        <a href="#top" className="nav__brand" aria-label="Nova, back to top" onClick={close}>
          <NovaLogo />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav__link" data-active={active === link.href.slice(1) || undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <ContactLink intent="general" fallbackHref="#contact" className="btn btn--light btn--sm nav__cta">
            Let’s talk
          </ContactLink>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(value => !value)}
          >
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className="nav__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="nav__panel-links">
            {navLinks.map((link, index) => (
              <li key={link.href} style={{ '--i': index } as React.CSSProperties}>
                <a href={link.href} onClick={close}>
                  <span className="nav__panel-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__panel-footer" style={{ '--i': navLinks.length } as React.CSSProperties}>
          <ContactLink intent="general" fallbackHref="#contact" className="btn btn--primary btn--lg">
            Let’s Build Something
            <ArrowIcon />
          </ContactLink>
          <p className="nav__panel-note">Websites, web apps &amp; automation — from Mauritius.</p>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
