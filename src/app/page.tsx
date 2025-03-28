'use client';

import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Contact from '../components/Contact/Contact';
import PerformanceOverlay from '../components/PerformanceOverlay/PerformanceOverlay';
import Certifications from '../components/Certifications/Certifications';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Fixed Performance Overlay for entire portfolio */}
      <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
        <PerformanceOverlay />
      </div>

      <Hero />
      <About />
      <Projects />
      <Certifications />
      <Experience />
      <Contact />
    </main>
  );
}
