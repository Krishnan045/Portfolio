// App.jsx — Root component. Sections rendered in order with buttery Lenis smooth scrolling.
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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
  useEffect(() => {
    // Initialize Lenis for momentum smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for all hash links (#about, #projects, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const hash = target.getAttribute('href');
        if (hash && hash !== '#') {
          const elem = document.querySelector(hash);
          if (elem) {
            e.preventDefault();
            lenis.scrollTo(elem, { offset: 0, duration: 1.2 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

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
