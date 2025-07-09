import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, MapPin, Calendar, Users, Timer } from "lucide-react";

interface Sport {
  id: string;
  name: string;
  description: string;
  schedule: string;
  location: string;
  contact_person: string;
  image_url: string;
  created_at: string;
}

const Sports = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const { data, error } = await supabase
        .from("sports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSports(data || []);
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const sampleSports = [
    {
      id: '1',
      name: 'Football ⚽',
      description: 'Join our competitive football team and represent NACOS in inter-faculty tournaments!',
      schedule: 'Mondays & Thursdays 4:00 PM',
      location: 'University Sports Complex',
      contact_person: 'David Okafor',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Basketball 🏀',
      description: 'Fast-paced basketball games for tech enthusiasts who love the court!',
      schedule: 'Tuesdays & Fridays 5:00 PM',
      location: 'Indoor Basketball Court',
      contact_person: 'Sarah Adebayo',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '3',
      name: 'Table Tennis 🏓',
      description: 'Quick reflexes meet strategy in our table tennis tournaments!',
      schedule: 'Wednesdays 3:00 PM',
      location: 'Student Recreation Center',
      contact_person: 'Michael Chen',
      image_url: '',
      created_at: '2024-01-01'
    }
  ];

  const displaySports = sports.length > 0 ? sports : sampleSports;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Sports Hub ⚽
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get active, stay healthy, and connect with fellow tech enthusiasts through sports! 🏃‍♂️
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displaySports.map((sport) => (
            <Card key={sport.id} className="border-accent/20 bg-accent/5 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  {sport.name.includes('Football') && <Trophy className="h-8 w-8 text-accent" />}
                  {sport.name.includes('Basketball') && <Trophy className="h-8 w-8 text-accent" />}
                  {sport.name.includes('Tennis') && <Trophy className="h-8 w-8 text-accent" />}
                  {!sport.name.includes('Football') && !sport.name.includes('Basketball') && !sport.name.includes('Tennis') && (
                    <Trophy className="h-8 w-8 text-accent" />
                  )}
                </div>
                <CardTitle className="text-xl text-center text-primary">
                  {sport.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  {sport.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground">{sport.schedule}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground">{sport.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground">Contact: {sport.contact_person}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sports Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">15</h3>
              <p className="text-muted-foreground">Tournaments Won 🏆</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent">120+</h3>
              <p className="text-muted-foreground">Active Athletes 🏃‍♂️</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary">25</h3>
              <p className="text-muted-foreground">Events This Year 📅</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Timer className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">3</h3>
              <p className="text-muted-foreground">Sports Available ⚽</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center border-accent/20 bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10">
          <CardContent className="p-8">
            <Trophy className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              Ready to Join the Action? 🚀
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you're a seasoned athlete or just getting started, there's a place for you in NACOS sports! 
              Connect with our sports coordinators to join any of these amazing activities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-accent/20 text-accent px-4 py-2 rounded-lg">
                📧 sports@nacos.jabu.edu.ng
              </div>
              <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg">
                📱 WhatsApp: +234 123 456 7890
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Sports;