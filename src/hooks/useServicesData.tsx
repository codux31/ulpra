
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Service } from '@/types/models';

interface ServiceFromDb {
  id: string;
  title: string;
  description: string;
  icon: string;
  longdescription?: string;
  imageurl?: string;
  status?: string;
  created_at: string;
  updated_at?: string;
}

export const useServicesData = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        
        // Obtenir directement les services depuis Supabase
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        console.log("Services direct from Supabase:", data);
        
        if (data && data.length > 0) {
          const activeServices = data
            .filter((service: ServiceFromDb) => service.status === "active" || !service.status)
            .map((service: ServiceFromDb) => ({
              id: service.id,
              title: service.title,
              description: service.description,
              icon: service.icon,
              longDescription: service.longdescription || service.description,
              imageUrl: service.imageurl,
              status: (service.status as "active" | "draft" | "archived") || "active",
              created_at: service.created_at,
              updated_at: service.updated_at
            }));
          
          console.log("Services page data:", activeServices);
          setServices(activeServices as Service[]);
        } else {
          // Créer et insérer des services de test
          const staticServices: Service[] = createStaticServices();
          
          console.log("Using static services data on Services page");
          
          // Insérer les services de test dans Supabase
          for (const service of staticServices) {
            const { error: insertError } = await supabase
              .from('services')
              .upsert({
                id: service.id,
                title: service.title,
                description: service.description,
                icon: service.icon,
                longdescription: service.longDescription,
                imageurl: service.imageUrl,
                status: service.status,
                created_at: service.created_at
              }, { onConflict: 'id' });
            
            if (insertError) {
              console.error("Error inserting static service:", insertError);
            }
          }
          
          setServices(staticServices);
        }
      } catch (error) {
        console.error('Error loading services:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les services",
          variant: "destructive",
        });
        
        const fallbackServices: Service[] = createFallbackServices();
        setServices(fallbackServices);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
    
    // Setup intersection observer for animations
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

  return { services, isLoading };
};

// Helper functions to create static services
const createStaticServices = (): Service[] => {
  return [
    {
      id: "web-design",
      title: "Design Digital",
      description: "Création de sites web, d'applications et d'interfaces utilisateur intuitives et esthétiques.",
      icon: "01",
      longDescription: "Notre approche de conception web combine esthétique soignée et fonctionnalité optimale. Nous créons des sites responsifs, intuitifs et engageants qui reflètent parfaitement l'identité de votre marque.",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      created_at: new Date().toISOString()
    },
    {
      id: "branding",
      title: "Branding",
      description: "Développement d'identités de marque distinctives, logos, et chartes graphiques complètes.",
      icon: "02",
      longDescription: "Une identité de marque forte est essentielle pour se démarquer. Nous créons des identités visuelles mémorables qui captent l'essence de votre entreprise et établissent une connexion avec votre audience.",
      imageUrl: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      created_at: new Date().toISOString()
    },
    {
      id: "communication",
      title: "Communication",
      description: "Stratégies de communication omnicanal, gestion des réseaux sociaux et création de contenu.",
      icon: "03",
      longDescription: "Une communication efficace est la clé pour atteindre et engager votre audience. Nous développons des stratégies sur mesure qui intègrent tous les canaux pertinents pour maximiser votre impact.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      created_at: new Date().toISOString()
    },
    {
      id: "strategy",
      title: "Recherche Stratégique",
      description: "Analyse de marché, étude de la concurrence et élaboration de stratégies marketing efficaces.",
      icon: "04",
      longDescription: "Le succès repose sur une stratégie solide basée sur des données concrètes. Notre équipe analyse votre marché, identifie les opportunités et élabore des stratégies personnalisées pour atteindre vos objectifs.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      created_at: new Date().toISOString()
    },
  ];
};

const createFallbackServices = (): Service[] => {
  return [
    {
      id: "web-design",
      title: "Design Digital",
      description: "Création de sites web, d'applications et d'interfaces utilisateur intuitives et esthétiques.",
      icon: "01",
      longDescription: "Notre approche de conception web combine esthétique soignée et fonctionnalité optimale. Nous créons des sites responsifs, intuitifs et engageants qui reflètent parfaitement l'identité de votre marque.",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      created_at: new Date().toISOString()
    },
    {
      id: "branding",
      title: "Branding",
      description: "Développement d'identités de marque distinctives, logos, et chartes graphiques complètes.",
      icon: "02",
      longDescription: "Une identité de marque forte est essentielle pour se démarquer. Nous créons des identités visuelles mémorables qui captent l'essence de votre entreprise et établissent une connexion avec votre audience.",
      imageUrl: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      status: "active",
      created_at: new Date().toISOString()
    },
  ];
};
