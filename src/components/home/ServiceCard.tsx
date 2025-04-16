
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '@/types/models';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div 
      className="reveal-content glassmorphism p-6 transition-all duration-500 hover:translate-y-[-10px] opacity-100"
    >
      <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-muted-foreground mb-6">{service.description}</p>
      <Link 
        to={`/services/${service.id}`}
        className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors text-sm font-medium"
      >
        En savoir plus
        <ArrowRight size={14} className="ml-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
