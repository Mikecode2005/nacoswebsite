import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, MapPin, BookOpen, Award } from "lucide-react";

interface Lecturer {
  id: string;
  name: string;
  department: string;
  specialization: string;
  bio: string;
  email: string;
  office_location: string;
  image_url: string;
  created_at: string;
}

const Lecturers = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const { data, error } = await supabase
        .from("lecturers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLecturers(data || []);
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const sampleLecturers = [
    {
      id: '1',
      name: 'Dr. Adebayo Johnson',
      department: 'Computer Science',
      specialization: 'Artificial Intelligence & Machine Learning 🤖',
      bio: 'Leading researcher in AI with 15+ years experience. Published over 50 papers in top-tier journals and conferences.',
      email: 'a.johnson@jabu.edu.ng',
      office_location: 'CS Building, Room 301',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Prof. Sarah Okonkwo',
      department: 'Software Engineering',
      specialization: 'Web Development & Cloud Computing ☁️',
      bio: 'Expert in modern web technologies and cloud architecture. Former senior engineer at Google and Microsoft.',
      email: 's.okonkwo@jabu.edu.ng',
      office_location: 'CS Building, Room 205',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '3',
      name: 'Dr. Michael Chukwu',
      department: 'Cybersecurity',
      specialization: 'Network Security & Ethical Hacking 🔐',
      bio: 'Cybersecurity consultant and researcher. Certified in multiple security frameworks and penetration testing.',
      email: 'm.chukwu@jabu.edu.ng',
      office_location: 'CS Building, Room 108',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '4',
      name: 'Dr. Grace Ekene',
      department: 'Data Science',
      specialization: 'Big Data Analytics & Statistics 📊',
      bio: 'Data science expert with focus on predictive modeling and business intelligence. PhD from Stanford University.',
      email: 'g.ekene@jabu.edu.ng',
      office_location: 'CS Building, Room 402',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '5',
      name: 'Prof. David Okoro',
      department: 'Mobile Development',
      specialization: 'iOS & Android Development 📱',
      bio: 'Mobile app development specialist. Led development of 10+ apps with millions of downloads on app stores.',
      email: 'd.okoro@jabu.edu.ng',
      office_location: 'CS Building, Room 310',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '6',
      name: 'Dr. Fatima Yusuf',
      department: 'Database Systems',
      specialization: 'Database Design & Management 🗄️',
      bio: 'Database architect with expertise in both SQL and NoSQL systems. Oracle and MongoDB certified professional.',
      email: 'f.yusuf@jabu.edu.ng',
      office_location: 'CS Building, Room 215',
      image_url: '',
      created_at: '2024-01-01'
    }
  ];

  const displayLecturers = lecturers.length > 0 ? lecturers : sampleLecturers;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Our Expert Lecturers 🎓
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from industry experts and academic leaders who are shaping the future of technology! 💡
          </p>
        </div>

        {/* Lecturers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayLecturers.map((lecturer) => (
            <Card key={lecturer.id} className="border-secondary/20 bg-secondary/5 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-secondary" />
                </div>
                <CardTitle className="text-xl text-primary mb-2">
                  {lecturer.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                    {lecturer.department}
                  </div>
                  <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs">
                    {lecturer.specialization}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm text-center">
                  {lecturer.bio}
                </p>
                
                <div className="space-y-3">
                  {lecturer.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-secondary mr-2" />
                      <a 
                        href={`mailto:${lecturer.email}`}
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        {lecturer.email}
                      </a>
                    </div>
                  )}
                  
                  {lecturer.office_location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-secondary mr-2" />
                      <span className="text-muted-foreground">{lecturer.office_location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Academic Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary">{displayLecturers.length}</h3>
              <p className="text-muted-foreground">Expert Lecturers 👨‍🏫</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">25+</h3>
              <p className="text-muted-foreground">Courses Offered 📚</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent">100+</h3>
              <p className="text-muted-foreground">Research Papers 📄</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary">500+</h3>
              <p className="text-muted-foreground">Students Mentored 👥</p>
            </CardContent>
          </Card>
        </div>

        {/* Departments Overview */}
        <Card className="text-center border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <CardContent className="p-8">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              Academic Excellence 🌟
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Our lecturers bring together decades of industry experience and academic expertise. 
              They are committed to nurturing the next generation of tech leaders through innovative teaching and cutting-edge research.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-secondary/20 text-secondary px-4 py-3 rounded-lg">
                <BookOpen className="h-5 w-5 mx-auto mb-2" />
                <div className="font-medium">Research Excellence</div>
              </div>
              <div className="bg-primary/20 text-primary px-4 py-3 rounded-lg">
                <Award className="h-5 w-5 mx-auto mb-2" />
                <div className="font-medium">Industry Experience</div>
              </div>
              <div className="bg-accent/20 text-accent px-4 py-3 rounded-lg">
                <GraduationCap className="h-5 w-5 mx-auto mb-2" />
                <div className="font-medium">Student Mentorship</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Lecturers;