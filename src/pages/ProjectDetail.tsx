
import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

// Types pour les projets
interface ProjectData {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  mainImage: string;
  gallery: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  nextProject: string;
}

// Base de données simulée de projets
const projectsData: Record<string, ProjectData> = {
  '1': {
    id: '1',
    title: 'Refonte Site E-commerce',
    client: 'ModernRetail',
    year: '2023',
    category: 'Web Design',
    description: 'Refonte complète avec une expérience utilisateur optimisée et une identité visuelle percutante.',
    challenge: 'ModernRetail faisait face à un taux d\'abandon de panier élevé et une expérience mobile non optimale. L\'architecture de l\'information était confuse et l\'identité visuelle datée.',
    solution: 'Nous avons repensé entièrement l\'expérience utilisateur en mettant l\'accent sur la clarté, la vitesse et la facilité d\'utilisation. Un nouveau système de design cohérent a été créé avec une identité visuelle moderne et impactante.',
    results: 'Augmentation de 45% des conversions mobiles, réduction de 30% du taux d\'abandon de panier, et croissance de 25% du temps moyen passé sur le site. L\'identité de marque renforcée a également amélioré la reconnaissance et la confiance des clients.',
    mainImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541185934-01b600ea069c?w=800&auto=format&fit=crop',
    ],
    technologies: ['React', 'Tailwind CSS', 'Headless CMS', 'Stripe', 'Algolia'],
    testimonial: {
      quote: 'L\'équipe d\'ULPRA a transformé notre présence en ligne avec une vision claire et une exécution impeccable. Nos clients adorent la nouvelle expérience et nos ventes ont considérablement augmenté.',
      author: 'Marie Dufresne',
      position: 'Directrice Marketing, ModernRetail'
    },
    nextProject: '2'
  },
  '2': {
    id: '2',
    title: 'Campagne Marketing Digital',
    client: 'EcoSolutions',
    year: '2023',
    category: 'Communication',
    description: 'Stratégie omnicanal avec contenus personnalisés pour augmenter la notoriété et les conversions.',
    challenge: 'EcoSolutions, une startup proposant des alternatives écologiques aux produits ménagers conventionnels, cherchait à accroître sa notoriété et à convertir un public sensible aux questions environnementales mais peu familier avec leur gamme de produits.',
    solution: 'Nous avons développé une stratégie de contenu omnicanal axée sur l\'éducation et l\'impact environnemental, avec des formats variés adaptés à chaque plateforme : vidéos explicatives, infographies sur les bénéfices écologiques, témoignages d\'utilisateurs et guides pratiques.',
    results: 'En six mois, la campagne a généré une augmentation de 300% du trafic web, 15K nouveaux abonnés sur les réseaux sociaux, et une hausse des ventes de 75%. La marque est désormais reconnue comme un leader dans le segment des produits ménagers écologiques.',
    mainImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542744094-3a99d07455b1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop',
    ],
    technologies: ['Social Media', 'SEO', 'Content Marketing', 'Email Automation', 'Analytics'],
    testimonial: {
      quote: 'L\'approche stratégique d\'ULPRA a transformé notre communication. Ils ont parfaitement compris notre mission et l\'ont traduite en messages percutants qui résonnent auprès de notre public cible.',
      author: 'Thomas Leroy',
      position: 'CEO, EcoSolutions'
    },
    nextProject: '3'
  },
  '3': {
    id: '3',
    title: 'Identité Visuelle Startup',
    client: 'NeoTech',
    year: '2022',
    category: 'Branding',
    description: 'Création d\'une identité de marque distinctive avec logo, charte graphique et supports de communication.',
    challenge: 'NeoTech, une startup innovante dans le secteur de la fintech, avait besoin d\'une identité visuelle forte pour se démarquer dans un marché saturé, tout en inspirant confiance et innovation auprès des investisseurs et des premiers utilisateurs.',
    solution: 'Nous avons créé une identité complète basée sur un concept de "simplicité sophistiquée", avec un système visuel dynamique qui s\'adapte aux différents points de contact. La palette de couleurs futuriste combinée à une typographie élégante crée un équilibre parfait entre innovation et professionnalisme.',
    results: 'L\'identité a été déployée avec succès sur tous les supports, contribuant à sécuriser un financement de 2M€. La marque a été reconnue aux awards du design fintech et a attiré des talents clés séduits par l\'image professionnelle et innovante de l\'entreprise.',
    mainImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600032842850-29b5301b5390?w=800&auto=format&fit=crop',
    ],
    technologies: ['Adobe Creative Suite', 'Brand Strategy', 'Typography', 'Color Theory', 'Motion Design'],
    testimonial: {
      quote: 'Notre identité visuelle est désormais notre meilleur atout commercial. ULPRA a su capturer l\'essence de notre mission et la traduire en un langage visuel qui nous différencie instantanément de nos concurrents.',
      author: 'Sophie Martin',
      position: 'Fondatrice, NeoTech'
    },
    nextProject: '4'
  },
  '4': {
    id: '4',
    title: 'Application Mobile Événementielle',
    client: 'EventPro',
    year: '2023',
    category: 'UX/UI Design',
    description: 'Conception d\'une application intuitive pour améliorer l\'expérience des participants à un événement majeur.',
    challenge: 'EventPro organisait un festival tech avec plus de 10 000 participants et avait besoin d\'une application pour faciliter la navigation entre les 100+ conférences, gérer les inscriptions et favoriser le networking, tout en offrant une expérience fluide même avec une connexion internet limitée sur le site.',
    solution: 'Nous avons conçu une application native avec une interface intuitive, un mode hors ligne robuste et des fonctionnalités de personnalisation avancées. L\'accent a été mis sur la facilité de planification, avec des recommandations basées sur les préférences et une carte interactive du site.',
    results: 'L\'application a été adoptée par 87% des participants, avec un taux de satisfaction de 4.8/5. Le nombre moyen de sessions suivies par participant a augmenté de 30% par rapport à l\'année précédente, et les connexions networking ont doublé grâce à la fonctionnalité de mise en relation.',
    mainImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=800&auto=format&fit=crop',
    ],
    technologies: ['React Native', 'Firebase', 'UX Research', 'Prototyping', 'Usability Testing'],
    testimonial: {
      quote: 'L\'application a révolutionné notre événement. La qualité du design et l\'attention aux détails ont fait toute la différence. Nos participants ont adoré l\'expérience et nous avons reçu d\'excellents retours.',
      author: 'Jean Dubois',
      position: 'Directeur des Opérations, EventPro'
    },
    nextProject: '1'
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const projectData = projectId ? projectsData[projectId] : null;
  const scrollRef = useRef<HTMLDivElement>(null);
  
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

  // Élément 3D flottant - ombre et effet de profondeur
  const Floating3DElement = () => (
    <motion.div 
      className="absolute z-0 opacity-60"
      animate={{ 
        y: [0, 15, 0],
        rotateZ: [0, 5, 0],
        rotateY: [0, 10, 0]
      }}
      transition={{ 
        duration: 8, 
        ease: "easeInOut", 
        repeat: Infinity,
        repeatType: "reverse"
      }}
      style={{
        width: "30vw",
        height: "30vw",
        maxWidth: "400px",
        maxHeight: "400px",
        filter: "blur(40px)",
        background: "radial-gradient(circle, rgba(255,255,0,0.05) 0%, rgba(0,0,0,0) 70%)",
      }}
    />
  );

  if (!projectData) {
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
    <div ref={scrollRef} className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <Floating3DElement />
        
        <div className="container mx-auto relative z-10">
          <div className="mb-8">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Tous les projets
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2">
              <div className="text-sm font-medium text-ulpra-yellow mb-2">{projectData.category}</div>
              <h1 className="mb-6 relative">
                <AnimatedText text={projectData.title} className="text-gradient" />
              </h1>
              <p className="text-xl text-muted-foreground mb-8 reveal-content">
                {projectData.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8 reveal-content">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Client</h3>
                  <p className="font-medium">{projectData.client}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Année</h3>
                  <p className="font-medium">{projectData.year}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Service</h3>
                  <p className="font-medium">{projectData.category}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectData.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-ulpra-yellow/10 text-ulpra-yellow rounded-full">
                        {tech}
                      </span>
                    ))}
                    {projectData.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded-full">
                        +{projectData.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="md:w-1/2 glassmorphism p-4 reveal-content rounded-xl overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={projectData.mainImage} 
                alt={projectData.title} 
                className="w-full h-auto rounded-lg object-cover"
                loading="lazy"
              />
              
              {/* Effet de surbrillance 3D */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-ulpra-yellow/10 to-transparent pointer-events-none"
                animate={{ 
                  opacity: [0, 0.5, 0],
                  left: ["0%", "100%"],
                  top: ["0%", "100%"]
                }}
                transition={{ 
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Le Projet */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="mb-8 relative">
                <AnimatedText text="Le Défi" className="text-gradient" />
              </h2>
              <div className="text-lg text-muted-foreground reveal-content">
                <p>{projectData.challenge}</p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="mb-8 relative">
                <AnimatedText text="Notre Solution" className="text-gradient" />
              </h2>
              <div className="text-lg text-muted-foreground reveal-content">
                <p>{projectData.solution}</p>
              </div>
            </div>
            
            <div>
              <h2 className="mb-8 relative">
                <AnimatedText text="Résultats" className="text-gradient" />
              </h2>
              <div className="text-lg text-muted-foreground reveal-content">
                <p>{projectData.results}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Galerie */}
      <section className="py-16 px-6 relative bg-black">
        <div className="absolute left-1/4 top-1/4 opacity-40 z-0">
          <Floating3DElement />
        </div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="mb-12 relative text-center">
            <AnimatedText text="Galerie" className="text-gradient" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectData.gallery.map((image, index) => (
              <motion.div 
                key={index} 
                className="glassmorphism p-4 rounded-xl overflow-hidden reveal-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={image} 
                  alt={`${projectData.title} - Image ${index + 1}`} 
                  className="w-full h-60 object-cover rounded-lg"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      {/* Technologies */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 relative text-center">
              <AnimatedText text="Technologies Utilisées" className="text-gradient" />
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 reveal-content">
              {projectData.technologies.map((tech, index) => (
                <motion.div 
                  key={index}
                  className="px-5 py-3 bg-white/5 border border-white/10 rounded-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Témoignage */}
      {projectData.testimonial && (
        <section className="py-16 px-6 relative">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto glassmorphism p-10 rounded-2xl reveal-content relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl text-ulpra-yellow/10 font-serif leading-none">
                "
              </div>
              
              <div className="relative z-10">
                <p className="text-xl mb-8 italic">"{projectData.testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{projectData.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{projectData.testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Projet Suivant */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-muted-foreground mb-3">Projet suivant</h3>
            <h2 className="text-3xl font-semibold mb-8 hover:text-ulpra-yellow transition-colors">
              <Link to={`/projects/${projectData.nextProject}`}>
                {projectsData[projectData.nextProject].title}
              </Link>
            </h2>
            <Link 
              to={`/projects/${projectData.nextProject}`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-black font-medium transition-transform duration-300 hover:scale-105"
            >
              Voir le projet
              <ExternalLink size={16} className="ml-2" />
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
