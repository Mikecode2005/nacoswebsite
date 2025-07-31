import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EventsCarousel from "@/components/EventsCarousel";
import GalleryCarousel from "@/components/GalleryCarousel";
import BlogSection from "@/components/BlogSection";
import TechGiantsSection from "@/components/TechGiantsSection";
import SportsSection from "@/components/SportsSection";
import EnhancedResourcesSection from "@/components/EnhancedResourcesSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background relative">
      <Header />
      <HeroSection />
      
      {/* Upcoming Events Section */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-br from-background to-primary/5 w-full relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-primary rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-accent rounded-lg rotate-45"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl font-bold font-orbitron mb-4 text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Upcoming Events
            </motion.h2>
            <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
              Don't miss out on our exciting events and competitions
            </p>
          </motion.div>
          <div className="w-full overflow-hidden">
            <EventsCarousel />
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-br from-primary/5 to-background w-full relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl font-bold font-orbitron mb-4 text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Gallery
            </motion.h2>
            <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
              Moments from our activities and achievements
            </p>
          </motion.div>
          <div className="w-full overflow-hidden">
            <GalleryCarousel />
          </div>
        </div>
      </motion.section>

      <BlogSection />
      <TechGiantsSection />
      <SportsSection />
      <EnhancedResourcesSection />
      <Footer />
    </div>
  );
};

export default Index;
