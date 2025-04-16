
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types/models';

interface ServicesListProps {
  services: Service[];
  isLoading: boolean;
}

const ServicesList = ({ services, isLoading }: ServicesListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-2xl font-bold mb-4">Aucun service disponible pour le moment</h3>
        <p className="text-lg text-muted-foreground mb-8">
          Nos équipes sont en train de mettre à jour notre catalogue de services.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium"
        >
          Contactez-nous
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-16">
      {services.map((service, index) => (
        <div 
          key={service.id} 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center reveal-content opacity-100 ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
            <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
              {service.icon}
            </div>
            <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>
            <p className="text-muted-foreground mb-6">
              {service.longDescription || service.description}
            </p>
            <Link 
              to={`/services/${service.id}`} 
              className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
            >
              En savoir plus
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className={`glassmorphism p-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="w-full h-auto rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
