import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Electronic Music Producer',
    content: 'MetaSounds has completely transformed my creative workflow. The smart chord feature helps me capture inspiration quickly, and the ultra-low latency gives me confidence during live performances.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexchen',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Miller',
    role: 'Independent Musician',
    content: 'An essential piece of gear for my tours. The portable design combined with extended battery life lets me maintain my creative flow anywhere. The sound library quality is simply amazing.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahmiller',
    rating: 5
  },
  {
    id: 3,
    name: 'David Park',
    role: 'Studio Engineer',
    content: 'Intuitive yet powerful. The seamless integration with major DAWs makes the workflow smoother, and the professional audio quality makes every detail crystal clear.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=davidpark',
    rating: 5
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.querySelector('.testimonial-content')?.classList.add('active');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-[#1c1c1c]"
    >
      {/* Waveform Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg className="w-full h-64" viewBox="0 0 1200 200" preserveAspectRatio="none">
          {[...Array(50)].map((_, i) => (
            <rect
              key={i}
              x={i * 24}
              y={100 - Math.random() * 80}
              width="12"
              height={Math.random() * 160 + 40}
              rx="6"
              fill="url(#waveGradient)"
              className="waveform-bar"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#925bff" />
              <stop offset="100%" stopColor="#3aa3ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#3aa3ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold">
            What They <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-content reveal max-w-4xl mx-auto">
          <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-[#925bff] to-[#0082f3] flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div 
              key={currentTestimonial.id}
              className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#925bff] text-[#925bff]" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 text-white/90">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-14 h-14 rounded-full bg-white/10"
                />
                <div>
                  <div className="font-semibold text-lg">{currentTestimonial.name}</div>
                  <div className="text-[#797774] text-sm">{currentTestimonial.role}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button 
                onClick={goToPrev}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={goToNext}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-[#925bff] to-[#3aa3ff]' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-20">
          <div className="text-center text-[#797774] text-sm mb-8">Trusted by leading music platforms</div>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-40">
            {['Ableton', 'Logic Pro', 'FL Studio', 'Cubase', 'Pro Tools'].map((partner, index) => (
              <div 
                key={index}
                className="text-xl lg:text-2xl font-bold text-white/60 hover:text-white/80 transition-colors cursor-default"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
