
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
}

const projects: Project[] = [
  {
    id: "ecommerce-redesign",
    title: "Refonte Site E-commerce",
    category: "Web Design",
    description: "Refonte complète avec une expérience utilisateur optimisée et une identité visuelle percutante.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    client: "ModernRetail"
  },
  {
    id: "marketing-campaign",
    title: "Campagne Marketing Digital",
    category: "Communication",
    description: "Stratégie omnicanal avec contenus personnalisés pour augmenter la notoriété et les conversions.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    client: "EcoSolutions"
  },
  {
    id: "brand-identity",
    title: "Identité Visuelle Startup",
    category: "Branding",
    description: "Création d'une identité de marque distinctive avec logo, charte graphique et supports de communication.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop",
    client: "NeoTech"
  },
  {
    id: "mobile-app",
    title: "Application Mobile Événementielle",
    category: "UX/UI Design",
    description: "Conception d'une application intuitive pour améliorer l'expérience des participants à un événement majeur.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop",
    client: "EventPro"
  },
  {
    id: "website-banking",
    title: "Site Web Bancaire",
    category: "Web Design",
    description: "Interface sécurisée et moderne pour une banque en ligne avec fonctionnalités avancées.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    client: "FinanceSecure"
  },
  {
    id: "print-campaign",
    title: "Campagne Print Nationale",
    category: "Communication",
    description: "Série d'affichages urbains et de supports imprimés pour une campagne nationale.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    client: "NationalBrand"
  },
];

const categories = ['Tous', 'Web Design', 'Branding', 'Communication', 'UX/UI Design'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  
  useEffect(() => {
    if (activeCategory === 'Tous') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);
  
  useEffect(() => {
    // Observer for revealing elements on scroll
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
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleMouseEnter = (id: string) => {
    setActiveProject(id);
  };
  
  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 relative">
              <AnimatedText text="Nos Projets" className="text-gradient" />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 reveal-content">
              Découvrez notre sélection de projets récents qui illustrent notre approche créative et notre expertise.
            </p>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Filter Categories */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-ulpra-yellow text-ulpra-black' 
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-8 px-6 relative">
        <div className="container mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <Link 
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="reveal-content group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-500 ease-out opacity-70 group-hover:opacity-85"
                  />
                  
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium text-ulpra-yellow">{project.category}</div>
                      <div className="text-sm text-white/70">{project.client}</div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    <p 
                      className={`text-white/70 mb-4 transition-all duration-500 ease-out max-w-md ${
                        activeProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {project.description}
                    </p>
                    <div 
                      className={`inline-flex items-center text-ulpra-yellow transition-all duration-500 ease-out ${
                        activeProject === project.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      Voir le projet
                      <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Aucun projet ne correspond à cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
        
        {/* Background elements */}
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="glassmorphism p-12 text-center relative z-10 reveal-content">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Vous avez un projet en tête ?" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Contactez-nous pour discuter de votre idée et découvrir comment nous pouvons donner vie à votre vision.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
            >
              Discuter de votre projet
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      </section>
      
      <Footer />
    </div>
  );
};

export default Projects;
