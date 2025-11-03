import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, ArrowLeft, Users, Target, Trophy, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Executive {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  whatsapp: string;
  image_url: string;
  order_index: number;
}

// Sample executives data - only the regular executives (no president/chairman)
const sampleExecutives: Executive[] = [
  {
    id: 'vice-president',
    name: 'Fasuyi Oluwanifemi Joshua',
    position: 'Vice President ⚡',
    bio: 'Supporting the president in strategic planning and execution. Skilled in leadership and community building with a focus on tech education.',
    email: 'vice@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349023676717',
    image_url: '/images/Joshua.jpg',
    order_index: 3
  },
  {
    id: 'general-secretary',
    name: 'Omamegbe Marvellous',
    position: 'General Secretary 📝',
    bio: 'Organizing and coordinating all NACOS activities with precision. Expert in project management and software engineering.',
    email: 'secretary@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349052648598',
    image_url: '/images/Mavel.jpg',
    order_index: 4
  },
  {
    id: 'assistant-general-secretary',
    name: 'Wonderful',
    position: 'Assistant General Secretary 📋',
    bio: 'Assisting in administrative duties and record-keeping. Detail-oriented with strong organizational skills and tech proficiency.',
    email: 'asst-secretary@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2347066233133',
    image_url: '/images/Wonderful.jpg',
    order_index: 5
  },
  {
    id: 'financial-secretary',
    name: 'Olubo Isaac',
    position: 'Financial Secretary 💰',
    bio: 'Managing financial resources and ensuring transparency in all transactions. FinTech enthusiast and blockchain developer.',
    email: 'financial@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2348165404079',
    image_url: '/images/Isaac.jpg',
    order_index: 6
  },
  {
    id: 'treasurer',
    name: 'Oloyede Daniel',
    position: 'Treasurer 💳',
    bio: 'A treasurer\'s duty goes beyond counting coins - it\'s about safeguarding your money and securing your trust.',
    email: 'treasurer@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349130632107',
    image_url: '/images/Daniel.jpg',
    order_index: 7
  },
  {
    id: 'software-director',
    name: 'Bakare Idris',
    position: 'Software Director 💻',
    bio: 'Overseeing software development initiatives and hackathons. Full-stack developer passionate about open-source contributions.',
    email: 'software@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2348109750586',
    image_url: '/images/Idris.jpg',
    order_index: 8
  },
  {
    id: 'assistant-software-director',
    name: 'Emmanuel',
    position: 'Assistant Software Director 🔧',
    bio: 'Supporting software projects and mentoring junior developers. Specializes in frontend technologies and agile methodologies.',
    email: 'asst-software@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2348105974559',
    image_url: '/images/Emmanuel.jpg',
    order_index: 9
  },
  {
    id: 'sports-director',
    name: 'Fatile Peter',
    position: 'Sports Director 🏃‍♂️',
    bio: 'Promoting physical wellness and team-building through sports events. Fitness enthusiast and data analyst.',
    email: 'sports@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349153866417',
    image_url: '/images/Peter.jpg',
    order_index: 10
  },
  {
    id: 'assistant-sports-director',
    name: 'Sayo',
    position: 'Assistant Sports Director ⚽',
    bio: 'Coordinating sports activities and tournaments. Passionate about sports tech and community health initiatives.',
    email: 'asst-sports@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2341234567890',
    image_url: '/images/Sayo.jpg',
    order_index: 11
  },
  {
    id: 'social-director',
    name: 'Okeya Toni',
    position: 'Social Director 🎉',
    bio: 'Creating memorable experiences and fostering community spirit. Event management and UX design specialist.',
    email: 'social@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2348123401559',
    image_url: '/images/Toni.jpg',
    order_index: 12
  },
  {
    id: 'assistant-social-director',
    name: 'Ogunmola Abigail',
    position: 'Assistant Social Director 🎊',
    bio: 'Assisting in event planning and social media engagement. Creative mind with experience in digital marketing.',
    email: 'asst-social@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349132041854',
    image_url: '/images/Abigail.jpg',
    order_index: 13
  },
  {
    id: 'welfare-director',
    name: 'Ajayi Temiloluwa',
    position: 'Welfare Director ❤️',
    bio: 'Ensuring member well-being and support systems. Counselor with background in health informatics.',
    email: 'welfare@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349034832416',
    image_url: '/images/Prisca.jpg',
    order_index: 14
  },
  {
    id: 'assistant-welfare-director',
    name: 'Adesida Jemima',
    position: 'Assistant Welfare Director 🤝',
    bio: 'Supporting welfare programs and member outreach. Community organizer skilled in conflict resolution.',
    email: 'asst-welfare@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2347049791487',
    image_url: '/images/Jemmy.jpg',
    order_index: 15
  },
  {
    id: 'chief-whip',
    name: 'Akindileni Lovelyn',
    position: 'Chief Whip 🔗',
    bio: 'Ensuring discipline and unity within the executive team. Legal studies background with tech interests.',
    email: 'whip@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2348110370937',
    image_url: '/images/Lovelyn.jpg',
    order_index: 16
  },
  {
    id: 'media-director',
    name: 'Ibironke Itunu',
    position: 'Media Director 📸',
    bio: 'Managing media coverage and publicity for NACOS events. Multimedia specialist and video editor.',
    email: 'media@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2349031708433',
    image_url: '/images/Precious.jpg',
    order_index: 17
  },
  {
    id: 'public-relations-officer',
    name: 'Wande-Adeyemo Iteoluwakiisi',
    position: 'Public Relations Officer 📢',
    bio: 'Building bridges between NACOS and the broader tech community. Social media strategist and content creator.',
    email: 'pro@nacos.jabu.edu.ng',
    whatsapp: 'https://wa.me/+2348139707757',
    image_url: '/images/Wendy.jpg',
    order_index: 18
  }
];

const ExecutiveProfile = () => {
  const { id } = useParams();
  const [executive, setExecutive] = useState<Executive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      if (id) {
        const foundExecutive = sampleExecutives.find(exec => exec.id === id);
        setExecutive(foundExecutive || null);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-emerald-100 font-light">Loading executive profile...</p>
        </div>
      </div>
    );
  }

  if (!executive) {
    return <Navigate to="/executives" replace />;
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-900 relative overflow-hidden">
      {/* Enhanced Tech Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Matrix-style falling code */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-hero-accent/20 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
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
            {['01', '10', '11', '{}', '<>', '[]'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hero-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-hero-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/executives">
              <Button 
                className="mb-6 lg:mb-8 border-2 border-hero-accent/50 bg-black/50 text-hero-accent hover:bg-hero-accent/10 backdrop-blur-sm text-sm lg:text-base font-mono shadow-[0_0_15px_rgba(var(--hero-accent),0.3)]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {'<'} BACK_TO_EXECUTIVES
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white order-2 lg:order-1"
            >
              <motion.div 
                className="flex items-center gap-4 mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Badge 
                  className="text-sm lg:text-lg px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-hero-accent to-primary border-0 text-white backdrop-blur-sm font-mono shadow-[0_0_20px_rgba(var(--hero-accent),0.4)]"
                >
                  {executive.position}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight bg-gradient-to-r from-hero-accent via-white to-hero-accent bg-clip-text text-transparent font-orbitron"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{
                  textShadow: '0 0 30px rgba(var(--hero-accent), 0.3)'
                }}
              >
                {executive.name}
              </motion.h1>
              
              <motion.p 
                className="text-base lg:text-xl text-gray-300 leading-relaxed mb-6 lg:mb-8 border-l-4 border-hero-accent pl-4 font-exo"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {executive.bio || `Leading NACOS with vision and dedication as our ${executive.position}.`}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 lg:gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {executive.email && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button 
                      size="lg" 
                      className="w-full border-2 border-hero-accent/50 bg-hero-accent hover:bg-hero-accent/90 text-primary font-mono font-semibold text-sm lg:text-base shadow-[0_0_20px_rgba(var(--hero-accent),0.3)]"
                    >
                      <Mail className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                      Email
                    </Button>
                  </motion.div>
                )}
                {executive.whatsapp && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button 
                      size="lg" 
                      className="w-full border-2 border-hero-accent/50 bg-black/50 text-hero-accent hover:bg-hero-accent/10 font-mono font-semibold text-sm lg:text-base shadow-[0_0_15px_rgba(var(--hero-accent),0.2)]"
                    >
                      <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                      WhatsApp
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center order-1 lg:order-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(var(--hero-accent), 0.4)",
                      "0 0 40px rgba(var(--hero-accent), 0.6)",
                      "0 0 20px rgba(var(--hero-accent), 0.4)",
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity
                  }}
                  className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-lg bg-gradient-to-br from-hero-accent/20 via-primary/20 to-hero-accent/10 backdrop-blur-xl flex items-center justify-center overflow-hidden border-2 border-hero-accent/50 shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                >
                  {executive.image_url ? (
                    <img 
                      src={executive.image_url} 
                      alt={executive.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="text-center">
                      <Users className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 text-hero-accent/60 mx-auto mb-4" />
                      <span className="text-hero-accent/60 text-lg font-light font-mono">Profile Photo</span>
                    </div>
                  )}
                  {/* Tech overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hero-accent/10 to-transparent mix-blend-overlay" />
                </motion.div>
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-lg bg-hero-accent/20 blur-xl -z-10 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Card className="border-2 border-hero-accent/30 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(var(--hero-accent),0.2)]">
                <CardHeader>
                  <CardTitle className="text-2xl lg:text-3xl text-hero-accent flex items-center gap-3 font-orbitron">
                    <Zap className="h-6 w-6 lg:h-8 lg:w-8" />
                    About {executive.name.split(' ')[0]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={staggerChildren}
                    initial="initial"
                    animate="animate"
                    className="space-y-6"
                  >
                    <motion.p variants={fadeInUp} className="text-base lg:text-lg leading-relaxed text-emerald-100">
                      {executive.bio || `${executive.name} serves as ${executive.position} of NACOS, bringing valuable expertise and dedication to our organization's mission.`}
                    </motion.p>
                    
                    <motion.div variants={fadeInUp} className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-6 lg:p-8 rounded-2xl border border-emerald-400/20">
                      <h3 className="text-xl lg:text-2xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 lg:h-6 lg:w-6" />
                        Role & Responsibilities
                      </h3>
                      <p className="text-emerald-100 leading-relaxed">
                        {executive.name} plays a crucial role in the NACOS executive team, contributing to the growth and development of our tech community through dedicated service and innovative leadership.
                      </p>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-4 lg:gap-6">
                      <Card className="border-emerald-400/20 bg-emerald-500/10 backdrop-blur-sm">
                        <CardContent className="p-4 lg:p-6">
                          <Target className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-400 mb-4" />
                          <h4 className="font-semibold text-emerald-400 mb-3 text-lg">Key Focus Areas</h4>
                          <ul className="space-y-2 lg:space-y-3 text-emerald-100">
                            <li className="flex items-center gap-2">• Student Engagement</li>
                            <li className="flex items-center gap-2">• Project Development</li>
                            <li className="flex items-center gap-2">• Community Building</li>
                            <li className="flex items-center gap-2">• Technical Growth</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-400/20 bg-green-500/10 backdrop-blur-sm">
                        <CardContent className="p-4 lg:p-6">
                          <Trophy className="h-6 w-6 lg:h-8 lg:w-8 text-green-400 mb-4" />
                          <h4 className="font-semibold text-green-400 mb-3 text-lg">Contributions</h4>
                          <ul className="space-y-2 lg:space-y-3 text-green-100">
                            <li className="flex items-center gap-2">• Event Coordination</li>
                            <li className="flex items-center gap-2">• Member Support</li>
                            <li className="flex items-center gap-2">• Program Development</li>
                            <li className="flex items-center gap-2">• Team Collaboration</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Card className="border-emerald-400/20 bg-slate-800/40 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl lg:text-2xl text-emerald-400 flex items-center gap-3">
                    <Mail className="h-5 w-5 lg:h-6 lg:w-6" />
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {executive.email && (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-4 lg:p-6 bg-emerald-500/10 rounded-xl border border-emerald-400/20"
                      >
                        <Mail className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-400" />
                        <div>
                          <p className="font-medium text-emerald-400 text-lg">Email</p>
                          <a href={`mailto:${executive.email}`} className="text-emerald-100 hover:text-emerald-300 transition-colors break-all">
                            {executive.email}
                          </a>
                        </div>
                      </motion.div>
                    )}
                    
                    {executive.whatsapp && (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-4 lg:p-6 bg-green-500/10 rounded-xl border border-green-400/20"
                      >
                        <MessageCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-400" />
                        <div>
                          <p className="font-medium text-green-400 text-lg">WhatsApp</p>
                          <a 
                            href={executive.whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-100 hover:text-green-300 transition-colors break-all"
                          >
                            Chat on WhatsApp
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
              <Card className="border-emerald-400/20 bg-slate-800/40 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-400 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <div>
                    <p className="font-medium text-emerald-400">Position</p>
                    <p className="text-emerald-100 text-lg">{executive.position}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-emerald-400">Organization</p>
                    <p className="text-emerald-100">NACOS JABU Chapter</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-emerald-400">Department</p>
                    <p className="text-emerald-100">Executive Team</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Card className="border-green-400/20 bg-green-500/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    NACOS Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-100 leading-relaxed">
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