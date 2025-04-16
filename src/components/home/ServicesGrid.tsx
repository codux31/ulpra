
import React from 'react';
import ServiceCard from './ServiceCard';
import { Service } from '@/types/models';

interface ServicesGridProps {
  services: Service[];
  servicesRef: React.RefObject<HTMLDivElement>;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services, servicesRef }) => {
  return (
    <div 
      ref={servicesRef} 
      className={`grid gap-6 relative z-10 ${
        services.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 
        services.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
        services.length === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesGrid;
