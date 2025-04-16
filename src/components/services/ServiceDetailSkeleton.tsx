
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto py-32 flex justify-center items-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetailSkeleton;
