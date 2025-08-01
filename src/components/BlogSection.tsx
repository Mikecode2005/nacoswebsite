import { Calendar, User, ArrowRight, FileText, Code, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-orbitron mb-4 text-primary">
            Latest Blog Posts
          </h2>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Stay updated with the latest insights, tutorials, and tech trends from our community
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-12 bg-primary/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-xs text-primary/70 font-exo">React Tutorial</div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Advanced React Patterns & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Michael Ogurmola
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  April 2024
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Explore advanced React patterns, hooks, and performance optimization techniques for building scalable applications.
              </p>
              <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-16 bg-accent/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Code className="h-8 w-8 text-accent" />
                    </div>
                    <div className="text-xs text-accent/70 font-exo">ML Guide</div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Machine Learning with Python
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Sarah Johnson
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  March 2024
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Dive into machine learning algorithms and implement them using Python libraries like scikit-learn and TensorFlow.
              </p>
              <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="aspect-video bg-gradient-to-br from-secondary/10 to-hero-accent/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-secondary/40 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-secondary" />
                    </div>
                    <div className="text-xs text-secondary/70 font-exo">Security</div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Cybersecurity Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  David Chen
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  February 2024
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Learn essential cybersecurity concepts, threat detection, and how to protect systems from cyber attacks.
              </p>
              <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/blog">
              View All Blog Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;