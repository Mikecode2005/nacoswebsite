import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
}

const GalleryCarousel = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);
        
        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground font-exo">No gallery images available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.image_url} 
                    alt={image.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-orbitron font-semibold text-sm">{image.title}</h3>
                    {image.description && (
                      <p className="text-xs text-gray-200 mt-1 font-exo">{image.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GalleryCarousel;