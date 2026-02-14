import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Title character animation
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text
        .split('')
        .map((char, i) => 
          char === ' ' 
            ? ' ' 
            : `<span class="char-reveal" style="transition-delay: ${i * 0.05}s">${char}</span>`
        )
        .join('');
      
      setTimeout(() => {
        titleRef.current?.querySelectorAll('.char-reveal').forEach(char => {
          char.classList.add('active');
        });
      }, 300);
    }

    // Product 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const hero = heroRef.current;
    hero?.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Entrance animations
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.fromTo('.hero-desc', 
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.4, ease: 'power2.out' }
      );
      
      gsap.fromTo('.hero-cta',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
      );
      
      gsap.fromTo('.hero-product',
        { opacity: 0, z: -500, rotateY: 180 },
        { opacity: 1, z: 0, rotateY: 0, duration: 1.5, delay: 0.1, ease: 'power4.out' }
      );
    }

    return () => {
      hero?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#1c1c1c]"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 animated-gradient opacity-50" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#925bff] rounded-full filter blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3aa3ff] rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full py-20">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#3aa3ff]">
              <span className="w-2 h-2 rounded-full bg-[#3aa3ff] animate-pulse" />
              The Future is Here
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              The Future of Music Creation
            </h1>
            
            <p className="hero-desc text-lg lg:text-xl text-[#797774] max-w-xl mx-auto lg:mx-0 opacity-0">
              Experience a world of sound like never before. Smart instruments seamlessly blend with intuitive technology, making every creation a sensory feast.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0">
              <button className="magnetic-btn group relative px-8 py-4 bg-gradient-to-r from-[#925bff] to-[#0082f3] rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(146,91,255,0.5)]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0082f3] to-[#925bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="magnetic-btn group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white glass hover:bg-white/10 transition-all duration-300">
                <Play className="w-5 h-5" />
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10">
              <div>
                <div className="text-2xl lg:text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-[#797774]">Smart Products</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold gradient-text">100K+</div>
                <div className="text-sm text-[#797774]">Music Creators</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold gradient-text">30+</div>
                <div className="text-sm text-[#797774]">Countries</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - 3D Product */}
          <div 
            ref={productRef}
            className="hero-product relative flex items-center justify-center perspective-1000"
            style={{
              transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
              transition: 'transform 0.1s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glow Effect Behind Product */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] bg-gradient-to-br from-[#925bff]/30 to-[#3aa3ff]/30 rounded-full filter blur-[80px] pulse-glow" />
            </div>
            
            {/* Product Image */}
            <div className="relative float">
              <img 
                src="./images/hero-product.png" 
                alt="MetaSounds MIDI Controller"
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))'
                }}
              />
              
              {/* Floating Elements */}
              <div 
                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl glass flex items-center justify-center"
                style={{ 
                  animation: 'float 4s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              >
                <div className="w-3 h-3 rounded-full bg-[#925bff]" />
              </div>
              
              <div 
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl glass flex items-center justify-center"
                style={{ 
                  animation: 'float 5s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-[#3aa3ff]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1c1c1c] to-transparent" />
    </section>
  );
};

export default Hero;
