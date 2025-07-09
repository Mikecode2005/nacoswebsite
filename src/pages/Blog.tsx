import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Plus, Calendar, User, Edit3 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: string;
  created_at: string;
}

const Blog = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("blog_posts")
        .insert({
          title,
          content,
          author_id: user?.id,
          status: "published",
        });

      if (error) throw error;

      toast({
        title: "Blog Post Published! 🎉",
        description: "Your tech insights are now live!",
      });

      setTitle("");
      setContent("");
      setIsWriting(false);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Failed to Publish 😞",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Tech Blog 📝
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your coding adventures, tech discoveries, and programming wisdom with the NACOS community! 🚀
          </p>
        </div>

        {/* Write Post Button */}
        {user && !isWriting && (
          <div className="text-center mb-12">
            <Button
              onClick={() => setIsWriting(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Write a New Post ✨
            </Button>
          </div>
        )}

        {/* Write Post Form */}
        {isWriting && (
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Edit3 className="h-5 w-5 mr-2" />
                Share Your Tech Story 🎯
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Post Title 📰
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., My Journey Learning React Hooks 🎣"
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Your Content 📖
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your experiences, tutorials, code snippets, or tech insights..."
                    rows={8}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {submitting ? "Publishing..." : "Publish Post 🚀"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsWriting(false)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts */}
        <div className="grid gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-primary hover:text-accent transition-colors">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Anonymous User
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {post.content.substring(0, 300)}
                    {post.content.length > 300 && "..."}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12 border-primary/20">
              <CardContent>
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  No Posts Yet 📝
                </h3>
                <p className="text-muted-foreground">
                  Be the first to share your tech journey with the community! 🌟
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;