
import { useState, useEffect } from 'react';
import { Project } from '@/types/models';

export const useProjectCategories = (projects: Project[]) => {
  const [categories, setCategories] = useState<string[]>(['Tous']);
  const [activeCategory, setActiveCategory] = useState('Tous');

  useEffect(() => {
    const uniqueCategories = ['Tous', ...Array.from(new Set(projects.map(p => p.category || '')))];
    setCategories(uniqueCategories);
  }, [projects]);

  return {
    categories,
    activeCategory,
    setActiveCategory
  };
};

