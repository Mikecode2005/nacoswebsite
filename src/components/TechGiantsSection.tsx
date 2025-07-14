import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface TechGiant {
  id: string;
  name: string;
  position: string;
  company: string;
  bio?: string;
  image_url?: string;
  achievements?: string;
  years_experience?: number;
}

const TechGiantsSection = () => {
  const [techGiants, setTechGiants] = useState<TechGiant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechGiants = async () => {
      try {
        const { data, error } = await supabase
          .from('tech_giants')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setTechGiants(data || []);
      } catch (error) {
        console.error('Error fetching tech giants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechGiants();
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
                <CardHeader className="text-center pb-2">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    {giant.image_url ? (
                      <img 
                        src={giant.image_url} 
                        alt={giant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                        <Building2 className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="font-orbitron text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                    {giant.name}
                  </CardTitle>
                  <p className="text-primary font-rajdhani font-semibold text-lg">{giant.position}</p>
                  <p className="text-accent font-rajdhani font-medium">{giant.company}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-muted-foreground font-exo text-sm leading-relaxed">
                      {giant.bio}
                    </p>
                  </div>
                  
                  {giant.achievements && (
                    <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-center mb-2">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        <span className="font-rajdhani font-semibold text-primary">Key Achievements</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-center leading-relaxed">
                        {giant.achievements}
                      </p>
                    </div>
                  )}
                  
                  {giant.years_experience && (
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-accent" />
                      <span className="font-rajdhani">{giant.years_experience}+ years of experience</span>
                    </div>
                  )}
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