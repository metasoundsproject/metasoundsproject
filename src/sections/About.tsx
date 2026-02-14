import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            
            // Animate font weight on scroll
            const handleScroll = () => {
              const rect = section.getBoundingClientRect();
              const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
              const weight = Math.round(400 + progress * 300);
              text.style.fontWeight = String(weight);
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            
            return () => window.removeEventListener('scroll', handleScroll);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 w-full overflow-hidden bg-[#1c1c1c]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#925bff]/10 to-transparent rounded-full filter blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <p 
          ref={textRef}
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-relaxed lg:leading-relaxed text-center max-w-5xl mx-auto transition-all duration-1000"
          style={{ 
            opacity: 0.2,
            transform: 'translateY(30px)',
            fontWeight: 400
          }}
        >
          At <span className="gradient-text font-semibold">MetaSounds</span>, we craft instruments that inspire. We blend 
          <span className="text-white">cutting-edge design</span> with 
          <span className="text-white">intelligent technology</span> to make music creation 
          <span className="gradient-text font-semibold">intuitive</span> and 
          <span className="gradient-text font-semibold">exciting</span>.
        </p>
        
        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#925bff]" />
          <div className="w-2 h-2 rounded-full bg-[#0082f3]" />
          <div className="w-2 h-2 rounded-full bg-[#3aa3ff]" />
        </div>
      </div>
    </section>
  );
};

export default About;
