import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowRight } from 'lucide-react';
import { fetchServices } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Service as ServiceType } from '@/types/models';

interface Service extends ServiceType {
  longDescription: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const data = await fetchServices();
        
        const activeServices = data.filter(
          service => service.status === "active" || !service.status
        ).map(service => ({
          ...service,
          longDescription: service.longDescription || service.description
        }));
        
        if (activeServices.length > 0) {
          console.log("Services page data:", activeServices);
          setServices(activeServices as Service[]);
        } else {
          const staticServices = [
            {
              id: "web-design",
              title: "Design Digital",
              description: "Création de sites web, d'applications et d'interfaces utilisateur intuitives et esthétiques.",
              icon: "01",
              longDescription: "Notre approche de conception web combine esthétique soignée et fonctionnalité optimale. Nous créons des sites responsifs, intuitifs et engageants qui reflètent parfaitement l'identité de votre marque.",
              imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            },
            {
              id: "branding",
              title: "Branding",
              description: "Développement d'identités de marque distinctives, logos, et chartes graphiques complètes.",
              icon: "02",
              longDescription: "Une identité de marque forte est essentielle pour se démarquer. Nous créons des identités visuelles mémorables qui captent l'essence de votre entreprise et établissent une connexion avec votre audience.",
              imageUrl: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            },
            {
              id: "communication",
              title: "Communication",
              description: "Stratégies de communication omnicanal, gestion des réseaux sociaux et création de contenu.",
              icon: "03",
              longDescription: "Une communication efficace est la clé pour atteindre et engager votre audience. Nous développons des stratégies sur mesure qui intègrent tous les canaux pertinents pour maximiser votre impact.",
              imageUrl: "https://images.unsplash.com/photo-1552664730-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            },
            {
              id: "strategy",
              title: "Recherche Stratégique",
              description: "Analyse de marché, étude de la concurrence et élaboration de stratégies marketing efficaces.",
              icon: "04",
              longDescription: "Le succès repose sur une stratégie solide basée sur des données concrètes. Notre équipe analyse votre marché, identifie les opportunités et élabore des strat��gies personnalisées pour atteindre vos objectifs.",
              imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            },
          ];
          
          console.log("Using static services data on Services page");
          setServices(staticServices);
        }
      } catch (error) {
        console.error('Error loading services:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les services",
          variant: "destructive",
        });
        
        const fallbackServices = [
          {
            id: "web-design",
            title: "Design Digital",
            description: "Création de sites web, d'applications et d'interfaces utilisateur intuitives et esthétiques.",
            icon: "01",
            longDescription: "Notre approche de conception web combine esthétique soignée et fonctionnalité optimale. Nous créons des sites responsifs, intuitifs et engageants qui reflètent parfaitement l'identité de votre marque.",
            imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          },
          {
            id: "branding",
            title: "Branding",
            description: "Développement d'identités de marque distinctives, logos, et chartes graphiques complètes.",
            icon: "02",
            longDescription: "Une identité de marque forte est essentielle pour se démarquer. Nous créons des identités visuelles mémorables qui captent l'essence de votre entreprise et établissent une connexion avec votre audience.",
            imageUrl: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          },
        ];
        
        setServices(fallbackServices);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
    
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
    
    window.scrollTo(0, 0);
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 relative">
              <AnimatedText text="Nos Services" className="text-gradient" />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 reveal-content opacity-100">
              Découvrez comment nous pouvons transformer votre vision en réalité digitale avec nos services sur mesure.
            </p>
          </div>
        </div>
        
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 gap-16">
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center reveal-content opacity-100 ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">
                      {service.longDescription || service.description}
                    </p>
                    <Link 
                      to={`/services/${service.id}`} 
                      className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
                    >
                      En savoir plus
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                  <div className={`glassmorphism p-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-auto rounded-xl object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4">Aucun service disponible pour le moment</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Nos équipes sont en train de mettre à jour notre catalogue de services.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium"
              >
                Contactez-nous
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
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
            {[
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
            ].map((step, index) => (
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
      
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="glassmorphism p-12 text-center relative z-10 reveal-content opacity-100">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Prêt à Transformer Votre Vision ?" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment notre expertise peut vous aider à atteindre vos objectifs.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
            >
              Demander un devis
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
