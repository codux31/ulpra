
import { useProjectsData } from './useProjectsData';
import { useProjectCategories } from './useProjectCategories';
import { useFilteredProjects } from './useFilteredProjects';

export const useProjects = () => {
  const { projects, isLoading } = useProjectsData();
  const { categories, activeCategory, setActiveCategory } = useProjectCategories(projects);
  const { filteredProjects } = useFilteredProjects(projects, activeCategory);

  return {
    projects: filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    isLoading
  };
};

