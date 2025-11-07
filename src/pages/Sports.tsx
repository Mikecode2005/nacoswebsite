import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trophy, MapPin, Calendar, Users, Timer, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sports, setSports] = useState<Sport[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    schedule: "",
    location: "",
    contact_person: "",
    image_url: ""
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("sports")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sport added successfully!",
      });

      setFormData({
        name: "",
        description: "",
        schedule: "",
        location: "",
        contact_person: "",
        image_url: ""
      });
      setIsDialogOpen(false);
      fetchSports();
    } catch (error) {
      console.error("Error adding sport:", error);
      toast({
        title: "Error",
        description: "Failed to add sport. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("sports")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sport deleted successfully!",
      });

      fetchSports();
    } catch (error) {
      console.error("Error deleting sport:", error);
      toast({
        title: "Error",
        description: "Failed to delete sport. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAdmin = userRole === 'admin' || userRole === 'superadmin';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-orbitron">
            Sports Hub ⚽
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Get active, stay healthy, and connect with fellow tech enthusiasts through sports! 🏃‍♂️
          </p>
          
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Sport
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Sport</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Sport Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Schedule (e.g., Mondays & Thursdays 4:00 PM)"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Contact Person"
                      value={formData.contact_person}
                      onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Image URL (optional)"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Sport</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sports.length > 0 ? sports.map((sport) => (
            <Card key={sport.id} className="border-accent/20 bg-accent/5 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  {sport.image_url ? (
                    <img src={sport.image_url} alt={sport.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
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

                {isAdmin && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="w-full mt-4">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this sport activity.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(sport.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full">
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">No sports activities available at the moment.</p>
                </CardContent>
              </Card>
            </div>
          )}
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
              <h3 className="text-2xl font-bold text-primary">{sports.length}</h3>
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
                📱 WhatsApp: +234 915 386 6417
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
