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
import { 
  BookOpen, Plus, Calendar, User, Edit3, Settings, Trash2, 
  Heart, MessageCircle, Share2, Send, X 
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
      // Get all blog posts
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Get all profiles for the authors
      const authorIds = postsData?.map(post => post.author_id) || [];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", authorIds);

      // Get likes count for each post
      const postIds = postsData?.map(post => post.id) || [];
      const { data: likesData } = await supabase
        .from("blog_likes")
        .select("blog_post_id, user_id")
        .in("blog_post_id", postIds);

      // Get comments for each post
      const { data: commentsData } = await supabase
        .from("blog_comments")
        .select("*")
        .in("blog_post_id", postIds)
        .order("created_at", { ascending: true });

      // Get profiles for comment authors
      const commentAuthorIds = commentsData?.map(c => c.user_id) || [];
      const { data: commentProfilesData } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", commentAuthorIds);

      // Combine data
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
        // Unlike
        await supabase
          .from("blog_likes")
          .delete()
          .eq("blog_post_id", postId)
          .eq("user_id", user.id);
      } else {
        // Like
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
        title: "Comment Added! 💬",
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
        // User cancelled or error occurred
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: "Link Copied! 📋",
        description: "Blog link copied to clipboard.",
      });
    }
  };

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

        {/* Login prompt for non-authenticated users */}
        {!user && !loading && (
          <div className="text-center mb-12">
            <Card className="inline-block border-primary/20 bg-primary/5 p-6">
              <p className="text-muted-foreground mb-4">
                Want to write a blog post or engage with the community?
              </p>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Login to Contribute 🔐
              </Button>
            </Card>
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

                  {/* Like, Comment, Share Actions */}
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-primary/10">
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
                  {showCommentsFor.has(post.id) && (
                    <div className="mt-4 pt-4 border-t border-primary/10">
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
                            className="flex-1 border-primary/30"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            disabled={submittingComment || !commentContent.trim()}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground mb-4">
                          <Button variant="link" onClick={() => navigate("/auth")} className="p-0 h-auto">
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
                    </div>
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