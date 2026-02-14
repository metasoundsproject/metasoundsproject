import { Music, Mail, MapPin, Phone, Instagram, Twitter, Youtube, Github } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Smart Keyboards', href: '#' },
    { name: 'MIDI Controllers', href: '#' },
    { name: 'Synth Modules', href: '#' },
    { name: 'Drum Machines', href: '#' },
    { name: 'Audio Interfaces', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'User Manuals', href: '#' },
    { name: 'Driver Downloads', href: '#' },
    { name: 'Warranty Policy', href: '#' },
    { name: 'Repair Service', href: '#' }
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'News & Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ]
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Github, href: '#', label: 'GitHub' }
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#1c1c1c] border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#925bff] to-[#0082f3] flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MetaSounds</span>
            </div>
            
            <p className="text-[#797774] text-sm leading-relaxed mb-6 max-w-sm">
              We are dedicated to creating cutting-edge smart music equipment, empowering every creator to unleash their unlimited musical potential.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#797774] text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@metasounds.net</span>
              </div>
              <div className="flex items-center gap-3 text-[#797774] text-sm">
                <Phone className="w-4 h-4" />
                <span>+81 (080) 3398-1211</span>
              </div>
              <div className="flex items-center gap-3 text-[#797774] text-sm">
                <MapPin className="w-4 h-4" />
                <span>Tokyo, Japan</span>
                <MapPin className="w-4 h-4" />
                <span>Shenzhen, China</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#797774] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#797774] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#797774] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#797774] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-[#797774] text-sm">
              © 2024 MetaSounds. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#797774] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
