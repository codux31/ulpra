
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Services', href: '/services' },
  { name: 'Projets', href: '/projects' },
  { name: 'Tarifs', href: '/#pricing' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle anchor navigation when on index page
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const href = target.getAttribute('href');
    
    if (href && href.startsWith('/#')) {
      e.preventDefault();
      const elementId = href.substring(2); // Remove '/#'
      
      if (location.pathname === '/') {
        const element = document.getElementById(elementId);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth',
          });
          setIsMenuOpen(false);
        }
      } else {
        // Navigate to homepage with the hash
        window.location.href = href;
      }
    }
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled ? 'py-4 bg-ulpra-black/90 backdrop-blur-lg border-b border-white/10' : 'py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-display font-bold tracking-tight">
          ULPRA<span className="text-ulpra-yellow">.</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            // Determine if this is an anchor link on the homepage or a regular route
            const isAnchorLink = item.href.startsWith('/#');
            
            return isAnchorLink ? (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="text-muted-foreground hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        {/* CTA Button */}
        <a
          href="/#contact"
          onClick={handleNavClick}
          className="hidden md:inline-flex items-center px-4 py-2 border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow hover:text-ulpra-black transition-all duration-300 text-sm font-medium rounded-full"
        >
          Demander un devis
        </a>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: isMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 bg-ulpra-black flex flex-col justify-center items-center space-y-8 z-40 px-6"
      >
        {navItems.map((item) => {
          const isAnchorLink = item.href.startsWith('/#');
          
          return isAnchorLink ? (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e);
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-ulpra-yellow transition-colors duration-300 text-2xl font-medium"
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-ulpra-yellow transition-colors duration-300 text-2xl font-medium"
            >
              {item.name}
            </Link>
          );
        })}
        <a
          href="/#contact"
          onClick={(e) => {
            handleNavClick(e);
            setIsMenuOpen(false);
          }}
          className="mt-8 inline-flex items-center px-6 py-3 border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow hover:text-ulpra-black transition-all duration-300 text-base font-medium rounded-full"
        >
          Demander un devis
        </a>
      </motion.div>
    </nav>
  );
};

export default Navbar;
