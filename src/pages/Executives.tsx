import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Mail, Crown, Star, Sparkles, Linkedin } from "lucide-react";
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
  created_at: string;
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

const Executives = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [executives, setExecutives] = useState<Executive[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setExecutives(data || []);
    } catch (error) {
      console.error("Error fetching executives:", error);
    }
  };

  // Full list including all assistant positions
  const sampleExecutives: Executive[] = [
    { id: 'president', name: 'Duduyemi Olalekan', position: 'President', bio: 'Leading NACOS with vision and passion for tech innovation.', email: 'president@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: "/images/Duduyemi.jpg", order_index: 1, created_at: '2024-01-01' },
    { id: 'executive-chairman', name: 'Ogunmola Michael', position: 'Executive Chairman', bio: 'Passionate about fostering collaboration and growth.', email: 'chairman@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Michael2.jpg', order_index: 2, created_at: '2024-01-01' },
    { id: 'vice-president', name: 'Fasuyi Oluwanifemi Joshua', position: 'Vice President', bio: 'Supporting strategic planning and execution.', email: 'vice@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Joshua.jpg', order_index: 3, created_at: '2024-01-01' },
    { id: 'general-secretary', name: 'Omamegbe Marvellous', position: 'General Secretary', bio: 'Organizing and coordinating all NACOS activities.', email: 'secretary@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Mavel.jpg', order_index: 4, created_at: '2024-01-01' },
    { id: 'assistant-general-secretary', name: 'Wonderful', position: 'Assistant General Secretary', bio: 'Assisting in administrative duties and record-keeping.', email: 'asst-secretary@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Wonderful.jpg', order_index: 5, created_at: '2024-01-01' },
    { id: 'financial-secretary', name: 'Olubo Isaac', position: 'Financial Secretary', bio: 'Managing financial resources and ensuring transparency.', email: 'financial@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Isaac.jpg', order_index: 6, created_at: '2024-01-01' },
    { id: 'treasurer', name: 'Oloyede Daniel', position: 'Treasurer', bio: 'Safeguarding your money and securing your trust.', email: 'treasurer@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Daniel.jpg', order_index: 7, created_at: '2024-01-01' },
    { id: 'software-director', name: 'Bakare Idris', position: 'Software Director', bio: 'Overseeing software development and hackathons.', email: 'software@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Idris.jpg', order_index: 8, created_at: '2024-01-01' },
    { id: 'assistant-software-director', name: 'Emmanuel', position: 'Assistant Software Director', bio: 'Supporting software projects and mentoring junior developers.', email: 'asst-software@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Emmanuel.jpg', order_index: 9, created_at: '2024-01-01' },
    { id: 'sports-director', name: 'Fatile Peter', position: 'Sports Director', bio: 'Promoting physical wellness and team-building.', email: 'sports@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Peter.jpg', order_index: 10, created_at: '2024-01-01' },
    { id: 'assistant-sports-director', name: 'Sayo', position: 'Assistant Sports Director', bio: 'Coordinating sports activities and tournaments.', email: 'asst-sports@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Sayo.jpg', order_index: 11, created_at: '2024-01-01' },
    { id: 'social-director', name: 'Okeya Toni', position: 'Social Director', bio: 'Creating memorable experiences and community spirit.', email: 'social@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Toni.jpg', order_index: 12, created_at: '2024-01-01' },
    { id: 'assistant-social-director', name: 'Ogunmola Abigail', position: 'Assistant Social Director', bio: 'Assisting in event planning and social media.', email: 'asst-social@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Abigail.jpg', order_index: 13, created_at: '2024-01-01' },
    { id: 'welfare-director', name: 'Ajayi Temiloluwa', position: 'Welfare Director', bio: 'Ensuring member well-being and support systems.', email: 'welfare@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Prisca.jpg', order_index: 14, created_at: '2024-01-01' },
    { id: 'assistant-welfare-director', name: 'Adesida Jemima', position: 'Assistant Welfare Director', bio: 'Supporting welfare programs and member outreach.', email: 'asst-welfare@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Jemmy.jpg', order_index: 15, created_at: '2024-01-01' },
    { id: 'chief-whip', name: 'Akindileni Lovelyn', position: 'Chief Whip', bio: 'Ensuring discipline and unity within the team.', email: 'whip@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Lovelyn.jpg', order_index: 16, created_at: '2024-01-01' },
    { id: 'media-director', name: 'Ibironke Itunu', position: 'Media Director', bio: 'Managing media coverage for NACOS events.', email: 'media@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Precious.jpg', order_index: 17, created_at: '2024-01-01' },
    { id: 'public-relations-officer', name: 'Wande-Adeyemo Iteoluwakiisi', position: 'Public Relations Officer', bio: 'Building bridges between NACOS and the tech community.', email: 'pro@nacos.jabu.edu.ng', linkedin: 'https://linkedin.com/in/nacos', image_url: '/images/Wendy.jpg', order_index: 18, created_at: '2024-01-01' },
  ];

  const displayExecutives = executives.length > 0 ? executives : sampleExecutives;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-accent font-rajdhani font-semibold text-sm uppercase tracking-wider">Meet the Team</span>
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4">Executive Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Meet the passionate leaders driving NACOS JABU to new heights!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {[
            { label: "Executives", value: displayExecutives.length, icon: Crown, color: "text-primary" },
            { label: "Years Active", value: 4, icon: Star, color: "text-accent" },
            { label: "Members", value: "500+", icon: Users, color: "text-secondary" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/30 bg-gradient-to-br from-card to-background">
              <CardContent className="p-4 text-center">
                <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold font-orbitron {stat.color}">
                  {typeof stat.value === 'number' ? <AnimatedNumber value={stat.value} /> : stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Executives Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayExecutives.map((executive, index) => (
            <motion.div key={executive.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} whileHover={{ y: -8 }}>
              <Card className="h-full border-border/30 bg-gradient-to-br from-card to-accent/5 hover:border-accent/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-1 ${
                  executive.position === 'President' ? 'bg-gradient-to-r from-yellow-500 to-amber-400' :
                  executive.position === 'Executive Chairman' ? 'bg-gradient-to-r from-purple-500 to-pink-400' :
                  executive.position.includes('Assistant') ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                  'bg-gradient-to-r from-accent to-primary'
                }`} />
                
                <CardContent className="p-5">
                  <div className="relative mb-4">
                    <div className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-2 ${
                      executive.position === 'President' ? 'border-yellow-500' :
                      executive.position === 'Executive Chairman' ? 'border-purple-500' :
                      executive.position.includes('Assistant') ? 'border-blue-400' :
                      'border-accent'
                    }`}>
                      {executive.image_url ? (
                        <img src={executive.image_url} alt={executive.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                      )}
                    </div>
                    {executive.position === 'President' && (
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="h-4 w-4 text-amber-900" />
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-3">
                    <Link 
                      to={
                        executive.position === 'President' ? '/president' :
                        executive.position === 'Executive Chairman' ? '/executive-chairman' :
                        `/executives/${executive.id}`
                      }
                    >
                      <h3 className="font-bold font-orbitron text-primary text-sm hover:text-accent transition-colors">{executive.name}</h3>
                    </Link>
                    <p className={`text-xs font-medium ${
                      executive.position === 'President' ? 'text-yellow-500' :
                      executive.position === 'Executive Chairman' ? 'text-purple-500' :
                      executive.position.includes('Assistant') ? 'text-blue-400' :
                      'text-accent'
                    }`}>{executive.position}</p>
                  </div>

                  <Link to={
                    executive.position === 'President' ? '/president' :
                    executive.position === 'Executive Chairman' ? '/executive-chairman' :
                    `/executives/${executive.id}`
                  }>
                    <p className="text-xs text-muted-foreground text-center line-clamp-2 mb-3 hover:text-accent transition-colors">View profile →</p>
                  </Link>


                  <div className="flex justify-center gap-2">
                    {executive.email && (
                      <a href={`mailto:${executive.email}`} className="p-1.5 bg-primary/10 rounded hover:bg-primary/20 transition-colors">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                      </a>
                    )}
                    {executive.linkedin && (
                      <a href={executive.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-blue-500/10 rounded hover:bg-blue-500/20 transition-colors">
                        <Linkedin className="h-3.5 w-3.5 text-blue-500" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vision Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border-border/30 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
            <CardContent className="p-8 text-center">
              <Crown className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold font-orbitron text-primary mb-3">Our Leadership Vision</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                "To foster a dynamic community of tech enthusiasts who will become the leaders of tomorrow's digital revolution."
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Excellence', 'Innovation', 'Collaboration', 'Growth'].map((value) => (
                  <span key={value} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">{value}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Executives;
