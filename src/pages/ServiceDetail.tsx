
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

// Service data - in a real app, this would come from a database or API
const servicesData = {
  'web-design': {
    title: 'Design Digital',
    description: 'Création de sites web, d\'applications et d\'interfaces utilisateur intuitives et esthétiques.',
    longDescription: 'Notre approche de conception web combine esthétique soignée et fonctionnalité optimale. Nous créons des sites responsifs, intuitifs et engageants qui reflètent parfaitement l\'identité de votre marque tout en offrant une expérience utilisateur exceptionnelle.',
    features: [
      'Sites web responsifs adaptés à tous les appareils',
      'Interfaces utilisateur intuitives et ergonomiques',
      'Design sur mesure reflétant l\'identité de votre marque',
      'Optimisation pour les performances et la conversion',
      'Expérience utilisateur (UX) recherchée et testée',
      'Intégration avec vos systèmes existants',
    ],
    applications: [
      'Sites vitrines professionnels',
      'E-commerce et boutiques en ligne',
      'Applications web métier',
      'Intranets et plateformes collaboratives',
      'Refonte de sites existants',
    ],
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  'branding': {
    title: 'Branding',
    description: 'Développement d\'identités de marque distinctives, logos, et chartes graphiques complètes.',
    longDescription: 'Une identité de marque forte est essentielle pour se démarquer dans un marché concurrentiel. Nous créons des identités visuelles mémorables qui captent l\'essence de votre entreprise et établissent une connexion émotionnelle avec votre public cible.',
    features: [
      'Création de logos distinctifs et mémorables',
      'Développement de chartes graphiques complètes',
      'Conception d\'identités visuelles cohérentes',
      'Stratégies de positionnement de marque',
      'Design de supports marketing et communication',
      'Guidelines de marque détaillées',
    ],
    applications: [
      'Création de marque pour nouvelles entreprises',
      'Repositionnement de marques existantes',
      'Identité visuelle pour produits et services',
      'Branding événementiel',
      'Packaging et design produit',
    ],
    image: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  'communication': {
    title: 'Communication',
    description: 'Stratégies de communication omnicanal, gestion des réseaux sociaux et création de contenu.',
    longDescription: 'Une communication efficace est la clé pour atteindre et engager votre audience. Nous développons des stratégies de communication sur mesure qui intègrent tous les canaux pertinents pour maximiser votre impact et renforcer votre présence sur le marché.',
    features: [
      'Stratégies de communication globales',
      'Gestion professionnelle des réseaux sociaux',
      'Création de contenu engageant et pertinent',
      'Campagnes marketing digitales ciblées',
      'Relations presse et médias',
      'Mesure et analyse des performances',
    ],
    applications: [
      'Communication d\'entreprise',
      'Campagnes promotionnelles',
      'Lancement de produits ou services',
      'Communication de crise',
      'Événements et webinaires',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  'strategy': {
    title: 'Recherche Stratégique',
    description: 'Analyse de marché, étude de la concurrence et élaboration de stratégies marketing efficaces.',
    longDescription: 'Le succès de votre entreprise repose sur une stratégie solide et basée sur des données concrètes. Notre équipe d\'experts analyse votre marché, identifie les opportunités et élabore des stratégies personnalisées pour vous aider à atteindre vos objectifs commerciaux.',
    features: [
      'Études de marché approfondies',
      'Analyse concurrentielle détaillée',
      'Segmentation et ciblage d\'audience',
      'Planification stratégique marketing',
      'Développement de positionnement unique',
      'Stratégies d\'acquisition et de fidélisation',
    ],
    applications: [
      'Lancement de nouveaux produits ou services',
      'Expansion sur de nouveaux marchés',
      'Repositionnement stratégique',
      'Optimisation de la performance marketing',
      'Élaboration de plans d\'affaires',
    ],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? servicesData[serviceId as keyof typeof servicesData] : null;
  
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
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Service non trouvé</h2>
          <Link 
            to="/services" 
            className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Link 
                to="/services" 
                className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors mb-4"
              >
                <ArrowLeft size={16} className="mr-2" />
                Tous les services
              </Link>
              <h1 className="mb-6 relative">
                <AnimatedText text={service.title} className="text-gradient" />
              </h1>
              <p className="text-xl text-muted-foreground mb-8 reveal-content">
                {service.description}
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105 reveal-content"
              >
                Demander un devis
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
            <div className="md:w-1/2 glassmorphism p-4 reveal-content">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Description */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 relative">
              <AnimatedText text="Notre Approche" className="text-gradient" />
            </h2>
            <div className="text-lg text-muted-foreground mb-12 reveal-content">
              <p className="mb-6">
                {service.longDescription}
              </p>
              <p>
                Chez ULPRA, nous croyons en une approche personnalisée qui met l'accent sur vos objectifs spécifiques et les besoins de votre audience. Notre processus est collaboratif, transparent et orienté résultats.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-6 relative bg-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="mb-8 relative">
                <AnimatedText text="Ce Que Nous Offrons" className="text-gradient" />
              </h2>
              <ul className="space-y-4 reveal-content">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-4 mt-1 bg-ulpra-yellow/20 p-1 rounded-full">
                      <Check size={16} className="text-ulpra-yellow" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-8 relative">
                <AnimatedText text="Applications" className="text-gradient" />
              </h2>
              <ul className="space-y-4 reveal-content">
                {service.applications.map((application, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-4 mt-1 bg-ulpra-yellow/20 p-1 rounded-full">
                      <Check size={16} className="text-ulpra-yellow" />
                    </div>
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="glassmorphism p-12 text-center relative z-10 reveal-content">
            <h2 className="mb-6 relative inline-block">
              <AnimatedText text="Prêt à Démarrer ?" className="text-gradient" />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment notre expertise peut vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Demander un devis
                <ArrowRight size={16} className="ml-2" />
              </a>
              <Link 
                to="/services" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-transparent border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow/10 transition-colors duration-300 w-full sm:w-auto"
              >
                Explorer d'autres services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
