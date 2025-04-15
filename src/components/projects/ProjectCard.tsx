
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/types/models';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const ProjectCard = ({ project, isActive, onMouseEnter, onMouseLeave }: ProjectCardProps) => {
  return (
    <Link 
      to={`/projects/${project.id}`}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out"
      onMouseEnter={() => onMouseEnter(project.id)}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-500 ease-out opacity-70 group-hover:opacity-85"
      />
      
      <img 
        src={project.image_url || ''} 
        alt={project.title}
        className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-medium text-ulpra-yellow">{project.category}</div>
          <div className="text-sm text-white/70">{project.client}</div>
        </div>
        <h3 className="text-2xl font-semibold mb-3 transition-transform duration-500 ease-out group-hover:translate-x-2">
          {project.title}
        </h3>
        <p 
          className={`text-white/70 mb-4 transition-all duration-500 ease-out max-w-md ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {project.description}
        </p>
        <div 
          className={`inline-flex items-center text-ulpra-yellow transition-all duration-500 ease-out ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          Voir le projet
          <ArrowRight size={14} className="ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
