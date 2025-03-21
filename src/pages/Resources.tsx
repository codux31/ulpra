
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { ArrowRight, Search, Calendar, User, Clock, Tag, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchResources } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Resource as ResourceType } from '@/types/models';

// Local interface for Resources page that includes all required fields
interface Resource extends ResourceType {
  image: string; // Required for this component
  tags: string[]; // Required for this component
}

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [categories, setCategories] = useState<string[]>(['Tous']);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Load resources from Supabase
  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const data = await fetchResources();
        
        // Only use resources with status "published" or null (for backward compatibility)
        const publishedResources = data.filter(
          resource => resource.status === "published" || !resource.status
        ).map(resource => ({
          ...resource,
          image: resource.image_url || '', // Map image_url to image for component compatibility
          tags: resource.tags || [], // Ensure tags is always an array
          excerpt: resource.excerpt || resource.description.substring(0, 120) + '...' // Ensure excerpt exists
        }));
        
        if (publishedResources.length > 0) {
          // Extract unique categories
          const uniqueCategories = ['Tous', ...Array.from(new Set(publishedResources.map(r => r.category)))];
          
          setResources(publishedResources as Resource[]);
          setFilteredResources(publishedResources as Resource[]);
          setCategories(uniqueCategories);
        } else {
          // Fallback to static data if no resources in database
          const staticResources: Resource[] = [
            {
              id: 'tendances-design-2023',
              title: 'Tendances de Design Web pour 2023',
              description: 'Découvrez les tendances émergentes en design web qui domineront l\'année 2023.',
              excerpt: 'Découvrez les tendances émergentes en design web qui domineront l\'année 2023 et comment les intégrer à vos projets.',
              category: 'Design',
              date: '15 janvier 2023',
              author: 'Sophie Dubois',
              readTime: '7 min',
              image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
              tags: ['Design Web', 'Tendances', 'UX/UI'],
              type: 'article',
              created_at: new Date().toISOString()
            },
            {
              id: 'optimisation-seo-guide',
              title: 'Guide Complet d\'Optimisation SEO',
              description: 'Un guide étape par étape pour améliorer le référencement de votre site web.',
              excerpt: 'Un guide étape par étape pour améliorer le référencement de votre site web et gagner en visibilité dans les moteurs de recherche.',
              category: 'Marketing',
              date: '28 février 2023',
              author: 'Alexandre Martin',
              readTime: '12 min',
              image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
              tags: ['SEO', 'Référencement', 'Google'],
              type: 'article',
              created_at: new Date().toISOString()
            },
            {
              id: 'tutoriel-animation-gsap',
              title: 'Tutoriel: Créer des Animations Web avec GSAP',
              description: 'Apprenez à créer des animations web fluides et impressionnantes avec GSAP.',
              excerpt: 'Apprenez à créer des animations web fluides et impressionnantes avec la bibliothèque GSAP à travers ce tutoriel pas à pas.',
              category: 'Développement',
              date: '5 avril 2023',
              author: 'Thomas Lefort',
              readTime: '15 min',
              image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
              tags: ['JavaScript', 'Animation', 'GSAP', 'Tutoriel'],
              type: 'tutorial',
              created_at: new Date().toISOString()
            },
          ];
          
          setResources(staticResources);
          setFilteredResources(staticResources);
          
          // Extract unique categories
          const uniqueCategories = ['Tous', ...Array.from(new Set(staticResources.map(r => r.category)))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error loading resources:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les ressources",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResources();
    
    // Remonter en haut de la page lors du chargement
    window.scrollTo(0, 0);
    
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
  }, [toast]);
  
  // Filtrer les ressources en fonction de la recherche et de la catégorie
  useEffect(() => {
    let filtered = resources;
    
    // Filtre par catégorie
    if (activeCategory !== 'Tous') {
      filtered = filtered.filter(resource => resource.category === activeCategory);
    }
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.excerpt.toLowerCase().includes(query) ||
        (Array.isArray(resource.tags) && resource.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    setFilteredResources(filtered);
  }, [searchQuery, activeCategory, resources]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 relative">
              <AnimatedText text="Ressources & Blog" className="text-gradient" />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 reveal-content opacity-0">
              Explorez nos derniers articles, tutoriels et ressources téléchargeables pour améliorer vos compétences et rester à jour avec les dernières tendances.
            </p>
            
            {/* Barre de recherche */}
            <div className="relative max-w-xl mx-auto reveal-content opacity-0 [animation-delay:300ms]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-ulpra-yellow/50 focus:border-transparent transition-all"
                placeholder="Rechercher des articles, tutoriels, ressources..."
              />
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
      </section>
      
      {/* Catégories */}
      <section className="py-8 px-6 relative border-y border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-ulpra-yellow text-ulpra-black'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Articles et ressources */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glassmorphism rounded-xl overflow-hidden group relative flex flex-col h-full"
                >
                  {/* Badge pour le type de ressource */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      resource.type === 'article' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : resource.type === 'tutorial' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {resource.type === 'article' ? 'Article' : resource.type === 'tutorial' ? 'Tutoriel' : 'Ressource'}
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ulpra-black to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 bg-ulpra-yellow/90 rounded-full text-xs font-medium text-ulpra-black">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{resource.excerpt}</p>
                    
                    {/* Métadonnées */}
                    <div className="flex flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-2 mb-6">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {resource.date}
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        {resource.author}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {resource.readTime}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    {Array.isArray(resource.tags) && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {resource.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className="inline-flex items-center px-2 py-1 bg-white/5 rounded-md text-xs"
                          >
                            <Tag size={10} className="mr-1 text-ulpra-yellow" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Lien ou bouton de téléchargement */}
                    <div className="mt-auto">
                      {resource.type === 'download' ? (
                        <a
                          href={resource.downloadUrl}
                          className="inline-flex items-center text-ulpra-yellow hover:underline"
                        >
                          <Download size={16} className="mr-2" />
                          Télécharger la ressource
                        </a>
                      ) : (
                        <Link
                          to={`/resources/${resource.id}`}
                          className="inline-flex items-center text-ulpra-yellow hover:underline"
                        >
                          Lire la suite
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block mb-6 p-4 rounded-full bg-white/5">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Nous n'avons pas trouvé de ressources correspondant à votre recherche. Essayez d'autres termes ou parcourez toutes nos ressources.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('Tous'); }}
                className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium"
              >
                Voir toutes les ressources
              </button>
            </div>
          )}
        </div>
        
        {/* Éléments 3D subtils */}
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
      
      {/* Newsletter */}
      <section className="py-16 px-6 relative bg-black/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto glassmorphism p-8 md:p-12 rounded-2xl text-center reveal-content opacity-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Abonnez-vous à notre newsletter</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              Recevez en exclusivité nos derniers articles, tutoriels et ressources directement dans votre boîte mail. Pas de spam, promis !
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  className="flex-grow py-3 px-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-ulpra-yellow/50 focus:border-transparent transition-all"
                  placeholder="Votre adresse email"
                  required
                />
                <button
                  type="submit"
                  className="bg-ulpra-yellow text-ulpra-black px-6 py-3 rounded-full font-medium transition-transform duration-300 hover:scale-105"
                >
                  S'abonner
                </button>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                En vous inscrivant, vous acceptez notre <a href="/privacy-policy" className="text-ulpra-yellow hover:underline">politique de confidentialité</a>
              </div>
            </form>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/5 blur-[100px] opacity-20 -z-10" />
      </section>
      
      <Footer />
    </div>
  );
};

export default Resources;
