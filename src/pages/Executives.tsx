import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Linkedin, Crown, Star } from "lucide-react";

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

  const sampleExecutives: Executive[] = [
    {
      id: 'president',
      name: 'Duduyemi Olalekan',
      position: 'President 👑',
      bio: 'Leading NACOS with vision and passion for tech innovation. Computer Science final year student with expertise in full-stack development.',
      email: 'president@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/duduyemi-olalekan',
      image_url: "/images/Duduyemi.jpg",
      order_index: 1,
      created_at: '2024-01-01'
    },
    {
      id: 'executive-chairman',
      name: 'Ogunmola Michael',
      position: 'Executive Chairman 🌟',
      bio: 'Passionate about fostering collaboration and growth within the tech community. Executive Chairman driving innovation and excellence.',
      email: 'chairman@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/ogunmola-michael',
      image_url: '/images/Michael2.jpg',
      order_index: 2,
      created_at: '2024-01-01'
    },
    {
      id: 'vice-president',
      name: 'Temitope Adeyemi',
      position: 'Vice President ⚡',
      bio: 'Supporting the president in strategic planning and execution. Skilled in leadership and community building with a focus on tech education.',
      email: 'vice@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/temitope-adeyemi',
      image_url: '',
      order_index: 3,
      created_at: '2024-01-01'
    },
    {
      id: 'general-secretary',
      name: 'Omamegbe Marvellous',
      position: 'General Secretary 📝',
      bio: 'Organizing and coordinating all NACOS activities with precision. Expert in project management and software engineering.',
      email: 'secretary@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/omamegbe-marvellous',
      image_url: '/images/Mavel.jpg',
      order_index: 4,
      created_at: '2024-01-01'
    },
    {
      id: 'assistant-general-secretary',
      name: 'Aisha Bello',
      position: 'Assistant General Secretary 📋',
      bio: 'Assisting in administrative duties and record-keeping. Detail-oriented with strong organizational skills and tech proficiency.',
      email: 'asst-secretary@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/aisha-bello',
      image_url: '',
      order_index: 5,
      created_at: '2024-01-01'
    },
    {
      id: 'financial-secretary',
      name: 'Olubo Isaac',
      position: 'Financial Secretary 💰',
      bio: 'Managing financial resources and ensuring transparency in all transactions. FinTech enthusiast and blockchain developer.',
      email: 'financial@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/olubo-isaac',
      image_url: '/images/Isaac.jpg',
      order_index: 6,
      created_at: '2024-01-01'
    },
    {
      id: 'treasurer',
      name: 'Fatima Ibrahim',
      position: 'Treasurer 💳',
      bio: 'Overseeing financial planning and budget management. Accounting expert with strong analytical skills.',
      email: 'treasurer@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/fatima-ibrahim',
      image_url: '',
      order_index: 7,
      created_at: '2024-01-01'
    },
    {
      id: 'software-director',
      name: 'Chinedu Okeke',
      position: 'Software Director 💻',
      bio: 'Overseeing software development initiatives and hackathons. Full-stack developer passionate about open-source contributions.',
      email: 'software@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/chinedu-okeke',
      image_url: '',
      order_index: 8,
      created_at: '2024-01-01'
    },
    {
      id: 'assistant-software-director',
      name: 'Sarah Okonkwo',
      position: 'Assistant Software Director 🔧',
      bio: 'Supporting software projects and mentoring junior developers. Specializes in frontend technologies and agile methodologies.',
      email: 'asst-software@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/sarah-okonkwo',
      image_url: '',
      order_index: 9,
      created_at: '2024-01-01'
    },
    {
      id: 'sports-director',
      name: 'Zainab Ali',
      position: 'Sports Director 🏃‍♂️',
      bio: 'Promoting physical wellness and team-building through sports events. Fitness enthusiast and data analyst.',
      email: 'sports@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/zainab-ali',
      image_url: '',
      order_index: 10,
      created_at: '2024-01-01'
    },
    {
      id: 'assistant-sports-director',
      name: 'Peter Adebayo',
      position: 'Assistant Sports Director ⚽',
      bio: 'Coordinating sports activities and tournaments. Passionate about sports tech and community health initiatives.',
      email: 'asst-sports@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/peter-adebayo',
      image_url: '',
      order_index: 11,
      created_at: '2024-01-01'
    },
    {
      id: 'social-director',
      name: 'Grace Okwu',
      position: 'Social Director 🎉',
      bio: 'Creating memorable experiences and fostering community spirit. Event management and UX design specialist.',
      email: 'social@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/grace-okwu',
      image_url: '',
      order_index: 12,
      created_at: '2024-01-01'
    },
    {
      id: 'assistant-social-director',
      name: 'Ogunmola Abigail',
      position: 'Assistant Social Director 🎊',
      bio: 'Assisting in event planning and social media engagement. Creative mind with experience in digital marketing.',
      email: 'asst-social@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/ogunmola-abigail',
      image_url: '/images/Abigail.jpg',
      order_index: 13,
      created_at: '2024-01-01'
    },
    {
      id: 'welfare-director',
      name: 'Halima Yusuf',
      position: 'Welfare Director ❤️',
      bio: 'Ensuring member well-being and support systems. Counselor with background in health informatics.',
      email: 'welfare@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/halima-yusuf',
      image_url: '',
      order_index: 14,
      created_at: '2024-01-01'
    },
    {
      id: 'assistant-welfare-director',
      name: 'Adesida Jemima',
      position: 'Assistant Welfare Director 🤝',
      bio: 'Supporting welfare programs and member outreach. Community organizer skilled in conflict resolution.',
      email: 'asst-welfare@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/adesida-jemima',
      image_url: '/images/Jemmy.jpg',
      order_index: 15,
      created_at: '2024-01-01'
    },
    {
      id: 'chief-whip',
      name: 'Fatima Musa',
      position: 'Chief Whip 🔗',
      bio: 'Ensuring discipline and unity within the executive team. Legal studies background with tech interests.',
      email: 'whip@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/fatima-musa',
      image_url: '',
      order_index: 16,
      created_at: '2024-01-01'
    },
    {
      id: 'media-director',
      name: 'Ibironke Precious',
      position: 'Media Director 📸',
      bio: 'Managing media coverage and publicity for NACOS events. Multimedia specialist and video editor.',
      email: 'media@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/ibironke-precious',
      image_url: '/images/Precious.jpg',
      order_index: 17,
      created_at: '2024-01-01'
    },
    {
      id: 'public-relations-officer',
      name: 'Wande-Adeyemo Iteoluwakiisi',
      position: 'Public Relations Officer 📢',
      bio: 'Building bridges between NACOS and the broader tech community. Social media strategist and content creator.',
      email: 'pro@nacos.jabu.edu.ng',
      linkedin: 'https://linkedin.com/in/wande-adeyemo-iteoluwakiisi',
      image_url: '/images/Wendy.jpg',
      order_index: 18,
      created_at: '2024-01-01'
    }
  ];

  const displayExecutives = executives.length > 0 ? executives : sampleExecutives;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                <Link 
                  to={
                    executive.position === 'President 👑' ? '/PresidentPage' :
                    executive.position === 'Executive Chairman 🌟' ? '/ExecutiveChairman' :
                    `/executives/${executive.id}`
                  }
                  className="block"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden">
                    {executive.image_url ? (
                      <img 
                        src={executive.image_url} 
                        alt={executive.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        {executive.position === 'President 👑' && <Crown className="h-12 w-12 text-primary" />}
                        {executive.position === 'Executive Chairman 🌟' && <Star className="h-12 w-12 text-accent" />}
                        {executive.position !== 'President 👑' && 
                         executive.position !== 'Executive Chairman 🌟' && (
                          <Users className="h-12 w-12 text-primary" />
                        )}
                      </>
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