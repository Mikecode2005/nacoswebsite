import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowLeft, Star, Lightbulb, Network, Users, Trophy, Target, Zap, Code, Rocket, Cpu, Shield, Terminal, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const ExecutiveChairmanPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden font-mono">
        {/* Matrix background */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 text-xs"
              style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
            >
              {Math.random().toString(36).substring(2, 3)}
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <Cpu className="h-16 w-16 text-green-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-green-400/60 text-sm">Loading Chairman profile...</p>
        </motion.div>
      </div>
    );
  }

  const achievements = [
    { icon: Rocket, title: "Platform Innovation", desc: "NACOS digital ecosystem" },
    { icon: Users, title: "Community Growth", desc: "300% membership growth" },
    { icon: Trophy, title: "Industry Partners", desc: "5+ tech collaborations" },
    { icon: Target, title: "Strategic Vision", desc: "4-year growth roadmap" }
  ];

  const initiatives = [
    { icon: Code, title: "Tech Innovation Hub", desc: "Student projects space" },
    { icon: Network, title: "Industry Mentorship", desc: "Connect with professionals" },
    { icon: Lightbulb, title: "Skills Development", desc: "Workshops & training" },
    { icon: Zap, title: "Innovation Labs", desc: "Research facilities" }
  ];

  const portfolioItems = [
    { icon: Cpu, title: "System Architecture", desc: "Full Stack Developer" },
    { icon: Terminal, title: "Languages", desc: "JS, Python, C++" },
    { icon: Shield, title: "Security", desc: "Level 4 Executive" },
    { icon: Rocket, title: "Projects", desc: "10+ Deployments" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden font-mono">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-xs"
            style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
            animate={{ y: ['0vh', '110vh'] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 3 }}
          >
            {Math.random().toString(36).substring(2, 5)}
          </motion.div>
        ))}
      </div>

      <Header />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/executives">
              <Button className="mb-6 border-green-400/30 bg-black/50 text-green-400 hover:bg-green-400/10 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Executives
              </Button>
            </Link>
          </motion.div>
          
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Left Content */}
            <motion.div className="text-white space-y-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-8 w-8 text-green-400" />
                  <Badge className="text-base px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
                    Executive Chairman
                  </Badge>
                </div>
              </motion.div>
              
              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                Ogunmola Michael
              </motion.h1>
              
              <motion.p className="text-lg text-green-200 leading-relaxed border-l-4 border-green-400 pl-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Architecting the future of NACOS through strategic innovation, technological excellence, and visionary leadership.
              </motion.p>
              
              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                {[
                  { label: "Contact", icon: Mail, href: "mailto:chairman@nacos.jabu.edu.ng" },
                  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/+2348057983551" }
                ].map((btn) => (
                  <Button key={btn.label} asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white border border-green-400/30">
                    <a href={btn.href} target="_blank" rel="noopener noreferrer">
                      <btn.icon className="h-5 w-5 mr-2" />
                      {btn.label}
                    </a>
                  </Button>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right - Profile */}
            <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <motion.div className="w-full h-full rounded-2xl overflow-hidden border-2 border-green-400/30 shadow-[0_0_50px_rgba(74,222,128,0.3)]" whileHover={{ scale: 1.02 }}>
                  <img src="/images/Michael2.jpg" alt="Ogunmola Michael" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Star className="h-8 w-8 text-emerald-900" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Portfolio */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h3 className="text-2xl font-bold text-green-400 mb-6 border-b border-green-400/30 pb-2">Portfolio</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {portfolioItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Card className="bg-black/50 border-green-400/20 hover:border-green-400/50">
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="font-bold text-green-400">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Card className="bg-black/50 border-green-400/20">
              <CardContent className="p-6 text-center">
                <Shield className="h-10 w-10 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Mission</h3>
                <p className="text-green-200 max-w-2xl mx-auto">
                  Transforming NACOS into a world-class technology community through strategic leadership, innovation, and commitment to student excellence.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h3 className="text-2xl font-bold text-green-400 mb-6 border-b border-green-400/30 pb-2">Achievements</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }}>
                    <Card className="bg-black/50 border-cyan-400/20 hover:border-cyan-400/50">
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                        <p className="font-bold text-cyan-400">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Initiatives */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-green-400 mb-6 border-b border-green-400/30 pb-2">Active Initiatives</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {initiatives.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Card className="bg-black/50 border-purple-400/20 hover:border-purple-400/50">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-purple-400">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExecutiveChairmanPage;
