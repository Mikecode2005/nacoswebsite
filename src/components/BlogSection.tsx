import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 bg-section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-12">Blog</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="aspect-video bg-primary/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-12 bg-primary/30 rounded mx-auto mb-2"></div>
                    <div className="text-xs text-primary/60">Website Template</div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Crafting Modern Website Templates
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
                Learn how to create modern, responsive website templates using the latest web technologies and design principles.
              </p>
              <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="aspect-video bg-primary/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-16 bg-accent/30 rounded mx-auto mb-2"></div>
                    <div className="text-xs text-primary/60">Programming</div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Introduction to Data Structures
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
                A comprehensive guide to understanding fundamental data structures and their applications in computer science.
              </p>
              <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="aspect-video bg-primary/10 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-secondary/30 rounded-full mx-auto mb-2"></div>
                    <div className="text-xs text-primary/60">Algorithm</div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Machine Learning Basics
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
                Get started with machine learning concepts and discover how AI is transforming the technology landscape.
              </p>
              <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;