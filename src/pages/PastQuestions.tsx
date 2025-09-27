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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Download, Calendar, Upload, Search, Filter } from "lucide-react";

interface PastQuestion {
  id: string;
  title: string;
  subject: string;
  year: number;
  level?: number;
  description: string;
  file_url: string;
  created_at: string;
}

const PastQuestions = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<PastQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<PastQuestion[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

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
      const questionsData = data || [];
      setQuestions(questionsData);
      setFilteredQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by level
    if (selectedLevel !== "all") {
      const levelNum = parseInt(selectedLevel);
      filtered = filtered.filter(q => q.level === levelNum);
    }
    
    setFilteredQuestions(filtered);
  };

  useEffect(() => {
    filterQuestions();
  }, [searchTerm, selectedLevel, questions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "File Required",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('past-questions')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('past-questions')
        .getPublicUrl(fileName);

      // Insert into database
      const { error } = await supabase
        .from("past_questions")
        .insert({
          title,
          subject,
          year: parseInt(year),
          level: level ? parseInt(level) : null,
          description,
          file_url: publicUrl,
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
      setLevel("");
      setDescription("");
      setFile(null);
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

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search questions by title, subject, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="border-primary/30 focus:border-primary">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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

                <div className="grid md:grid-cols-3 gap-4">
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
                      Level 🎓
                    </label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="border-accent/30 focus:border-accent">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 Level</SelectItem>
                        <SelectItem value="200">200 Level</SelectItem>
                        <SelectItem value="300">300 Level</SelectItem>
                        <SelectItem value="400">400 Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Question File 📄
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
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

        {/* Past Questions by Level */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="100">100 Level</TabsTrigger>
            <TabsTrigger value="200">200 Level</TabsTrigger>
            <TabsTrigger value="300">300 Level</TabsTrigger>
            <TabsTrigger value="400">400 Level</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
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
                        {question.level && (
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                            {question.level} Level
                          </span>
                        )}
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
                    No Past Questions Found 📚
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria! 📖
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {[100, 200, 300, 400].map(levelNum => (
            <TabsContent key={levelNum} value={levelNum.toString()} className="space-y-6">
              {questions.filter(q => q.level === levelNum).length > 0 ? (
                questions
                  .filter(q => q.level === levelNum)
                  .filter(q => 
                    !searchTerm || 
                    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    q.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((question) => (
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
                              <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                                {levelNum} Level
                              </span>
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
                      No {levelNum} Level Questions Yet 📚
                    </h3>
                    <p className="text-muted-foreground">
                      Questions for {levelNum} level will appear here! 📖
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default PastQuestions;