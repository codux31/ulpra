
import React from 'react';
import AnimatedText from '@/components/AnimatedText';

const CallToActionSection = () => {
  return (
    <section className="py-16 px-6 relative bg-black/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center glassmorphism p-12 rounded-2xl reveal-content opacity-0">
          <h2 className="mb-6 relative inline-block">
            <AnimatedText text="Travaillons Ensemble" className="text-gradient" />
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Vous avez un projet ambitieux ? Nous serions ravis de mettre notre expertise à votre service pour le concrétiser.
          </p>
          <a 
            href="/#contact" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
          >
            Discuter de votre projet
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-ulpra-black to-transparent opacity-70" />
    </section>
  );
};

export default CallToActionSection;
