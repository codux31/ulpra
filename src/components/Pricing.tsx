
import React, { useRef, useEffect, useState } from 'react';
import AnimatedText from './AnimatedText';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { fetchPricing } from '@/lib/supabase';
import { Pricing as PricingType } from '@/types/models';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [pricingPlans, setPricingPlans] = useState<PricingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await fetchPricing();
        setPricingPlans(pricing);
      } catch (error) {
        console.error('Error loading pricing:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPricing();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-content');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('is-revealed');
              }, 200 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }
    
    return () => {
      if (pricingRef.current) {
        observer.unobserve(pricingRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div id="pricing" className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto flex justify-center items-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-ulpra-yellow" />
        </div>
      </div>
    );
  }

  return (
    <div id="pricing" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="mb-4 inline-block">
            <AnimatedText text="ULPRA BOOSTER PACKS" className="text-gradient" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Des offres claires, modernes et dynamiques pour propulser votre projet au-delà des limites !
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="flex items-center p-1 border border-white/10 rounded-full bg-black/20 backdrop-blur-sm">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual 
                    ? 'bg-ulpra-yellow text-ulpra-black' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isAnnual 
                    ? 'bg-ulpra-yellow text-ulpra-black' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Annuel (2 mois offerts)
              </button>
            </div>
          </div>
        </div>
        
        <div 
          ref={pricingRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`reveal-content glassmorphism p-8 rounded-2xl transition-all duration-500 ${
                plan.popular ? 'border-ulpra-yellow/50 relative mt-0 md:-mt-4' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-ulpra-yellow text-ulpra-black text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Recommandé
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="text-4xl font-display font-bold">
                  {isAnnual ? plan.price * 10 : plan.price}€
                  <span className="text-muted-foreground text-base font-normal">
                    /{isAnnual ? 'an' : 'mois'}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-ulpra-yellow text-sm mt-1">2 mois offerts</p>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check size={18} className="text-ulpra-yellow shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-center mt-auto">
                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-ulpra-yellow text-ulpra-black hover:shadow-[0_0_25px_rgba(238,242,53,0.3)] hover:scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Demander un devis
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center relative z-10">
          <h3 className="text-2xl font-bold mb-4">
            Besoin d'une solution sur mesure ?
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Nous créons également des packs personnalisés adaptés à vos besoins spécifiques et à votre budget.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-transparent border border-ulpra-yellow text-ulpra-yellow hover:bg-ulpra-yellow hover:text-ulpra-black font-medium transition-all duration-300"
          >
            Discuter de votre projet
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-ulpra-yellow/10 blur-[100px] opacity-20" />
    </div>
  );
};

export default Pricing;
