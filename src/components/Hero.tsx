
import React, { useEffect, useRef } from 'react';
import AnimatedText from './AnimatedText';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / innerWidth * 20;
      const moveY = (clientY - innerHeight / 2) / innerHeight * 20;
      
      const glowElements = heroRef.current.querySelectorAll('.glow-effect');
      glowElements.forEach((element) => {
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-ulpra-black via-ulpra-black to-black z-0" />
      
      {/* Glow effects */}
      <div className="glow-effect absolute top-[30%] left-[30%] w-64 h-64 rounded-full bg-ulpra-yellow/20 blur-[100px] opacity-50 z-0" />
      <div className="glow-effect absolute bottom-[20%] right-[20%] w-80 h-80 rounded-full bg-ulpra-yellow/10 blur-[120px] opacity-40 z-0" />
      
      {/* Éléments 3D subtils */}
      <div className="absolute w-32 h-32 top-1/4 right-1/4 rotate-45 opacity-30">
        <div className="w-full h-full border border-ulpra-yellow/30 rounded-lg transform rotate-12 transition-transform duration-1000 hover:rotate-45" />
      </div>
      <div className="absolute w-48 h-48 bottom-1/3 left-1/5 opacity-20">
        <div className="w-full h-full border-2 border-white/10 rounded-full transform transition-transform duration-1000" />
      </div>
      
      <div className="container mx-auto relative z-10 text-center space-y-8">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium">
          <span className="inline-block animate-pulse bg-ulpra-yellow size-2 rounded-full mr-2" />
          Studio créatif premium
        </div>
        
        <h1 className="flex flex-col items-center leading-none md:leading-none">
          <AnimatedText 
            text="Donnez vie à vos" 
            className="inline-block mb-2"
            as="span"
          />
          <AnimatedText 
            text="projets web & com"
            className="inline-block text-gradient"
            delay={300}
            as="span"
          />
        </h1>
        
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mt-8 opacity-0 animate-fade-in [animation-delay:600ms]">
          ULPRA est un studio créatif qui aide les marques ambitieuses à se démarquer grâce à des expériences web exceptionnelles et des stratégies de communication percutantes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 opacity-0 animate-fade-in [animation-delay:800ms]">
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-ulpra-yellow text-ulpra-black font-medium transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(238,242,53,0.3)]"
          >
            Découvrir nos services
            <ArrowRight size={16} className="ml-2" />
          </a>
          <a 
            href="#projects" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-transparent border border-white/20 hover:border-white/40 text-white font-medium transition-all duration-300"
          >
            Voir nos réalisations
          </a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#services" className="text-white/50 hover:text-white transition-colors duration-300">
            <div className="h-[50px] w-[30px] rounded-full border-2 border-white/20 flex justify-center pt-2">
              <div className="w-1 h-3 rounded-full bg-white/50 animate-[fade-in_1s_ease-in-out_infinite]" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
