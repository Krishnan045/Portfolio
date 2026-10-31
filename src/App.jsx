// App.jsx — Root component. Sections rendered in order.
// Internships & Leadership skipped — data arrays currently empty (add to portfolioData.js to enable).
// Contact will be added in the next step.
import SplashCursor from './components/SplashCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalSkills from './components/TechnicalSkills';
import Services from './components/Services';
import Projects from './components/Projects';
import SoftSkills from './components/SoftSkills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <SplashCursor VELOCITY_DISSIPATION={3} SPLAT_FORCE={3500} COLOR_UPDATE_SPEED={18} COLOR="#ffffff" RAINBOW_MODE={false} />
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Services />
      <Projects />
      <SoftSkills />
      <Contact />
      <Footer />
    </>
  );
}

export default App;

