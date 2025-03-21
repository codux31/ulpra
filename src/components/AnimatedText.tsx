
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  as: Component = 'div',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.style.opacity = '1';
            
            const elements = container.querySelectorAll('.animated-letter');
            elements.forEach((el, index) => {
              setTimeout(() => {
                (el as HTMLElement).style.transform = 'translateY(0)';
                (el as HTMLElement).style.opacity = '1';
              }, delay + index * 30); 
            });
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(container);
    
    return () => {
      observer.disconnect();
    };
  }, [delay, text]);

  return (
    <Component className={cn('inline-block overflow-hidden', className)}>
      <div 
        ref={containerRef} 
        className="inline-flex opacity-0 transition-opacity duration-500"
        aria-label={text}
      >
        {text.split('').map((char, index) => (
          <span
            aria-hidden="true"
            key={index}
            className="animated-letter inline-block opacity-0 transform translate-y-full transition-transform duration-500 ease-out"
            style={{ transitionDelay: `${index * 30}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </Component>
  );
};

export default AnimatedText;
