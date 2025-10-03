import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const getIcon = (index: number) => {
    const icons = [BookOpen, Code, Lightbulb];
    const Icon = icons[index % icons.length];
    return <Icon className="h-6 w-6 text-primary" />;
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.length > 0 ? blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(index)}
                  </div>
                  <CardTitle className="font-orbitron text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <span className="font-rajdhani">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-exo mb-6 leading-relaxed line-clamp-3">
                    {truncateContent(post.content)}
                  </p>
                  <Button 
                    asChild
                    variant="ghost" 
                    className="w-full group/btn hover:bg-primary/10 transition-colors duration-300"
                  >
                    <Link to="/blog">
                      <span className="font-rajdhani font-medium">Read More</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )) : (
            <div className="col-span-full">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground font-exo">No blog posts available at the moment.</p>
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
