import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-advance slides
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div 
          className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground font-exo">No gallery images available.</p>
      </div>
    );
  }

  // Calculate visible images for the arc layout
  const getVisibleImages = () => {
    const total = images.length;
    const current = currentIndex;
    
    const left2 = (current - 2 + total) % total;
    const left1 = (current - 1 + total) % total;
    const center = current;
    const right1 = (current + 1) % total;
    const right2 = (current + 2) % total;
    
    return [
      { index: left2, position: 'far-left' },
      { index: left1, position: 'near-left' },
      { index: center, position: 'center' },
      { index: right1, position: 'near-right' },
      { index: right2, position: 'far-right' },
    ];
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
      {/* Arc Gallery Container - Larger for laptop */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[480px] flex items-center justify-center overflow-visible">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        
        {/* Images in Arc Formation */}
        <div className="relative flex items-center justify-center w-full h-full">
          <AnimatePresence mode="popLayout">
            {visibleImages.map((item) => {
              const image = images[item.index];
              const isCenter = item.position === 'center';
              
              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    y: 50,
                  }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.6,
                    scale: isCenter ? 1.15 : (item.position.includes('near') ? 0.9 : 0.75),
                    y: isCenter ? 0 : (item.position.includes('near') ? 20 : 40),
                    x: isCenter ? 0 : (item.position.includes('left') ? -60 : 60),
                    rotate: isCenter ? 0 : (item.position.includes('left') ? -8 : 8),
                    zIndex: isCenter ? 10 : (10 - Math.abs(item.position === 'far-left' || item.position === 'far-right' ? 2 : 1)),
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    y: 50,
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px]"
                >
                  {/* Image Card */}
                  <div className={`
                    relative overflow-hidden rounded-2xl
                    bg-gradient-to-br from-card to-card/80
                    border border-border/50
                    shadow-2xl
                    transition-all duration-500
                    ${isCenter ? 'ring-2 ring-accent/50' : ''}
                  `}>
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: isCenter ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h3 className="font-orbitron font-semibold text-sm sm:text-base text-white truncate">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-xs text-gray-300 mt-1 font-exo line-clamp-1">
                            {image.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Center Glow Effect */}
                      {isCenter && (
                        <motion.div
                          className="absolute inset-0 bg-accent/10 pointer-events-none"
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows - Always visible on laptop */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent/80 backdrop-blur-md border border-accent rounded-full flex items-center justify-center text-primary hover:bg-accent hover:scale-110 transition-all duration-300 z-20 shadow-lg"
              onClick={goToPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent/80 backdrop-blur-md border border-accent rounded-full flex items-center justify-center text-primary hover:bg-accent hover:scale-110 transition-all duration-300 z-20 shadow-lg"
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* Dots and Counter */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-accent" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
          
          {/* Counter */}
          <span className="text-xs text-muted-foreground font-rajdhani ml-2">
            <span className="text-accent font-semibold">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{images.length}</span>
          </span>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border border-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border border-accent/20 rounded-full translate-x-1/2 translate-y-1/2" />
    </div>
  );
};

export default GalleryCarousel;
