
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ProcessSteps from '@/components/services/ProcessSteps';
import CallToAction from '@/components/services/CallToAction';
import { useServicesData } from '@/hooks/useServicesData';

const Services = () => {
  const { services, isLoading } = useServicesData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <ServicesHero />
      
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <ServicesList services={services} isLoading={isLoading} />
        </div>
        
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      <ProcessSteps />
      
      <CallToAction />
      
      <Footer />
    </div>
  );
};

export default Services;
