import { Monitor, Code, Database, Cpu, Globe, Zap } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-hero-bg min-h-screen flex items-center relative overflow-hidden">
      {/* Enhanced 3D Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating 3D Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border-2 border-hero-accent rounded-lg"
          animate={{ 
            rotateX: [0, 360],
            rotateY: [0, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformStyle: "preserve-3d" }}
        />
        
        <motion.div 
          className="absolute bottom-40 right-20 w-24 h-24 border-2 border-hero-accent rounded-full"
          animate={{ 
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-hero-accent"
          animate={{ 
            rotateX: [0, 180],
            rotateY: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            transformStyle: "preserve-3d",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
          }}
        />

        {/* Code Matrix Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-hero-accent/30 font-mono text-xs"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 0
              }}
              animate={{ 
                y: window.innerHeight + 20,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              {Math.random() > 0.5 ? '01010101' : 'console.log()'}
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
            <TypewriterText 
              text="WELCOME TO NACOS"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-bold leading-tight mb-6 text-hero-accent"
              speed={120}
            />
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 max-w-lg font-exo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              NIGERIAN ASSOCIATION OF COMPUTER SCIENCE STUDENTS
            </motion.p>
            
            {/* Enhanced Circular Picture Frame with 3D Effect */}
            <motion.div 
              className="mt-8 mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <motion.div 
                className="w-32 h-32 mx-auto lg:mx-0 rounded-full border-4 border-hero-accent bg-hero-accent/10 flex items-center justify-center overflow-hidden relative"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-hero-accent/20 to-hero-accent/40 flex items-center justify-center relative">
                  <motion.span 
                    className="text-hero-accent font-rajdhani font-bold text-lg"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    LOGO
                  </motion.span>
                  {/* 3D Ring Effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-hero-accent/50 animate-pulse"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div 
              className="flex space-x-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {[Code, Database, Cpu, Globe].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 bg-hero-accent/20 rounded-lg flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.2,
                    rotateY: 180,
                    backgroundColor: "rgba(var(--hero-accent), 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Icon className="h-6 w-6 text-hero-accent" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right 3D Illustration */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Enhanced 3D Monitor */}
              <motion.div 
                className="w-64 h-48 sm:w-80 sm:h-60 bg-hero-accent/20 rounded-lg border-4 border-hero-accent backdrop-blur-sm relative"
                whileHover={{ 
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1.05
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Screen Content */}
                <div className="p-6 h-full flex items-center justify-center relative z-10">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Monitor className="h-16 w-16 text-hero-accent mx-auto mb-4" />
                    </motion.div>
                    
                    {/* Animated Code Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="h-2 bg-hero-accent/60 rounded"
                          animate={{ 
                            opacity: [0.3, 1, 0.3],
                            scaleX: [0.8, 1.2, 0.8]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 3D Depth Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg"></div>
              </motion.div>
              
              {/* Enhanced Stand with 3D Effect */}
              <motion.div 
                className="w-16 h-8 bg-hero-accent/40 rounded-lg mx-auto mt-2 relative"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateX: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-hero-accent/60 to-hero-accent/20 rounded-lg"></div>
              </motion.div>
              <motion.div 
                className="w-24 h-4 bg-hero-accent/60 rounded-lg mx-auto mt-1 relative"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateX: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-hero-accent/80 to-hero-accent/40 rounded-lg"></div>
              </motion.div>

              {/* Enhanced Floating Elements with 3D */}
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-hero-accent rounded-full"
                animate={{ 
                  rotateZ: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformStyle: "preserve-3d" }}
              />
              
              <motion.div 
                className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-hero-accent rounded-full"
                animate={{ 
                  rotateY: [0, 360],
                  x: [0, 10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5
                }}
                style={{ transformStyle: "preserve-3d" }}
              />
              
              <motion.div 
                className="absolute top-1/2 -right-8 w-4 h-4 border-2 border-hero-accent rounded-full"
                animate={{ 
                  rotateX: [0, 360],
                  scale: [0.8, 1.3, 0.8]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
                style={{ transformStyle: "preserve-3d" }}
              />

              {/* Particle System */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-hero-accent rounded-full"
                    initial={{ 
                      x: Math.random() * 300,
                      y: Math.random() * 200,
                      opacity: 0
                    }}
                    animate={{ 
                      x: Math.random() * 300,
                      y: Math.random() * 200,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-hero-accent rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-hero-accent rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Wave Bottom with 3D Effect */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 fill-section-bg"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25"
            animate={{ 
              d: [
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                "M0,0V56.29c47.79,12.2,103.59,22.17,158,18,70.36-15.37,136.33-23.31,206.8-27.5C438.64,22.43,512.34,43.67,583,62.05c69.27,8,138.3,14.88,209.4,3.08,36.15-16,69.85-27.84,104.45-39.34C989.49,15,1113-24.29,1200,42.47V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </motion.svg>
      </div>
    </section>
  );
};

export default HeroSection;