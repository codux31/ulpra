
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesCTA: React.FC = () => {
  return (
    <div className="relative z-10 mt-20 text-center md:text-left glassmorphism p-8 md:p-12 overflow-hidden">
      <div className="md:flex items-center justify-between">
        <div className="md:w-2/3 md:pr-8 mb-8 md:mb-0">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Nous sommes le studio qui transforme les visions créatives
          </h3>
          <p className="text-muted-foreground max-w-xl">
            Notre approche combine esthétique et stratégie pour créer des expériences numériques qui captent l'attention et génèrent des résultats concrets.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <Link 
            to="/services" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
          >
            Tous nos services
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCTA;
