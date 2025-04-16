
import React from 'react';
import AnimatedText from '@/components/AnimatedText';

interface Partner {
  name: string;
  role: string;
}

const PartnersSection = () => {
  const partners: Partner[] = [
    { name: "Palindrome Studio", role: "Design d'interaction" },
    { name: "Loulou Studio", role: "Production audiovisuelle" },
    { name: "Okea Design", role: "Design d'expérience utilisateur" }
  ];

  return (
    <section className="py-20 px-6 relative bg-black/50">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center relative inline-block">
          <AnimatedText text="Nos Partenaires Clés" className="text-gradient" />
        </h2>
        
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-content opacity-0">
          <p className="text-lg mb-6">
            Nous collaborons avec un réseau d'experts pour enrichir notre offre et répondre à tous les besoins de nos clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="glassmorphism p-8 rounded-xl text-center reveal-content opacity-0 hover:border hover:border-ulpra-yellow/20 transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-ulpra-yellow/20 to-transparent flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-ulpra-yellow/30 flex items-center justify-center">
                  <span className="text-2xl font-bold">{partner.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-ulpra-yellow text-sm">{partner.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
    </section>
  );
};

export default PartnersSection;
