import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface TechGiant {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image_url?: string;
}

const TechGiantsSection = () => {
  const [techGiants, setTechGiants] = useState<TechGiant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, using sample data since we don't have a tech_giants table yet
    const sampleData = [
      {
        id: "1",
        name: "Mark Zuckerberg",
        position: "CEO, Meta",
        bio: "Co-founder and CEO of Meta (formerly Facebook), leading the next evolution of social technology.",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
      },
      {
        id: "2", 
        name: "Sundar Pichai",
        position: "CEO, Google",
        bio: "CEO of Alphabet Inc. and Google, driving innovation in AI and cloud computing.",
        image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
      },
      {
        id: "3",
        name: "Satya Nadella", 
        position: "CEO, Microsoft",
        bio: "Leading Microsoft's transformation to cloud-first, mobile-first technologies.",
        image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
      }
    ];
    
    setTimeout(() => {
      setTechGiants(sampleData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Tech Giants
          </h2>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Learn from the industry leaders who are shaping the future of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {techGiants.map((giant, index) => (
            <motion.div
              key={giant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    {giant.image_url ? (
                      <img 
                        src={giant.image_url} 
                        alt={giant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                        <Building2 className="h-10 w-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="font-orbitron text-xl group-hover:text-primary transition-colors duration-300">
                    {giant.name}
                  </CardTitle>
                  <p className="text-primary font-rajdhani font-semibold">{giant.position}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-exo text-sm leading-relaxed text-center">
                    {giant.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            asChild 
            className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 font-rajdhani font-semibold"
          >
            <Link to="/tech-giants">
              Learn More About Tech Giants
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechGiantsSection;