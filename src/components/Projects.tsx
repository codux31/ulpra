
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { motion } from 'framer-motion';
import { fetchProjects } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

// Type de projet
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url?: string;
  color?: string;
  client?: string;
}

const Projects: React.FC = () => {
  // État pour les projets
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Référence pour les animations au scroll
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Charger les projets depuis Supabase
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        
        // Limiter à 4 projets pour la page d'accueil
        const limitedProjects = data
          .filter(project => project.status === "published" || !project.status)
          .slice(0, 4)
          .map(project => ({
            ...project,
            // Ajouter une couleur de dégradé aléatoire si non définie
            color: project.color || getRandomGradient(),
            // Utiliser image_url ou fallback si non définie
            image: project.image_url || "https://images.unsplash.com/photo-1581089781785-603411fa81e5?auto=format&fit=crop&w=2340&q=80"
          }));
        
        setProjects(limitedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets",
          variant: "destructive",
        });
        
        // Projets de fallback en cas d'erreur
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProjects();
    
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
      
      const revealElements = document.querySelectorAll('.project-reveal');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    };
    
    setupIntersectionObserver();
  }, [toast]);

  // Fonction pour générer un dégradé aléatoire
  const getRandomGradient = () => {
    const gradients = [
      "from-blue-500/30 to-purple-500/30",
      "from-emerald-500/30 to-cyan-500/30",
      "from-red-500/30 to-amber-500/30",
      "from-violet-500/30 to-indigo-500/30",
      "from-pink-500/30 to-rose-500/30",
      "from-yellow-500/30 to-orange-500/30"
    ];
    
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-black/60 to-black">
      <div className="container mx-auto" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="relative inline-block">
            <AnimatedText 
              text="Nos Réalisations"
              className="text-4xl md:text-5xl font-bold"
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 opacity-0 animate-fade-in [animation-delay:300ms]">
            Découvrez quelques-uns des projets sur lesquels nous avons eu le plaisir de travailler. Chaque réalisation est le fruit d'une collaboration étroite avec nos clients.
          </p>
        </div>
        
        {/* Projets */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
          </div>
        ) : projects.length > 0 ? (
          <div className={`space-y-32 mt-20 ${projects.length <= 2 ? 'max-w-3xl mx-auto' : ''}`}>
            {projects.map((project, index) => {
              // Alternance de mise en page gauche/droite
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={project.id}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center project-reveal opacity-0 z-10`}
                >
                  {/* Image */}
                  <div className="md:w-1/2 relative">
                    <div className="relative group overflow-hidden rounded-xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}></div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-0"
                      >
                        <img 
                          src={project.image_url} 
                          alt={project.title} 
                          className="w-full aspect-video object-cover rounded-xl"
                          loading="lazy"
                        />
                      </motion.div>
                      
                      {/* Overlay avec lien */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <Link 
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
                        >
                          Voir le projet
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Éléments 3D */}
                    <div className={`absolute -z-10 ${isEven ? '-right-8 -bottom-8' : '-left-8 -bottom-8'} w-full h-full border-2 border-ulpra-yellow/20 rounded-xl transform rotate-6 opacity-40`}></div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="md:w-1/2">
                    <div className="mb-3 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-ulpra-yellow font-medium">
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground mb-6">{project.description}</p>
                    <Link 
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center text-ulpra-yellow hover:text-white transition-colors duration-300"
                    >
                      Découvrir ce projet
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glassmorphism p-12 text-center max-w-3xl mx-auto mt-20">
            <h3 className="text-2xl font-bold mb-4">Aucun projet disponible pour le moment</h3>
            <p className="text-muted-foreground mb-6">
              Nos équipes sont actuellement en train de travailler sur plusieurs réalisations passionnantes. Revenez bientôt pour découvrir nos derniers projets.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
            >
              Discuter de votre projet
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        )}
        
        {/* CTA */}
        {projects.length > 0 && (
          <div className="text-center mt-20">
            <Link 
              to="/projects"
              className="inline-flex items-center px-8 py-3 bg-transparent border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow/10 transition-colors duration-300 rounded-full"
            >
              Voir tous nos projets
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
      
      {/* Effets 3D subtils */}
      <div className="absolute top-1/4 right-0 w-64 h-64 -z-10">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_40s_linear_infinite] opacity-10"></div>
          <div className="absolute inset-4 border border-ulpra-yellow/10 rounded-full animate-[spin_30s_linear_infinite_reverse] opacity-20"></div>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-0 w-80 h-80 -z-10">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_50s_linear_infinite_reverse] opacity-10"></div>
          <div className="absolute inset-4 border border-ulpra-yellow/10 rounded-full animate-[spin_35s_linear_infinite] opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
