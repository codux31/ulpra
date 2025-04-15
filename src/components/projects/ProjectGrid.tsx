
import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/models';

interface ProjectGridProps {
  projects: Project[];
  activeProject: string | null;
  onProjectEnter: (id: string) => void;
  onProjectLeave: () => void;
  isLoading: boolean;
}

const ProjectGrid = ({ projects, activeProject, onProjectEnter, onProjectLeave, isLoading }: ProjectGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">
          Aucun projet ne correspond à cette catégorie pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          isActive={activeProject === project.id}
          onMouseEnter={onProjectEnter}
          onMouseLeave={onProjectLeave}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
