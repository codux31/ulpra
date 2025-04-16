
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Share2 } from 'lucide-react';

const ServiceSidebar = () => {
  return (
    <div className="glassmorphism p-6 rounded-xl sticky top-24">
      <h3 className="text-xl font-bold mb-4">Informations</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-5 w-5 mr-3 text-ulpra-yellow" />
          <span>Disponibilité: Immédiate</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-5 w-5 mr-3 text-ulpra-yellow" />
          <span>Délai moyen: 2-4 semaines</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-semibold">Partager:</h4>
        <div className="flex space-x-2">
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <Link
        to="/contact"
        className="w-full py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium inline-flex items-center justify-center hover:bg-ulpra-yellow/90 transition-colors"
      >
        Demander un devis
      </Link>
    </div>
  );
};

export default ServiceSidebar;
