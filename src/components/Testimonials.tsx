
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { fetchTestimonials } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

// Type pour les témoignages
interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image_url?: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Charger les témoignages depuis Supabase
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTestimonials();
        
        // Filtrer seulement les témoignages publiés
        const publishedTestimonials = data.filter(
          testimonial => testimonial.status === "published" || !testimonial.status
        );
        
        setTestimonials(publishedTestimonials);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les témoignages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTestimonials();
  }, [toast]);

  // Fonction pour passer au témoignage suivant
  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Fonction pour revenir au témoignage précédent
  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay && testimonials.length > 1) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 6000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, currentIndex, testimonials.length]);

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
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></span>
            </div>
          ) : testimonials.length > 0 ? (
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
                    {testimonials[currentIndex].image_url && (
                      <div className="md:w-1/3 flex justify-center">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-ulpra-yellow/30">
                          <img 
                            src={testimonials[currentIndex].image_url} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Contenu */}
                    <div className={testimonials[currentIndex].image_url ? "md:w-2/3" : "w-full"}>
                      <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                        "{testimonials[currentIndex].content}"
                      </blockquote>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">{testimonials[currentIndex].name}</p>
                          <p className="text-ulpra-yellow">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                        </div>
                        <div className="flex mt-4 md:mt-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span 
                              key={i}
                              className={`text-lg ${i < testimonials[currentIndex].rating ? 'text-ulpra-yellow' : 'text-gray-500'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Contrôles - seulement si plus d'un témoignage */}
                {testimonials.length > 1 && (
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
                      {testimonials.map((_, index) => (
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
                )}
              </div>
            </div>
          ) : (
            <div className="glassmorphism p-12 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Aucun témoignage pour le moment</h3>
              <p className="text-muted-foreground mb-6">
                Nous travaillons actuellement avec nos premiers clients. Revenez bientôt pour découvrir leurs retours d'expérience.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
              >
                Devenir notre prochain client satisfait
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Éléments 3D subtils */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-ulpra-yellow/5 blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-ulpra-yellow/10 blur-[80px] opacity-20"></div>
    </section>
  );
};

export default Testimonials;
