import { useEffect, useRef } from 'react';
import { Music, Wifi, Battery, Layers, Zap, Headphones } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Music,
    title: 'Smart Chords',
    description: 'One-touch harmony generation with AI-assisted composition for endless creative inspiration',
    color: '#925bff'
  },
  {
    icon: Wifi,
    title: 'Seamless Connection',
    description: 'Perfect compatibility with all major DAWs for a plug-and-play creative experience',
    color: '#0082f3'
  },
  {
    icon: Battery,
    title: 'Extended Battery',
    description: 'Up to 40 hours on a single charge, create anywhere without interruption',
    color: '#3aa3ff'
  },
  {
    icon: Layers,
    title: 'Infinite Sounds',
    description: 'Continuously updated cloud sound library, explore infinite sonic possibilities',
    color: '#925bff'
  },
  {
    icon: Zap,
    title: 'Ultra Low Latency',
    description: '<1ms response time, every touch is precise and accurate',
    color: '#0082f3'
  },
  {
    icon: Headphones,
    title: 'Pro Audio Quality',
    description: '24bit/192kHz high-resolution audio, capturing every detail of every note',
    color: '#3aa3ff'
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardElements = cards.querySelectorAll('.feature-card');
            cardElements.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('active');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardEl: HTMLDivElement) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      cardEl.style.transform = `translate(${x * strength * 0.1}px, ${y * strength * 0.1}px)`;
    }
  };

  const handleMouseLeave = (cardEl: HTMLDivElement) => {
    cardEl.style.transform = 'translate(0, 0)';
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-[#1c1c1c]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#925bff]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#3aa3ff]/5 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#3aa3ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            Core Technology
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">MetaSounds</span>
          </h2>
          <p className="text-[#797774]">
            We constantly push technological boundaries to bring unprecedented experiences to music creators
          </p>
        </div>

        {/* Features Grid */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card reveal group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <Icon 
                    className="w-7 h-7 transition-colors duration-300"
                    style={{ color: feature.color }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#797774] text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.color}10, transparent 70%)`
                  }}
                />

                {/* Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${feature.color}10 50%)`,
                    borderRadius: '0 1.5rem 0 0'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '<1ms', label: 'Ultra Low Latency' },
            { value: '40h', label: 'Battery Life' },
            { value: '192kHz', label: 'Sample Rate' },
            { value: '∞', label: 'Sound Possibilities' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-[#797774] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
