import { useEffect, useState } from 'react';
import { Music, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Products', href: '#products' },
  { name: 'Features', href: '#features' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'About', href: '#about' }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-[#1c1c1c]/80 backdrop-blur-xl border-b border-white/10' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#925bff] to-[#0082f3] flex items-center justify-center transition-transform group-hover:scale-110">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MetaSounds</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[#797774] hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-[#797774] hover:text-white transition-colors text-sm font-medium">
                Sign In
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#925bff] to-[#0082f3] text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(146,91,255,0.4)] transition-shadow">
                Shop Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#1c1c1c]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-semibold text-white hover:text-[#925bff] transition-colors"
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease'
              }}
            >
              {link.name}
            </button>
          ))}
          
          <button 
            className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-[#925bff] to-[#0082f3] text-white font-medium"
            style={{ 
              transitionDelay: isMobileMenuOpen ? '200ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease'
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
