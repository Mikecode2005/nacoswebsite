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
import { Brain, Plus, Play, Trophy, Clock } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: any;
  created_at: string;
}

const Quizzes = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("quizzes")
        .insert({
          title,
          description,
          questions: [
            {
              question: "What does HTML stand for?",
              options: ["Hypertext Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
              correct: 0
            },
            {
              question: "Which programming language is known as the 'language of the web'?",
              options: ["Python", "JavaScript", "Java"],
              correct: 1
            }
          ],
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Quiz Created! 🧠",
        description: "Students can now test their knowledge!",
      });

      setTitle("");
      setDescription("");
      setIsCreating(false);
      fetchQuizzes();
    } catch (error: any) {
      toast({
        title: "Creation Failed 😞",
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
            Tech Quizzes 🧠
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with programming quizzes and test your coding knowledge! 🚀
          </p>
        </div>

        {/* Create Quiz Button (Admin Only) */}
        {user && userRole === 'admin' && !isCreating && (
          <div className="text-center mb-12">
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Quiz ✨
            </Button>
          </div>
        )}

        {/* Create Quiz Form (Admin Only) */}
        {isCreating && userRole === 'admin' && (
          <Card className="mb-12 border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-secondary">
                <Brain className="h-5 w-5 mr-2" />
                Create New Quiz 🎯
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Quiz Title 📝
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., JavaScript Fundamentals Quiz"
                    required
                    className="border-secondary/30 focus:border-secondary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Description 📖
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this quiz covers..."
                    rows={4}
                    className="border-secondary/30 focus:border-secondary"
                  />
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    📝 Note: This creates a sample quiz with demo questions. 
                    In a full implementation, you'd add a question builder interface here!
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    {submitting ? "Creating..." : "Create Quiz 🚀"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Quizzes List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Card key={quiz.id} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-primary mb-2">
                    {quiz.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground space-x-3">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-1" />
                      {quiz.questions?.length || 0} Questions
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      ~10 min
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {quiz.description || "Test your programming knowledge!"}
                  </p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      toast({
                        title: "Coming Soon! 🚧",
                        description: "Quiz functionality will be enhanced in future updates!",
                      });
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz 🎯
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="text-center py-12 border-primary/20">
                <CardContent>
                  <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    No Quizzes Yet 🧠
                  </h3>
                  <p className="text-muted-foreground">
                    Exciting coding challenges coming soon! 🚀
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Featured Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">500+</h3>
              <p className="text-muted-foreground">Quiz Attempts 🏆</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent">{quizzes.length}</h3>
              <p className="text-muted-foreground">Available Quizzes 🧠</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary">85%</h3>
              <p className="text-muted-foreground">Average Score 📊</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quizzes;