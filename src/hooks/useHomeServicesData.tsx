
import { useState, useEffect } from 'react';
import { fetchServices } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Service } from '@/types/models';

export const useHomeServicesData = () => {
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
              icon: "🎨",
              created_at: new Date().toISOString()
            },
            {
              id: "2",
              title: "Développement",
              description: "Solutions web personnalisées avec les dernières technologies",
              icon: "💻",
              created_at: new Date().toISOString()
            },
            {
              id: "3",
              title: "Stratégie Digitale",
              description: "Optimisation de votre présence en ligne et acquisition de clients",
              icon: "📊",
              created_at: new Date().toISOString()
            },
            {
              id: "4",
              title: "Branding",
              description: "Création et refonte d'identités de marque mémorables",
              icon: "✨",
              created_at: new Date().toISOString()
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
            icon: "🎨",
            created_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "Développement",
            description: "Solutions web personnalisées avec les dernières technologies",
            icon: "💻",
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadServices();
  }, [toast]);

  return { services, isLoading };
};
