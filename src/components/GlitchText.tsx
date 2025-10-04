import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
  delay?: number;
}

const GlitchText = ({ text, className = "", onComplete, delay = 0 }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchChars] = useState('!<>-_\\/[]{}—=+*^?#________');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        // Glitch effect
        const glitchInterval = setInterval(() => {
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          setDisplayText(text.substring(0, currentIndex) + randomChar);
        }, 50);

        setTimeout(() => {
          clearInterval(glitchInterval);
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 100);

        return () => clearInterval(glitchInterval);
      } else if (onComplete) {
        setTimeout(onComplete, 500);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, glitchChars, onComplete, delay]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-8 bg-green-400 ml-1 align-middle"
      />
    </motion.div>
  );
};

export default GlitchText;
