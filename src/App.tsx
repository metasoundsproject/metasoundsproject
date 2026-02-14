import { useEffect } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import Features from './sections/Features';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Setup reveal animations for all sections
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Parallax effect for floating elements
      gsap.utils.toArray('.float').forEach((element: any) => {
        gsap.to(element, {
          y: -20,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      });
    }

    // Cleanup
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1c1c1c] text-white noise-overlay">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <section id="about">
          <About />
        </section>
        
        {/* Products Section */}
        <section id="products">
          <Products />
        </section>
        
        {/* Features Section */}
        <section id="features">
          <Features />
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>
        
        {/* CTA Section */}
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
