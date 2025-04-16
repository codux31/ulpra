
import React from 'react';
import AnimatedText from '@/components/AnimatedText';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const CompanyHistory = () => {
  // Timeline events
  const timelineEvents: TimelineEvent[] = [
    { year: "2018", title: "Création d'ULPRA", description: "Naissance du studio avec une vision claire: créer des expériences web mémorables." },
    { year: "2019", title: "Premiers projets majeurs", description: "Développement de notre portefeuille avec des clients de référence." },
    { year: "2020", title: "Expansion des services", description: "Ajout de services de stratégie et communication à notre offre." },
    { year: "2021", title: "Partenariats stratégiques", description: "Développement d'un réseau de collaborateurs experts pour enrichir notre offre." },
    { year: "2022", title: "Repositionnement premium", description: "Focalisation sur des projets haut de gamme avec une approche sur-mesure." },
    { year: "2023", title: "Aujourd'hui", description: "Studio créatif de référence pour les marques ambitieuses." }
  ];

  return (
    <section className="py-20 px-6 relative bg-black/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-8 relative inline-block">
            <AnimatedText text="Notre Histoire" className="text-gradient" />
          </h2>
          <p className="text-lg text-muted-foreground reveal-content opacity-0">
            ULPRA est né de la passion de deux créatifs pour le design web et la communication. Notre mission est d'aider les marques ambitieuses à se démarquer dans un monde numérique saturé, en créant des expériences mémorables et des stratégies de communication percutantes.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mt-20 pl-8 border-l border-ulpra-yellow/30">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className="mb-12 relative reveal-content opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-ulpra-yellow/20 border-2 border-ulpra-yellow flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-ulpra-yellow"></div>
              </div>
              <div className="absolute -left-[110px] top-0 font-display font-bold text-ulpra-yellow">{event.year}</div>
              <div className="pl-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
    </section>
  );
};

export default CompanyHistory;
