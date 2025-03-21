
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { fetchServices } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  status?: string;
}

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Charger les services depuis Supabase
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const data = await fetchServices();
        
        // N'utiliser que les services avec status "active" ou null (pour la rétrocompatibilité)
        const activeServices = data.filter(
          service => service.status === "active" || !service.status
        );
        
        if (activeServices.length > 0) {
          // Limiter à 6 services pour la page d'accueil
          setServices(activeServices.slice(0, 6));
          console.log("Services chargés:", activeServices);
        } else {
          // Fallback si aucun service n'est trouvé
          setServices([
            {
              id: "1",
              title: "Web Design",
              description: "Création de sites web modernes et responsives adaptés à votre marque",
              icon: "🎨"
            },
            {
              id: "2",
              title: "Développement",
              description: "Solutions web personnalisées avec les dernières technologies",
              icon: "💻"
            },
            {
              id: "3",
              title: "Stratégie Digitale",
              description: "Optimisation de votre présence en ligne et acquisition de clients",
              icon: "📊"
            },
            {
              id: "4",
              title: "Branding",
              description: "Création et refonte d'identités de marque mémorables",
              icon: "✨"
            }
          ]);
          console.log("Fallback - Services prédéfinis chargés");
        }
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les services",
          variant: "destructive",
        });
        
        // Fallback en cas d'erreur
        setServices([
          {
            id: "1",
            title: "Web Design",
            description: "Création de sites web modernes et responsives adaptés à votre marque",
            icon: "🎨"
          },
          {
            id: "2",
            title: "Développement",
            description: "Solutions web personnalisées avec les dernières technologies",
            icon: "💻"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadServices();
    
    // Observer pour révéler les éléments au scroll
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
  }, [toast]);

  return (
    <div id="services" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="mb-4 inline-block relative">
            <span className="block text-gradient text-4xl font-bold">Nos Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Nous transformons les visions créatives en honorant l'originalité dans chaque détail.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
          </div>
        ) : services && services.length > 0 ? (
          <div 
            ref={servicesRef} 
            className={`grid gap-6 relative z-10 ${
              services.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 
              services.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
              services.length === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="reveal-content glassmorphism p-6 transition-all duration-500 hover:translate-y-[-10px] opacity-100"
              >
                <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link 
                  to={`/services/${service.id}`}
                  className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors text-sm font-medium"
                >
                  En savoir plus
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="glassmorphism p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Nos services sont en cours de configuration</h3>
            <p className="text-muted-foreground mb-6">
              Nous sommes en train de mettre à jour notre offre de services. Revenez bientôt pour découvrir notre gamme complète de prestations.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
            >
              Contactez-nous pour discuter de vos besoins
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        )}
        
        {services.length > 0 && (
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
                <Link 
                  to="/services" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
                >
                  Tous nos services
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-40" />
    </div>
  );
};

export default Services;
