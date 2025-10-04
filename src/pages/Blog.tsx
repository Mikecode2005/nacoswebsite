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
import { BookOpen, Plus, Calendar, User, Edit3, Settings, Trash2 } from "lucide-react";
import ProfileEdit from "@/components/ProfileEdit";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: string;
  created_at: string;
  profiles?: {
    display_name: string | null;
  } | null;
}

const Blog = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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
      // First get all blog posts
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Then get all profiles for the authors
      const authorIds = postsData?.map(post => post.author_id) || [];
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", authorIds);

      if (profilesError) throw profilesError;

      // Combine the data
      const postsWithProfiles = postsData?.map(post => ({
        ...post,
        profiles: profilesData?.find(profile => profile.user_id === post.author_id) || null
      })) || [];

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleExpandPost = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
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

  const handleDelete = async (postId: string, authorId: string) => {
    // Check if user is admin or the author
    if (user?.id !== authorId && userRole !== 'admin' && userRole !== 'superadmin') {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to delete this post.",
        variant: "destructive",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      toast({
        title: "Post Deleted! 🗑️",
        description: "The blog post has been removed.",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Delete Failed 😞",
        description: error.message,
        variant: "destructive",
      });
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

        {/* Action Buttons */}
        {user && !isWriting && !isEditingProfile && (
          <div className="text-center mb-12 space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => setIsWriting(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Write a New Post ✨
              </Button>
              <Button
                onClick={() => setIsEditingProfile(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
                size="lg"
              >
                <Settings className="h-5 w-5 mr-2" />
                Update Profile 👤
              </Button>
            </div>
          </div>
        )}

        {/* Profile Edit Form */}
        {isEditingProfile && (
          <div className="mb-12">
            <ProfileEdit onClose={() => setIsEditingProfile(false)} />
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
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                  >
                    {submitting ? "Publishing..." : "Publish Post 🚀"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsWriting(false)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
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
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary hover:text-accent transition-colors">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4 mt-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.profiles?.display_name || "Anonymous User"}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {user && (user.id === post.author_id || userRole === 'admin' || userRole === 'superadmin') && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(post.id, post.author_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {expandedPosts.has(post.id) || post.content.length <= 300
                      ? post.content
                      : `${post.content.substring(0, 300)}...`}
                  </p>
                  {post.content.length > 300 && (
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary/80 p-0 h-auto mt-2"
                      onClick={() => toggleExpandPost(post.id)}
                    >
                      {expandedPosts.has(post.id) ? "Show Less" : "Read More"}
                    </Button>
                  )}
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