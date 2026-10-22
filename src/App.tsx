import { lazy } from 'react';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Deferred from './components/ui/Deferred';
import { useHashLanding } from './hooks/useHashLanding';

// Everything below the hero is split out of the initial bundle and mounted progressively.
const Work = lazy(() => import('./components/Work/Work'));
const Services = lazy(() => import('./components/Services/Services'));
const WhyNova = lazy(() => import('./components/WhyNova/WhyNova'));
const Approach = lazy(() => import('./components/Approach/Approach'));
const ContactCTA = lazy(() => import('./components/ContactCTA/ContactCTA'));
const Footer = lazy(() => import('./components/Footer/Footer'));

const App = () => {
  useHashLanding();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Deferred>
          <Work />
        </Deferred>
        <Deferred>
          <Services />
        </Deferred>
        <Deferred>
          <WhyNova />
        </Deferred>
        <Deferred>
          <Approach />
        </Deferred>
        <Deferred>
          <ContactCTA />
        </Deferred>
      </main>
      <Deferred placeholderHeight="0">
        <Footer />
      </Deferred>
    </>
  );
};

export default App;
