import { useEffect, useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url?: string;
  registration_link?: string;
}

const EventsCarousel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .gte('event_date', new Date().toISOString())
          .order('event_date', { ascending: true });
        
        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground font-exo">No upcoming events at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden h-64">
                  {event.image_url ? (
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="h-full flex flex-col justify-end">
                      <h3 className="font-orbitron font-bold text-xl mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-200 mb-3 font-exo line-clamp-3">{event.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="h-3 w-3" />
                          <span className="font-rajdhani">
                            {format(new Date(event.event_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin className="h-3 w-3" />
                            <span className="font-rajdhani">{event.location}</span>
                          </div>
                        )}
                        {event.registration_link && (
                          <Button 
                            asChild 
                            size="sm"
                            className="mt-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-rajdhani"
                          >
                            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                              Register Now
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
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

export default EventsCarousel;