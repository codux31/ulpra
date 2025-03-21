
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Refonte Site E-commerce",
    category: "Web Design",
    description: "Refonte complète avec une expérience utilisateur optimisée et une identité visuelle percutante.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Campagne Marketing Digital",
    category: "Communication",
    description: "Stratégie omnicanal avec contenus personnalisés pour augmenter la notoriété et les conversions.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Identité Visuelle Startup",
    category: "Branding",
    description: "Création d'une identité de marque distinctive avec logo, charte graphique et supports de communication.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Application Mobile Événementielle",
    category: "UX/UI Design",
    description: "Conception d'une application intuitive pour améliorer l'expérience des participants à un événement majeur.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop",
  },
];

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = (id: number) => {
    setActiveProject(id);
  };
  
  const handleMouseLeave = () => {
    setActiveProject(null);
  };
  
  useEffect(() => {
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
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <div id="projects" className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="mb-4 inline-block">
            <AnimatedText text="PROJETS SÉLECTIONNÉS" className="text-gradient" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Découvrez nos réalisations les plus significatives, reflétant notre expertise et notre créativité.
          </p>
        </div>
        
        <div 
          ref={projectsRef} 
          className="flex flex-col space-y-16 relative z-10"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="reveal-content group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/projects/${project.id}`} className="block">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  <div className="md:w-2/3 relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-500 ease-out opacity-70 group-hover:opacity-85" />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  <div 
                    className="md:w-1/3 p-6 md:p-0"
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="text-sm font-medium text-ulpra-yellow mb-2">{project.category}</div>
                    <h3 className="text-2xl font-semibold mb-3 transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    <p 
                      className="text-white/70 mb-4 transition-all duration-500 ease-out max-w-md"
                    >
                      {project.description}
                    </p>
                    <div 
                      className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow-light transition-all duration-500 ease-out"
                    >
                      Voir le projet
                      <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16 relative z-10">
          <Link 
            to="/projects" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-transparent border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow hover:text-black font-medium transition-all duration-300"
          >
            Voir tous les projets
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
    </div>
  );
};

export default Projects;
