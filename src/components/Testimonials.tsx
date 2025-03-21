
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AnimatedText from './AnimatedText';

// Type pour les témoignages
interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

// Données des témoignages
const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dubois",
    company: "ModaFrance",
    role: "Directrice Marketing",
    content: "L'équipe d'ULPRA a complètement transformé notre présence en ligne. Notre nouveau site web a considérablement augmenté notre taux de conversion et offre une expérience client exceptionnelle.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
  },
  {
    id: 2,
    name: "Thomas Laurent",
    company: "TechSphere",
    role: "CEO",
    content: "Professionnalisme, créativité et réactivité - ULPRA combine parfaitement ces trois qualités. Ils ont su capter l'essence de notre marque et la traduire en une identité visuelle percutante.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
  },
  {
    id: 3,
    name: "Camille Rousseau",
    company: "Ecovert",
    role: "Fondatrice",
    content: "Notre collaboration avec ULPRA a été déterminante pour notre lancement. Leur approche stratégique nous a permis d'établir une présence digitale cohérente et impactante dès le départ.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Fonction pour passer au témoignage suivant
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialData.length);
  };

  // Fonction pour revenir au témoignage précédent
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialData.length) % testimonialData.length);
  };

  // Autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 6000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, currentIndex]);

  // Pause l'autoplay au survol
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="relative inline-block">
              <AnimatedText text="Ce Que Disent Nos Clients" className="text-gradient" />
            </h2>
          </div>
          
          <div 
            className="relative glassmorphism p-8 md:p-12 rounded-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grande citation */}
            <div className="absolute -top-6 -left-6 text-ulpra-yellow opacity-20">
              <Quote size={120} />
            </div>
            
            {/* Carrousel */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  {/* Image */}
                  {testimonialData[currentIndex].image && (
                    <div className="md:w-1/3 flex justify-center">
                      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-ulpra-yellow/30">
                        <img 
                          src={testimonialData[currentIndex].image} 
                          alt={testimonialData[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Contenu */}
                  <div className={testimonialData[currentIndex].image ? "md:w-2/3" : "w-full"}>
                    <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                      "{testimonialData[currentIndex].content}"
                    </blockquote>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">{testimonialData[currentIndex].name}</p>
                        <p className="text-ulpra-yellow">{testimonialData[currentIndex].role}, {testimonialData[currentIndex].company}</p>
                      </div>
                      <div className="flex mt-4 md:mt-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i}
                            className={`text-lg ${i < testimonialData[currentIndex].rating ? 'text-ulpra-yellow' : 'text-gray-500'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Contrôles */}
              <div className="flex justify-center mt-8 space-x-4">
                <button 
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-white/20 hover:border-ulpra-yellow hover:bg-ulpra-yellow/10 transition-all duration-300"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Indicateurs */}
                <div className="flex items-center space-x-2">
                  {testimonialData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-ulpra-yellow w-4' : 'bg-white/30'
                      }`}
                      aria-label={`Témoignage ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-white/20 hover:border-ulpra-yellow hover:bg-ulpra-yellow/10 transition-all duration-300"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Éléments 3D subtils */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-ulpra-yellow/5 blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-ulpra-yellow/10 blur-[80px] opacity-20"></div>
    </section>
  );
};

export default Testimonials;
