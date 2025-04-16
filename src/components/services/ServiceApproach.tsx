
import React from 'react';
import { ChevronRight } from 'lucide-react';

const ServiceApproach = () => {
  return (
    <div className="my-12 glassmorphism p-8 rounded-xl">
      <h3 className="text-2xl font-bold mb-4">Notre approche</h3>
      <p className="text-muted-foreground mb-6">
        Nous utilisons une méthodologie agile pour garantir un développement efficace et adapté à vos besoins spécifiques.
      </p>
      
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
            <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
          </div>
          <div>
            <span className="block font-semibold">Phase d'analyse</span>
            <span className="text-muted-foreground">Compréhension approfondie de vos besoins.</span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
            <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
          </div>
          <div>
            <span className="block font-semibold">Conception stratégique</span>
            <span className="text-muted-foreground">Élaboration d'une stratégie adaptée à vos objectifs.</span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
            <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
          </div>
          <div>
            <span className="block font-semibold">Implémentation et tests</span>
            <span className="text-muted-foreground">Développement rigoureux et validation continue.</span>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-ulpra-yellow/20 p-2 rounded-full mr-4">
            <ChevronRight className="h-5 w-5 text-ulpra-yellow" />
          </div>
          <div>
            <span className="block font-semibold">Suivi et optimisation</span>
            <span className="text-muted-foreground">Amélioration continue des performances.</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ServiceApproach;
