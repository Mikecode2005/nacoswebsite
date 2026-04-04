import { useEffect, useState, useCallback } from "react";
import { Calendar, MapPin, ArrowRight, Clock, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchEvents = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (events.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [events.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <motion.div 
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Calendar className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-exo">No upcoming events at the moment.</p>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Event Card */}
      <div className="relative h-[380px] md:h-[420px] lg:h-[450px] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {currentEvent.image_url ? (
                <motion.img
                  src={currentEvent.image_url}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary/90 to-accent" />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            </div>

            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentEvent.id}`}
              className="mx-4 sm:mx-8 lg:mx-12 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-3"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent font-rajdhani font-semibold text-xs uppercase tracking-wider">
                  Upcoming Event
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold font-orbitron text-white mb-3 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {currentEvent.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base text-gray-200 font-exo mb-5 leading-relaxed line-clamp-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {currentEvent.description}
              </motion.p>

              {/* Event Info Cards */}
              <motion.div
                className="flex flex-wrap gap-3 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {/* Date */}
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span className="text-white font-rajdhani text-sm">
                    {format(new Date(currentEvent.event_date), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                {/* Location */}
                {currentEvent.location && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-white font-rajdhani text-sm">{currentEvent.location}</span>
                  </div>
                )}
              </motion.div>

              {/* Action Button */}
              {currentEvent.registration_link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    asChild
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-primary font-rajdhani font-semibold px-6 py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <a href={currentEvent.registration_link} target="_blank" rel="noopener noreferrer">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {events.length > 1 && (
          <>
            <motion.button
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
              onClick={goToPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </motion.button>
            <motion.button
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </>
        )}
      </div>

      {/* Dots and Counter */}
      {events.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            {events.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-accent" 
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
          
          <span className="text-xs text-white/60 font-rajdhani ml-2">
            <span className="text-accent font-semibold">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{events.length}</span>
          </span>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-0 w-20 h-20 border border-accent/20 rounded-full -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-16 h-16 border border-accent/20 rounded-lg rotate-45 translate-x-1/2" />
    </div>
  );
};

export default EventsCarousel;
