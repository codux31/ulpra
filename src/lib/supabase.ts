
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

// Supabase client for data fetching
export const supabase = createClient<Database>(
  "https://ijzekbgeczxecochannf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqemVrYmdlY3p4ZWNvY2hhbm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODQzMDEsImV4cCI6MjA1ODE2MDMwMX0.MRonbTE5wtOP9tiCAttV_Oz-nh3MJw4Su7NLJqj877g"
);

// Fonction pour vérifier les identifiants admin
export const checkAdminCredentials = (email: string, password: string) => {
  const validCredentials = { email: 'admin@ulpra.com', password: 'Admin123!' };
  return email === validCredentials.email && password === validCredentials.password;
};

// Fonction pour récupérer les services depuis Supabase
export const fetchServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erreur lors de la récupération des services:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    // Fallback pour garantir que l'UI ne casse pas en cas d'erreur
    return [];
  }
};

// Fonction pour récupérer les projets depuis Supabase
export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    // Fallback pour garantir que l'UI ne casse pas en cas d'erreur
    return [];
  }
};

// Fonction pour récupérer les témoignages depuis Supabase
export const fetchTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erreur lors de la récupération des témoignages:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    // Fallback pour garantir que l'UI ne casse pas en cas d'erreur
    return [];
  }
};

// Fonction pour récupérer les ressources depuis Supabase
export const fetchResources = async () => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erreur lors de la récupération des ressources:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources:', error);
    // Fallback pour garantir que l'UI ne casse pas en cas d'erreur
    return [];
  }
};

// Fonction pour récupérer les tarifs depuis Supabase
export const fetchPricing = async () => {
  try {
    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erreur lors de la récupération des tarifs:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des tarifs:', error);
    // Fallback pour garantir que l'UI ne casse pas en cas d'erreur
    return [];
  }
};

// Exporter le client Supabase pour être utilisé dans l'application
export { toast };
