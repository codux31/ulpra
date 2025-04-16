
import React, { useEffect, useState } from 'react';

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
  const [displayedText, setDisplayedText] = useState("");
  const formattedText = text.replace(/\s+/g, ' ');
  
  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    
    const intervalId = setInterval(() => {
      if (currentIndex < formattedText.length) {
        setDisplayedText(prev => prev + formattedText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, delay);
    
    return () => clearInterval(intervalId);
  }, [formattedText, delay]);
  
  return (
    <span className={className}>
      {displayedText}
    </span>
  );
};

export default AnimatedText;
