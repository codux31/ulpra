
import { Database } from "@/integrations/supabase/types";

// Service model
export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  status?: "active" | "draft" | "archived";
  created_at: string;
  updated_at?: string;
}

// Project model
export interface Project {
  id: string;
  title: string;
  category: string;
  client?: string;
  description: string;
  image_url?: string;
  color?: string;
  status?: "published" | "draft" | "archived";
  date?: string;
  link?: string;
  created_at: string;
  updated_at?: string;
}

// Testimonial model
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role?: string;
  quote: string;
  content?: string;
  avatar_url?: string;
  rating: number;
  status?: "published" | "draft" | "archived";
  created_at: string;
  updated_at?: string;
}

// Resource model
export interface Resource {
  id: string;
  title: string;
  description: string;
  content?: string;
  excerpt: string;
  image_url?: string;
  image?: string; // For compatibility with some components
  category: string;
  type?: string;
  download_url?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[]; // For compatibility with some components
  status?: "published" | "draft" | "archived";
  created_at: string;
  updated_at?: string;
}

// Pricing model
export interface Pricing {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  created_at: string;
  updated_at?: string;
}

export type PricingPlan = Pricing;

// Type guard functions
export const isService = (obj: any): obj is Service => {
  return obj && typeof obj.title === 'string' && typeof obj.description === 'string';
};

export const isProject = (obj: any): obj is Project => {
  return obj && typeof obj.title === 'string' && typeof obj.description === 'string';
};

export const isTestimonial = (obj: any): obj is Testimonial => {
  return obj && typeof obj.name === 'string' && typeof obj.quote === 'string';
};

export const isResource = (obj: any): obj is Resource => {
  return obj && typeof obj.title === 'string' && typeof obj.description === 'string';
};

export const isPricing = (obj: any): obj is Pricing => {
  return obj && typeof obj.name === 'string' && typeof obj.price === 'number';
};
