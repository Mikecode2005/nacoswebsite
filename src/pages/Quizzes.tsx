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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Brain, Plus, Play, Trophy, Clock, X, Check, Edit } from "lucide-react";
import { motion } from "framer-motion";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  created_at: string;
}

interface Question {
  id?: string;
  question: string;
  options: string[];
  correct: number;
  type: 'multiple-choice' | 'true-false';
}

const Quizzes = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    type: 'multiple-choice'
  });
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

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question before adding.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion.type === 'multiple-choice') {
      const validOptions = currentQuestion.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        toast({
          title: "Options Required",
          description: "Please provide at least 2 options for multiple choice questions.",
          variant: "destructive",
        });
        return;
      }
    }

    const newQuestion = {
      ...currentQuestion,
      id: Date.now().toString(),
      options: currentQuestion.type === 'true-false' ? ['True', 'False'] : currentQuestion.options.filter(opt => opt.trim())
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correct: 0,
      type: 'multiple-choice'
    });

    toast({
      title: "Question Added! ✅",
      description: "Question has been added to your quiz.",
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please add at least one question to create a quiz.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("quizzes")
        .insert({
          title,
          description,
          questions: questions,
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Quiz Created! 🧠",
        description: "Students can now take this quiz.",
      });

      setTitle("");
      setDescription("");
      setQuestions([]);
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
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4 font-orbitron">
            Interactive Quizzes 🧠
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Challenge yourself with programming quizzes and test your coding knowledge!
          </p>
        </motion.div>

        {/* Create Quiz Button */}
        {user && (userRole === 'admin' || userRole === 'lecturer' || userRole === 'superadmin') && !isCreating && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Quiz ✨
            </Button>
          </motion.div>
        )}

        {/* Google Forms-like Quiz Creator */}
        {isCreating && (userRole === 'admin' || userRole === 'lecturer' || userRole === 'superadmin') && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center text-2xl font-orbitron">
                  <Edit className="h-6 w-6 mr-2" />
                  Create New Quiz
                </CardTitle>
                <p className="text-primary-foreground/80 font-exo">
                  Build engaging quizzes with multiple choice questions
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Quiz Details */}
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                        Quiz Title *
                      </Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., JavaScript Fundamentals Quiz"
                        required
                        className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                        Description
                      </Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what this quiz covers..."
                        rows={3}
                        className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Question Builder */}
                  <div className="bg-background/50 rounded-xl p-6 border border-primary/20">
                    <h3 className="text-xl font-bold text-primary mb-6 font-rajdhani">Add Question</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                          Question *
                        </Label>
                        <Textarea
                          value={currentQuestion.question}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                          placeholder="Enter your question here..."
                          rows={3}
                          className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                        />
                      </div>

                      <div>
                        <Label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                          Question Type
                        </Label>
                        <RadioGroup 
                          value={currentQuestion.type} 
                          onValueChange={(value: 'multiple-choice' | 'true-false') => 
                            setCurrentQuestion({
                              ...currentQuestion, 
                              type: value,
                              options: value === 'true-false' ? ['True', 'False'] : ["", "", "", ""],
                              correct: 0
                            })
                          }
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                            <Label htmlFor="multiple-choice" className="font-exo">Multiple Choice</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true-false" id="true-false" />
                            <Label htmlFor="true-false" className="font-exo">True/False</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Options */}
                      {currentQuestion.type === 'multiple-choice' && (
                        <div>
                          <Label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                            Answer Options *
                          </Label>
                          <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <RadioGroup 
                                  value={currentQuestion.correct.toString()} 
                                  onValueChange={(value) => setCurrentQuestion({...currentQuestion, correct: parseInt(value)})}
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`} className="sr-only">Correct answer</Label>
                                  </div>
                                </RadioGroup>
                                <Input
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...currentQuestion.options];
                                    newOptions[index] = e.target.value;
                                    setCurrentQuestion({...currentQuestion, options: newOptions});
                                  }}
                                  placeholder={`Option ${index + 1}`}
                                  className="flex-1 p-3 border-primary/30 focus:border-primary rounded-lg"
                                />
                                {currentQuestion.correct === index && (
                                  <Check className="h-5 w-5 text-green-500" />
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 font-exo">
                            Select the radio button next to the correct answer
                          </p>
                        </div>
                      )}

                      {currentQuestion.type === 'true-false' && (
                        <div>
                          <Label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                            Correct Answer
                          </Label>
                          <RadioGroup 
                            value={currentQuestion.correct.toString()} 
                            onValueChange={(value) => setCurrentQuestion({...currentQuestion, correct: parseInt(value)})}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="0" id="true" />
                              <Label htmlFor="true" className="font-exo">True</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="false" />
                              <Label htmlFor="false" className="font-exo">False</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      <Button
                        type="button"
                        onClick={addQuestion}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-rajdhani"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  </div>

                  {/* Questions Preview */}
                  {questions.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-primary font-rajdhani">
                        Questions ({questions.length})
                      </h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {questions.map((q, index) => (
                          <Card key={q.id} className="border-accent/20 bg-accent/5">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-primary font-rajdhani mb-2">
                                    Q{index + 1}: {q.question}
                                  </h4>
                                  <div className="space-y-1">
                                    {q.options.map((option, optIndex) => (
                                      <div key={optIndex} className={`text-sm p-2 rounded ${
                                        optIndex === q.correct 
                                          ? 'bg-green-100 text-green-800 font-medium' 
                                          : 'text-muted-foreground'
                                      }`}>
                                        {optIndex === q.correct && <Check className="h-4 w-4 inline mr-1" />}
                                        {String.fromCharCode(65 + optIndex)}. {option}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeQuestion(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-6 border-t border-primary/20">
                    <Button
                      type="submit"
                      disabled={submitting || questions.length === 0}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani text-lg px-8 py-3"
                    >
                      {submitting ? "Creating..." : "Create Quiz 🚀"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreating(false)}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-rajdhani text-lg px-8 py-3"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quizzes List */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {quizzes.length > 0 ? (
            quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary mb-2 font-rajdhani group-hover:text-accent transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground space-x-3">
                      <div className="flex items-center">
                        <Brain className="h-4 w-4 mr-1" />
                        {quiz.questions?.length || 0} Questions
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        ~{Math.max(5, (quiz.questions?.length || 0) * 2)} min
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 font-exo">
                      {quiz.description || "Test your programming knowledge with this interactive quiz!"}
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani group-hover:scale-105 transition-transform duration-300"
                      onClick={() => {
                        toast({
                          title: "Quiz Feature Coming Soon! 🚧",
                          description: "Interactive quiz taking will be available in the next update!",
                        });
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz 🎯
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="text-center py-12 border-primary/20">
                <CardContent>
                  <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2 font-rajdhani">
                    No Quizzes Yet 🧠
                  </h3>
                  <p className="text-muted-foreground font-exo">
                    Exciting coding challenges coming soon!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>

        {/* Featured Stats */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="text-center border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary font-orbitron">500+</h3>
              <p className="text-muted-foreground font-exo">Quiz Attempts</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent font-orbitron">{quizzes.length}</h3>
              <p className="text-muted-foreground font-exo">Available Quizzes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary font-orbitron">85%</h3>
              <p className="text-muted-foreground font-exo">Average Score</p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Quizzes;