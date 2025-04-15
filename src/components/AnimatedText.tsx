
import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = ""
}) => {
  const formattedText = text.replace(/\s+/g, ' ');
  
  return (
    <span className={className}>
      {formattedText}
    </span>
  );
};

export default AnimatedText;
