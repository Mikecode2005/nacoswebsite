import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Sport {
  id: string;
  name: string;
  description?: string;
  location?: string;
  schedule?: string;
  image_url?: string;
  contact_person?: string;
}

const SportsSection = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const { data, error } = await supabase
          .from('sports')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setSports(data || []);
      } catch (error) {
        console.error('Error fetching sports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Sports & Activities
          </h2>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Stay active and engaged with our diverse sports programs and recreational activities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {sports.length > 0 ? sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-green-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {sport.image_url ? (
                      <img 
                        src={sport.image_url} 
                        alt={sport.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Trophy className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <CardTitle className="font-orbitron text-xl text-center group-hover:text-primary transition-colors duration-300">
                    {sport.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sport.description && (
                    <p className="text-muted-foreground font-exo text-sm leading-relaxed">
                      {sport.description}
                    </p>
                  )}
                  {sport.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-rajdhani">{sport.location}</span>
                    </div>
                  )}
                  {sport.schedule && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-rajdhani">{sport.schedule}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )) : (
            <div className="col-span-full">
              <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground font-exo">No sports activities available at the moment.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            asChild 
            className="bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 font-rajdhani font-semibold"
          >
            <Link to="/sports">
              Explore All Sports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SportsSection;