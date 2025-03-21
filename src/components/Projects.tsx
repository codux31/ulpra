
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { motion, useScroll, useTransform } from 'framer-motion';

// Type de projet
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

// Données de projets (dans un projet réel, ces données pourraient venir d'une API)
const projectsData: Project[] = [
  {
    id: "luxury-resort",
    title: "Luxury Resort",
    category: "Site Web",
    description: "Refonte complète du site web d'un resort de luxe avec réservation en ligne et expérience immersive.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    color: "from-blue-500/30 to-purple-500/30",
  },
  {
    id: "tech-solutions",
    title: "Tech Solutions",
    category: "Branding & Web",
    description: "Création d'identité de marque et développement web pour une startup technologique innovante.",
    image: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    color: "from-emerald-500/30 to-cyan-500/30",
  },
  {
    id: "gastro-delight",
    title: "Gastro Delight",
    category: "E-commerce",
    description: "Boutique en ligne pour une marque d'épicerie fine avec personnalisation de commandes et abonnements.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    color: "from-red-500/30 to-amber-500/30",
  },
  {
    id: "eco-fashion",
    title: "Éco Fashion",
    category: "Branding & Communication",
    description: "Stratégie de communication complète pour une marque de mode éthique en pleine expansion.",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    color: "from-violet-500/30 to-indigo-500/30",
  },
];

const Projects: React.FC = () => {
  // Référence pour les animations au scroll
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
  }, []);

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-black/30">
      <div className="container mx-auto" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="relative inline-block">
            <AnimatedText 
              text="Nos Réalisations"
              className="text-gradient"
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 opacity-0 animate-fade-in [animation-delay:300ms]">
            Découvrez quelques-uns des projets sur lesquels nous avons eu le plaisir de travailler. Chaque réalisation est le fruit d'une collaboration étroite avec nos clients.
          </p>
        </div>
        
        {/* Projets */}
        <div className="space-y-32 mt-20">
          {projectsData.map((project, index) => {
            // Alternance de mise en page gauche/droite
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={project.id}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center project-reveal opacity-0`}
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
                        src={project.image} 
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
        
        {/* CTA */}
        <div className="text-center mt-20">
          <Link 
            to="/projects"
            className="inline-flex items-center px-8 py-3 bg-transparent border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow/10 transition-colors duration-300 rounded-full"
          >
            Voir tous nos projets
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
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
