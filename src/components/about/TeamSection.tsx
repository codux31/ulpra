
import React from 'react';
import AnimatedText from '@/components/AnimatedText';

interface TeamMember {
  initial: string;
  name: string;
  role: string;
  description: string;
}

const TeamSection = () => {
  const teamMembers: TeamMember[] = [
    {
      initial: "A",
      name: "Alexandre",
      role: "Directeur Créatif & Fondateur",
      description: "Expert en UX/UI design et stratégie digitale avec plus de 10 ans d'expérience dans la création d'expériences web premium."
    },
    {
      initial: "S",
      name: "Sophie",
      role: "Directrice de Projet & Co-fondatrice",
      description: "Spécialiste en communication et gestion de projet, avec une expertise en marketing digital et stratégie de contenu."
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center relative inline-block">
          <AnimatedText text="Notre Équipe" className="text-gradient" />
        </h2>
        
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-content opacity-0">
          <p className="text-lg mb-6">
            ULPRA est porté par une équipe réduite de deux professionnels passionnés, complémentaires dans leurs compétences, avec une vision commune de l'excellence créative.
          </p>
          <p className="text-muted-foreground">
            Notre structure volontairement légère nous permet d'être agiles, réactifs et totalement dédiés à chaque projet que nous entreprenons.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="glassmorphism p-6 rounded-xl reveal-content opacity-0"
              style={{ animationDelay: index === 1 ? "200ms" : "0ms" }}
            >
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-ulpra-yellow/30">
                <div className="absolute inset-0 bg-gradient-to-br from-ulpra-yellow/30 to-ulpra-black"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{member.initial}</div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
              <p className="text-ulpra-yellow text-sm text-center mb-4">{member.role}</p>
              <p className="text-muted-foreground text-center text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
    </section>
  );
};

export default TeamSection;
