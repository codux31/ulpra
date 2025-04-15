
import React from 'react';

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const ProjectFilters = ({ categories, activeCategory, onCategoryClick }: ProjectFiltersProps) => {
  return (
    <section className="py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-ulpra-yellow text-ulpra-black' 
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFilters;
