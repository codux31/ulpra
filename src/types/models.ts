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
  category?: string;
  client?: string | null;
  description?: string | null;
  image_url?: string | null;
  color?: string | null;
  status?: "published" | "draft" | "archived" | null;
  date?: string | null;
  link?: string | null;
  created_at: string | null;
  updated_at?: string | null;
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
  image_url?: string; // Added to match usage in Testimonials.tsx
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
  image?: string; // For compatibility with Resources.tsx
  category: string;
  type?: string;
  download_url?: string;
  downloadUrl?: string; // For compatibility with Resources.tsx
  author?: string;
  date?: string;
  readTime?: string;
  readtime?: string; // Added for compatibility with DB field naming
  tags?: string[]; // For compatibility with Resources.tsx
  status?: "published" | "draft" | "archived"; // Make sure status is strictly typed
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
