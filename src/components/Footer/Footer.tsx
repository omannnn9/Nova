import { navLinks, site, whatsappDisplay } from '../../config/site';
import { hasWhatsApp } from '../../lib/whatsapp';
import NovaLogo from '../brand/NovaLogo';
import ContactLink from '../ui/ContactLink';
import './Footer.css';

const YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <NovaLogo />
          <p className="footer__tagline">{site.tagline}</p>
          <p className="footer__about">
            Websites, web applications and automation for businesses, from {site.location}.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__heading">Explore</h2>
          <ul>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Get in touch</h2>
          <ul>
            <li>
              {hasWhatsApp ? (
                <ContactLink intent="general" className="footer__link">
                  WhatsApp <span className="footer__number">{whatsappDisplay}</span>
                </ContactLink>
              ) : (
                <a href="#contact" className="footer__link">
                  Start a conversation
                </a>
              )}
            </li>
            <li className="footer__muted">Based in {site.location}</li>
          </ul>
        </div>
      </div>

      <div className="footer__base container">
        <p>
          © {YEAR} {site.name}. All rights reserved.
        </p>
        <a href="#top" className="footer__link">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        nova
      </div>
    </footer>
  );
};

export default Footer;
