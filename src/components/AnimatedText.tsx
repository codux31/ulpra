
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  duration = 0.05,
  delay = 0,
  staggerChildren = 0.03,
  once = false
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pour corriger le problème d'espacement des caractères
  const formattedText = text.replace(/\s+/g, ' ');
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!isMounted) {
    // Afficher le texte en HTML brut pendant le chargement pour éviter les problèmes de formatage
    return <span className={className}>{formattedText}</span>;
  }

  return (
    <motion.span
      className={className + " inline-block leading-relaxed"}
      aria-label={formattedText}
      role="heading"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay
          }
        }
      }}
    >
      {formattedText.split(" ").map((word, wordIndex) => (
        <React.Fragment key={`word-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`char-${charIndex}`}
                variants={letterVariants}
                style={{ display: 'inline-block' }}
                transition={{
                  duration,
                  repeat: once ? 0 : 1,
                  repeatType: "reverse" as const,
                  repeatDelay: 8
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < formattedText.split(" ").length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
