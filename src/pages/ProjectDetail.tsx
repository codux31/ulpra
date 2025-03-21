
import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, ArrowRight, ExternalLink, Check, Calendar, Users, Target, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Type de données pour les projets
interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  heroImage: string;
  gallery: string[];
  testimonial?: {
    content: string;
    author: string;
    role: string;
  };
  nextProject?: string;
}

// Données des projets (en production, ces données viendraient d'une API)
const projectsData: Record<string, Project> = {
  'luxury-resort': {
    id: 'luxury-resort',
    title: 'Luxury Resort',
    category: 'Site Web',
    client: 'Riviera Escape & Spa',
    year: '2023',
    description: 'Refonte complète du site web d'un resort de luxe avec réservation en ligne et expérience immersive.',
    challenge: 'Riviera Escape & Spa cherchait à moderniser son site web vieillissant pour refléter l'expérience haut de gamme offerte par l'établissement. Les principaux défis incluaient la création d'une expérience en ligne immersive, l'optimisation du système de réservation et l'amélioration de la présentation des différentes offres et services.',
    solution: 'Nous avons conçu une expérience utilisateur centrée sur l'immersion visuelle avec des animations subtiles et élégantes. Le site intègre un système de réservation personnalisé, des visites virtuelles des suites et installations, ainsi qu'une présentation dynamique des offres saisonnières.',
    results: [
      'Augmentation de 45% des réservations en ligne',
      'Temps moyen passé sur le site multiplié par 2,5',
      'Diminution de 30% du taux de rebond',
      'Amélioration significative de l'expérience mobile',
    ],
    technologies: ['WordPress', 'JavaScript', 'GSAP', 'Stripe', 'API de réservation sur mesure'],
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    testimonial: {
      content: 'ULPRA a parfaitement saisi l'essence de notre marque de luxe et l'a traduite en une expérience digitale exceptionnelle. Le nouveau site a considérablement amélioré notre image et nos performances commerciales.',
      author: 'Sophie Renaud',
      role: 'Directrice Marketing, Riviera Escape & Spa',
    },
    nextProject: 'tech-solutions',
  },
  'tech-solutions': {
    id: 'tech-solutions',
    title: 'Tech Solutions',
    category: 'Branding & Web',
    client: 'Nexus Innovation',
    year: '2023',
    description: 'Création d'identité de marque et développement web pour une startup technologique innovante.',
    challenge: 'Nexus Innovation, jeune startup spécialisée en intelligence artificielle, avait besoin d'établir une présence de marque forte et distinctive sur un marché très concurrentiel. L'entreprise souhaitait une identité reflétant à la fois son caractère innovant et sa rigueur scientifique.',
    solution: 'Nous avons développé une identité de marque complète, incluant logo, charte graphique et guidelines, puis conçu un site web dynamique présentant leurs solutions d'IA de manière claire et engageante, avec des démonstrations interactives de leurs technologies.',
    results: [
      'Identité de marque unanimement appréciée par les parties prenantes',
      'Augmentation de 60% des demandes de démonstration via le site',
      'Amélioration significative de la crédibilité perçue auprès des investisseurs',
      'Site web primé dans la catégorie "Meilleur site tech" aux French Web Awards',
    ],
    technologies: ['React', 'Next.js', 'Three.js', 'Framer Motion', 'Figma', 'Adobe Creative Suite'],
    heroImage: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    testimonial: {
      content: 'L'équipe d'ULPRA a su transformer notre vision technique complexe en une identité de marque claire et impactante. Leur approche créative couplée à une compréhension approfondie de notre secteur a dépassé nos attentes.',
      author: 'Alexandre Dubois',
      role: 'CEO, Nexus Innovation',
    },
    nextProject: 'gastro-delight',
  },
  'gastro-delight': {
    id: 'gastro-delight',
    title: 'Gastro Delight',
    category: 'E-commerce',
    client: 'Maison Gourmande',
    year: '2022',
    description: 'Boutique en ligne pour une marque d'épicerie fine avec personnalisation de commandes et abonnements.',
    challenge: 'Maison Gourmande souhaitait transformer son activité de vente d'épicerie fine traditionnelle en une expérience e-commerce premium, permettant la personnalisation des commandes et un système d'abonnement pour les produits récurrents. Le défi était de retranscrire en ligne l'expérience client exclusive de leurs boutiques physiques.',
    solution: 'Nous avons développé une plateforme e-commerce sur mesure avec Shopify Plus, intégrant un configurateur de paniers gourmands personnalisés, un système d'abonnement flexible, et une présentation immersive des produits avec storytelling autour des producteurs et des origines.',
    results: [
      'Lancement réussi avec 200% des objectifs de vente atteints le premier mois',
      'Panier moyen 35% plus élevé que dans les boutiques physiques',
      'Taux de conversion de 4.8%, bien au-dessus de la moyenne du secteur',
      'Plus de 500 abonnements actifs après 6 mois d'exploitation',
    ],
    technologies: ['Shopify Plus', 'JavaScript', 'Liquid', 'Apps Shopify sur mesure', 'Klaviyo', 'ReCharge'],
    heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    testimonial: {
      content: 'ULPRA a réussi à capturer l'essence de notre marque et à la transposer parfaitement dans l'univers digital. Notre boutique en ligne est devenue un véritable prolongement de notre expérience en magasin, voire plus.',
      author: 'Marie Lefevre',
      role: 'Fondatrice, Maison Gourmande',
    },
    nextProject: 'eco-fashion',
  },
  'eco-fashion': {
    id: 'eco-fashion',
    title: 'Éco Fashion',
    category: 'Branding & Communication',
    client: 'Verde Style',
    year: '2022',
    description: 'Stratégie de communication complète pour une marque de mode éthique en pleine expansion.',
    challenge: 'Verde Style, marque de mode éthique en croissance, cherchait à renforcer sa présence sur le marché français et européen. L'entreprise avait besoin d'une stratégie de communication cohérente pour mettre en avant ses engagements environnementaux tout en consolidant son image fashion et désirable.',
    solution: 'Nous avons développé une stratégie de communication omnicanale, incluant une refonte de l'identité visuelle, des campagnes sur les réseaux sociaux centrées sur le storytelling, un programme d'influence avec des ambassadeurs partageant les mêmes valeurs, et des supports de communication imprimés eco-responsables.',
    results: [
      'Croissance de 78% de la communauté Instagram en 6 mois',
      'Augmentation de 45% du trafic organique vers le site web',
      'Campagne d'influence générant un ROI de 350%',
      'Mention dans 3 grands magazines de mode comme "marque éthique à suivre"',
    ],
    technologies: ['Adobe Creative Suite', 'Canva Pro', 'Later', 'Mention', 'Sarbacane', 'Google Analytics 4'],
    heroImage: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2201&q=80',
    ],
    testimonial: {
      content: 'L'équipe d'ULPRA a compris nos valeurs dès le premier jour et a su créer une stratégie de communication qui respecte notre éthique tout en boostant considérablement notre visibilité et notre image de marque.',
      author: 'Lucas Martin',
      role: 'Directeur Marketing, Verde Style',
    },
    nextProject: 'luxury-resort',
  },
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  
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
      
      const revealElements = document.querySelectorAll('.reveal-content');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    };
    
    setupIntersectionObserver();
    
    // Remonter en haut de la page lors du chargement
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
      <section ref={heroRef} className="relative pt-20 h-[80vh] overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={project.heroImage} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ulpra-black to-transparent opacity-80"></div>
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-end z-10 px-6 pb-20">
          <div className="container mx-auto">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors mb-6"
            >
              <ArrowLeft size={16} className="mr-2" />
              Tous les projets
            </Link>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                {project.year}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 relative">
              <AnimatedText text={project.title} className="text-gradient" />
            </h1>
            
            <p className="text-xl md:text-2xl max-w-2xl text-muted-foreground mb-8 reveal-content opacity-0">
              {project.description}
            </p>
            
            <div className="reveal-content opacity-0 [animation-delay:300ms]">
              <span className="text-ulpra-yellow font-medium">Client: </span>
              <span className="text-white">{project.client}</span>
            </div>
          </div>
        </div>
        
        {/* Éléments 3D */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-ulpra-yellow/20 rounded-full animate-[spin_40s_linear_infinite] opacity-20 z-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 border border-white/5 rounded-full animate-[spin_60s_linear_infinite_reverse] opacity-10 z-10"></div>
      </section>
      
      {/* Contenu du projet */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Section principale */}
            <div className="md:col-span-2">
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 relative">
                  <AnimatedText text="Le Challenge" className="text-gradient" />
                </h2>
                <p className="text-muted-foreground reveal-content opacity-0">
                  {project.challenge}
                </p>
              </div>
              
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 relative">
                  <AnimatedText text="Notre Solution" className="text-gradient" />
                </h2>
                <p className="text-muted-foreground reveal-content opacity-0">
                  {project.solution}
                </p>
              </div>
              
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 relative">
                  <AnimatedText text="Résultats" className="text-gradient" />
                </h2>
                <ul className="space-y-3 reveal-content opacity-0">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-4 mt-1 bg-ulpra-yellow/20 p-1 rounded-full">
                        <Check size={16} className="text-ulpra-yellow" />
                      </div>
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Galerie d'images */}
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 relative">
                  <AnimatedText text="Galerie" className="text-gradient" />
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-content opacity-0">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-xl group">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - Image ${index + 1}`} 
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ulpra-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                        <span className="text-sm text-white font-medium">{project.title} - Vue {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Témoignage */}
              {project.testimonial && (
                <div className="mb-16 glassmorphism p-8 rounded-xl reveal-content opacity-0">
                  <div className="text-ulpra-yellow mb-4">
                    <Quote size={32} />
                  </div>
                  <blockquote className="text-xl font-medium mb-6 italic">
                    "{project.testimonial.content}"
                  </blockquote>
                  <div>
                    <p className="font-semibold">{project.testimonial.author}</p>
                    <p className="text-ulpra-yellow text-sm">{project.testimonial.role}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar avec infos complémentaires */}
            <div className="md:col-span-1">
              <div className="glassmorphism p-6 rounded-xl sticky top-32">
                <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-white/10">Informations du Projet</h3>
                
                {/* Détails */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <Calendar size={18} className="mr-2 text-ulpra-yellow" />
                      <span className="font-medium">Année</span>
                    </div>
                    <p className="text-muted-foreground">{project.year}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Users size={18} className="mr-2 text-ulpra-yellow" />
                      <span className="font-medium">Client</span>
                    </div>
                    <p className="text-muted-foreground">{project.client}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Target size={18} className="mr-2 text-ulpra-yellow" />
                      <span className="font-medium">Catégorie</span>
                    </div>
                    <p className="text-muted-foreground">{project.category}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Award size={18} className="mr-2 text-ulpra-yellow" />
                      <span className="font-medium">Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-white/5 rounded-md text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <a 
                    href="/#contact" 
                    className="inline-flex items-center justify-center w-full px-4 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105"
                  >
                    Discuter de votre projet
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Éléments 3D */}
        <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-ulpra-yellow/5 blur-[100px] opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-ulpra-yellow/10 blur-[80px] opacity-20"></div>
      </section>
      
      {/* Projet suivant */}
      {project.nextProject && (
        <section className="py-16 px-6 relative bg-black/50">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="text-muted-foreground">Découvrez également</span>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2">Projet Suivant</h2>
            </div>
            
            <div className="relative max-w-4xl mx-auto overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-ulpra-black/70 to-transparent z-10"></div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative z-0"
              >
                <img 
                  src={projectsData[project.nextProject].heroImage} 
                  alt={projectsData[project.nextProject].title} 
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
              </motion.div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <span className="text-ulpra-yellow mb-2">{projectsData[project.nextProject].category}</span>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">{projectsData[project.nextProject].title}</h3>
                <p className="text-muted-foreground mb-6 max-w-xl">{projectsData[project.nextProject].description}</p>
                <Link 
                  to={`/projects/${project.nextProject}`}
                  className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium max-w-max transform hover:scale-105 transition-transform duration-300"
                >
                  Voir ce projet
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
