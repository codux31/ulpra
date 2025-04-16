
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronRight, Clock, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchServices, supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import AnimatedText from '@/components/AnimatedText';
import { Service } from '@/types/models';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getServiceDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch the service details
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          console.log("Service details:", data);
          
          // Transform data to match Service type
          const serviceData: Service = {
            id: data.id,
            title: data.title,
            icon: data.icon || "",
            description: data.description || "",
            longDescription: data.longdescription || "",
            imageUrl: data.imageurl || "",
            status: (data.status as "active" | "draft" | "archived") || "active",
            created_at: data.created_at || new Date().toISOString(),
            updated_at: data.updated_at
          };
          
          setService(serviceData);
          
          // Fetch related services (excluding current one)
          const { data: relatedData, error: relatedError } = await supabase
            .from('services')
            .select('*')
            .neq('id', id)
            .eq('status', 'active')
            .limit(3);
          
          if (relatedError) throw relatedError;
          
          if (relatedData) {
            console.log("Related services:", relatedData);
            
            // Transform data to match Service[] type
            const relatedServicesData: Service[] = relatedData.map(item => ({
              id: item.id,
              title: item.title,
              icon: item.icon || "",
              description: item.description || "",
              longDescription: item.longdescription || "",
              imageUrl: item.imageurl || "",
              status: (item.status as "active" | "draft" | "archived") || "active",
              created_at: item.created_at || new Date().toISOString(),
              updated_at: item.updated_at
            }));
            
            setRelatedServices(relatedServicesData);
          }
        } else {
          // If no service found, try to get it from our database function
          const servicesData = await fetchServices();
          const foundService = servicesData.find(s => s.id === id);
          
          if (foundService) {
            setService(foundService);
            
            // Get up to 3 related services
            const related = servicesData
              .filter(s => s.id !== id)
              .slice(0, 3);
            
            setRelatedServices(related);
          } else {
            toast({
              title: "Service introuvable",
              description: "Impossible de trouver le service demandé",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du service",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getServiceDetails();
    window.scrollTo(0, 0);
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto py-32 flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto py-32 text-center">
          <h1 className="text-4xl font-bold mb-6">Service introuvable</h1>
          <p className="text-muted-foreground mb-8">Le service que vous recherchez n'existe pas ou a été déplacé.</p>
          <Link 
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-16 px-6">
        <div className="mb-8">
          <Link 
            to="/services" 
            className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux services
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="mb-8">
              <div className="text-ulpra-yellow font-display text-7xl font-bold mb-6">
                {service.icon}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <AnimatedText text={service.title} />
              </h1>
            </div>
            
            {service.imageUrl && (
              <div className="glassmorphism p-4 mb-12 rounded-xl overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-4">Description</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.longDescription || service.description}
                </p>
                
                <div className="my-12 glassmorphism p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">Notre approche</h3>
                  <p className="text-muted-foreground mb-6">
                    Nous utilisons une méthodologie agile pour garantir un développement efficace et adapté à vos besoins spécifiques.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
                        <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
                      </div>
                      <div>
                        <span className="block font-semibold">Phase d'analyse</span>
                        <span className="text-muted-foreground">Compréhension approfondie de vos besoins.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
                        <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
                      </div>
                      <div>
                        <span className="block font-semibold">Conception stratégique</span>
                        <span className="text-muted-foreground">Élaboration d'une stratégie adaptée à vos objectifs.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
                        <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
                      </div>
                      <div>
                        <span className="block font-semibold">Implémentation et tests</span>
                        <span className="text-muted-foreground">Développement rigoureux et validation continue.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
                        <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
                      </div>
                      <div>
                        <span className="block font-semibold">Suivi et optimisation</span>
                        <span className="text-muted-foreground">Amélioration continue des performances.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="glassmorphism p-6 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold mb-4">Informations</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-3 text-ulpra-yellow" />
                  <span>Disponibilité: Immédiate</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-3 text-ulpra-yellow" />
                  <span>Délai moyen: 2-4 semaines</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold">Partager:</h4>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <Link
                to="/contact"
                className="w-full py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium inline-flex items-center justify-center hover:bg-ulpra-yellow/90 transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
        
        {relatedServices.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-12">Services associés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map(relatedService => (
                <Link
                  key={relatedService.id}
                  to={`/services/${relatedService.id}`}
                  className="glassmorphism p-6 transition-all duration-500 hover:translate-y-[-10px]"
                >
                  <div className="text-ulpra-yellow font-display text-5xl font-bold mb-6">
                    {relatedService.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{relatedService.title}</h3>
                  <p className="text-muted-foreground mb-6">{relatedService.description}</p>
                  <div className="inline-flex items-center text-ulpra-yellow">
                    En savoir plus
                    <ChevronRight size={16} className="ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
