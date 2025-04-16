
import { useEffect } from 'react';

/**
 * Component to handle scroll reveal functionality
 * This is extracted to make the main component cleaner
 */
const ScrollReveal = () => {
  useEffect(() => {
    // Add custom CSS to handle the reveal animations
    const style = document.createElement('style');
    style.textContent = `
      .reveal-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .is-revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
    
    // Observer for revealing elements on scroll
    const setupIntersectionObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const revealElements = document.querySelectorAll('.reveal-content');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    };
    
    // Small delay to ensure all elements are rendered
    setTimeout(setupIntersectionObserver, 100);
    
    return () => {
      // Clean up
      document.querySelectorAll('.reveal-content').forEach((el) => {
        el.classList.remove('is-revealed');
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollReveal;
