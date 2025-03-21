
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  // Référence pour l'animation au scroll
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Valeurs pour les animations parallaxes
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    // Observer pour révéler les éléments au scroll
    const setupIntersectionObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const revealElements = document.querySelectorAll('.reveal-content');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    };
    
    setupIntersectionObserver();
    
    // Remonter en haut de la page lors du chargement
    window.scrollTo(0, 0);
  }, []);

  // Données pour les valeurs
  const values = [
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

  // Données pour les partenaires
  const partners = [
    { name: "Palindrome Studio", role: "Design d'interaction" },
    { name: "Loulou Studio", role: "Production audiovisuelle" },
    { name: "Okea Design", role: "Design d'expérience utilisateur" }
  ];

  // Timeline events
  const timelineEvents = [
    { year: "2018", title: "Création d'ULPRA", description: "Naissance du studio avec une vision claire: créer des expériences web mémorables." },
    { year: "2019", title: "Premiers projets majeurs", description: "Développement de notre portefeuille avec des clients de référence." },
    { year: "2020", title: "Expansion des services", description: "Ajout de services de stratégie et communication à notre offre." },
    { year: "2021", title: "Partenariats stratégiques", description: "Développement d'un réseau de collaborateurs experts pour enrichir notre offre." },
    { year: "2022", title: "Repositionnement premium", description: "Focalisation sur des projets haut de gamme avec une approche sur-mesure." },
    { year: "2023", title: "Aujourd'hui", description: "Studio créatif de référence pour les marques ambitieuses." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h1 className="mb-6 relative">
                <AnimatedText text="À Propos d'ULPRA" className="text-gradient" />
              </h1>
              <p className="text-xl text-muted-foreground mb-8 reveal-content opacity-0">
                Un studio créatif premium porté par une vision d'excellence et d'innovation dans le domaine du web et de la communication.
              </p>
            </div>
            <div className="md:w-1/2 reveal-content opacity-0 [animation-delay:300ms]">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <motion.div 
                  ref={ref}
                  style={{ y, opacity }}
                  className="absolute inset-0 bg-gradient-to-br from-ulpra-yellow/10 to-ulpra-black rounded-lg"
                >
                  {/* Éléments 3D */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 border-2 border-ulpra-yellow/20 rounded-full animate-[spin_25s_linear_infinite]"></div>
                      <div className="absolute inset-2 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                      <div className="absolute inset-4 border border-ulpra-yellow/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-display font-bold text-white">U<span className="text-ulpra-yellow">.</span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Notre Histoire */}
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
      
      {/* Notre Équipe */}
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
            {/* Fondateur 1 */}
            <div className="glassmorphism p-6 rounded-xl reveal-content opacity-0">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-ulpra-yellow/30">
                <div className="absolute inset-0 bg-gradient-to-br from-ulpra-yellow/30 to-ulpra-black"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">A</div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-1">Alexandre</h3>
              <p className="text-ulpra-yellow text-sm text-center mb-4">Directeur Créatif & Fondateur</p>
              <p className="text-muted-foreground text-center text-sm">
                Expert en UX/UI design et stratégie digitale avec plus de 10 ans d'expérience dans la création d'expériences web premium.
              </p>
            </div>
            
            {/* Fondateur 2 */}
            <div className="glassmorphism p-6 rounded-xl reveal-content opacity-0 [animation-delay:200ms]">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-ulpra-yellow/30">
                <div className="absolute inset-0 bg-gradient-to-br from-ulpra-yellow/30 to-ulpra-black"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">S</div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-1">Sophie</h3>
              <p className="text-ulpra-yellow text-sm text-center mb-4">Directrice de Projet & Co-fondatrice</p>
              <p className="text-muted-foreground text-center text-sm">
                Spécialiste en communication et gestion de projet, avec une expertise en marketing digital et stratégie de contenu.
              </p>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      </section>
      
      {/* Nos Partenaires */}
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
      
      {/* Nos Valeurs */}
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
        
        {/* Éléments 3D */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          <div className="relative w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-ulpra-yellow/10 rounded-full animate-[spin_40s_linear_infinite] opacity-30"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full animate-[spin_50s_linear_infinite_reverse] opacity-20"></div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
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
      
      <Footer />
    </div>
  );
};

export default About;
