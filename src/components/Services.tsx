
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Design Digital",
    description: "Création de sites web, d'applications et d'interfaces utilisateur intuitives et esthétiques.",
    icon: "01",
  },
  {
    id: 2,
    title: "Branding",
    description: "Développement d'identités de marque distinctives, logos, et chartes graphiques complètes.",
    icon: "02",
  },
  {
    id: 3,
    title: "Communication",
    description: "Stratégies de communication omnicanal, gestion des réseaux sociaux et création de contenu.",
    icon: "03",
  },
  {
    id: 4,
    title: "Recherche Stratégique",
    description: "Analyse de marché, étude de la concurrence et élaboration de stratégies marketing efficaces.",
    icon: "04",
  },
];

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-content');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('is-revealed');
              }, 200 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    
    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <div id="services" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="mb-4 inline-block relative">
            <AnimatedText text="Nos Services" className="text-gradient" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Nous transformons les visions créatives en honorant l'originalité dans chaque détail.
          </p>
        </div>
        
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="reveal-content glassmorphism p-6 transition-all duration-500 hover:translate-y-[-10px]"
            >
              <div className="text-gold font-display text-5xl font-bold mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <a 
                href="#contact" 
                className="inline-flex items-center text-gold hover:text-gold-light transition-colors text-sm font-medium"
              >
                En savoir plus
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 mt-20 text-center md:text-left glassmorphism p-8 md:p-12 overflow-hidden">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 md:pr-8 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Nous sommes le studio qui transforme les visions créatives
              </h3>
              <p className="text-muted-foreground max-w-xl">
                Notre approche combine esthétique et stratégie pour créer des expériences numériques qui captent l'attention et génèrent des résultats concrets.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gold text-black font-medium transition-transform duration-300 hover:scale-105"
              >
                Discuter de votre projet
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] opacity-50" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gold/10 blur-[100px] opacity-40" />
    </div>
  );
};

export default Services;
