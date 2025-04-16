
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchServices, supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Service } from '@/types/models';
import ServiceDetailSkeleton from '@/components/services/ServiceDetailSkeleton';
import ServiceNotFound from '@/components/services/ServiceNotFound';
import ServiceContent from '@/components/services/ServiceContent';
import ServiceSidebar from '@/components/services/ServiceSidebar';
import RelatedServices from '@/components/services/RelatedServices';

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
        console.log("Fetching service with ID:", id);
        
        // First try to get services from the fetchServices function
        // This will include both Supabase services and fallback services
        const servicesData = await fetchServices();
        
        // Find the service with matching ID
        const foundService = servicesData.find(s => s.id === id);
        
        if (foundService) {
          console.log("Service found in fetchServices:", foundService);
          setService(foundService);
          
          // Get up to 3 related services from the same data source
          const related = servicesData
            .filter(s => s.id !== id)
            .slice(0, 3);
          
          setRelatedServices(related);
        } else {
          // If not found, try the Supabase direct query as a fallback
          // This query might only work with UUID format IDs
          try {
            const { data, error } = await supabase
              .from('services')
              .select('*')
              .eq('id', id)
              .single();
            
            if (error) {
              console.error("Error fetching from Supabase directly:", error);
              throw error;
            }
            
            if (data) {
              console.log("Service found in Supabase:", data);
              
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
              
              // Fetch related services
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
              toast({
                title: "Service introuvable",
                description: "Impossible de trouver le service demandé",
                variant: "destructive",
              });
            }
          } catch (dbError) {
            console.error("Database query error:", dbError);
            toast({
              title: "Erreur",
              description: "Impossible de charger les détails du service",
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
    return <ServiceDetailSkeleton />;
  }

  if (!service) {
    return <ServiceNotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ServiceContent service={service} />
          <div className="lg:col-span-4">
            <ServiceSidebar />
          </div>
        </div>
        
        <RelatedServices services={relatedServices} />
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
