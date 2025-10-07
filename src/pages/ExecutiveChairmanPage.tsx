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
  const [introStage, setIntroStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time for the intro sequence
    const timer = setTimeout(() => {
      setIntroStage(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced intro sequence with more hacker vibes
  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-mono">
        {/* Enhanced Matrix-style background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 text-xs"
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

        {/* Scanning lines effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse" />

        <AnimatePresence mode="wait">
          {introStage === 0 ? (
            <motion.div
              key="stage1"
              className="text-center z-10 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlitchText
                text="SYSTEM READY FOR EXECUTIVE ACCESS"
                className="text-2xl md:text-4xl text-green-400 font-bold tracking-wider"
                onComplete={() => setTimeout(() => setIntroStage(1), 1000)}
              />
              <motion.p 
                className="text-green-400/60 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Warning: This terminal contains classified executive data
              </motion.p>
            </motion.div>
          ) : introStage === 1 ? (
            <motion.div
              key="stage2"
              className="text-center z-10 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlitchText
                text="ACCESSING EXECUTIVE PROTOCOL..."
                className="text-xl md:text-3xl text-green-400 tracking-wider"
                onComplete={() => setTimeout(() => setIntroStage(2), 1500)}
                delay={500}
              />
              <motion.div
                className="mt-8 flex gap-2 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-12 bg-green-400/40 rounded"
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
              <motion.p 
                className="text-green-400/60 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Decrypting security layers... This may take a moment
              </motion.p>
            </motion.div>
          ) : introStage === 2 ? (
            <motion.div
              key="stage3"
              className="text-center z-10 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlitchText
                text="VERIFYING IDENTITY CREDENTIALS..."
                className="text-xl md:text-3xl text-green-400 tracking-wider"
                onComplete={() => setTimeout(() => setIntroStage(3), 1200)}
                delay={300}
              />
              <motion.div
                className="mt-8 text-green-400 text-sm space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  > Scanning biometric data... ✓
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  > Verifying security clearance... ✓
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  > Loading executive profile... ✓
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="stage4"
              className="text-center z-10 px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              onAnimationComplete={() => setTimeout(() => setShowContent(true), 800)}
            >
              <motion.div
                className="text-5xl md:text-7xl text-green-400 font-bold tracking-wider"
                animate={{
                  textShadow: [
                    "0 0 10px #4ade80, 0 0 20px #4ade80",
                    "0 0 20px #4ade80, 0 0 40px #4ade80, 0 0 60px #4ade80",
                    "0 0 10px #4ade80, 0 0 20px #4ade80",
                  ],
                }}
                transition={{ duration: 1.5, repeat: 3 }}
              >
                ACCESS GRANTED
              </motion.div>
              <motion.div
                className="mt-6 text-green-400/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Welcome to the executive terminal, Chairman
              </motion.div>
              <motion.div
                className="mt-4 text-green-400/40 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Initializing full interface...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
                > BACK_TO_TERMINAL
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
                    > EXECUTIVE_CHAIRMAN
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
                > Architecting the future of NACOS through strategic innovation, 
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
                    > CONTACT_PROTOCOL
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="https://wa.me/+2348057983551" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto bg-black border-2 border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono font-semibold text-base sm:text-lg px-6 py-4 rounded-none shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                      <Binary className="h-5 w-5 mr-2" />
                      > DIRECT_MESSAGE
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

      {/* Content Sections - Hacker Theme */}
      <div className="relative z-10 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Portfolio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-green-400 mb-8 tracking-wider border-b-2 border-green-400/50 pb-2">
              > SYSTEM_PORTFOLIO
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <Card className="h-full bg-black/60 backdrop-blur-sm border-2 border-green-400/30 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all duration-300 relative overflow-hidden group rounded-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 text-center relative z-10">
                        <motion.div 
                          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${item.color} flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.5)] rounded-none`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <h4 className="text-lg font-bold text-green-400 mb-2 tracking-wider">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm sm:text-base font-mono">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Vision & Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="border-2 border-green-400/30 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(74,222,128,0.2)] rounded-none">
              <CardHeader className="text-center py-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                </motion.div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-green-400 mb-3 tracking-wider">
                  > MISSION_PROTOCOL
                </CardTitle>
                <p className="text-base sm:text-lg text-green-200 max-w-3xl mx-auto leading-relaxed font-mono border-l-2 border-green-400 pl-4">
                  Transforming NACOS into a world-class technology community through strategic leadership, 
                  innovation, and commitment to student excellence.
                </p>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-green-400 mb-8 tracking-wider border-b-2 border-green-400/50 pb-2">
              > SYSTEM_ACHIEVEMENTS
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <Card className="h-full bg-black/60 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 relative overflow-hidden group rounded-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 text-center relative z-10">
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)] rounded-none"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <h4 className="text-lg font-bold text-cyan-400 mb-2 tracking-wider">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-300 text-sm sm:text-base font-mono">
                          {achievement.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Strategic Initiatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-green-400 mb-8 tracking-wider border-b-2 border-green-400/50 pb-2">
              > ACTIVE_INITIATIVES
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {initiatives.map((initiative, index) => {
                const Icon = initiative.icon;
                return (
                  <motion.div
                    key={initiative.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <Card className="bg-black/60 backdrop-blur-sm border-2 border-purple-400/30 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 relative overflow-hidden group rounded-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className={`w-12 h-12 bg-gradient-to-br ${initiative.color} flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] rounded-none`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-purple-400 mb-1 tracking-wider">
                              {initiative.title}
                            </h4>
                            <p className="text-gray-300 text-sm sm:text-base font-mono">
                              {initiative.desc}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact & Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border-2 border-green-400/30 shadow-[0_0_40px_rgba(74,222,128,0.2)] rounded-none">
              <CardContent className="p-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-6"
                >
                  <Network className="h-16 w-16 text-green-400 mx-auto" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-4 tracking-wider">
                  > CONNECT_PROTOCOL
                </h3>
                <p className="text-base sm:text-lg text-green-200 mb-6 max-w-2xl mx-auto leading-relaxed font-mono border-l-2 border-green-400 pl-4">
                  Ready to collaborate, share innovative ideas, or discuss strategic initiatives? 
                  I'm here to connect with the NACOS community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-mono font-semibold text-base sm:text-lg px-8 py-4 rounded-none border-2 border-green-400/50 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                    >
                      <Terminal className="h-5 w-5 mr-2" />
                      > chairman@nacos.jabu.edu.ng
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="https://wa.me/+2348057983551" target="_blank" rel="noopener noreferrer">
                      <Button 
                        size="lg"
                        className="w-full sm:w-auto bg-black border-2 border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono font-semibold text-base sm:text-lg px-8 py-4 rounded-none shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                      >
                        <Binary className="h-5 w-5 mr-2" />
                        > DIRECT_MESSAGE
                      </Button>
                    </a>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExecutiveChairmanPage;