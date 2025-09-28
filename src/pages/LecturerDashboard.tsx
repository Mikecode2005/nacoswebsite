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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Plus, Upload, Brain, FileText, Users, Trophy, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Material {
  id: string;
  title: string;
  description: string;
  file_url: string;
  subject: string;
  resource_type: string;
  created_at: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  created_at: string;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const LecturerDashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Material states
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [materialSubject, setMaterialSubject] = useState("");
  const [materialType, setMaterialType] = useState("pdf");
  const [materialUrl, setMaterialUrl] = useState("");
  const [uploadingMaterial, setUploadingMaterial] = useState(false);
  
  // Quiz states
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [creatingQuiz, setCreatingQuiz] = useState(false);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'lecturer')) {
      navigate("/auth");
    } else if (user && userRole === 'lecturer') {
      fetchMaterials();
      fetchQuizzes();
    }
  }, [user, userRole, loading, navigate]);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from("learning_resources")
        .select("*")
        .eq("uploaded_by", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("created_by", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuizzes((data || []).map(quiz => ({
        ...quiz,
        questions: Array.isArray(quiz.questions) ? quiz.questions as unknown as Question[] : []
      })));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleMaterialUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingMaterial(true);

    try {
      const { error } = await supabase
        .from("learning_resources")
        .insert({
          title: materialTitle,
          description: materialDescription,
          file_url: materialUrl,
          subject: materialSubject,
          resource_type: materialType,
          uploaded_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Material Uploaded! 📚",
        description: "Students can now access this learning resource.",
      });

      // Reset form
      setMaterialTitle("");
      setMaterialDescription("");
      setMaterialSubject("");
      setMaterialUrl("");
      setMaterialType("pdf");
      
      fetchMaterials();
    } catch (error: any) {
      toast({
        title: "Upload Failed 😞",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingMaterial(false);
    }
  };

  const addQuestion = () => {
    if (currentQuestion && currentOptions.every(opt => opt.trim())) {
      setQuestions([...questions, {
        question: currentQuestion,
        options: currentOptions.filter(opt => opt.trim()),
        correct: correctAnswer
      }]);
      
      // Reset question form
      setCurrentQuestion("");
      setCurrentOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuizCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) {
      toast({
        title: "No Questions Added",
        description: "Please add at least one question to create a quiz.",
        variant: "destructive",
      });
      return;
    }

    setCreatingQuiz(true);

    try {
      const { error } = await supabase
        .from("quizzes")
        .insert({
          title: quizTitle,
          description: quizDescription,
          questions: questions as any,
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Quiz Created! 🧠",
        description: "Students can now take this quiz.",
      });

      // Reset form
      setQuizTitle("");
      setQuizDescription("");
      setQuestions([]);
      
      fetchQuizzes();
    } catch (error: any) {
      toast({
        title: "Creation Failed 😞",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreatingQuiz(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-exo text-muted-foreground">Loading lecturer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-secondary/10 via-accent/10 to-primary/10 border-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center text-3xl text-secondary font-orbitron">
                <GraduationCap className="h-8 w-8 mr-3 text-hero-accent" />
                Lecturer Dashboard
              </CardTitle>
              <p className="text-muted-foreground font-exo text-lg">
                Welcome, <span className="font-semibold text-secondary font-rajdhani">{user?.email}</span>! 
                Manage your course materials and create engaging quizzes for your students. 📚
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary font-orbitron">{materials.length}</h3>
              <p className="text-muted-foreground font-exo">Materials Uploaded</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary font-orbitron">{quizzes.length}</h3>
              <p className="text-muted-foreground font-exo">Quizzes Created</p>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent font-orbitron">250+</h3>
              <p className="text-muted-foreground font-exo">Students Reached</p>
            </CardContent>
          </Card>
          
          <Card className="border-hero-accent/20 bg-gradient-to-br from-hero-accent/5 to-hero-accent/10">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-hero-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-hero-accent font-orbitron">4.8</h3>
              <p className="text-muted-foreground font-exo">Average Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="materials" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Materials</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Create Quizzes</span>
            </TabsTrigger>
          </TabsList>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            {/* Upload Form */}
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center text-secondary font-orbitron">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Learning Material
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMaterialUpload} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Material Title
                      </label>
                      <Input
                        value={materialTitle}
                        onChange={(e) => setMaterialTitle(e.target.value)}
                        placeholder="e.g., Data Structures Lecture Notes"
                        required
                        className="border-secondary/30 focus:border-secondary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Subject
                      </label>
                      <Input
                        value={materialSubject}
                        onChange={(e) => setMaterialSubject(e.target.value)}
                        placeholder="e.g., Computer Science"
                        required
                        className="border-secondary/30 focus:border-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Material Type
                      </label>
                      <Select value={materialType} onValueChange={setMaterialType}>
                        <SelectTrigger className="border-secondary/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">📄 PDF Document</SelectItem>
                          <SelectItem value="video">🎥 Video</SelectItem>
                          <SelectItem value="image">🖼️ Image</SelectItem>
                          <SelectItem value="link">🔗 External Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        File URL
                      </label>
                      <Input
                        value={materialUrl}
                        onChange={(e) => setMaterialUrl(e.target.value)}
                        placeholder="https://example.com/material.pdf"
                        required
                        className="border-secondary/30 focus:border-secondary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                      Description
                    </label>
                    <Textarea
                      value={materialDescription}
                      onChange={(e) => setMaterialDescription(e.target.value)}
                      placeholder="Describe the content and learning objectives..."
                      rows={4}
                      className="border-secondary/30 focus:border-secondary"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={uploadingMaterial}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-rajdhani"
                  >
                    {uploadingMaterial ? "Uploading..." : "Upload Material 🚀"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Materials List */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary font-orbitron">Your Uploaded Materials</CardTitle>
              </CardHeader>
              <CardContent>
                {materials.length > 0 ? (
                  <div className="space-y-4">
                    {materials.map((material) => (
                      <div key={material.id} className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-primary font-rajdhani">{material.title}</h4>
                            <p className="text-sm text-muted-foreground font-exo">{material.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                                {material.subject}
                              </span>
                               <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                {material.resource_type}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(material.file_url, '_blank')}
                            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-exo">No materials uploaded yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            {/* Quiz Creation Form */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center text-primary font-orbitron">
                  <Brain className="h-5 w-5 mr-2" />
                  Create New Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuizCreation} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Quiz Title
                      </label>
                      <Input
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        placeholder="e.g., Data Structures Quiz"
                        required
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Description
                      </label>
                      <Input
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        placeholder="Brief description of the quiz"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Question Builder */}
                  <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-primary font-rajdhani">Add Question</h4>
                    
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Question
                      </label>
                      <Textarea
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Enter your question here..."
                        rows={3}
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {currentOptions.map((option, index) => (
                        <div key={index}>
                          <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                            Option {index + 1} {index === correctAnswer && "✓ (Correct)"}
                          </label>
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...currentOptions];
                              newOptions[index] = e.target.value;
                              setCurrentOptions(newOptions);
                            }}
                            placeholder={`Option ${index + 1}`}
                            className="border-primary/30 focus:border-primary"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                        Correct Answer
                      </label>
                      <Select value={correctAnswer.toString()} onValueChange={(value) => setCorrectAnswer(parseInt(value))}>
                        <SelectTrigger className="border-primary/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Option 1</SelectItem>
                          <SelectItem value="1">Option 2</SelectItem>
                          <SelectItem value="2">Option 3</SelectItem>
                          <SelectItem value="3">Option 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="button"
                      onClick={addQuestion}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>

                  {/* Questions Preview */}
                  {questions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary font-rajdhani">Questions ({questions.length})</h4>
                      {questions.map((q, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border border-primary/20">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-primary font-rajdhani">Q{index + 1}: {q.question}</p>
                              <div className="mt-2 space-y-1">
                                {q.options.map((option, optIndex) => (
                                  <p key={optIndex} className={`text-sm ${optIndex === q.correct ? 'text-green-600 font-medium' : 'text-muted-foreground'} font-exo`}>
                                    {optIndex + 1}. {option} {optIndex === q.correct && "✓"}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeQuestion(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={creatingQuiz || questions.length === 0}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani"
                  >
                    {creatingQuiz ? "Creating..." : "Create Quiz 🚀"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quizzes List */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary font-orbitron">Your Created Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                {quizzes.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {quizzes.map((quiz) => (
                      <div key={quiz.id} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-primary font-rajdhani">{quiz.title}</h4>
                        <p className="text-sm text-muted-foreground font-exo">{quiz.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            {quiz.questions?.length || 0} Questions
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(quiz.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-exo">No quizzes created yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default LecturerDashboard;