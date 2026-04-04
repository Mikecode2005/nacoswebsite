import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface AdCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image_id: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  display_order: number;
  is_active: boolean;
}

const AdCarousel = () => {
  const [ads, setAds] = useState<AdCarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAds = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ad_carousel')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  useEffect(() => {
    if (ads.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [ads.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  }, [ads.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  }, [ads.length]);

  // Extract actual URL from link (handles all localhost redirect patterns)
  const getActualUrl = (url: string): string => {
    if (!url) return url;
    
    // Handle localhost:PORT/www.domain.com pattern - extract the domain part
    // e.g., http://localhost:8080/www.slatelabs.io -> https://www.slatelabs.io
    const localhostMatch = url.match(/localhost:\d+\/([^\s]+)/);
    if (localhostMatch) {
      return 'https://' + localhostMatch[1];
    }
    
    // Handle any localhost:PORT without www (e.g., localhost:8080/slatelabs.io)
    const localhostNoWwwMatch = url.match(/localhost:\d+\/([a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}[^\s]*)/i);
    if (localhostNoWwwMatch) {
      return 'https://' + localhostNoWwwMatch[1];
    }
    
    // Return as-is for normal URLs
    return url;
  };

  if (loading) {

    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative h-[350px] bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl flex items-center justify-center">
          <motion.div 
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-muted-foreground font-exo text-sm">Loading...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return null;
  }

  const currentAd = ads[currentIndex];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {currentAd.image_url ? (
                <motion.img
                  src={currentAd.image_url}
                  alt={currentAd.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary/90 to-accent" />
              )}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </AnimatePresence>

        {/* Content Card */}
        <div className="relative h-full max-w-7xl mx-auto flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAd.id}
              className="mx-4 sm:mx-6 lg:mx-8 max-w-xl"
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Card Container */}
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 sm:p-8 shadow-2xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent font-rajdhani font-semibold text-xs uppercase tracking-wider">
                    Featured
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold font-orbitron text-white mb-3 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {currentAd.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  className="text-sm sm:text-base text-gray-200 font-exo mb-5 leading-relaxed line-clamp-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {currentAd.subtitle}
                </motion.p>

                {/* Button */}
                {currentAd.button_text && currentAd.button_link && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {currentAd.button_link.startsWith('http') ? (
                      <a
                        href={getActualUrl(currentAd.button_link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-5 bg-accent hover:bg-accent/90 text-primary font-rajdhani font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        {currentAd.button_text}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <Button
                        asChild
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-primary font-rajdhani font-semibold px-6 py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <Link to={currentAd.button_link}>
                          {currentAd.button_text}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {ads.length > 1 && (
          <>
            <motion.button
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
              onClick={goToPrev}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
              onClick={goToNext}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </>
        )}

        {/* Dots Indicator */}
        {ads.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {ads.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-6 bg-accent" 
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {ads.length > 1 && (
          <div className="absolute bottom-4 right-4 text-white/60 font-rajdhani text-xs">
            <span className="text-accent font-semibold">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{ads.length}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdCarousel;
