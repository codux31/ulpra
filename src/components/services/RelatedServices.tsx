
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Service } from '@/types/models';
import AnimatedText from '@/components/AnimatedText';

interface RelatedServicesProps {
  services: Service[];
}

const RelatedServices = ({ services }: RelatedServicesProps) => {
  if (services.length === 0) {
    return null;
  }

  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold mb-12">Services associés</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(service => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="glassmorphism p-6 transition-all duration-500 hover:translate-y-[-10px]"
          >
            <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-muted-foreground mb-6">{service.description}</p>
            <div className="inline-flex items-center text-ulpra-yellow">
              En savoir plus
              <ChevronRight size={16} className="ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;
