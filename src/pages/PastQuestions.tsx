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
import { BookOpen, Plus, Download, Calendar, Upload } from "lucide-react";

interface PastQuestion {
  id: string;
  title: string;
  subject: string;
  year: number;
  description: string;
  file_url: string;
  created_at: string;
}

const PastQuestions = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<PastQuestion[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("past_questions")
        .select("*")
        .order("year", { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("past_questions")
        .insert({
          title,
          subject,
          year: parseInt(year),
          description,
          file_url: fileUrl,
          uploaded_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Past Question Uploaded! 📚",
        description: "Students can now access this resource.",
      });

      setTitle("");
      setSubject("");
      setYear("");
      setDescription("");
      setFileUrl("");
      setIsUploading(false);
      fetchQuestions();
    } catch (error: any) {
      toast({
        title: "Upload Failed 😞",
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
            Past Questions 📚
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access previous exam materials and practice questions to ace your studies! 🎯
          </p>
        </div>

        {/* Upload Button (Admin Only) */}
        {user && (userRole === 'admin' || userRole === 'lecturer') && !isUploading && (
          <div className="text-center mb-12">
            <Button
              onClick={() => setIsUploading(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Upload Past Question 📤
            </Button>
          </div>
        )}

        {/* Upload Form (Admin Only) */}
        {isUploading && (userRole === 'admin' || userRole === 'lecturer') && (
          <Card className="mb-12 border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center text-accent">
                <Upload className="h-5 w-5 mr-2" />
                Upload New Past Question 📋
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Question Title 📝
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Computer Science Final Exam"
                      required
                      className="border-accent/30 focus:border-accent"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Subject 📖
                    </label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Data Structures"
                      required
                      className="border-accent/30 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Year 📅
                    </label>
                    <Input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                      required
                      className="border-accent/30 focus:border-accent"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      File URL 🔗
                    </label>
                    <Input
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="https://example.com/question.pdf"
                      required
                      className="border-accent/30 focus:border-accent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Description 📄
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Additional details about this past question..."
                    rows={4}
                    className="border-accent/30 focus:border-accent"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {submitting ? "Uploading..." : "Upload Question 🚀"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsUploading(false)}
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Past Questions List */}
        <div className="grid gap-6">
          {questions.length > 0 ? (
            questions.map((question) => (
              <Card key={question.id} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-primary mb-2">
                        {question.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded">
                          {question.subject}
                        </span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {question.year}
                        </div>
                      </div>
                    </div>
                    {question.file_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(question.file_url, '_blank')}
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </CardHeader>
                {question.description && (
                  <CardContent>
                    <p className="text-muted-foreground">{question.description}</p>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <Card className="text-center py-12 border-primary/20">
              <CardContent>
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  No Past Questions Yet 📚
                </h3>
                <p className="text-muted-foreground">
                  Past questions will appear here soon! 📖
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

export default PastQuestions;