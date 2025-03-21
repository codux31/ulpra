
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowRight } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Observer for revealing elements on scroll
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
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 relative">
              <AnimatedText text="À Propos d'ULPRA" className="text-gradient" />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 reveal-content">
              Un studio créatif qui transforme les visions en réalités digitales, avec une approche unique et innovante.
            </p>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Notre Histoire */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal-content">
              <h2 className="mb-6 relative">
                <AnimatedText text="Notre Histoire" className="text-gradient" delay={200} />
              </h2>
              <p className="text-muted-foreground mb-6">
                ULPRA est né d'une vision simple mais puissante : créer un studio où la créativité et la stratégie se rencontrent pour donner vie à des projets digitaux exceptionnels.
              </p>
              <p className="text-muted-foreground mb-6">
                Fondé par une petite équipe de deux passionnés du digital, nous avons rapidement établi des partenariats stratégiques avec des studios créatifs comme "Palindrome Studio", "Loulou Studio" et "Okea Design" pour offrir une expertise complète à nos clients.
              </p>
              <p className="text-muted-foreground mb-6">
                Aujourd'hui, nous sommes fiers d'accompagner des entreprises de toutes tailles dans leur transformation digitale, en apportant des solutions sur mesure qui font la différence.
              </p>
            </div>
            <div className="glassmorphism p-8 reveal-content">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="L'équipe ULPRA" 
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Nos Partenaires */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Nos Partenaires Clés" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Nous collaborons avec des talents exceptionnels pour offrir des résultats exceptionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glassmorphism p-8 text-center reveal-content">
              <div className="h-20 flex items-center justify-center mb-6">
                <h3 className="text-xl font-semibold text-ulpra-yellow">Palindrome Studio</h3>
              </div>
              <p className="text-muted-foreground">
                Experts en motion design et animation 3D, apportant vie et mouvement à nos projets digitaux.
              </p>
            </div>
            
            <div className="glassmorphism p-8 text-center reveal-content" style={{ transitionDelay: "100ms" }}>
              <div className="h-20 flex items-center justify-center mb-6">
                <h3 className="text-xl font-semibold text-ulpra-yellow">Loulou Studio</h3>
              </div>
              <p className="text-muted-foreground">
                Spécialistes en photographie et direction artistique, créant des visuels qui captivent et inspirent.
              </p>
            </div>
            
            <div className="glassmorphism p-8 text-center reveal-content" style={{ transitionDelay: "200ms" }}>
              <div className="h-20 flex items-center justify-center mb-6">
                <h3 className="text-xl font-semibold text-ulpra-yellow">Okea Design</h3>
              </div>
              <p className="text-muted-foreground">
                Maîtres de l'identité visuelle et du design d'expérience, transformant les concepts en identités mémorables.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nos Valeurs */}
      <section className="py-16 px-6 relative bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Nos Valeurs" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Les principes qui guident chacune de nos décisions et actions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glassmorphism p-8 reveal-content">
              <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">01</div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Nous repoussons constamment les limites créatives pour proposer des solutions uniques et avant-gardistes qui démarquent nos clients.
              </p>
            </div>
            
            <div className="glassmorphism p-8 reveal-content" style={{ transitionDelay: "100ms" }}>
              <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">02</div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Chaque projet est traité avec le plus grand soin, en visant l'excellence dans les moindres détails pour garantir des résultats exceptionnels.
              </p>
            </div>
            
            <div className="glassmorphism p-8 reveal-content" style={{ transitionDelay: "200ms" }}>
              <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">03</div>
              <h3 className="text-xl font-semibold mb-3">Engagement</h3>
              <p className="text-muted-foreground">
                Nous nous engageons pleinement dans la réussite de chaque client, en créant des relations durables basées sur la confiance et le respect mutuel.
              </p>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      {/* Notre Équipe */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Notre Équipe" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Des professionnels passionnés qui unissent leurs talents pour donner vie à vos projets
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: "Emma Laurent",
                role: "Directrice Créative",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              },
              {
                name: "Thomas Martin",
                role: "Développeur Full Stack",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="glassmorphism overflow-hidden reveal-content"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-ulpra-yellow">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="glassmorphism p-12 text-center relative z-10 reveal-content">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Prêt à Collaborer ?" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Rejoignez les entreprises qui font confiance à ULPRA pour transformer leurs idées en expériences digitales exceptionnelles.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
            >
              Discuter de votre projet
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
