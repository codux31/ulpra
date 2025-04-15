
import { useState, useEffect } from 'react';
import { Project } from '@/types/models';

export const useFilteredProjects = (projects: Project[], activeCategory: string) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (activeCategory === 'Tous') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  return { filteredProjects };
};

