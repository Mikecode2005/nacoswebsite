import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trophy, Users, GraduationCap, Image } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  description: string;
  category: string;
}

interface SportItem {
  id: string;
  name: string;
  description: string;
  schedule: string;
  location: string;
}

const DashboardSections = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [sportsItems, setSportsItems] = useState<SportItem[]>([]);

  useEffect(() => {
    fetchGalleryItems();
    fetchSportsItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const fetchSportsItems = async () => {
    try {
      const { data, error } = await supabase
        .from("sports")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      setSportsItems(data || []);
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  return (
    <div className="space-y-12">
      {/* Gallery Carousel */}
      <section>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Image className="h-6 w-6 mr-2" />
              Gallery Showcase 📸
            </CardTitle>
            <p className="text-muted-foreground">
              Explore our latest photos and memories! ✨
            </p>
          </CardHeader>
          <CardContent>
            {galleryItems.length > 0 ? (
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {galleryItems.map((item) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                            {item.image_url ? (
                              <img 
                                src={item.image_url} 
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-center">
                                <Image className="h-12 w-12 text-primary/60 mx-auto mb-2" />
                                <span className="text-primary/60">Photo</span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <span className="inline-block bg-accent/20 text-accent px-2 py-1 rounded text-xs mt-2">
                            #{item.category}
                          </span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className="text-center py-8">
                <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No gallery items yet. Check back soon! 📷</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Sports Hub Section */}
      <section>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Trophy className="h-6 w-6 mr-2" />
              Sports Hub ⚽
            </CardTitle>
            <p className="text-muted-foreground">
              Get active and join our sports activities! 🏃‍♂️
            </p>
          </CardHeader>
          <CardContent>
            {sportsItems.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {sportsItems.map((sport) => (
                  <Card key={sport.id} className="border-accent/20 bg-accent/5">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                          <Trophy className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{sport.name}</h3>
                          <p className="text-sm text-muted-foreground">{sport.location}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{sport.description}</p>
                      <div className="text-xs text-accent font-medium">
                        📅 {sport.schedule}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No sports activities yet. Stay tuned! ⚽</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="text-center border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary">500+</h3>
            <p className="text-muted-foreground">Active Members 👥</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-accent/20 bg-accent/5">
          <CardContent className="p-6">
            <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-accent">20+</h3>
            <p className="text-muted-foreground">Sports & Events 🏆</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-secondary/20 bg-secondary/5">
          <CardContent className="p-6">
            <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary">50+</h3>
            <p className="text-muted-foreground">Expert Lecturers 🎓</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DashboardSections;