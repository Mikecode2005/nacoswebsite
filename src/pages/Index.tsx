import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BlogSection from "@/components/BlogSection";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BlogSection />
      <ResourcesSection />
      <Footer />
    </div>
  );
};

export default Index;
