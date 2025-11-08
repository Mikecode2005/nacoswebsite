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
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center h-96">
          <p className="text-emerald-700 font-exo text-lg">No upcoming events at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
            <Card className="overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 hover:shadow-xl transition-all duration-300 group h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative overflow-hidden h-80 flex-1">
                  {event.image_url ? (
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-green-200 flex items-center justify-center">
                      <Calendar className="h-20 w-20 text-emerald-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="h-full flex flex-col justify-end">
                      <h3 className="font-orbitron font-bold text-2xl mb-3 text-white">{event.title}</h3>
                      <p className="text-base text-gray-200 mb-4 font-exo line-clamp-4">{event.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span className="font-rajdhani font-medium">
                            {format(new Date(event.event_date), 'MMMM dd, yyyy • h:mm a')}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span className="font-rajdhani font-medium">{event.location}</span>
                          </div>
                        )}
                        {event.registration_link && (
                          <Button 
                            asChild 
                            size="lg"
                            className="mt-3 bg-emerald-500 hover:bg-emerald-600 backdrop-blur-sm border border-emerald-400 text-white font-rajdhani font-semibold"
                          >
                            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                              Register Now
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Visible info when not hovering */}
                <div className="p-6 bg-white/90 backdrop-blur-sm">
                  <h3 className="font-orbitron font-bold text-xl text-emerald-800 mb-2 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-rajdhani">
                      {format(new Date(event.event_date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <MapPin className="h-4 w-4" />
                      <span className="font-rajdhani line-clamp-1">{event.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-4" />
      <CarouselNext className="mr-4" />
    </Carousel>
  );
};

export default EventsCarousel;