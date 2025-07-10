import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowLeft, Crown, Users } from "lucide-react";
import { Link } from "react-router-dom";

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

const ExecutiveProfile = () => {
  const { id } = useParams();
  const [executive, setExecutive] = useState<Executive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchExecutive();
    }
  }, [id]);

  const fetchExecutive = async () => {
    try {
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setExecutive(data);
    } catch (error) {
      console.error("Error fetching executive:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading executive profile...</p>
        </div>
      </div>
    );
  }

  if (!executive) {
    return <Navigate to="/executives" replace />;
  }

  const isPresident = executive.position.toLowerCase().includes('president');
  const isChairman = executive.position.toLowerCase().includes('chairman');
  const isMichael = executive.name.toLowerCase().includes('michael') || executive.name.toLowerCase().includes('ogunmola');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-accent">
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
                {isPresident && <Crown className="h-8 w-8 text-yellow-400" />}
                {isChairman && <Users className="h-8 w-8 text-blue-400" />}
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {executive.position}
                </Badge>
              </div>
              
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                {executive.name}
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed">
                {executive.bio || `Leading NACOS with vision and dedication as our ${executive.position}.`}
              </p>
              
              <div className="flex gap-4 mt-8">
                {executive.email && (
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                )}
                {executive.linkedin && (
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20">
                  {executive.image_url ? (
                    <img 
                      src={executive.image_url} 
                      alt={executive.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Users className="h-24 w-24 text-white/60 mx-auto mb-4" />
                      <span className="text-white/60 text-lg">Profile Photo</span>
                    </div>
                  )}
                </div>
                {isPresident && (
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="h-8 w-8 text-yellow-900" />
                  </div>
                )}
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
            {/* About Section */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">About {executive.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                {isMichael ? (
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      As the Executive Chairman of NACOS, Ogunmola Michael brings exceptional leadership 
                      and technical expertise to our organization. With a passion for advancing computer 
                      science education and fostering innovation among students.
                    </p>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-primary mb-4">Vision & Leadership</h3>
                      <p className="text-muted-foreground">
                        Michael is committed to creating an inclusive environment where every NACOS member 
                        can thrive, learn, and contribute to the tech community. His leadership focuses on 
                        bridging the gap between academic learning and industry requirements.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-accent/20 bg-accent/5">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-accent mb-2">Key Initiatives</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Mentorship Programs</li>
                            <li>• Industry Partnerships</li>
                            <li>• Technical Workshops</li>
                            <li>• Career Development</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-secondary/20 bg-secondary/5">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-secondary mb-2">Achievements</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Platform Development</li>
                            <li>• Community Growth</li>
                            <li>• Event Organization</li>
                            <li>• Student Engagement</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : isPresident ? (
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      As President of NACOS, {executive.name} leads with vision and dedication, 
                      ensuring our organization continues to grow and serve the computer science community 
                      with excellence and innovation.
                    </p>
                    
                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-400 mb-4">Presidential Leadership</h3>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        Under presidential guidance, NACOS has achieved remarkable milestones in 
                        student engagement, academic excellence, and community building.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed">
                    {executive.bio || `${executive.name} serves as ${executive.position} of NACOS, bringing valuable expertise and dedication to our organization's mission.`}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {executive.email && (
                    <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium text-primary">Email</p>
                        <a href={`mailto:${executive.email}`} className="text-muted-foreground hover:text-primary">
                          {executive.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {executive.linkedin && (
                    <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg">
                      <Linkedin className="h-6 w-6 text-accent" />
                      <div>
                        <p className="font-medium text-accent">LinkedIn</p>
                        <a 
                          href={executive.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent"
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
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-primary">Position</p>
                  <p className="text-muted-foreground">{executive.position}</p>
                </div>
                
                <div>
                  <p className="font-medium text-primary">Organization</p>
                  <p className="text-muted-foreground">NACOS (National Association of Computer Science Students)</p>
                </div>
                
                {isMichael && (
                  <div>
                    <p className="font-medium text-primary">Specialization</p>
                    <p className="text-muted-foreground">Software Development & Leadership</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-accent">NACOS Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Advancing computer science education, fostering innovation, and building 
                  a strong community of future tech leaders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveProfile;