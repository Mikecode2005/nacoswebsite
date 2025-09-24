import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, Star, Lightbulb, Network, Users } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Chairman's profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-accent/5">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-accent to-primary">
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
                  <Star className="h-10 w-10 text-blue-300" />
                  <Badge variant="secondary" className="text-xl px-6 py-3 bg-blue-400 text-blue-900">
                    Executive Chairman 🌟
                  </Badge>
                </div>
                
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                  {chairman ? chairman.name : "Ogunmola Michael"}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Driving strategic vision and fostering innovation within NACOS. 
                  Committed to building bridges between academic excellence and industry success.
                </p>
                
                <div className="flex gap-4">
                  {chairman?.email && (
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Mail className="h-5 w-5 mr-2" />
                      Contact Chairman
                    </Button>
                  )}
                  {chairman?.linkedin && (
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Linkedin className="h-5 w-5 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-blue-300/50">
                    {chairman?.image_url ? (
                      <img 
                        src={chairman.image_url} 
                        alt={chairman.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Star className="h-24 w-24 text-blue-300/80 mx-auto mb-4" />
                        <span className="text-white/60 text-lg">Chairman's Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center border-4 border-white">
                    <Star className="h-10 w-10 text-blue-900" />
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
              {/* Chairman's Vision */}
              <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-3xl text-blue-700 flex items-center gap-3">
                    <Star className="h-8 w-8" />
                    Chairman's Vision & Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    As Executive Chairman, Michael brings exceptional leadership and technical expertise to NACOS. 
                    With a passion for advancing computer science education and fostering innovation among students, 
                    he creates an inclusive environment where every member can thrive and contribute to the tech community.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-6">
                        <Lightbulb className="h-8 w-8 text-blue-600 mb-4" />
                        <h4 className="font-semibold text-blue-800 mb-3">Key Initiatives</h4>
                        <ul className="space-y-2 text-sm text-blue-700">
                          <li>• Mentorship Programs</li>
                          <li>• Industry Partnerships</li>
                          <li>• Technical Workshops</li>
                          <li>• Career Development</li>
                          <li>• Innovation Projects</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-accent/20 bg-accent/10">
                      <CardContent className="p-6">
                        <Network className="h-8 w-8 text-accent mb-4" />
                        <h4 className="font-semibold text-accent mb-3">Strategic Focus</h4>
                        <ul className="space-y-2 text-sm text-accent">
                          <li>• Platform Development</li>
                          <li>• Community Growth</li>
                          <li>• Event Organization</li>
                          <li>• Student Engagement</li>
                          <li>• Technology Integration</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Leadership Philosophy */}
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-accent">Executive Leadership Style</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      "Innovation thrives when we create an environment of collaboration, learning, and mutual support. 
                      As Chairman, I focus on bridging the gap between academic learning and industry requirements, 
                      ensuring our members are prepared for the future of technology."
                    </p>
                    
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-accent mb-4">Executive Principles</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                          <p className="font-medium">Collaborative Leadership</p>
                        </div>
                        <div className="text-center">
                          <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="font-medium">Innovation-Driven</p>
                        </div>
                        <div className="text-center">
                          <Network className="h-8 w-8 text-secondary mx-auto mb-2" />
                          <p className="font-medium">Community-Centered</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-800 mb-4">Platform & Technology Vision</h3>
                      <p className="text-blue-700">
                        Under Michael's leadership, NACOS has embraced digital transformation, creating 
                        this comprehensive platform that serves as a hub for learning, collaboration, and 
                        community engagement. His vision extends beyond traditional student organization 
                        boundaries to create a lasting impact on the tech ecosystem.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700">Connect with the Chairman</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 mb-6">
                    Interested in collaborating, sharing ideas, or discussing NACOS strategic initiatives? 
                    The Chairman welcomes engagement from all members and stakeholders.
                  </p>
                  
                  <div className="space-y-4">
                    {chairman?.email && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-blue-200">
                        <Mail className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-700">Executive Office</p>
                          <a href={`mailto:${chairman.email}`} className="text-blue-600 hover:text-blue-800">
                            {chairman.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {chairman?.linkedin && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-blue-200">
                        <Linkedin className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-700">Professional Network</p>
                          <a 
                            href={chairman.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Connect on LinkedIn
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
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Executive Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-blue-700">Role</p>
                    <p className="text-blue-600">Executive Chairman</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-700">Specialization</p>
                    <p className="text-blue-600">Software Development & Leadership</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-700">Focus Areas</p>
                    <p className="text-blue-600">Strategic Planning, Innovation, Community Building</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-accent">Strategic Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-accent/20">
                      <p className="font-medium text-accent text-sm">Digital Platform</p>
                      <p className="text-muted-foreground text-xs">Comprehensive NACOS ecosystem</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-primary/20">
                      <p className="font-medium text-primary text-sm">Industry Bridge</p>
                      <p className="text-muted-foreground text-xs">Academic-industry partnerships</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-secondary/20">
                      <p className="font-medium text-secondary text-sm">Innovation Hub</p>
                      <p className="text-muted-foreground text-xs">Student project incubation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">NACOS Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Advancing computer science education, fostering innovation, and building 
                    a strong community of future tech leaders through strategic leadership 
                    and collaborative excellence.
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

export default ExecutiveChairmanPage;