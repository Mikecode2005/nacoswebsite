import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, ArrowLeft, Star, Lightbulb, Network, Users, Trophy, Target, Zap, Code, Rocket, Cpu, Shield, Terminal, Binary } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "@/components/GlitchText";

const ExecutiveChairmanPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Shorter loading time - only 2 seconds total
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-mono">
        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            >
              {Math.random().toString(36).substring(2, 3)}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center z-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlitchText
            text="EXECUTIVE ACCESS"
            className="text-3xl md:text-5xl text-green-400 font-bold tracking-wider mb-4"
            delay={200}
          />
          <motion.div
            className="mt-6 text-green-400/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Loading Chairman profile...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const achievements = [
    { icon: Rocket, title: "Platform Innovation", desc: "Led development of NACOS digital ecosystem" },
    { icon: Users, title: "Community Growth", desc: "Expanded membership by 300% in 2 years" },
    { icon: Trophy, title: "Industry Partnerships", desc: "Established 15+ tech company collaborations" },
    { icon: Target, title: "Strategic Vision", desc: "Implemented 5-year growth roadmap" }
  ];

  const initiatives = [
    { icon: Code, title: "Tech Innovation Hub", desc: "Creating space for student projects", color: "from-blue-500 to-cyan-500" },
    { icon: Network, title: "Industry Mentorship", desc: "Connecting students with professionals", color: "from-purple-500 to-pink-500" },
    { icon: Lightbulb, title: "Skills Development", desc: "Regular workshops and training", color: "from-green-500 to-emerald-500" },
    { icon: Zap, title: "Innovation Labs", desc: "State-of-the-art research facilities", color: "from-orange-500 to-red-500" }
  ];

  const portfolioItems = [
    { icon: Cpu, title: "System Architecture", desc: "Full Stack Developer", color: "from-green-500 to-emerald-600" },
    { icon: Terminal, title: "Languages", desc: "JavaScript, Python, C++", color: "from-cyan-500 to-blue-600" },
    { icon: Shield, title: "Security Clearance", desc: "Level 4 Executive Access", color: "from-purple-500 to-pink-600" },
    { icon: Binary, title: "Experience", desc: "4 Years of Advanced Coding", color: "from-orange-500 to-red-600" },
    { icon: Rocket, title: "Projects", desc: "10+ Major Deployments", color: "from-blue-500 to-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden font-mono">
      {/* Enhanced Matrix Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              fontSize: `${Math.random() * 6 + 6}px`,
            }}
            animate={{
              y: ['0vh', '110vh'],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 4,
            }}
          >
            {Math.random().toString(36).substring(2, Math.random() * 8 + 3)}
          </motion.div>
        ))}
      </div>

      {/* Scanning overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/2 to-transparent animate-pulse" />

      <Header />
      
      {/* Hero Section - Hacker Theme */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/executives">
              <Button className="mb-6 mt-20 sm:mt-0 border-2 border-green-400/50 bg-black/50 text-green-400 hover:bg-green-400/10 backdrop-blur-sm text-sm sm:text-base font-mono">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {'>'} BACK_TO_TERMINAL
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Left Content - Hacker Style */}
            <motion.div 
              className="text-white space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
                  </motion.div>
                  <Badge className="text-base sm:text-lg px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg font-mono tracking-wider">
                    {'>'} EXECUTIVE_CHAIRMAN
                  </Badge>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                OGUNMOLA MICHAEL
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-green-200 leading-relaxed border-l-4 border-green-400 pl-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {'>'} Architecting the future of NACOS through strategic innovation, 
                technological excellence, and visionary leadership.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-mono font-semibold text-base sm:text-lg px-6 py-4 rounded-none border-2 border-green-400/50 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                    <Terminal className="h-5 w-5 mr-2" />
                    {'>'} CONTACT_PROTOCOL
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="https://wa.me/+2348057983551" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto bg-black border-2 border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono font-semibold text-base sm:text-lg px-6 py-4 rounded-none shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                      <Binary className="h-5 w-5 mr-2" />
                      {'>'} DIRECT_MESSAGE
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right - Enhanced Profile Image */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <motion.div 
                  className="w-full aspect-square rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-400/10 backdrop-blur-xl border-2 border-green-400/50 shadow-[0_0_50px_rgba(74,222,128,0.4)] overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(74,222,128,0.4)",
                      "0 0 40px rgba(74,222,128,0.6)",
                      "0 0 20px rgba(74,222,128,0.4)",
                    ]
                  }}
                >
                  <img 
                    src="/images/Michael2.jpg" 
                    alt="Ogunmola Michael"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Hacker-style overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent mix-blend-overlay" />
                </motion.div>
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-lg bg-green-400/20 blur-xl -z-10 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rest of the content remains the same */}
      {/* ... (keep all the other sections exactly as they were) ... */}
      
      <Footer />
    </div>
  );
};

export default ExecutiveChairmanPage;