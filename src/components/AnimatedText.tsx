
import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 50
}) => {
  // Nous supprimons la partie animation qui cause le problème
  // et rendons simplement le texte directement
  return (
    <span className={className}>
      {text}
    </span>
  );
};

export default AnimatedText;
