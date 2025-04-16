
import React from 'react';
import AnimatedText from '@/components/AnimatedText';

const processSteps = [
  {
    step: "01",
    title: "Découverte",
    description: "Nous commençons par une analyse approfondie de vos besoins, objectifs et contexte pour comprendre parfaitement votre vision."
  },
  {
    step: "02",
    title: "Stratégie",
    description: "Nous élaborons une stratégie sur mesure qui définit clairement les objectifs, les livrables et le calendrier du projet."
  },
  {
    step: "03",
    title: "Création",
    description: "Notre équipe met en œuvre la stratégie avec créativité et précision, en vous tenant informé à chaque étape clé."
  },
  {
    step: "04",
    title: "Optimisation",
    description: "Nous analysons les résultats, recueillons vos retours et affinons continuellement pour garantir une performance optimale."
  }
];

const ProcessSteps = () => {
  return (
    <section className="py-16 px-6 relative bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-6 relative inline-block">
            <AnimatedText text="Notre Processus" className="text-gradient" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Une approche méthodique et collaborative pour assurer la réussite de chaque projet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className="glassmorphism p-8 reveal-content opacity-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
    </section>
  );
};

export default ProcessSteps;
