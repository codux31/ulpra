
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ijzekbgeczxecochannf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqemVrYmdlY3p4ZWNvY2hhbm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODQzMDEsImV4cCI6MjA1ODE2MDMwMX0.MRonbTE5wtOP9tiCAttV_Oz-nh3MJw4Su7NLJqj877g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Définir des données fictives pour chaque type de contenu
const dummyProjects = [
  {
    id: "luxury-resort",
    title: "Luxury Resort",
    category: "Site Web",
    description: "Refonte complète du site web d'un resort de luxe avec réservation en ligne et expérience immersive.",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2340&q=80",
    client: "Prestige Hotels",
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "tech-solutions",
    title: "Tech Solutions",
    category: "Branding & Web",
    description: "Création d'identité de marque et développement web pour une startup technologique innovante.",
    image_url: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?auto=format&fit=crop&w=2340&q=80",
    client: "InnovateTech",
    status: "published",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "gastro-delight",
    title: "Gastro Delight",
    category: "E-commerce",
    description: "Boutique en ligne pour une marque d'épicerie fine avec personnalisation de commandes et abonnements.",
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1760&q=80",
    client: "Gourmet & Co",
    status: "published",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "eco-fashion",
    title: "Éco Fashion",
    category: "Branding & Communication",
    description: "Stratégie de communication complète pour une marque de mode éthique en pleine expansion.",
    image_url: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=1364&q=80",
    client: "NatureFiber",
    status: "published",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "digital-agency",
    title: "Digital Agency",
    category: "Branding & Web",
    description: "Identité de marque et site vitrine pour une agence digitale spécialisée en UX/UI.",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=2000&q=80",
    client: "PixelPerfect",
    status: "published",
    created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "healthcare-app",
    title: "Healthcare App",
    category: "Application Mobile",
    description: "Application mobile de suivi de santé avec tableau de bord personnalisé et rappels intelligents.",
    image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2070&q=80",
    client: "MediTrack",
    status: "published",
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const dummyServices = [
  {
    id: "1",
    title: "Design Digital",
    description: "Création de sites web, d'applications et d'interfaces utilisateur intuitives et esthétiques.",
    icon: "01",
    status: "active",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Branding",
    description: "Développement d'identités de marque distinctives, logos, et chartes graphiques complètes.",
    icon: "02",
    status: "active",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    title: "Communication",
    description: "Stratégies de communication omnicanal, gestion des réseaux sociaux et création de contenu.",
    icon: "03",
    status: "active",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    title: "Recherche Stratégique",
    description: "Analyse de marché, étude de la concurrence et élaboration de stratégies marketing efficaces.",
    icon: "04",
    status: "active",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    title: "Développement Web",
    description: "Création de sites web performants, responsive et optimisés pour le référencement.",
    icon: "05",
    status: "active",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "6",
    title: "Animation 3D",
    description: "Création d'animations et de modèles 3D pour vos présentations et sites web.",
    icon: "06",
    status: "active",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const dummyTestimonials = [
  {
    id: "1",
    name: "Marie Dubois",
    company: "ModaFrance",
    role: "Directrice Marketing",
    content: "L'équipe d'ULPRA a complètement transformé notre présence en ligne. Notre nouveau site web a considérablement augmenté notre taux de conversion et offre une expérience client exceptionnelle.",
    rating: 5,
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1364&q=80",
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Thomas Laurent",
    company: "TechSphere",
    role: "CEO",
    content: "Professionnalisme, créativité et réactivité - ULPRA combine parfaitement ces trois qualités. Ils ont su capter l'essence de notre marque et la traduire en une identité visuelle percutante.",
    rating: 5,
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1364&q=80",
    status: "published",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    name: "Camille Rousseau",
    company: "Ecovert",
    role: "Fondatrice",
    content: "Notre collaboration avec ULPRA a été déterminante pour notre lancement. Leur approche stratégique nous a permis d'établir une présence digitale cohérente et impactante dès le départ.",
    rating: 4,
    image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1364&q=80",
    status: "published",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const dummyPricing = [
  {
    id: "1",
    name: "Starter",
    price: 990,
    description: "Idéal pour les petites entreprises et les startups",
    features: ["Site web responsive 5 pages", "Intégration réseaux sociaux", "Formulaire de contact", "Optimisation SEO de base", "1 révision incluse"],
    popular: false,
    status: "active",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Business",
    price: 2490,
    description: "Parfait pour les entreprises en croissance",
    features: ["Site web responsive 10 pages", "Design personnalisé", "Blog intégré", "Optimisation SEO avancée", "3 révisions incluses", "Support 6 mois", "Formation admin 1h"],
    popular: true,
    status: "active",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    name: "Enterprise",
    price: 4990,
    description: "Solution complète pour les grandes entreprises",
    features: ["Site web sur-mesure", "E-commerce intégré", "Stratégie SEO complète", "Plan marketing digital", "Révisions illimitées", "Support 12 mois", "Formation admin 3h", "Stratégie de contenu"],
    popular: false,
    status: "active",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const dummyResources = [
  {
    id: "tendances-design-2023",
    title: "Tendances de Design Web pour 2023",
    excerpt: "Découvrez les tendances émergentes qui façonneront le design web cette année.",
    category: "Design",
    date: new Date().toISOString(),
    author: "Sophie Martin",
    readTime: "8 min",
    image_url: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=2070&q=80",
    tags: ["Design Web", "Tendances", "UX/UI"],
    type: "article",
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "guide-seo-debutants",
    title: "Guide SEO pour Débutants",
    excerpt: "Tous les fondamentaux du référencement pour améliorer la visibilité de votre site.",
    category: "Marketing",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: "Alexandre Durand",
    readTime: "15 min",
    image_url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=2074&q=80",
    tags: ["SEO", "Marketing Digital", "Référencement"],
    type: "tutorial",
    status: "published",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "checklist-lancement-site",
    title: "Checklist pour le Lancement de Votre Site",
    excerpt: "Un guide complet pour s'assurer que votre nouveau site web soit prêt pour le grand jour.",
    category: "Développement",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    author: "Emma Laurent",
    readTime: "5 min",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2015&q=80",
    tags: ["Lancement", "Web", "Checklist"],
    type: "download",
    status: "published",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "psychologie-couleurs-marketing",
    title: "La Psychologie des Couleurs en Marketing",
    excerpt: "Comment les couleurs influencent les émotions et les décisions d'achat.",
    category: "Marketing",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    author: "Julien Petit",
    readTime: "12 min",
    image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2070&q=80",
    tags: ["Psychologie", "Marketing", "Design"],
    type: "article",
    status: "published",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper functions for data operations
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching projects:', error);
    return dummyProjects; // Retourner les données fictives en cas d'erreur
  }
  
  if (!data || data.length === 0) {
    return dummyProjects; // Retourner les données fictives si aucune donnée n'est trouvée
  }
  
  return data;
};

export const fetchServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching services:', error);
    return dummyServices; // Retourner les données fictives en cas d'erreur
  }
  
  if (!data || data.length === 0) {
    return dummyServices; // Retourner les données fictives si aucune donnée n'est trouvée
  }
  
  return data;
};

export const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching testimonials:', error);
    return dummyTestimonials; // Retourner les données fictives en cas d'erreur
  }
  
  if (!data || data.length === 0) {
    return dummyTestimonials; // Retourner les données fictives si aucune donnée n'est trouvée
  }
  
  return data;
};

export const fetchPricing = async () => {
  const { data, error } = await supabase
    .from('pricing')
    .select('*')
    .order('price', { ascending: true });
    
  if (error) {
    console.error('Error fetching pricing plans:', error);
    return dummyPricing; // Retourner les données fictives en cas d'erreur
  }
  
  if (!data || data.length === 0) {
    return dummyPricing; // Retourner les données fictives si aucune donnée n'est trouvée
  }
  
  return data;
};

export const fetchResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching resources:', error);
    return dummyResources; // Retourner les données fictives en cas d'erreur
  }
  
  if (!data || data.length === 0) {
    return dummyResources; // Retourner les données fictives si aucune donnée n'est trouvée
  }
  
  // Process the resources to ensure type compatibility
  const processedData = (data || []).map(resource => {
    // Ensure 'type' is one of the allowed values
    let validType: 'article' | 'tutorial' | 'download' = 'article'; // Default to article
    
    if (resource.type === 'tutorial' || resource.type === 'download') {
      validType = resource.type as 'tutorial' | 'download';
    }
    
    // Process tags if they're a string
    let tags = resource.tags;
    if (typeof tags === 'string') {
      try {
        tags = JSON.parse(tags);
      } catch (e) {
        tags = [];
      }
    } else if (!Array.isArray(tags)) {
      tags = [];
    }
    
    return {
      ...resource,
      type: validType,
      tags: tags,
    };
  });
  
  return processedData;
};

// Ajouter une fonction pour vérifier les informations d'identification d'administration
export const checkAdminCredentials = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();
    
  if (error) {
    console.error('Error checking admin credentials:', error);
    // Retourner true temporairement si la table n'existe pas ou en cas d'erreur
    // Pour permettre l'accès avec les identifiants de démonstration
    if (email === 'admin@ulpra.com' && password === 'Admin123!') {
      return { valid: true, user: { email, id: '1' } };
    }
    return { valid: false, user: null };
  }
  
  if (data) {
    return { valid: true, user: data };
  } else {
    return { valid: false, user: null };
  }
};
