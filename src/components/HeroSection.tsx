import { Monitor, Code, Database, Cpu, Globe, Zap, ArrowRight, Play } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-hero-accent rounded-lg rotate-12"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border-2 border-hero-accent rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-hero-accent transform rotate-45"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 border-2 border-hero-accent rounded-lg rotate-45"></div>
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
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-hero-accent/20 text-hero-accent rounded-full text-sm font-medium mb-4">
                Welcome to the Future of CS Education
              </span>
            </motion.div>
            
            <TypewriterText 
              text="NACOS JABU"
              className="text-5xl sm:text-6xl lg:text-7xl font-orbitron font-bold leading-tight mb-6 text-hero-accent"
              speed={150}
            />
            
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl mb-6 opacity-90 font-exo font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Nigerian Association of Computer Science Students
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl mb-8 opacity-80 max-w-lg font-exo leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Empowering the next generation of tech innovators through collaborative learning, cutting-edge resources, and community-driven excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Button 
                asChild
                size="lg" 
                className="bg-hero-accent hover:bg-hero-accent/90 text-primary font-rajdhani font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-hero-accent text-hero-accent hover:bg-hero-accent hover:text-primary font-rajdhani font-semibold text-lg px-8 py-6 rounded-xl transition-all duration-300"
              >
                <Link to="/blog">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Resources
                </Link>
              </Button>
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              {[
                { Icon: Code, label: "Programming" },
                { Icon: Database, label: "Databases" },
                { Icon: Cpu, label: "Algorithms" },
                { Icon: Globe, label: "Web Dev" }
              ].map(({ Icon, label }, index) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 bg-hero-accent/20 rounded-xl flex items-center justify-center mb-2 group-hover:bg-hero-accent/30 transition-colors duration-300">
                    <Icon className="h-7 w-7 text-hero-accent" />
                  </div>
                  <span className="text-xs text-hero-accent/80 font-exo">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Dashboard Mockup */}
              <motion.div 
                className="w-80 h-64 sm:w-96 sm:h-80 bg-gradient-to-br from-hero-accent/20 to-hero-accent/10 rounded-2xl border-2 border-hero-accent/30 backdrop-blur-sm relative overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="p-4 border-b border-hero-accent/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-hero-accent/60 font-mono">NACOS Dashboard</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-hero-accent/20 rounded-lg p-3">
                      <div className="text-xs text-hero-accent/60 mb-1">Students</div>
                      <div className="text-lg font-bold text-hero-accent">500+</div>
                    </div>
                    <div className="bg-hero-accent/20 rounded-lg p-3">
                      <div className="text-xs text-hero-accent/60 mb-1">Courses</div>
                      <div className="text-lg font-bold text-hero-accent">25+</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-hero-accent/60">
                      <span>Learning Progress</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-hero-accent/20 rounded-full h-2">
                      <motion.div 
                        className="bg-hero-accent h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, delay: 1.5 }}
                      />
                    </div>
                  </div>
                  
                  {/* Activity List */}
                  <div className="space-y-2">
                    {[
                      "Data Structures Quiz",
                      "Algorithm Analysis",
                      "Web Development"
                    ].map((item, index) => (
                      <motion.div 
                        key={item}
                        className="flex items-center space-x-2 text-xs text-hero-accent/70"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2 + index * 0.2 }}
                      >
                        <div className="w-2 h-2 bg-hero-accent rounded-full"></div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-hero-accent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-hero-accent rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              
              <motion.div 
                className="absolute top-1/2 -right-8 w-4 h-4 border-2 border-hero-accent rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
              />
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

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;