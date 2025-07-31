import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';

interface ConsoleAnimationProps {
  onComplete?: () => void;
}

const ConsoleAnimation = ({ onComplete }: ConsoleAnimationProps) => {
  const [stage, setStage] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);

  const stages = [
    'console.log("Welcome to NACOS");',
    'Welcome to NACOS'
  ];

  const handleStageComplete = () => {
    if (stage === 0) {
      setTimeout(() => {
        setStage(1);
        setTimeout(() => {
          setShowFinalText(true);
          onComplete?.();
        }, 1000);
      }, 1500);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="console"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-2xl sm:text-3xl lg:text-4xl text-hero-accent bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-hero-accent/30"
          >
            <span className="text-green-400">$</span>{" "}
            <TypewriterText 
              text={stages[0]}
              speed={80}
              onComplete={handleStageComplete}
              className="text-hero-accent"
            />
          </motion.div>
        )}
        
        {stage === 1 && (
          <motion.div
            key="nacos"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-orbitron font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-hero-accent via-white to-hero-accent bg-clip-text text-transparent">
              Welcome to{" "}
            </span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white font-black drop-shadow-2xl"
              style={{
                textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3)'
              }}
            >
              NACOS
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsoleAnimation;