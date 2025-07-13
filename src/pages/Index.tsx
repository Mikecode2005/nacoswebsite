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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Header />
      <HeroSection />
      
      {/* Upcoming Events Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
              Don't miss out on our exciting events and competitions
            </p>
          </motion.div>
          <EventsCarousel />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Gallery
            </h2>
            <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
              Moments from our activities and achievements
            </p>
          </motion.div>
          <GalleryCarousel />
        </div>
      </section>

      <BlogSection />
      <TechGiantsSection />
      <SportsSection />
      <EnhancedResourcesSection />
      <Footer />
    </div>
  );
};

export default Index;
