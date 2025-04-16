
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
  return (
    <span className={className}>
      {text}
    </span>
  );
};

export default AnimatedText;
