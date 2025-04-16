
import React, { useRef } from 'react';
import AnimatedText from '@/components/AnimatedText';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutHero = () => {
  // Reference for the animation on scroll
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Values for parallax animations
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h1 className="mb-6 relative">
              <AnimatedText text="À Propos d'ULPRA" className="text-gradient" />
            </h1>
            <p className="text-xl text-muted-foreground mb-8 reveal-content opacity-0">
              Un studio créatif premium porté par une vision d'excellence et d'innovation dans le domaine du web et de la communication.
            </p>
          </div>
          <div className="md:w-1/2 reveal-content opacity-0 [animation-delay:300ms]">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <motion.div 
                ref={ref}
                style={{ y, opacity }}
                className="absolute inset-0 bg-gradient-to-br from-ulpra-yellow/10 to-ulpra-black rounded-lg"
              >
                {/* 3D Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 border-2 border-ulpra-yellow/20 rounded-full animate-[spin_25s_linear_infinite]"></div>
                    <div className="absolute inset-2 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-4 border border-ulpra-yellow/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-display font-bold text-white">U<span className="text-ulpra-yellow">.</span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-ulpra-yellow/5 blur-[120px] opacity-50" />
    </section>
  );
};

export default AboutHero;
