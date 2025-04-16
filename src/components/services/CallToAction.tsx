
import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';

const CallToAction = () => {
  return (
    <section className="py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="glassmorphism p-12 text-center relative z-10 reveal-content opacity-100">
          <h2 className="mb-6 relative inline-block">
            <AnimatedText text="Prêt à Transformer Votre Vision ?" className="text-gradient" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment notre expertise peut vous aider à atteindre vos objectifs.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
          >
            Demander un devis
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
      
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
    </section>
  );
};

export default CallToAction;
