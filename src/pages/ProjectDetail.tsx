
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, ArrowRight, User, Calendar, Tag } from 'lucide-react';

// Project data - in a real app, this would come from a database or API
const projectsData = {
  'ecommerce-redesign': {
    id: 1,
    title: "Refonte Site E-commerce",
    category: "Web Design",
    client: "ModernRetail",
    date: "Avril 2023",
    tags: ["E-commerce", "UX/UI", "Responsive"],
    description: "Refonte complète avec une expérience utilisateur optimisée et une identité visuelle percutante pour augmenter les conversions et améliorer l'engagement client.",
    challenge: "ModernRetail faisait face à un taux d'abandon de panier élevé et une expérience mobile sous-optimale, limitant leur croissance sur un marché de plus en plus concurrentiel.",
    solution: "Notre équipe a réalisé une refonte complète de l'interface utilisateur avec une approche mobile-first, simplifiant le parcours d'achat et mettant en valeur les produits avec une direction artistique contemporaine.",
    results: [
      "Augmentation de 37% du taux de conversion",
      "Réduction de 45% du taux d'abandon de panier",
      "Augmentation de 28% du temps moyen passé sur le site",
      "Amélioration de 52% des ventes sur mobile"
    ],
    testimonial: {
      quote: "L'équipe d'ULPRA a complètement transformé notre présence en ligne. Notre nouveau site est non seulement visuellement impressionnant, mais il génère également des résultats commerciaux tangibles.",
      author: "Sophie Durand",
      position: "Directrice Marketing, ModernRetail"
    },
    mainImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    ]
  },
  'marketing-campaign': {
    id: 2,
    title: "Campagne Marketing Digital",
    category: "Communication",
    client: "EcoSolutions",
    date: "Juin 2023",
    tags: ["Marketing Digital", "Réseaux Sociaux", "SEO"],
    description: "Stratégie omnicanal avec contenus personnalisés pour augmenter la notoriété et les conversions d'une entreprise spécialisée dans les produits écologiques.",
    challenge: "EcoSolutions cherchait à augmenter sa visibilité en ligne et à attirer une clientèle plus large, tout en communiquant efficacement sur ses valeurs environnementales.",
    solution: "Nous avons développé une stratégie marketing complète intégrant le SEO, les réseaux sociaux et le marketing de contenu pour mettre en avant leurs produits écologiques et leur mission environnementale.",
    results: [
      "Augmentation de 85% du trafic organique",
      "Croissance de 65% de l'engagement sur les réseaux sociaux",
      "Acquisition de 3000 nouveaux prospects qualifiés",
      "Hausse de 42% des ventes en ligne"
    ],
    testimonial: {
      quote: "La campagne marketing développée par ULPRA a dépassé toutes nos attentes. Leur compréhension de notre mission et leur créativité ont permis de toucher exactement notre public cible.",
      author: "Marc Leblanc",
      position: "CEO, EcoSolutions"
    },
    mainImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
    ]
  },
  'brand-identity': {
    id: 3,
    title: "Identité Visuelle Startup",
    category: "Branding",
    client: "NeoTech",
    date: "Mars 2023",
    tags: ["Branding", "Logo Design", "Charte Graphique"],
    description: "Création d'une identité de marque distinctive avec logo, charte graphique et supports de communication pour une startup technologique innovante.",
    challenge: "En tant que nouvelle entreprise dans un secteur concurrentiel, NeoTech avait besoin d'une identité visuelle forte et mémorable qui reflète son caractère innovant et technologique.",
    solution: "Notre équipe a développé une identité de marque complète comprenant un logo distinctif, une palette de couleurs audacieuse et une typographie moderne, créant ainsi une présence visuelle cohérente sur tous les supports.",
    results: [
      "Reconnaissance immédiate de la marque dans l'écosystème tech",
      "Augmentation de 40% de la notoriété de la marque",
      "Cohérence visuelle sur tous les canaux de communication",
      "Différenciation claire par rapport aux concurrents"
    ],
    testimonial: {
      quote: "ULPRA a parfaitement capté l'essence de notre entreprise et l'a traduite en une identité visuelle qui nous distingue véritablement. Leur travail a considérablement contribué à notre crédibilité et à notre reconnaissance sur le marché.",
      author: "Thomas Martin",
      position: "Fondateur, NeoTech"
    },
    mainImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ]
  },
  'mobile-app': {
    id: 4,
    title: "Application Mobile Événementielle",
    category: "UX/UI Design",
    client: "EventPro",
    date: "Septembre 2023",
    tags: ["Mobile App", "UX/UI", "React Native"],
    description: "Conception d'une application intuitive pour améliorer l'expérience des participants à un événement majeur, avec fonctionnalités interactives et design épuré.",
    challenge: "EventPro souhaitait offrir une expérience numérique unique aux participants de ses événements, facilitant la navigation, les interactions et l'accès aux informations pendant les conférences.",
    solution: "Nous avons conçu une application mobile intuitive avec un design épuré et des fonctionnalités avancées comme la géolocalisation en intérieur, la mise en relation des participants et un programme personnalisable.",
    results: [
      "Taux d'adoption de 92% parmi les participants",
      "Augmentation de 78% de la satisfaction des participants",
      "Réduction de 60% des questions au service d'assistance",
      "Hausse de 45% des interactions entre participants"
    ],
    testimonial: {
      quote: "L'application développée par ULPRA a révolutionné nos événements. L'interface intuitive et les fonctionnalités innovantes ont considérablement amélioré l'expérience de nos participants et simplifié notre gestion logistique.",
      author: "Claire Dupont",
      position: "Directrice des Opérations, EventPro"
    },
    mainImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1605170439002-90845e8c0137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80"
    ]
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;
  
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
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Projet non trouvé</h2>
          <Link 
            to="/projects" 
            className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Tous les projets
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
            <div className="lg:col-span-3">
              <h1 className="mb-6 relative">
                <AnimatedText text={project.title} className="text-gradient" />
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User size={16} className="mr-2" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={16} className="mr-2" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag size={16} className="mr-2" />
                  <span>{project.category}</span>
                </div>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 reveal-content">
                {project.description}
              </p>
            </div>
            
            <div className="lg:col-span-2 glassmorphism p-4 reveal-content">
              <img 
                src={project.mainImage} 
                alt={project.title} 
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Project Details */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal-content">
              <h2 className="mb-6 relative">
                <AnimatedText text="Le Challenge" className="text-gradient" />
              </h2>
              <p className="text-muted-foreground mb-8">
                {project.challenge}
              </p>
              
              <h2 className="mb-6 relative">
                <AnimatedText text="Notre Solution" className="text-gradient" />
              </h2>
              <p className="text-muted-foreground mb-8">
                {project.solution}
              </p>
            </div>
            
            <div className="reveal-content">
              <h2 className="mb-6 relative">
                <AnimatedText text="Résultats" className="text-gradient" />
              </h2>
              <ul className="space-y-4 mb-12">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-4 mt-1 bg-ulpra-yellow/20 p-1 rounded-full">
                      <ArrowRight size={16} className="text-ulpra-yellow" />
                    </div>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
              
              <div className="glassmorphism p-8 reveal-content">
                <p className="italic text-lg mb-6">"{project.testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{project.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{project.testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery */}
      <section className="py-16 px-6 relative bg-black">
        <div className="container mx-auto">
          <h2 className="mb-12 relative text-center">
            <AnimatedText text="Galerie du Projet" className="text-gradient" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="glassmorphism p-4 reveal-content"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-60 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      {/* Next Projects */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <h2 className="mb-12 relative text-center">
            <AnimatedText text="Autres Projets" className="text-gradient" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(projectsData)
              .filter(([key]) => key !== projectId)
              .slice(0, 2)
              .map(([key, otherProject]) => (
                <Link 
                  key={key} 
                  to={`/projects/${key}`}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer reveal-content"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                  
                  <img 
                    src={otherProject.mainImage} 
                    alt={otherProject.title}
                    className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <div className="text-sm font-medium text-ulpra-yellow mb-2">{otherProject.category}</div>
                    <h3 className="text-2xl font-semibold mb-3 transition-transform duration-500 group-hover:translate-x-2">
                      {otherProject.title}
                    </h3>
                    <div className="inline-flex items-center text-ulpra-yellow transition-transform duration-500 group-hover:translate-x-2">
                      Voir le projet
                      <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/projects" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-transparent border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow/10 transition-colors duration-300"
            >
              Voir tous les projets
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
