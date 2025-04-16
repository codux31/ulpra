
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceNotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-4xl font-bold mb-6">Service introuvable</h1>
        <p className="text-muted-foreground mb-8">Le service que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link 
          to="/services"
          className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour aux services
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceNotFound;
