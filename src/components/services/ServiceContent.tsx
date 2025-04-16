
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import { Service } from '@/types/models';
import ServiceApproach from './ServiceApproach';

interface ServiceContentProps {
  service: Service;
}

const ServiceContent = ({ service }: ServiceContentProps) => {
  return (
    <div className="lg:col-span-8">
      <div className="mb-8">
        <Link 
          to="/services" 
          className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour aux services
        </Link>
      </div>
      
      <div className="mb-8">
        <div className="text-ulpra-yellow font-display text-7xl font-bold mb-6">
          {service.icon}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <AnimatedText text={service.title} />
        </h1>
      </div>
      
      {service.imageUrl && (
        <div className="glassmorphism p-4 mb-12 rounded-xl overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-4">Description</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {service.longDescription || service.description}
          </p>
          
          <ServiceApproach />
        </div>
      </div>
    </div>
  );
};

export default ServiceContent;
