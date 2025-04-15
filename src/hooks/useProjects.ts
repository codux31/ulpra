
import { useState, useEffect } from 'react';
import { fetchProjects } from '@/lib/supabase';
import { Project } from '@/types/models';
import { useToast } from "@/components/ui/use-toast";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [categories, setCategories] = useState<string[]>(['Tous']);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        
        const publishedProjects = data
          .filter(project => project.status === "published" || !project.status)
          .map(project => ({
            ...project,
            category: project.category || 'Non catégorisé'
          }));

        setProjects(publishedProjects);
        
        const uniqueCategories = ['Tous', ...Array.from(new Set(publishedProjects.map(p => p.category || '')))];
        setCategories(uniqueCategories);
        setFilteredProjects(publishedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [toast]);

  useEffect(() => {
    if (activeCategory === 'Tous') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  return {
    projects: filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    isLoading
  };
};
