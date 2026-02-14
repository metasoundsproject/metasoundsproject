import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Smart Keyboard Pro',
    price: '$499',
    image: '/images/product-keyboard.png',
    category: 'Smart Instruments',
    description: '61-key RGB backlit with intelligent chord recognition'
  },
  {
    id: 2,
    name: 'MIDI Controller X',
    price: '$199',
    image: '/images/product-controller.png',
    category: 'Electronic Hardware',
    description: '16 velocity-sensitive pads, 8 assignable knobs'
  },
  {
    id: 3,
    name: 'Synth Module S',
    price: '$379',
    image: '/images/product-synth.png',
    category: 'Electronic Hardware',
    description: 'Modular design with infinite sonic possibilities'
  },
  {
    id: 4,
    name: 'BeatMaster Drum Machine',
    price: '$289',
    image: '/images/product-drum.png',
    category: 'Electronic Hardware',
    description: '16-step sequencer with classic drum sounds'
  },
  {
    id: 5,
    name: 'Ultra Audio Interface',
    price: '$149',
    image: '/images/product-audio.png',
    category: 'Studio Gear',
    description: '24bit/192kHz with zero-latency monitoring'
  }
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = section.querySelectorAll('.product-card-wrapper');
            cards.forEach((card, i) => {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPos = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth * 0.4;
    const newIndex = Math.round(scrollPos / cardWidth);
    setActiveIndex(Math.min(newIndex, products.length - 1));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden bg-[#1c1c1c]"
    >
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[#3aa3ff] text-sm font-medium tracking-wider uppercase mb-4 block">
              Product Series
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Explore Our <span className="gradient-text">Innovations</span>
            </h2>
          </div>
          <p className="text-[#797774] max-w-md">
            From smart instruments to professional electronic music gear, each product embodies our passion for music technology.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Products */}
      <div 
        ref={scrollRef}
        className="horizontal-scroll px-6 lg:px-12 pb-8 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
      >
        {products.map((product, index) => (
          <div 
            key={product.id}
            className="product-card-wrapper reveal"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="product-card relative w-[80vw] sm:w-[60vw] lg:w-[35vw] xl:w-[30vw] bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl overflow-hidden border border-white/10 group">
              {/* Product Image */}
              <div className="relative h-64 lg:h-80 flex items-center justify-center p-8 overflow-hidden">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#925bff]/10 to-[#3aa3ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <img 
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  draggable={false}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-[#3aa3ff]">
                  {product.category}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-[#925bff] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#797774] text-sm mb-4">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gradient-text">
                    {product.price}
                  </span>
                  
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#925bff] text-white text-sm font-medium transition-all duration-300 group/btn">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="container mx-auto px-6 lg:px-12 mt-8">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {products.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-[#925bff] to-[#3aa3ff]' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-[#797774] text-sm">
            Drag or scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
};

export default Products;
