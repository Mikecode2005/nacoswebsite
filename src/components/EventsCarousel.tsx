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
          <CarouselItem key={event.id}>
            <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.image_url && (
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-muted-foreground font-exo leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-rajdhani">
                      {format(new Date(event.event_date), 'PPP')}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-rajdhani">{event.location}</span>
                    </div>
                  )}
                </div>
                {event.registration_link && (
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 font-rajdhani font-semibold"
                  >
                    <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                      Register Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
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