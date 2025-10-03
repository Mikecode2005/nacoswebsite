import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, Crown, Trophy, Target, Users } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading President's profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-background to-primary/5">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-yellow-500 to-primary">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <Link to="/executives">
              <Button variant="outline" className="mb-8 border-white/20 text-orange hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Executives
              </Button>
            </Link>
            
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <Crown className="h-10 w-10 text-yellow-300" />
                  <Badge variant="secondary" className="text-xl px-6 py-3 bg-yellow-400 text-yellow-900">
                    NACOS President 👑
                  </Badge>
                </div>
                
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                  {president ? president.name : "Duduyemi Olalekan"}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Leading NACOS with vision, passion, and unwavering commitment to excellence. 
                  Driving innovation and fostering growth within our tech community.
                </p>
                
                <div className="flex gap-4">
                  {president?.email && (
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Mail className="h-5 w-5 mr-2" />
                      Contact President
                    </Button>
                  )}
                  {president?.linkedin && (
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Linkedin className="h-5 w-5 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-yellow-300/50">
                    {president?.image_url ? (
                      <img 
                        src={president.image_url} 
                        alt={president.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src="/images/Duduyemi.jpg" 
                        alt="Duduyemi Olalekan"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white">
                    <Crown className="h-10 w-10 text-yellow-900" />
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
              {/* Presidential Vision */}
              <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-primary/5">
                <CardHeader>
                  <CardTitle className="text-3xl text-yellow-700 flex items-center gap-3">
                    <Crown className="h-8 w-8" />
                    Presidential Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    As President of NACOS, our mission is to create an environment where every student 
                    can thrive, innovate, and become the next generation of tech leaders. We're building 
                    bridges between academic excellence and industry readiness.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-6">
                        <Target className="h-8 w-8 text-yellow-600 mb-4" />
                        <h4 className="font-semibold text-yellow-800 mb-3">Strategic Goals</h4>
                        <ul className="space-y-2 text-sm text-yellow-700">
                          <li>• Enhance academic excellence</li>
                          <li>• Foster innovation culture</li>
                          <li>• Strengthen industry partnerships</li>
                          <li>• Develop leadership skills</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-primary/20 bg-primary/10">
                      <CardContent className="p-6">
                        <Trophy className="h-8 w-8 text-primary mb-4" />
                        <h4 className="font-semibold text-primary mb-3">Achievements</h4>
                        <ul className="space-y-2 text-sm text-primary">
                          <li>• Digital platform launch</li>
                          <li>• 500+ active members</li>
                          <li>• Industry partnerships</li>
                          <li>• Innovation programs</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Leadership Philosophy */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Leadership Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      "True leadership is not about being in charge. It's about taking care of those in your charge. 
                      As President, I believe in servant leadership - empowering every member to reach their full potential."
                    </p>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-primary mb-4">Core Principles</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="font-medium">Inclusive Leadership</p>
                        </div>
                        <div className="text-center">
                          <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                          <p className="font-medium">Vision-Driven</p>
                        </div>
                        <div className="text-center">
                          <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
                          <p className="font-medium">Excellence-Focused</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-yellow-700">Connect with the President</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-600 mb-6">
                    Have ideas, suggestions, or want to discuss NACOS initiatives? The President's office is always open to members.
                  </p>
                  
                  <div className="space-y-4">
                    {president?.email && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-yellow-200">
                        <Mail className="h-6 w-6 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-700">Official Email</p>
                          <a href={`mailto:${president.email}`} className="text-yellow-600 hover:text-yellow-800">
                            {president.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {president?.linkedin && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-yellow-200">
                        <Linkedin className="h-6 w-6 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-700">Professional Network</p>
                          <a 
                            href={president.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-600 hover:text-yellow-800"
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
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-700 flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Presidential Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-yellow-700">Term</p>
                    <p className="text-yellow-600">2025-2026 Academic Session</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-yellow-700">Office Hours</p>
                    <p className="text-yellow-600">Mon-Fri, 2:00 PM - 4:00 PM</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-yellow-700">Members Served</p>
                    <p className="text-yellow-600">400+ Active Members</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">Presidential Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-primary/20">
                      <p className="font-medium text-primary text-sm">Tech Innovation Hub</p>
                      <p className="text-muted-foreground text-xs">Creating space for student projects</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-accent/20">
                      <p className="font-medium text-accent text-sm">Industry Mentorship</p>
                      <p className="text-muted-foreground text-xs">Connecting students with professionals</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-secondary/20">
                      <p className="font-medium text-secondary text-sm">Skills Development</p>
                      <p className="text-muted-foreground text-xs">Regular workshops and training</p>
                    </div>
                  </div>
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

export default PresidentPage;