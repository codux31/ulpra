
import React, { useRef, useEffect } from 'react';
import ServicesGrid from './home/ServicesGrid';
import ServicesLoading from './home/ServicesLoading';
import ServicesFallback from './home/ServicesFallback';
import ServicesCTA from './home/ServicesCTA';
import AnimatedText from './AnimatedText';
import { useHomeServicesData } from '@/hooks/useHomeServicesData';

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const { services, isLoading } = useHomeServicesData();
  
  useEffect(() => {
    // Observer pour révéler les éléments au scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-content');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('is-revealed');
              }, 200 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    
    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <div id="services" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="mb-4 inline-block relative">
            <span className="block text-gradient text-4xl font-bold">Nos Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Nous transformons les visions créatives en honorant l'originalité dans chaque détail.
          </p>
        </div>
        
        {isLoading ? (
          <ServicesLoading />
        ) : services && services.length > 0 ? (
          <ServicesGrid services={services} servicesRef={servicesRef} />
        ) : (
          <ServicesFallback />
        )}
        
        {services.length > 0 && <ServicesCTA />}
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-40" />
    </div>
  );
};

export default Services;
