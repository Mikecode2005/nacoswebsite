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
      <section className="py-16 px-4 bg-gradient-to-br from-background to-primary/5 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-orbitron mb-4 text-primary">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
              Don't miss out on our exciting events and competitions
            </p>
          </motion.div>
          <div className="w-full overflow-hidden">
            <EventsCarousel />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-background w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-orbitron mb-4 text-primary">
              Gallery
            </h2>
            <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
              Moments from our activities and achievements
            </p>
          </motion.div>
          <div className="w-full overflow-hidden">
            <GalleryCarousel />
          </div>
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
