
import React from 'react';
import AnimatedText from '@/components/AnimatedText';

const ProjectHero = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 relative">
            <AnimatedText text="Nos Projets" className="text-5xl font-bold" />
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Découvrez notre sélection de projets récents qui illustrent notre approche créative et notre expertise.
          </p>
        </div>
      </div>
      
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
    </section>
  );
};

export default ProjectHero;
