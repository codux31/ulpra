
import React from 'react';
import AnimatedText from '@/components/AnimatedText';
import { CheckCircle, Users, Lightbulb, Target } from 'lucide-react';

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValuesSection = () => {
  // Data for company values
  const values: ValueProps[] = [
    {
      icon: <Lightbulb className="h-8 w-8 text-ulpra-yellow" />,
      title: "Innovation",
      description: "Nous repoussons constamment les limites créatives pour développer des solutions originales qui se démarquent."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-ulpra-yellow" />,
      title: "Excellence",
      description: "Nous nous engageons à fournir un travail de la plus haute qualité, avec une attention méticuleuse aux détails."
    },
    {
      icon: <Users className="h-8 w-8 text-ulpra-yellow" />,
      title: "Collaboration",
      description: "Nous croyons en un processus transparent et collaboratif, travaillant main dans la main avec nos clients."
    },
    {
      icon: <Target className="h-8 w-8 text-ulpra-yellow" />,
      title: "Impact",
      description: "Nous créons des designs et des stratégies qui génèrent des résultats mesurables pour votre entreprise."
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center relative inline-block">
          <AnimatedText text="Nos Valeurs" className="text-gradient" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="glassmorphism p-6 rounded-xl flex flex-col items-center text-center reveal-content opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 p-3 rounded-full bg-ulpra-black/50 border border-ulpra-yellow/20">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 3D Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-ulpra-yellow/10 rounded-full animate-[spin_40s_linear_infinite] opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full animate-[spin_50s_linear_infinite_reverse] opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
