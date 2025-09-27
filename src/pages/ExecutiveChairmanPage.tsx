import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, Star, Lightbulb, Network, Users, Trophy, Target, Zap, Code, Rocket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-blue-200 font-exo text-lg">Loading Executive Chairman's profile...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <Header />
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-blue-400/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: (i % 12) * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/executives">
              <Button variant="outline" className="mb-8 border-blue-300/30 text-blue-200 hover:bg-blue-400/20 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Executives
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              className="text-white space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-12 w-12 text-blue-300" />
                  </motion.div>
                  <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
                    Executive Chairman 🌟
                  </Badge>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-7xl font-bold leading-tight font-orbitron bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {chairman ? chairman.name : "Ogunmola Michael"}
              </motion.h1>
              
              <motion.p 
                className="text-2xl text-blue-100 leading-relaxed font-exo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Architecting the future of NACOS through strategic innovation, 
                technological excellence, and visionary leadership.
              </motion.p>
              
              <motion.div 
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-rajdhani font-semibold text-lg px-8 py-6 rounded-2xl shadow-2xl">
                    <Mail className="h-6 w-6 mr-3" />
                    Contact Chairman
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="border-2 border-blue-300/50 text-blue-200 hover:bg-blue-400/20 backdrop-blur-sm font-rajdhani font-semibold text-lg px-8 py-6 rounded-2xl">
                    <Linkedin className="h-6 w-6 mr-3" />
                    Connect
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right - 3D Profile Display */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Profile Container */}
                <motion.div 
                  className="w-96 h-96 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden border-2 border-blue-300/30 shadow-2xl relative"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ duration: 0.6 }}
                >
                  {chairman?.image_url ? (
                    <img 
                      src={chairman.image_url} 
                      alt={chairman.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          rotateY: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Star className="h-32 w-32 text-blue-300/80 mx-auto mb-6" />
                      </motion.div>
                      <span className="text-blue-200/80 text-xl font-exo">Executive Chairman</span>
                    </div>
                  )}
                  
                  {/* Holographic Scan Lines */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-8"
                    animate={{ y: ['-100%', '500%'] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity
                  }}
                >
                  <Star className="h-12 w-12 text-white" />
                </motion.div>

                {/* Orbiting Elements */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: Math.cos(i * 45 * Math.PI / 180) * 250,
                      y: Math.sin(i * 45 * Math.PI / 180) * 250,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-br from-background via-blue-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Vision & Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <Card className="border-0 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10"></div>
              
              <CardHeader className="relative z-10 text-center py-12">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Star className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                </motion.div>
                <CardTitle className="text-4xl font-orbitron text-blue-800 mb-4">
                  Executive Vision & Innovation
                </CardTitle>
                <p className="text-xl text-blue-600 max-w-4xl mx-auto font-exo leading-relaxed">
                  Transforming NACOS into a world-class technology community through strategic leadership, 
                  innovation, and unwavering commitment to student excellence.
                </p>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-4xl font-orbitron font-bold text-center text-blue-800 mb-12">
              Key Achievements
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      z: 50
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="h-full bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-blue-200/50 hover:shadow-2xl transition-all duration-500 group">
                      <CardContent className="p-8 text-center">
                        <motion.div 
                          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500"
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1
                          }}
                          transition={{ duration: 0.8 }}
                        >
                          <Icon className="h-10 w-10 text-white" />
                        </motion.div>
                        
                        <h4 className="text-xl font-orbitron font-bold text-blue-800 mb-3">
                          {achievement.title}
                        </h4>
                        <p className="text-blue-600 font-exo leading-relaxed">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-4xl font-orbitron font-bold text-center text-blue-800 mb-12">
              Strategic Initiatives
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {initiatives.map((initiative, index) => {
                const Icon = initiative.icon;
                return (
                  <motion.div
                    key={initiative.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.03,
                      rotateX: 5
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-blue-200/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${initiative.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-center gap-6">
                          <motion.div 
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${initiative.color} flex items-center justify-center shadow-xl`}
                            whileHover={{ 
                              rotate: 360,
                              scale: 1.1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <h4 className="text-2xl font-orbitron font-bold text-blue-800 mb-2">
                              {initiative.title}
                            </h4>
                            <p className="text-blue-600 font-exo text-lg leading-relaxed">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl border-blue-200/50 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
              
              <CardContent className="p-12 text-center relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-8"
                >
                  <Network className="h-20 w-20 text-blue-600 mx-auto" />
                </motion.div>
                
                <h3 className="text-3xl font-orbitron font-bold text-blue-800 mb-6">
                  Connect with the Executive Chairman
                </h3>
                <p className="text-xl text-blue-600 mb-10 max-w-3xl mx-auto font-exo leading-relaxed">
                  Ready to collaborate, share innovative ideas, or discuss strategic initiatives? 
                  The Executive Chairman welcomes engagement from all community members.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-rajdhani font-semibold text-xl px-12 py-6 rounded-2xl shadow-xl"
                    >
                      <Mail className="h-6 w-6 mr-3" />
                      chairman@nacos.jabu.edu.ng
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-rajdhani font-semibold text-xl px-12 py-6 rounded-2xl"
                    >
                      <Linkedin className="h-6 w-6 mr-3" />
                      LinkedIn Profile
                    </Button>
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