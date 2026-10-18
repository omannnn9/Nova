import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Approach from './components/Approach/Approach';
import WhyNova from './components/WhyNova/WhyNova';
import ContactCTA from './components/ContactCTA/ContactCTA';
import Footer from './components/Footer/Footer';
import Deferred from './components/ui/Deferred';
import { useHashLanding } from './hooks/useHashLanding';

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
          <Services />
        </Deferred>
        <Deferred>
          <Approach />
        </Deferred>
        <Deferred>
          <WhyNova />
        </Deferred>
        <Deferred>
          <ContactCTA />
        </Deferred>
      </main>
      <Deferred placeholderHeight="0">
        <Footer />
      </Deferred>
      <div className="grain" aria-hidden="true" />
    </>
  );
};

export default App;
