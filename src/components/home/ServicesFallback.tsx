
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesFallback: React.FC = () => {
  return (
    <div className="glassmorphism p-12 text-center max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Nos services sont en cours de configuration</h3>
      <p className="text-muted-foreground mb-6">
        Nous sommes en train de mettre à jour notre offre de services. Revenez bientôt pour découvrir notre gamme complète de prestations.
      </p>
      <Link 
        to="/contact"
        className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
      >
        Contactez-nous pour discuter de vos besoins
        <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  );
};

export default ServicesFallback;
