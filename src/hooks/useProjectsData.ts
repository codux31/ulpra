
import { useState, useEffect } from 'react';
import { fetchProjects } from '@/lib/supabase';
import { Project } from '@/types/models';
import { useToast } from "@/components/ui/use-toast";

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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

  return { projects, isLoading };
};

