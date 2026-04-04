import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, Crown, Trophy, Target, Users, Sparkles, ArrowRight, Calendar, Award, MessageCircle } from "lucide-react";
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

const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}</span>;
};

const PresidentPage = () => {
  const [president, setPresident] = useState<Executive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresident();
  }, []);

  const fetchPresident = async () => {
    try {
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .ilike("position", "%president%")
        .single();

      if (error) throw error;
      setPresident(data);
    } catch (error) {
      console.error("Error fetching president:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Yellow Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-32 h-32 border-4 border-white/50 rounded-lg rotate-45" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Link to="/executives">
            <Button variant="outline" className="mb-8 border-white/30 text-white hover:bg-white/10 bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Executives
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-8 w-8 text-yellow-300" />
                <Badge className="text-lg px-5 py-2 bg-yellow-400 text-yellow-900 font-semibold">
                  NACOS President 👑
                </Badge>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-orbitron text-white mb-4">
                {president ? president.name : "Duduyemi Olalekan"}
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 font-exo">
                Leading NACOS with vision, passion, and unwavering commitment to excellence. 
                Driving innovation and fostering growth within our tech community.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {president?.email && (
                  <Button asChild size="lg" className="bg-white text-yellow-700 hover:bg-white/90 font-semibold">
                    <a href={`mailto:${president.email}`}>
                      <Mail className="h-5 w-5 mr-2" />
                      Contact President
                    </a>
                  </Button>
                )}
                {president?.linkedin && (
                  <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-white/10">
                    <a href={president.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5 mr-2" />
                      Connect
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Right - Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-yellow-300/50 shadow-2xl">
                  {president?.image_url ? (
                    <img src={president.image_url} alt={president.name} className="w-full h-full object-cover" />
                  ) : (
                    <img src="/images/Duduyemi.jpg" alt="Duduyemi Olalekan" className="w-full h-full object-cover" />
                  )}
                </div>
                {/* Crown Badge */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="h-10 w-10 text-yellow-900" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Term", value: "2025-2026", icon: Calendar },
              { label: "Members Served", value: "500+", icon: Users },
              { label: "Events Organized", value: "25+", icon: Trophy },
              { label: "Years Active", value: "4", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold font-orbitron text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-primary/5">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Presidential Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    As President of NACOS, our mission is to create an environment where every student 
                    can thrive, innovate, and become the next generation of tech leaders.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-5">
                        <Target className="h-8 w-8 text-yellow-600 mb-3" />
                        <h4 className="font-semibold text-primary mb-2">Strategic Goals</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>✓ Enhance academic excellence</li>
                          <li>✓ Foster innovation culture</li>
                          <li>✓ Strengthen industry partnerships</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-accent/10 border-accent/20">
                      <CardContent className="p-5">
                        <Trophy className="h-8 w-8 text-accent mb-3" />
                        <h4 className="font-semibold text-primary mb-2">Achievements</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>✓ Digital platform launch</li>
                          <li>✓ 500+ active members</li>
                          <li>✓ Innovation programs</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Leadership Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border/30">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-primary">Leadership Philosophy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                    "True leadership is not about being in charge. It's about taking care of those in your charge."
                  </p>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Inclusive", icon: Users, color: "text-primary" },
                      { label: "Vision-Driven", icon: Target, color: "text-accent" },
                      { label: "Excellence", icon: Trophy, color: "text-secondary" },
                    ].map((item) => (
                      <div key={item.label} className="text-center p-4 bg-background/50 rounded-xl">
                        <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-2`} />
                        <p className="font-medium text-sm">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-yellow-200/50 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Presidential Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="font-medium">2025-2026 Academic Session</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Office Hours</p>
                  <p className="font-medium">Mon-Fri, 2:00 PM - 4:00 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-lg">Initiatives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Tech Innovation Hub", desc: "Student projects space" },
                  { title: "Industry Mentorship", desc: "Connect with professionals" },
                  { title: "Skills Development", desc: "Workshops & training" },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {president?.email && (
                  <a href={`mailto:${president.email}`} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-sm">{president.email}</span>
                  </a>
                )}
                {president?.linkedin && (
                  <a href={president.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background transition-colors">
                    <Linkedin className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PresidentPage;
