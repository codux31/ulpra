
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectHero from '@/components/projects/ProjectHero';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectCTA from '@/components/projects/ProjectCTA';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const { projects, categories, activeCategory, setActiveCategory, isLoading } = useProjects();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveProject(id);
  };
  
  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <ProjectHero />
      
      <ProjectFilters 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={setActiveCategory}
      />
      
      <section className="py-8 px-6 relative">
        <div className="container mx-auto">
          <ProjectGrid 
            projects={projects}
            activeProject={activeProject}
            onProjectEnter={handleMouseEnter}
            onProjectLeave={handleMouseLeave}
            isLoading={isLoading}
          />
        </div>
        
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
      </section>
      
      <ProjectCTA />
      
      <Footer />
    </div>
  );
};

export default Projects;
