import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdCarousel from "@/components/AdCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Plus, Calendar, User, Edit3, Settings, Trash2, 
  Heart, MessageCircle, Share2, Send, X, Sparkles, Search, ArrowRight
} from "lucide-react";
import ProfileEdit from "@/components/ProfileEdit";

interface BlogComment {
  id: string;
  blog_post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    display_name: string | null;
  } | null;
}

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
  likes_count: number;
  user_has_liked: boolean;
  comments: BlogComment[];
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
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showCommentsFor, setShowCommentsFor] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      const authorIds = postsData?.map(post => post.author_id) || [];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", authorIds);

      const postIds = postsData?.map(post => post.id) || [];
      const { data: likesData } = await supabase
        .from("blog_likes")
        .select("blog_post_id, user_id")
        .in("blog_post_id", postIds);

      const { data: commentsData } = await supabase
        .from("blog_comments")
        .select("*")
        .in("blog_post_id", postIds)
        .order("created_at", { ascending: true });

      const commentAuthorIds = commentsData?.map(c => c.user_id) || [];
      const { data: commentProfilesData } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", commentAuthorIds);

      const postsWithDetails = postsData?.map(post => {
        const postLikes = likesData?.filter(l => l.blog_post_id === post.id) || [];
        const postComments = commentsData?.filter(c => c.blog_post_id === post.id) || [];
        
        return {
          ...post,
          profiles: profilesData?.find(p => p.user_id === post.author_id) || null,
          likes_count: postLikes.length,
          user_has_liked: user ? postLikes.some(l => l.user_id === user.id) : false,
          comments: postComments.map(comment => ({
            ...comment,
            profiles: commentProfilesData?.find(p => p.user_id === comment.user_id) || null
          }))
        };
      }) || [];

      setPosts(postsWithDetails);
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

  const toggleShowComments = (postId: string) => {
    const newShow = new Set(showCommentsFor);
    if (newShow.has(postId)) {
      newShow.delete(postId);
    } else {
      newShow.add(postId);
    }
    setShowCommentsFor(newShow);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      return;
    }
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
        title: "Blog Post Published! ",
        description: "Your tech insights are now live!",
      });

      setTitle("");
      setContent("");
      setIsWriting(false);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Failed to Publish ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (postId: string, authorId: string) => {
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
        title: "Post Deleted! ",
        description: "The blog post has been removed.",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Delete Failed ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like posts.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.user_has_liked) {
        await supabase
          .from("blog_likes")
          .delete()
          .eq("blog_post_id", postId)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("blog_likes")
          .insert({
            blog_post_id: postId,
            user_id: user.id
          });
      }
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to comment.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!commentContent.trim()) return;

    setSubmittingComment(true);
    try {
      const { error } = await supabase
        .from("blog_comments")
        .insert({
          blog_post_id: postId,
          user_id: user.id,
          content: commentContent.trim()
        });

      if (error) throw error;

      toast({
        title: "Comment Added!",
        description: "Your comment has been posted.",
      });

      setCommentContent("");
      setCommentingPostId(null);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Failed to Comment",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string, commentUserId: string) => {
    if (user?.id !== commentUserId && userRole !== 'admin' && userRole !== 'superadmin') {
      toast({
        title: "Unauthorized",
        description: "You can only delete your own comments.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      toast({
        title: "Comment Deleted",
        description: "Your comment has been removed.",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleShare = async (post: BlogPost) => {
    const shareUrl = `${window.location.origin}/blog`;
    const shareText = `Check out this blog post: "${post.title}" on NACOS Blog`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Share cancelled or failed");
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: "Link Copied!",
        description: "Blog link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Ad Carousel */}
        <AdCarousel />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-accent font-rajdhani font-semibold text-sm uppercase tracking-wider">Community Insights</span>
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4">
            Tech Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Share your coding adventures, tech discoveries, and programming wisdom with the NACOS community! 🚀
          </p>
        </motion.div>

        {/* Action Buttons */}
        {user && !isWriting && !isEditingProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12 space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => setIsWriting(true)}
                className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground w-full sm:w-auto"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Write a New Post
              </Button>
              <Button
                onClick={() => setIsEditingProfile(true)}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
                size="lg"
              >
                <Settings className="h-5 w-5 mr-2" />
                Update Profile
              </Button>
            </div>
          </motion.div>
        )}

        {/* Login prompt */}
        {!user && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <Card className="inline-block border-accent/20 bg-gradient-to-br from-accent/10 to-primary/5 p-8">
              <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground mb-4 font-exo">
                Want to write a blog post or engage with the community?
              </p>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground"
              >
                Login to Contribute
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Profile Edit Form */}
        {isEditingProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <ProfileEdit onClose={() => setIsEditingProfile(false)} />
          </motion.div>
        )}

        {/* Write Post Form */}
        <AnimatePresence>
          {isWriting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Edit3 className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-orbitron font-bold text-primary">Share Your Tech Story</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block">
                        Post Title
                      </label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., My Journey Learning React Hooks 🎣"
                        required
                        className="border-accent/30 focus:border-accent bg-background/50"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block">
                        Your Content
                      </label>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your experiences, tutorials, code snippets, or tech insights..."
                        rows={8}
                        required
                        className="border-accent/30 focus:border-accent bg-background/50"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground w-full sm:w-auto"
                      >
                        {submitting ? "Publishing..." : "Publish Post 🚀"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsWriting(false)}
                        className="border-accent/30 text-primary hover:bg-accent/10 w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Posts */}
        <div className="grid gap-6 md:gap-8 max-w-3xl mx-auto">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-gradient-to-br from-card to-accent/5 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Top Accent */}
                  <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                  
                  <CardContent className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {post.profiles?.display_name || "Anonymous User"}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {user && (user.id === post.author_id || userRole === 'admin' || userRole === 'superadmin') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id, post.author_id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-orbitron font-bold text-primary mb-3 hover:text-accent transition-colors cursor-pointer">
                      {post.title}
                    </h2>

                    {/* Content */}
                    <p className="text-muted-foreground font-exo leading-relaxed whitespace-pre-wrap mb-4">
                      {expandedPosts.has(post.id) || post.content.length <= 300
                        ? post.content
                        : `${post.content.substring(0, 300)}...`}
                    </p>
                    
                    {post.content.length > 300 && (
                      <Button
                        variant="link"
                        className="text-accent hover:text-accent/80 p-0 h-auto mb-4"
                        onClick={() => toggleExpandPost(post.id)}
                      >
                        {expandedPosts.has(post.id) ? "Show Less" : "Read More"}
                      </Button>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 ${post.user_has_liked ? 'text-red-500' : 'text-muted-foreground'}`}
                      >
                        <Heart className={`h-5 w-5 ${post.user_has_liked ? 'fill-current' : ''}`} />
                        <span>{post.likes_count}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleShowComments(post.id)}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post)}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Share2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Share</span>
                      </Button>
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {showCommentsFor.has(post.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-border/30"
                        >
                          <h4 className="font-semibold text-primary mb-4">
                            Comments ({post.comments.length})
                          </h4>

                          {/* Comment Input */}
                          {user ? (
                            <div className="flex gap-2 mb-4">
                              <Input
                                placeholder="Write a comment..."
                                value={commentingPostId === post.id ? commentContent : ""}
                                onChange={(e) => {
                                  setCommentingPostId(post.id);
                                  setCommentContent(e.target.value);
                                }}
                                onFocus={() => setCommentingPostId(post.id)}
                                className="flex-1 border-border/50"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleAddComment(post.id)}
                                disabled={submittingComment || !commentContent.trim()}
                                className="bg-accent hover:bg-accent/90"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground mb-4">
                              <Button variant="link" onClick={() => navigate("/auth")} className="p-0 h-auto text-accent">
                                Login
                              </Button>
                              {" "}to leave a comment.
                            </p>
                          )}

                          {/* Comments List */}
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {post.comments.length > 0 ? (
                              post.comments.map((comment) => (
                                <div key={comment.id} className="bg-background/50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="font-medium text-primary">
                                          {comment.profiles?.display_name || "Anonymous"}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                          {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {comment.content}
                                      </p>
                                    </div>
                                    {user && (user.id === comment.user_id || userRole === 'admin' || userRole === 'superadmin') && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteComment(comment.id, comment.user_id)}
                                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No comments yet. Be the first to comment!
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="text-center py-16 border-accent/20 bg-gradient-to-br from-card to-accent/5">
              <CardContent>
                <BookOpen className="h-20 w-20 text-accent/30 mx-auto mb-6" />
                <h3 className="text-2xl font-orbitron font-bold text-primary mb-3">
                  No Posts Yet
                </h3>
                <p className="text-muted-foreground font-exo max-w-md mx-auto">
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
