
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ijzekbgeczxecochannf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqemVrYmdlY3p4ZWNvY2hhbm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODQzMDEsImV4cCI6MjA1ODE2MDMwMX0.MRonbTE5wtOP9tiCAttV_Oz-nh3MJw4Su7NLJqj877g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for data operations
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
};

export const fetchServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data || [];
};

export const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  
  return data || [];
};
