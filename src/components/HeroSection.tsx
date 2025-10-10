import { Monitor, Code, Database, Cpu, Globe, Zap, ArrowRight, Play, Terminal, Sparkles } from "lucide-react";
import ConsoleAnimation from "./ConsoleAnimation";
import GlitchText from "./GlitchText";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [introStage, setIntroStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  if (!showContent) {
    return (
      <section className="bg-black min-h-screen flex items-center relative overflow-hidden font-mono">
        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-hero-accent text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                fontSize: `${Math.random() * 8 + 8}px`,
              }}
              animate={{
                y: ['0vh', '110vh'],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            >
              {Math.random().toString(36).substring(2, Math.random() * 10 + 5)}
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hero-accent/5 to-transparent animate-pulse" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {introStage === 0 ? (
            <motion.div
              key="stage1"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlitchText
                text="ARE YOU READY FOR THE FULL EXPERIENCE?"
                className="text-2xl md:text-4xl lg:text-5xl text-hero-accent font-bold tracking-wider"
                onComplete={() => setTimeout(() => setIntroStage(1), 1000)}
              />
            </motion.div>
          ) : introStage === 1 ? (
            <motion.div
              key="stage2"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlitchText
                text="INITIALIZING..."
                className="text-xl md:text-3xl text-hero-accent tracking-wider"
                onComplete={() => setTimeout(() => setIntroStage(2), 1500)}
                delay={500}
              />
              <motion.div
                className="mt-8 flex gap-2 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-12 bg-hero-accent/40 rounded"
                    animate={{
                      scaleY: [0.3, 1, 0.3],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.08,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="stage3"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              onAnimationComplete={() => setTimeout(() => setShowContent(true), 800)}
            >
              <motion.div
                className="text-5xl md:text-7xl text-hero-accent font-bold tracking-wider"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(var(--hero-accent), 0.8)",
                    "0 0 30px rgba(var(--hero-accent), 1)",
                    "0 0 10px rgba(var(--hero-accent), 0.8)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: 3 }}
              >
                WELCOME
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 min-h-screen flex items-center relative overflow-hidden">
      {/* Enhanced 3D Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating Code Blocks */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-20 border-2 border-hero-accent rounded-lg rotate-12 flex items-center justify-center"
          animate={{ 
            y: [0, -20, 0],
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code className="h-8 w-8 text-hero-accent" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 right-20 w-24 h-24 border-2 border-hero-accent rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Database className="h-8 w-8 text-hero-accent" />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-hero-accent transform rotate-45 flex items-center justify-center"
          animate={{ 
            rotateZ: [45, 225, 45],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <Cpu className="h-6 w-6 text-hero-accent transform -rotate-45" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-1/3 w-20 h-20 border-2 border-hero-accent rounded-lg rotate-45 flex items-center justify-center"
          animate={{ 
            rotateZ: [45, -45, 45],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Globe className="h-8 w-8 text-hero-accent transform -rotate-45" />
        </motion.div>

        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-hero-accent/30 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              {['01', '10', '11', '00', 'CS', '{}', '[]', '()'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-primary-foreground"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <motion.span 
                className="inline-flex items-center px-6 py-3 bg-hero-accent/20 text-hero-accent rounded-full text-sm font-medium mb-6 border border-hero-accent/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--hero-accent), 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <Terminal className="h-4 w-4 mr-2" />
                Welcome to the Future of CS Education
                <Sparkles className="h-4 w-4 ml-2" />
              </motion.span>
            </motion.div>
            
            {/* Console Animation */}
            <div className="mb-8">
              <ConsoleAnimation onComplete={() => setAnimationComplete(true)} />
            </div>
            
            {/* Subtitle with enhanced animation */}
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl mb-6 opacity-90 font-orbitron font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-white via-hero-accent to-white bg-clip-text text-transparent">
                Nigerian Association of Computer Science Students
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl mb-8 opacity-80 max-w-lg font-exo leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Empowering the next generation of tech innovators through collaborative learning, 
              cutting-edge resources, and community-driven excellence.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild
                  size="lg" 
                  className="bg-hero-accent hover:bg-hero-accent/90 text-primary font-rajdhani font-semibold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-hero-accent/25 transition-all duration-300 border border-hero-accent/50"
                >
                  <Link to="/dashboard">
                    <Terminal className="mr-2 h-5 w-5" />
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-2 border-hero-accent text-hero-accent hover:bg-hero-accent hover:text-primary font-rajdhani font-semibold text-lg px-8 py-6 rounded-xl transition-all duration-300 backdrop-blur-sm bg-white/10"
                >
                  <Link to="/blog">
                    <Play className="mr-2 h-5 w-5" />
                    Explore Resources
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Tech Stack Icons */}
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              {[
                { Icon: Code, label: "Programming", color: "from-blue-400 to-blue-600" },
                { Icon: Database, label: "Databases", color: "from-green-400 to-green-600" },
                { Icon: Cpu, label: "Algorithms", color: "from-purple-400 to-purple-600" },
                { Icon: Globe, label: "Web Dev", color: "from-orange-400 to-orange-600" }
              ].map(({ Icon, label, color }, index) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center group cursor-pointer"
                  whileHover={{ 
                    scale: 1.15,
                    rotateY: 15,
                    z: 50
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-2 group-hover:shadow-2xl transition-all duration-300 border border-white/20`}>
                    <Icon className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-xs text-hero-accent/80 font-exo font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Illustration */}
          <motion.div 
            className="hidden md:flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main 3D Dashboard Mockup */}
              <motion.div 
                className="w-80 h-64 sm:w-96 sm:h-80 bg-gradient-to-br from-hero-accent/20 to-hero-accent/10 rounded-2xl border-2 border-hero-accent/30 backdrop-blur-sm relative overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Enhanced Header */}
                <div className="p-4 border-b border-hero-accent/20 bg-gradient-to-r from-hero-accent/10 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-3 h-3 bg-red-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-3 h-3 bg-yellow-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.div 
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                    <div className="text-xs text-hero-accent/60 font-mono bg-black/20 px-2 py-1 rounded">
                      NACOS Dashboard v2.0
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className="p-6 space-y-4">
                  {/* 3D Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      className="bg-gradient-to-br from-hero-accent/30 to-hero-accent/10 rounded-lg p-3 border border-hero-accent/20"
                      whileHover={{ scale: 1.05, z: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-xs text-hero-accent/60 mb-1 font-exo">Students</div>
                      <motion.div 
                        className="text-lg font-bold text-hero-accent font-orbitron"
                        animate={{ textShadow: ['0 0 10px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 10px rgba(255,255,255,0.5)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        500+
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-blue-400/30 to-blue-400/10 rounded-lg p-3 border border-blue-400/20"
                      whileHover={{ scale: 1.05, z: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-xs text-blue-400/60 mb-1 font-exo">Courses</div>
                      <div className="text-lg font-bold text-blue-400 font-orbitron">25+</div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-hero-accent/60 font-exo">
                      <span>Learning Progress</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-hero-accent/20 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-hero-accent to-blue-400 h-3 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, delay: 1.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30 rounded-full"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced Activity List */}
                  <div className="space-y-2">
                    {[
                      { name: "Data Structures Quiz", icon: Database, delay: 2 },
                      { name: "Algorithm Analysis", icon: Cpu, delay: 2.2 },
                      { name: "Web Development", icon: Globe, delay: 2.4 }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.name}
                        className="flex items-center space-x-3 text-xs text-hero-accent/70 bg-hero-accent/10 rounded-lg p-2 border border-hero-accent/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: item.delay }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--hero-accent), 0.2)" }}
                      >
                        <motion.div 
                          className="w-6 h-6 bg-hero-accent/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="h-3 w-3 text-hero-accent" />
                        </motion.div>
                        <span className="font-exo">{item.name}</span>
                        <motion.div
                          className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Holographic Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 3 }}
                />
              </motion.div>
              
              {/* Enhanced Floating Elements */}
              <motion.div 
                className="absolute -top-6 -left-6 w-12 h-12 border-2 border-hero-accent rounded-full flex items-center justify-center bg-hero-accent/10 backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                  rotateZ: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="h-6 w-6 text-hero-accent" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 w-10 h-10 border-2 border-blue-400 rounded-lg flex items-center justify-center bg-blue-400/10 backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.8, 0.3],
                  rotateZ: [0, -180, -360]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <Database className="h-5 w-5 text-blue-400" />
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-10 w-8 h-8 border-2 border-green-400 rounded-full flex items-center justify-center bg-green-400/10 backdrop-blur-sm"
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <Cpu className="h-4 w-4 text-green-400" />
              </motion.div>

              {/* Particle System */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-hero-accent/60 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-6 h-10 border-2 border-hero-accent rounded-full flex justify-center bg-hero-accent/10 backdrop-blur-sm">
            <motion.div 
              className="w-1 h-3 bg-hero-accent rounded-full mt-2"
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, 8, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.p 
            className="text-xs text-hero-accent/60 mt-2 font-exo"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </div>

      {/* Enhanced Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-background">
          <motion.path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            animate={{ 
              d: [
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                "M0,0V56.29c47.79,12.2,103.59,22.17,158,18,70.36-5.37,136.33-23.31,206.8-27.5C438.64,42.43,512.34,63.67,583,82.05c69.27,8,138.3,14.88,209.4,3.08,36.15-6,69.85-17.84,104.45-19.34C989.49,35,1113-4.29,1200,62.47V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;