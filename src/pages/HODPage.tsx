import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, GraduationCap, BookOpen, Award, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const HODPage = () => {
  const [hod, setHod] = useState<Executive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHOD();
  }, []);

  const fetchHOD = async () => {
    try {
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .ilike("position", "%HOD%")
        .single();

      if (error) throw error;
      setHod(data);
    } catch (error) {
      console.error("Error fetching HOD:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading HOD's profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-secondary/5">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-secondary to-primary">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <Link to="/executives">
              <Button variant="outline" className="mb-8 border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Executives
              </Button>
            </Link>
            
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <GraduationCap className="h-10 w-10 text-green-300" />
                  <Badge variant="secondary" className="text-xl px-6 py-3 bg-green-400 text-green-900">
                    Head of Department 🎓
                  </Badge>
                </div>
                
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                  {hod ? hod.name : "Dr. Adebayo Kolawole"}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Leading the Computer Science department with academic excellence and industry experience. 
                  Committed to nurturing the next generation of computer scientists and innovators.
                </p>
                
                <div className="flex gap-4">
                  {hod?.email && (
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Mail className="h-5 w-5 mr-2" />
                      Contact HOD
                    </Button>
                  )}
                  {hod?.linkedin && (
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Linkedin className="h-5 w-5 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-green-300/50">
                    {hod?.image_url ? (
                      <img 
                        src={hod.image_url} 
                        alt={hod.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <GraduationCap className="h-24 w-24 text-green-300/80 mx-auto mb-4" />
                        <span className="text-white/60 text-lg">HOD's Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center border-4 border-white">
                    <GraduationCap className="h-10 w-10 text-green-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Academic Leadership */}
              <Card className="border-green-200 bg-gradient-to-r from-green-50 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-3xl text-green-700 flex items-center gap-3">
                    <GraduationCap className="h-8 w-8" />
                    Academic Leadership & Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    With a PhD in Computer Science and specialization in AI and Machine Learning, 
                    Dr. Kolawole leads the department with a perfect blend of academic rigor and 
                    industry relevance. His vision is to produce graduates who are not just 
                    academically sound but industry-ready and innovation-driven.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-6">
                        <BookOpen className="h-8 w-8 text-green-600 mb-4" />
                        <h4 className="font-semibold text-green-800 mb-3">Academic Excellence</h4>
                        <ul className="space-y-2 text-sm text-green-700">
                          <li>• Curriculum Development</li>
                          <li>• Research Supervision</li>
                          <li>• Faculty Development</li>
                          <li>• Academic Standards</li>
                          <li>• Innovation Integration</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-secondary/20 bg-secondary/10">
                      <CardContent className="p-6">
                        <Award className="h-8 w-8 text-secondary mb-4" />
                        <h4 className="font-semibold text-secondary mb-3">Department Achievements</h4>
                        <ul className="space-y-2 text-sm text-secondary">
                          <li>• AI & ML Research Lab</li>
                          <li>• Industry Partnerships</li>
                          <li>• Student Publications</li>
                          <li>• Innovation Projects</li>
                          <li>• Graduate Success Rate</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Research & Innovation */}
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">Research & Innovation Focus</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      "Education in computer science must evolve with the rapidly changing technological landscape. 
                      Our department focuses on cutting-edge research while maintaining strong foundational principles. 
                      We're preparing students not just for today's challenges, but for tomorrow's opportunities."
                    </p>
                    
                    <div className="bg-gradient-to-r from-secondary/10 to-green/10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-secondary mb-4">Research Areas</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
                          <p className="font-medium">Artificial Intelligence</p>
                        </div>
                        <div className="text-center">
                          <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="font-medium">Machine Learning</p>
                        </div>
                        <div className="text-center">
                          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="font-medium">Data Science</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="text-xl font-semibold text-green-800 mb-4">Department Vision</h3>
                      <p className="text-green-700">
                        To be a leading department that produces globally competitive computer scientists 
                        who are equipped with both theoretical knowledge and practical skills. We aim to 
                        foster innovation, research excellence, and ethical leadership in the field of 
                        computer science and technology.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">Department Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 mb-6">
                    The HOD's office is open to students, faculty, and stakeholders for academic consultation, 
                    research collaboration, and departmental matters.
                  </p>
                  
                  <div className="space-y-4">
                    {hod?.email && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-green-200">
                        <Mail className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-medium text-green-700">Department Email</p>
                          <a href={`mailto:${hod.email}`} className="text-green-600 hover:text-green-800">
                            {hod.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {hod?.linkedin && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-green-200">
                        <Linkedin className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-medium text-green-700">Academic Network</p>
                          <a 
                            href={hod.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800"
                          >
                            Connect Professionally
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Department Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-green-700">Qualification</p>
                    <p className="text-green-600">PhD in Computer Science</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-700">Specialization</p>
                    <p className="text-green-600">AI & Machine Learning</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-700">Office Hours</p>
                    <p className="text-green-600">Mon-Fri, 9:00 AM - 5:00 PM</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-700">Students</p>
                    <p className="text-green-600">300+ Department Students</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-secondary">Department Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-secondary/20">
                      <p className="font-medium text-secondary text-sm">Computer Science</p>
                      <p className="text-muted-foreground text-xs">Core CS program with AI focus</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-primary/20">
                      <p className="font-medium text-primary text-sm">Software Engineering</p>
                      <p className="text-muted-foreground text-xs">Industry-focused development</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-accent/20">
                      <p className="font-medium text-accent text-sm">Data Science</p>
                      <p className="text-muted-foreground text-xs">Analytics and ML specialization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">Department Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    To provide world-class computer science education that combines theoretical 
                    excellence with practical application, preparing students for leadership 
                    roles in the global technology ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HODPage;