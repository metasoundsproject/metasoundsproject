import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.querySelector('.cta-content')?.classList.add('active');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 w-full overflow-hidden bg-[#1c1c1c]"
      onMouseMove={handleMouseMove}
    >
      {/* Rotating Gradient Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-[150%] aspect-square rotating-gradient opacity-20"
          style={{ filter: 'blur(100px)' }}
        />
      </div>

      {/* Mouse Follow Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(146,91,255,0.3) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div 
          className="cta-content reveal text-center max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#3aa3ff] mb-8">
            <Sparkles className="w-4 h-4" />
            Limited Time Offer
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            Ready to<br />
            <span className="gradient-text">Create?</span>
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-[#797774] mb-10 max-w-xl mx-auto">
            Join over 100,000 music creators worldwide and start your music creation journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ripple group relative px-10 py-5 bg-gradient-to-r from-[#925bff] to-[#0082f3] rounded-2xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(146,91,255,0.5)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Shop Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0082f3] to-[#925bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group px-10 py-5 rounded-2xl font-semibold text-white text-lg glass hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-[#797774] text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#009c22]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#009c22]" />
              </div>
              30-Day Returns
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#009c22]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#009c22]" />
              </div>
              1-Year Warranty
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#009c22]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#009c22]" />
              </div>
              Free Global Shipping
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default CTA;
