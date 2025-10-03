import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, Crown, Users, Star, Target, Trophy, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
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

const ExecutiveProfile = () => {
  const { id } = useParams();
  const [executive, setExecutive] = useState<Executive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchExecutive();
    }
  }, [id]);

  const fetchExecutive = async () => {
    try {
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setExecutive(data);
    } catch (error) {
      console.error("Error fetching executive:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-cyan-100 font-light">Loading executive profile...</p>
        </div>
      </div>
    );
  }

  if (!executive) {
    return <Navigate to="/executives" replace />;
  }

  const isPresident = executive.position.toLowerCase().includes('president');
  const isChairman = executive.position.toLowerCase().includes('chairman');
  const isMichael = executive.name.toLowerCase().includes('michael') || executive.name.toLowerCase().includes('ogunmola');

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/executives">
              <Button 
                variant="outline" 
                className="mb-8 border-cyan-400/30 text-cyan-100 hover:bg-cyan-400/20 hover:border-cyan-400/50 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Executives
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white"
            >
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {isPresident && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="h-10 w-10 text-yellow-400" />
                  </motion.div>
                )}
                {isChairman && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="h-10 w-10 text-cyan-400" />
                  </motion.div>
                )}
                <Badge 
                  variant="secondary" 
                  className="text-lg px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 border-0 text-white backdrop-blur-sm"
                >
                  {executive.position}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {executive.name}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-cyan-100 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {executive.bio || `Leading NACOS with vision and dedication as our ${executive.position}.`}
              </motion.p>
              
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {executive.email && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-cyan-400/50 text-cyan-100 hover:bg-cyan-400/20 hover:border-cyan-400 backdrop-blur-sm"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Contact
                    </Button>
                  </motion.div>
                )}
                {executive.linkedin && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-blue-400/50 text-blue-100 hover:bg-blue-400/20 hover:border-blue-400 backdrop-blur-sm"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      LinkedIn
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotateY: [0, 5, 0, -5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    rotateY: { duration: 6, repeat: Infinity },
                    scale: { duration: 4, repeat: Infinity }
                  }}
                  className="w-96 h-96 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-xl flex items-center justify-center overflow-hidden border border-cyan-400/30 shadow-2xl"
                >
                  {executive.image_url ? (
                    <img 
                      src={executive.image_url} 
                      alt={executive.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Users className="h-32 w-32 text-cyan-400/60 mx-auto mb-6" />
                      <span className="text-cyan-400/60 text-xl font-light">Profile Photo</span>
                    </div>
                  )}
                </motion.div>
                
                {/* Floating Elements */}
                {isPresident && (
                  <motion.div 
                    className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Crown className="h-10 w-10 text-white" />
                  </motion.div>
                )}
                
                {isChairman && (
                  <motion.div 
                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity
                    }}
                  >
                    <Star className="h-8 w-8 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Card className="border-cyan-400/20 bg-slate-800/40 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl text-cyan-400 flex items-center gap-3">
                    <Zap className="h-8 w-8" />
                    About {executive.name.split(' ')[0]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isMichael ? (
                    <motion.div
                      variants={staggerChildren}
                      initial="initial"
                      animate="animate"
                      className="space-y-6"
                    >
                      <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-cyan-100">
                        As the Executive Chairman of NACOS, Ogunmola Michael brings exceptional leadership 
                        and technical expertise to our organization. With a passion for advancing computer 
                        science education and fostering innovation among students.
                      </motion.p>
                      
                      <motion.div variants={fadeInUp} className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-400/20">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                          <Target className="h-6 w-6" />
                          Vision & Leadership
                        </h3>
                        <p className="text-cyan-100 leading-relaxed">
                          Michael is committed to creating an inclusive environment where every NACOS member 
                          can thrive, learn, and contribute to the tech community. His leadership focuses on 
                          bridging the gap between academic learning and industry requirements.
                        </p>
                      </motion.div>
                      
                      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
                        <Card className="border-cyan-400/20 bg-cyan-500/10 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <Target className="h-8 w-8 text-cyan-400 mb-4" />
                            <h4 className="font-semibold text-cyan-400 mb-3 text-lg">Key Initiatives</h4>
                            <ul className="space-y-3 text-cyan-100">
                              <li className="flex items-center gap-2">• Mentorship Programs</li>
                              <li className="flex items-center gap-2">• Industry Partnerships</li>
                              <li className="flex items-center gap-2">• Technical Workshops</li>
                              <li className="flex items-center gap-2">• Career Development</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-purple-400/20 bg-purple-500/10 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <Trophy className="h-8 w-8 text-purple-400 mb-4" />
                            <h4 className="font-semibold text-purple-400 mb-3 text-lg">Achievements</h4>
                            <ul className="space-y-3 text-purple-100">
                              <li className="flex items-center gap-2">• Platform Development</li>
                              <li className="flex items-center gap-2">• Community Growth</li>
                              <li className="flex items-center gap-2">• Event Organization</li>
                              <li className="flex items-center gap-2">• Student Engagement</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg leading-relaxed text-cyan-100"
                    >
                      {executive.bio || `${executive.name} serves as ${executive.position} of NACOS, bringing valuable expertise and dedication to our organization's mission.`}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Card className="border-cyan-400/20 bg-slate-800/40 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-cyan-400 flex items-center gap-3">
                    <Mail className="h-6 w-6" />
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {executive.email && (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-6 bg-cyan-500/10 rounded-xl border border-cyan-400/20"
                      >
                        <Mail className="h-8 w-8 text-cyan-400" />
                        <div>
                          <p className="font-medium text-cyan-400 text-lg">Email</p>
                          <a href={`mailto:${executive.email}`} className="text-cyan-100 hover:text-cyan-300 transition-colors">
                            {executive.email}
                          </a>
                        </div>
                      </motion.div>
                    )}
                    
                    {executive.linkedin && (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-6 bg-blue-500/10 rounded-xl border border-blue-400/20"
                      >
                        <Linkedin className="h-8 w-8 text-blue-400" />
                        <div>
                          <p className="font-medium text-blue-400 text-lg">LinkedIn</p>
                          <a 
                            href={executive.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-100 hover:text-blue-300 transition-colors"
                          >
                            Connect on LinkedIn
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Card className="border-cyan-400/20 bg-slate-800/40 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="font-medium text-cyan-400">Position</p>
                    <p className="text-cyan-100 text-lg">{executive.position}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-cyan-400">Organization</p>
                    <p className="text-cyan-100">NACOS JABU Chapter</p>
                  </div>
                  
                  {isMichael && (
                    <div>
                      <p className="font-medium text-cyan-400">Specialization</p>
                      <p className="text-cyan-100">Software Development & Leadership</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Card className="border-purple-400/20 bg-purple-500/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    NACOS Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100 leading-relaxed">
                    Empowering the next generation of tech innovators through education, 
                    collaboration, and cutting-edge technology.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveProfile;