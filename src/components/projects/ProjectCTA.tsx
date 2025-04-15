
import React from 'react';
import AnimatedText from '@/components/AnimatedText';
import { ArrowRight } from 'lucide-react';

const ProjectCTA = () => {
  return (
    <section className="py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="glassmorphism p-12 text-center relative z-10">
          <h2 className="mb-6 relative inline-block">
            <AnimatedText text="Vous avez un projet en tête ?" className="text-3xl font-bold" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Contactez-nous pour discuter de votre idée et découvrir comment nous pouvons donner vie à votre vision.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
          >
            Discuter de votre projet
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
      
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
    </section>
  );
};

export default ProjectCTA;
