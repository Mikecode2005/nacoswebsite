import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight, BookOpen, Users, Trophy, Crown, GraduationCap, HelpCircle, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface LearningResource {
  id: string;
  title: string;
  description?: string;
  file_url?: string;
  resource_type: string;
  subject?: string;
}

const EnhancedResourcesSection = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data, error } = await supabase
          .from('learning_resources')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        console.error('Error fetching learning resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Learning Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold font-orbitron text-center mb-12 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Learning Resources
          </h2>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {resources.length > 0 ? resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="font-orbitron text-lg group-hover:text-primary transition-colors duration-300">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resource.description && (
                        <p className="text-muted-foreground font-exo text-sm text-center">
                          {resource.description}
                        </p>
                      )}
                      {resource.subject && (
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-rajdhani">
                            {resource.subject}
                          </span>
                        </div>
                      )}
                      {resource.file_url && (
                        <Button
                          asChild
                          size="sm"
                          className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 font-rajdhani"
                        >
                          <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <div className="col-span-full">
                  <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
                    <CardContent className="flex items-center justify-center h-32">
                      <p className="text-muted-foreground font-exo">No learning resources available yet.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Academic Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Past Questions & Quizzes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold font-orbitron text-primary mb-6">Academic Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/past-questions">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Laptop className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold text-lg text-primary mb-2">Past Questions</h4>
                    <p className="text-muted-foreground text-sm font-exo">Download past exam papers</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/quizzes">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-green-400/20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold text-lg text-primary mb-2">Quizzes</h4>
                    <p className="text-muted-foreground text-sm font-exo">Test your knowledge</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.div>

          {/* Student Excellence Hub */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold font-orbitron text-primary mb-6">Student Excellence Hub</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/hall-of-fame">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-orbitron font-bold text-lg text-primary">Hall of Fame</h4>
                    <p className="text-muted-foreground text-sm font-exo">Outstanding achievers</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/tutors">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-orbitron font-bold text-lg text-primary">Tutors</h4>
                    <p className="text-muted-foreground text-sm font-exo">Academic support</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Link to="/tech-giants">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-semibold text-primary">Tech Giants</h4>
                    <p className="text-sm text-muted-foreground font-exo">Industry leaders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/sports">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-semibold text-primary">Sports</h4>
                    <p className="text-sm text-muted-foreground font-exo">Athletic activities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/lecturers">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-semibold text-primary">Lecturers</h4>
                    <p className="text-sm text-muted-foreground font-exo">Faculty members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedResourcesSection;