import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Linkedin, Crown, Star, GraduationCap, Code, Database } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const sampleExecutives = [
    {
      id: '1',
      name: 'Emmanuel Adebayo',
      position: 'President 👑',
      bio: 'Leading NACOS with vision and passion for tech innovation. Computer Science final year student with expertise in full-stack development.',
      email: 'president@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/emmanuel-adebayo',
      image_url: '',
      order_index: 1,
      created_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Ogunmola Michael',
      position: 'Executive Chairman 🌟',
      bio: 'Passionate about fostering collaboration and growth within the tech community. Executive Chairman driving innovation and excellence.',
      email: 'chairman@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/ogunmola-michael',
      image_url: '',
      order_index: 2,
      created_at: '2024-01-01'
    },
    {
      id: '3',
      name: 'Michael Chen',
      position: 'General Secretary 📝',
      bio: 'Organizing and coordinating all NACOS activities with precision. Expert in project management and software engineering.',
      email: 'secretary@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/michael-chen',
      image_url: '',
      order_index: 3,
      created_at: '2024-01-01'
    },
    {
      id: '4',
      name: 'Fatima Ibrahim',
      position: 'Treasurer 💰',
      bio: 'Managing financial resources and ensuring transparency in all transactions. FinTech enthusiast and blockchain developer.',
      email: 'treasurer@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/fatima-ibrahim',
      image_url: '',
      order_index: 4,
      created_at: '2024-01-01'
    },
    {
      id: '5',
      name: 'David Ojo',
      position: 'Public Relations Officer 📢',
      bio: 'Building bridges between NACOS and the broader tech community. Social media strategist and content creator.',
      email: 'pro@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/david-ojo',
      image_url: '',
      order_index: 5,
      created_at: '2024-01-01'
    },
    {
      id: '6',
      name: 'Grace Okwu',
      position: 'Social Director 🎉',
      bio: 'Creating memorable experiences and fostering community spirit. Event management and UX design specialist.',
      email: 'social@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/grace-okwu',
      image_url: '',
      order_index: 6,
      created_at: '2024-01-01'
    },
    {
      id: '7',
      name: 'Dr. Adebayo Kolawole',
      position: 'Head of Department (HOD) 🎓',
      bio: 'Leading the Computer Science department with academic excellence and industry experience. PhD in Computer Science with specialization in AI and Machine Learning.',
      email: 'hod@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/dr-adebayo-kolawole',
      image_url: '',
      order_index: 7,
      created_at: '2024-01-01'
    },
    {
      id: '8',
      name: 'Sarah Okonkwo',
      position: 'Subdepartment Coordinator - Software Engineering 💻',
      bio: 'Coordinating software engineering programs and industry partnerships. Expert in full-stack development and project management methodologies.',
      email: 'software@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/sarah-okonkwo',
      image_url: '',
      order_index: 8,
      created_at: '2024-01-01'
    },
    {
      id: '9',
      name: 'James Adedayo',
      position: 'Subdepartment Coordinator - Data Science 📊',
      bio: 'Leading data science initiatives and research projects. Specialist in machine learning, data analytics, and business intelligence.',
      email: 'datascience@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/james-adedayo',
      image_url: '',
      order_index: 9,
      created_at: '2024-01-01'
    }
  ];

  const displayExecutives = executives.length > 0 ? executives : sampleExecutives;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Our Executive Team 👥
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate leaders driving NACOS JABU to new heights in technology and innovation! 🚀
          </p>
        </div>

        {/* Executives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayExecutives.map((executive) => (
            <Card key={executive.id} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <Link to={`/executives/${executive.id}`} className="block">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    {executive.position.includes('President') && <Crown className="h-12 w-12 text-primary" />}
                    {executive.position.includes('Chairman') && <Star className="h-12 w-12 text-accent" />}
                    {executive.position.includes('HOD') && <GraduationCap className="h-12 w-12 text-secondary" />}
                    {executive.position.includes('Software Engineering') && <Code className="h-12 w-12 text-blue-500" />}
                    {executive.position.includes('Data Science') && <Database className="h-12 w-12 text-green-500" />}
                    {!executive.position.includes('President') && 
                     !executive.position.includes('Chairman') && 
                     !executive.position.includes('HOD') && 
                     !executive.position.includes('Software Engineering') && 
                     !executive.position.includes('Data Science') && (
                      <Users className="h-12 w-12 text-primary" />
                    )}
                  </div>
                </Link>
                <Link to={`/executives/${executive.id}`}>
                  <CardTitle className="text-xl text-primary mb-2 hover:text-primary/80 transition-colors cursor-pointer">
                    {executive.name}
                  </CardTitle>
                </Link>
                <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  {executive.position}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm text-center">
                  {executive.bio}
                </p>
                
                <div className="flex justify-center space-x-4">
                  {executive.email && (
                    <a
                      href={`mailto:${executive.email}`}
                      className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full hover:bg-primary/30 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </a>
                  )}
                  {executive.linkedin && (
                    <a
                      href={executive.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-full hover:bg-accent/30 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5 text-accent" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leadership Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">{displayExecutives.length}</h3>
              <p className="text-muted-foreground">Executive Members 👑</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <Star className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent">2</h3>
              <p className="text-muted-foreground">Years Leadership 🌟</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary">500+</h3>
              <p className="text-muted-foreground">Members Served 👥</p>
            </CardContent>
          </Card>
        </div>

        {/* Vision Statement */}
        <Card className="text-center border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
          <CardContent className="p-8">
            <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              Our Leadership Vision 🎯
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              "To foster a dynamic community of tech enthusiasts who will become the leaders of tomorrow's digital revolution. 
              We are committed to excellence, innovation, and inclusive growth for all NACOS members."
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center bg-primary/20 text-primary px-4 py-2 rounded-lg">
                <Star className="h-4 w-4 mr-2" />
                Excellence
              </div>
              <div className="flex items-center bg-accent/20 text-accent px-4 py-2 rounded-lg">
                <Users className="h-4 w-4 mr-2" />
                Collaboration
              </div>
              <div className="flex items-center bg-secondary/20 text-secondary px-4 py-2 rounded-lg">
                <Crown className="h-4 w-4 mr-2" />
                Innovation
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Executives;