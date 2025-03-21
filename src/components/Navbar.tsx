
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled ? 'py-4 bg-background/90 backdrop-blur-lg border-b border-white/10' : 'py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-white text-2xl font-display font-bold tracking-tight">
          ULPRA<span className="text-gold">.</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm font-medium rounded-full"
        >
          Request a quote
        </a>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-background flex flex-col justify-center items-center space-y-8 transition-transform duration-300 ease-in-out z-40 px-6',
          isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-gold transition-colors duration-300 text-2xl font-medium"
          >
            {item.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          className="mt-8 inline-flex items-center px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-base font-medium rounded-full"
        >
          Request a quote
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
