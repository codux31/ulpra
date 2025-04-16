import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronRight, ExternalLink, Grid, Layers, Share2, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Project } from '@/types/models';

interface ExtendedProject extends Project {
  gallery?: string[];
  technologies?: string[];
  challenge?: string;
  solution?: string;
  results?: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ExtendedProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getProjectDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch the project details
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          console.log("Project details:", data);
          
          // Extend with additional mock data for the details page
          const extendedProject: ExtendedProject = {
            ...data,
            id: data.id,
            title: data.title,
            category: data.category || "",
            client: data.client || "",
            description: data.description || "",
            image_url: data.image_url || "",
            color: data.color || "",
            status: (data.status as "published" | "draft" | "archived") || "published",
            date: data.date || "",
            link: data.link || "",
            created_at: data.created_at || new Date().toISOString(),
            updated_at: data.updated_at || "",
            gallery: [
              data.image_url || "https://images.unsplash.com/photo-1581089781785-603411fa81e5?auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1560415755-bd80d06eda60?auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=2340&q=80"
            ],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
            challenge: "Le client avait besoin d'une plateforme moderne et évolutive pour présenter ses services et connecter avec son audience cible.",
            solution: "Nous avons développé une solution sur mesure qui intègre à la fois des éléments visuels attrayants et des fonctionnalités avancées pour une expérience utilisateur optimale.",
            results: "Augmentation du taux de conversion de 40% et amélioration significative de l'engagement des visiteurs."
          };
          
          setProject(extendedProject);
          
          // Fetch related projects (same category, excluding current one)
          const { data: relatedData, error: relatedError } = await supabase
            .from('projects')
            .select('*')
            .neq('id', id)
            .eq('category', data.category)
            .eq('status', 'published')
            .limit(3);
          
          if (relatedError) throw relatedError;
          
          if (relatedData && relatedData.length > 0) {
            console.log("Related projects:", relatedData);
            
            // Transformer les données pour correspondre au type Project[]
            const relatedProjectsData: Project[] = relatedData.map(item => ({
              id: item.id,
              title: item.title,
              category: item.category || "",
              client: item.client || "",
              description: item.description || "",
              image_url: item.image_url || "",
              color: item.color || "",
              status: (item.status as "published" | "draft" | "archived") || "published",
              date: item.date || "",
              link: item.link || "",
              created_at: item.created_at || new Date().toISOString(),
              updated_at: item.updated_at || ""
            }));
            
            setRelatedProjects(relatedProjectsData);
          } else {
            // If no related projects in same category, get any 3 other published projects
            const { data: anyProjects, error: anyError } = await supabase
              .from('projects')
              .select('*')
              .neq('id', id)
              .eq('status', 'published')
              .limit(3);
            
            if (anyError) throw anyError;
            
            if (anyProjects) {
              console.log("Any projects as related:", anyProjects);
              
              // Transformer les données pour correspondre au type Project[]
              const anyProjectsData: Project[] = anyProjects.map(item => ({
                id: item.id,
                title: item.title,
                category: item.category || "",
                client: item.client || "",
                description: item.description || "",
                image_url: item.image_url || "",
                color: item.color || "",
                status: (item.status as "published" | "draft" | "archived") || "published",
                date: item.date || "",
                link: item.link || "",
                created_at: item.created_at || new Date().toISOString(),
                updated_at: item.updated_at || ""
              }));
              
              setRelatedProjects(anyProjectsData);
            }
          }
        } else {
          toast({
            title: "Projet introuvable",
            description: "Impossible de trouver le projet demandé",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du projet",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getProjectDetails();
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

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto py-32 text-center">
          <h1 className="text-4xl font-bold mb-6">Projet introuvable</h1>
          <p className="text-muted-foreground mb-8">Le projet que vous recherchez n'existe pas ou a été déplacé.</p>
          <Link 
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux projets
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour aux projets
            </Link>
          </div>
          
          <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-ulpra-yellow font-medium mb-4">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <AnimatedText text={project.title} />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </div>
          
          <div className="glassmorphism p-4 rounded-xl overflow-hidden mb-16">
            <img 
              src={project.image_url || ""} 
              alt={project.title} 
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Aperçu du projet</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ce projet a été réalisé pour {project.client || "un client dans le secteur " + project.category}. 
                  Notre collaboration a commencé {project.date || "en 2023"} et s'est concentrée sur la création 
                  d'une solution innovante répondant parfaitement aux besoins spécifiques du client.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="glassmorphism p-8 rounded-xl">
                  <div className="flex items-start mb-4">
                    <div className="bg-ulpra-yellow/20 p-3 rounded-full mr-4">
                      <Zap className="h-6 w-6 text-ulpra-yellow" />
                    </div>
                    <h3 className="text-2xl font-bold">Le défi</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {project.challenge}
                  </p>
                </div>
                
                <div className="glassmorphism p-8 rounded-xl">
                  <div className="flex items-start mb-4">
                    <div className="bg-ulpra-yellow/20 p-3 rounded-full mr-4">
                      <Layers className="h-6 w-6 text-ulpra-yellow" />
                    </div>
                    <h3 className="text-2xl font-bold">Notre solution</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
                
                <div className="glassmorphism p-8 rounded-xl">
                  <div className="flex items-start mb-4">
                    <div className="bg-ulpra-yellow/20 p-3 rounded-full mr-4">
                      <Grid className="h-6 w-6 text-ulpra-yellow" />
                    </div>
                    <h3 className="text-2xl font-bold">Les résultats</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {project.results}
                  </p>
                </div>
              </div>
              
              {project.gallery && project.gallery.length > 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Galerie du projet</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.slice(1).map((image, index) => (
                      <div key={index} className="glassmorphism p-3 rounded-xl overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${project.title} - Image ${index + 2}`} 
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-4">
              <div className="glassmorphism p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold mb-6">Informations du projet</h3>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Client</h4>
                    <p className="font-medium">{project.client || "Client confidentiel"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Date</h4>
                    <p className="font-medium">{project.date || new Date(project.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Catégorie</h4>
                    <p className="font-medium">{project.category}</p>
                  </div>
                  
                  {project.technologies && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium inline-flex items-center justify-center hover:bg-ulpra-yellow/90 transition-colors mb-4"
                  >
                    Voir le site
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                )}
                
                <div className="flex justify-between items-center mt-6">
                  <h4 className="font-semibold">Partager:</h4>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {relatedProjects.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-bold mb-12">Projets similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map(relatedProject => (
                  <Link
                    key={relatedProject.id}
                    to={`/projects/${relatedProject.id}`}
                    className="group relative overflow-hidden rounded-2xl h-80"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-500 opacity-70 group-hover:opacity-85" />
                    
                    <img 
                      src={relatedProject.image_url || "https://images.unsplash.com/photo-1581089781785-603411fa81e5?auto=format&fit=crop&w=2340&q=80"} 
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-ulpra-yellow">{relatedProject.category}</div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 transition-transform duration-500 ease-out group-hover:translate-x-2">
                        {relatedProject.title}
                      </h3>
                      
                      <div className="inline-flex items-center text-ulpra-yellow transition-all duration-500">
                        Voir le projet
                        <ChevronRight size={14} className="ml-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
