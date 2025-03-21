import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { Service, Project, Testimonial, Resource, Pricing } from '@/types/models';
import { toast } from '@/hooks/use-toast';

// Default data for use when Supabase tables haven't been created yet
export const defaultServices: Service[] = [
  {
    id: '1',
    title: "Site web responsive",
    icon: "01",
    description: "Sites web optimisés pour tous les appareils et écrans, offrant une expérience utilisateur optimale.",
    longDescription: "Nous créons des sites web qui s'adaptent parfaitement à tous les appareils, des smartphones aux grands écrans de bureau. Notre approche responsive garantit une expérience utilisateur optimale, quelle que soit la manière dont vos clients accèdent à votre site.",
    imageUrl: "https://picsum.photos/800/600?random=1",
    status: "active",
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: "Identité visuelle",
    icon: "02",
    description: "Création d'identités de marque mémorables qui communiquent vos valeurs et votre mission.",
    longDescription: "Notre équipe de designers travaille à créer une identité visuelle unique qui reflète l'essence de votre marque. Du logo aux couleurs, en passant par la typographie et les éléments graphiques, nous définissons un langage visuel cohérent qui vous distingue de vos concurrents.",
    imageUrl: "https://picsum.photos/800/600?random=2",
    status: "active",
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: "Marketing digital",
    icon: "03",
    description: "Stratégies marketing qui augmentent votre visibilité en ligne et génèrent des prospects qualifiés.",
    longDescription: "Nous élaborons des stratégies marketing digitales complètes pour accroître votre présence en ligne et attirer un public qualifié. Notre approche comprend le SEO, les réseaux sociaux, le marketing de contenu et les campagnes publicitaires ciblées pour maximiser votre ROI.",
    imageUrl: "https://picsum.photos/800/600?random=3",
    status: "active", 
    created_at: new Date().toISOString()
  }
];

export const defaultProjects: Project[] = [
  {
    id: '1',
    title: "Refonte du site e-commerce Luxxus",
    category: "Web Design",
    client: "Luxxus Inc.",
    description: "Refonte complète de la plateforme e-commerce avec un focus sur l'expérience utilisateur et l'optimisation du tunnel de conversion.",
    image_url: "https://picsum.photos/800/600?random=4",
    status: "published",
    date: "2023-05-15",
    link: "https://example.com",
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: "Campagne digitale Eco-Responsable",
    category: "Marketing Digital",
    client: "GreenPath",
    description: "Stratégie et déploiement d'une campagne multi-canal axée sur l'engagement écologique de la marque GreenPath.",
    image_url: "https://picsum.photos/800/600?random=5",
    status: "published",
    date: "2023-07-22",
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: "Application mobile FitCoach",
    category: "Développement",
    client: "FitCoach SAS",
    description: "Conception et développement d'une application mobile de coaching sportif avec fonctionnalités de suivi personnalisé.",
    image_url: "https://picsum.photos/800/600?random=6",
    status: "published",
    date: "2023-09-10",
    link: "https://apps.example.com/fitcoach",
    created_at: new Date().toISOString()
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: "Sophie Martin",
    company: "Luxxus Inc.",
    role: "Directrice Marketing",
    quote: "L'équipe d'ULPRA a transformé notre présence en ligne. Notre site e-commerce a vu une augmentation de 45% des conversions dès le premier mois après la refonte.",
    avatar_url: "https://picsum.photos/100/100?random=7",
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: "Thomas Dubois",
    company: "GreenPath",
    role: "Fondateur",
    quote: "La campagne digitale conçue par ULPRA a dépassé toutes nos attentes. Nous avons touché une audience plus large et plus engagée, ce qui s'est traduit par une croissance significative de notre communauté.",
    avatar_url: "https://picsum.photos/100/100?random=8",
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: "Julie Leroux",
    company: "FitCoach",
    role: "Product Manager",
    quote: "Le professionnalisme et la créativité d'ULPRA ont fait toute la différence dans le développement de notre application. Ils ont vraiment compris nos besoins et ont livré bien au-delà de nos attentes.",
    avatar_url: "https://picsum.photos/100/100?random=9",
    rating: 5,
    created_at: new Date().toISOString()
  }
];

export const defaultResources: Resource[] = [
  {
    id: '1',
    title: "Guide de l'UX Design en 2023",
    description: "Découvrez les dernières tendances et meilleures pratiques pour créer des expériences utilisateur exceptionnelles.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    excerpt: "Découvrez les dernières tendances et meilleures pratiques pour créer des expériences utilisateur exceptionnelles.",
    image_url: "https://picsum.photos/800/600?random=10",
    category: "UX Design",
    type: "guide",
    download_url: "https://example.com/ux-guide-2023.pdf",
    downloadUrl: "https://example.com/ux-guide-2023.pdf", // Added for compatibility
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: "Les fondamentaux du SEO",
    description: "Un guide complet pour comprendre et optimiser votre référencement naturel sur les moteurs de recherche.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    excerpt: "Un guide complet pour comprendre et optimiser votre référencement naturel sur les moteurs de recherche.",
    image_url: "https://picsum.photos/800/600?random=11",
    category: "Marketing Digital",
    type: "ebook",
    download_url: "https://example.com/seo-fundamentals.pdf",
    downloadUrl: "https://example.com/seo-fundamentals.pdf", // Added for compatibility
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: "Template de plan marketing digital",
    description: "Un modèle prêt à l'emploi pour planifier et exécuter vos campagnes marketing digitales avec succès.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    excerpt: "Un modèle prêt à l'emploi pour planifier et exécuter vos campagnes marketing digitales avec succès.",
    image_url: "https://picsum.photos/800/600?random=12",
    category: "Marketing",
    type: "template",
    download_url: "https://example.com/marketing-template.xlsx",
    downloadUrl: "https://example.com/marketing-template.xlsx", // Added for compatibility
    created_at: new Date().toISOString()
  }
];

export const defaultPricing: Pricing[] = [
  {
    id: '1',
    name: "Essentiel",
    price: 1490,
    description: "La solution idéale pour les petites entreprises qui souhaitent établir leur présence en ligne.",
    features: [
      "Site vitrine jusqu'à 5 pages",
      "Design responsive",
      "Référencement de base",
      "Formulaire de contact",
      "Intégration réseaux sociaux"
    ],
    popular: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: "Business",
    price: 2990,
    description: "Une solution complète pour les entreprises qui cherchent à se développer et à convertir plus de clients.",
    features: [
      "Site jusqu'à 10 pages",
      "Design personnalisé",
      "SEO avancé",
      "Blog intégré",
      "Tableau de bord statistiques",
      "Maintenance 6 mois incluse",
      "Formation à l'administration"
    ],
    popular: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: "Premium",
    price: 5990,
    description: "La solution sur mesure pour les entreprises qui exigent excellence et fonctionnalités avancées.",
    features: [
      "Site illimité en pages",
      "Design sur mesure",
      "Stratégie SEO complète",
      "Système de réservation/paiement",
      "Espace membres",
      "Applications métier sur mesure",
      "Maintenance 12 mois incluse",
      "Support prioritaire 7j/7"
    ],
    popular: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Supabase client for data fetching
export const supabase = createClient<Database>(
  "https://ijzekbgeczxecochannf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqemVrYmdlY3p4ZWNvY2hhbm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODQzMDEsImV4cCI6MjA1ODE2MDMwMX0.MRonbTE5wtOP9tiCAttV_Oz-nh3MJw4Su7NLJqj877g"
);

// Function to check admin credentials
export const checkAdminCredentials = (email: string, password: string) => {
  const validCredentials = { email: 'admin@ulpra.com', password: 'Admin123!' };
  return email === validCredentials.email && password === validCredentials.password;
};

// Function to fetch services from Supabase, with fallback to local data
export const fetchServices = async (): Promise<Service[]> => {
  try {
    // Try to fetch data from Supabase first
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching services from Supabase:', error);
      console.log('Using default services data as fallback');
      return defaultServices;
    }
    
    // If we got data from Supabase, transform it to match our model
    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        title: item.title,
        icon: item.icon,
        description: item.description,
        longDescription: item.longdescription,
        imageUrl: item.imageurl,
        status: item.status as "active" | "draft" | "archived",
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
    }
    
    // Otherwise use default data
    console.log('No services found in Supabase, using default data');
    return defaultServices;
  } catch (error) {
    console.error('Error in fetchServices():', error);
    // Fallback to local data in case of errors
    return defaultServices;
  }
};

// Function to fetch projects from Supabase, with fallback to local data
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // Try to fetch data from Supabase first
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      console.log('Using default projects data as fallback');
      return defaultProjects;
    }
    
    // If we got data from Supabase, transform it if needed
    if (data && data.length > 0) {
      return data.map(item => ({
        ...item,
        status: item.status as "published" | "draft" | "archived"
      }));
    }
    
    // Otherwise use default data
    console.log('No projects found in Supabase, using default data');
    return defaultProjects;
  } catch (error) {
    console.error('Error in fetchProjects():', error);
    // Fallback to local data in case of errors
    return defaultProjects;
  }
};

// Function to fetch testimonials from Supabase, with fallback to local data
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    // Try to fetch data from Supabase first
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching testimonials from Supabase:', error);
      console.log('Using default testimonials data as fallback');
      return defaultTestimonials;
    }
    
    // If we got data from Supabase, transform it if needed
    if (data && data.length > 0) {
      return data.map(item => ({
        ...item,
        status: item.status as "published" | "draft" | "archived"
      }));
    }
    
    // Otherwise use default data
    console.log('No testimonials found in Supabase, using default data');
    return defaultTestimonials;
  } catch (error) {
    console.error('Error in fetchTestimonials():', error);
    // Fallback to local data in case of errors
    return defaultTestimonials;
  }
};

// Function to fetch resources from Supabase, with fallback to local data
export const fetchResources = async (): Promise<Resource[]> => {
  try {
    // Try to fetch data from Supabase first
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching resources from Supabase:', error);
      console.log('Using default resources data as fallback');
      return defaultResources;
    }
    
    // If we got data from Supabase, transform it to match our model
    if (data && data.length > 0) {
      return data.map(item => {
        // Create a properly typed resource object with all required fields
        const resource: Resource = {
          id: item.id,
          title: item.title,
          description: item.description || "",
          content: item.content,
          excerpt: item.excerpt || item.description || "",
          image_url: item.image_url,
          category: item.category || "",
          type: item.type,
          download_url: item.download_url,
          downloadUrl: item.download_url, // For compatibility with Resources.tsx
          image: item.image_url, // For compatibility with Resources.tsx
          author: item.author,
          date: item.date,
          readTime: item.readtime,
          readtime: item.readtime,
          status: (item.status as "published" | "draft" | "archived") || "published",
          tags: [], // Ensure tags is always an array
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at
        };
        
        return resource;
      });
    }
    
    // Otherwise use default data
    console.log('No resources found in Supabase, using default data');
    return defaultResources;
  } catch (error) {
    console.error('Error in fetchResources():', error);
    // Fallback to local data in case of errors
    return defaultResources;
  }
};

// Function to fetch pricing from Supabase, with fallback to local data
export const fetchPricing = async (): Promise<Pricing[]> => {
  try {
    // Try to fetch data from Supabase first
    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching pricing from Supabase:', error);
      console.log('Using default pricing data as fallback');
      return defaultPricing;
    }
    
    // If we got data from Supabase, transform it if needed
    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || '',
        features: Array.isArray(item.features) ? item.features.map(f => String(f)) : [],
        popular: !!item.popular,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
    }
    
    // Otherwise use default data
    console.log('No pricing found in Supabase, using default data');
    return defaultPricing;
  } catch (error) {
    console.error('Error in fetchPricing():', error);
    // Fallback to local data in case of errors
    return defaultPricing;
  }
};

// Seed data functions
export const seedServices = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    
    // If no data, seed with default services
    if (!data || data.length === 0) {
      console.log('Seeding services table...');
      const { error: insertError } = await supabase
        .from('services')
        .insert(defaultServices.map(service => ({
          id: service.id,
          title: service.title,
          icon: service.icon,
          description: service.description,
          longdescription: service.longDescription,
          imageurl: service.imageUrl,
          status: service.status,
          created_at: service.created_at || new Date().toISOString(),
          updated_at: service.updated_at || new Date().toISOString()
        })));
        
      if (insertError) throw insertError;
      console.log('Services seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

export const seedProjects = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    
    // If no data, seed with default projects
    if (!data || data.length === 0) {
      console.log('Seeding projects table...');
      
      // Create projects without IDs to use Supabase's UUID generation
      const projectsToInsert = defaultProjects.map(project => ({
        title: project.title,
        category: project.category,
        client: project.client,
        description: project.description,
        image_url: project.image_url,
        color: project.color,
        status: project.status,
        date: project.date,
        link: project.link,
        created_at: project.created_at || new Date().toISOString(),
        updated_at: project.updated_at || new Date().toISOString()
      }));
      
      const { error: insertError } = await supabase
        .from('projects')
        .insert(projectsToInsert);
        
      if (insertError) throw insertError;
      console.log('Projects seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

export const seedTestimonials = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    
    // If no data, seed with default testimonials
    if (!data || data.length === 0) {
      console.log('Seeding testimonials table...');
      
      const testimonialsToInsert = defaultTestimonials.map(testimonial => ({
        name: testimonial.name,
        company: testimonial.company,
        role: testimonial.role,
        quote: testimonial.quote,
        content: testimonial.content,
        avatar_url: testimonial.avatar_url,
        rating: testimonial.rating,
        status: testimonial.status,
        created_at: testimonial.created_at || new Date().toISOString(),
        updated_at: testimonial.updated_at || new Date().toISOString()
      }));
      
      const { error: insertError } = await supabase
        .from('testimonials')
        .insert(testimonialsToInsert);
        
      if (insertError) throw insertError;
      console.log('Testimonials seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  }
};

export const seedResources = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    
    // If no data, seed with default resources
    if (!data || data.length === 0) {
      console.log('Seeding resources table...');
      
      const resourcesToInsert = defaultResources.map(resource => ({
        title: resource.title,
        description: resource.description,
        content: resource.content,
        excerpt: resource.excerpt,
        image_url: resource.image_url,
        category: resource.category,
        type: resource.type,
        download_url: resource.download_url,
        author: resource.author,
        date: resource.date,
        readtime: resource.readTime,
        status: resource.status,
        created_at: resource.created_at || new Date().toISOString(),
        updated_at: resource.updated_at || new Date().toISOString()
      }));
      
      const { error: insertError } = await supabase
        .from('resources')
        .insert(resourcesToInsert);
        
      if (insertError) throw insertError;
      console.log('Resources seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding resources:', error);
  }
};

export const seedPricing = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('pricing')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    
    // If no data, seed with default pricing
    if (!data || data.length === 0) {
      console.log('Seeding pricing table...');
      
      const pricingToInsert = defaultPricing.map(plan => ({
        name: plan.name,
        price: plan.price,
        description: plan.description,
        features: plan.features.map(f => String(f)),
        popular: plan.popular,
        created_at: plan.created_at || new Date().toISOString(),
        updated_at: plan.updated_at || new Date().toISOString()
      }));
      
      const { error: insertError } = await supabase
        .from('pricing')
        .insert(pricingToInsert);
        
      if (insertError) throw insertError;
      console.log('Pricing seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding pricing:', error);
  }
};

// Seed all data
export const seedAllData = async (): Promise<void> => {
  await seedServices();
  await seedProjects();
  await seedTestimonials();
  await seedResources();
  await seedPricing();
};

// Export the toast utility
export { toast };
