// App.jsx — Root component. Sections rendered in order.
import SplashCursor from './components/SplashCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VideoIntro from './components/VideoIntro';
import TechnicalSkills from './components/TechnicalSkills';
import Services from './components/Services';
import Projects from './components/Projects';
import Internships from './components/Internships';
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
      <VideoIntro />
      <TechnicalSkills />
      <Services />
      <Projects />
      <Internships />
      <SoftSkills />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
