import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, ArrowLeft, Star, Lightbulb, Network, Users, Trophy, Target, Zap, Code, Rocket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "@/components/GlitchText";

interface Executive {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  linkedin: string;
  image_url: string;
  order_index: number;
}

const ExecutiveChairmanPage = () => {
  const [chairman, setChairman] = useState<Executive | null>(null);
  const [loading, setLoading] = useState(true);
  const [introStage, setIntroStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetchChairman();
  }, []);

  const fetchChairman = async () => {
    try {
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .ilike("position", "%chairman%")
        .single();

      if (error) throw error;
      setChairman(data);
    } catch (error) {
      console.error("Error fetching chairman:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intro sequence
  if (loading || !showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
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
              {Math.random().toString(36).substring(2, 15)}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="text-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-green-400 font-mono text-lg">INITIALIZING...</p>
            </motion.div>
          ) : introStage === 0 ? (
            <motion.div
              key="stage1"
              className="text-center z-10 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlitchText
                text="ARE YOU READY FOR THE FULL EXPERIENCE?"
                className="text-2xl md:text-4xl font-mono text-green-400"
                onComplete={() => setIntroStage(1)}
              />
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
                className="text-xl md:text-3xl font-mono text-green-400"
                onComplete={() => setIntroStage(2)}
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
                    className="w-3 h-12 bg-green-400/30 rounded"
                    animate={{
                      scaleY: [0.3, 1, 0.3],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="stage3"
              className="text-center z-10 px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              onAnimationComplete={() => setTimeout(() => setShowContent(true), 500)}
            >
              <motion.div
                className="text-6xl md:text-8xl font-mono text-green-400"
                animate={{
                  textShadow: [
                    "0 0 10px #4ade80, 0 0 20px #4ade80",
                    "0 0 20px #4ade80, 0 0 40px #4ade80",
                    "0 0 10px #4ade80, 0 0 20px #4ade80",
                  ],
                }}
                transition={{ duration: 1, repeat: 2 }}
              >
                GRANTED
              </motion.div>
              <motion.div
                className="mt-4 text-green-400/60 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading profile...
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
    { icon: Code, title: "Role", desc: "Full Stack Developer", color: "from-blue-500 to-indigo-600" },
    { icon: Code, title: "Languages", desc: "JavaScript, Python", color: "from-purple-500 to-pink-500" },
    { icon: Trophy, title: "Experience", desc: "4 Years of Coding", color: "from-green-500 to-emerald-500" },
    { icon: Lightbulb, title: "Qualities", desc: "Visionary, Tech Giant in the Making", color: "from-orange-500 to-red-500" },
    { icon: Rocket, title: "Projects", desc: "Worked on over 10 major projects", color: "from-cyan-500 to-blue-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <Header />
      
      {/* Animated Background (Simplified for Mobile) */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max

-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/executives">
              <Button variant="outline" className="mb-6 mt-20 sm:mt-0 border-blue-300/30 text-white-200 hover:bg-blue-400/20 backdrop-blur-sm text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Executives
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Left Content */}
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
                    <Star className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300" />
                  </motion.div>
                  <Badge className="text-base sm:text-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
                    Executive Chairman 🌟
                  </Badge>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-orbitron bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {chairman ? chairman.name : "Ogunmola Michael"}
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-blue-100 font-exo leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Architecting the future of NACOS through strategic innovation, 
                technological excellence, and visionary leadership.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-rajdhani font-semibold text-base sm:text-lg px-6 py-4 rounded-xl shadow-lg">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="https://wa.me/+2348057983551" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-blue-300/50 text-blue-200 hover:bg-blue-400/20 backdrop-blur-sm font-rajdhani font-semibold text-base sm:text-lg px-6 py-4 rounded-xl">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right - Profile Image */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <motion.div 
                  className="w-full aspect-square rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-blue-300/30 shadow-xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src="images/Chairman.jpg" 
                    alt={chairman ? chairman.name : "Ogunmola Michael"}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-br from-background via-blue-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Portfolio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-center text-blue-800 mb-8">
              Portfolio
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
                    whileHover={{ scale: 1.03, rotateY: 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="h-full bg-gradient-to-br from-gray-900/95 to-blue-950/95 backdrop-blur-sm border-green-400/30 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 text-center relative z-10">
                        <motion.div 
                          className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.5)]`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <h4 className="text-lg font-orbitron font-bold text-green-400 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 font-mono text-sm sm:text-base">
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
            <Card className="border-0 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl shadow-lg">
              <CardHeader className="text-center py-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                </motion.div>
                <CardTitle className="text-2xl sm:text-3xl font-orbitron text-blue-800 mb-3">
                  Vision & Innovation
                </CardTitle>
                <p className="text-base sm:text-lg text-blue-600 max-w-3xl mx-auto font-exo leading-relaxed">
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
            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-center text-blue-800 mb-8">
              Key Achievements
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
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card className="h-full bg-gradient-to-br from-gray-900/95 to-blue-950/95 backdrop-blur-sm border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 text-center relative z-10">
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <h4 className="text-lg font-orbitron font-bold text-cyan-400 mb-2">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-300 font-mono text-sm sm:text-base">
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
            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-center text-blue-800 mb-8">
              Strategic Initiatives
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
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/95 to-purple-950/95 backdrop-blur-sm border-purple-400/30 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${initiative.color} flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg font-orbitron font-bold text-purple-400 mb-1">
                              {initiative.title}
                            </h4>
                            <p className="text-gray-300 font-mono text-sm sm:text-base">
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
            <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl border-blue-200/50 shadow-lg">
              <CardContent className="p-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-6"
                >
                  <Network className="h-16 w-16 text-blue-600 mx-auto" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-blue-800 mb-4">
                  Connect with Me
                </h3>
                <p className="text-base sm:text-lg text-blue-600 mb-6 max-w-2xl mx-auto font-exo leading-relaxed">
                  Ready to collaborate, share innovative ideas, or discuss strategic initiatives? 
                  I'm here to connect with the NACOS community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-rajdhani font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-md"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      chairman@nacos.jabu.edu.ng
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="https://wa.me/+2348057983551" target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-rajdhani font-semibold text-base sm:text-lg px-8 py-4 rounded-xl"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp
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