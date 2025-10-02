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
import { BookOpen, Plus, ExternalLink, Search, Filter, Trash2, Upload } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LearningResource {
  id: string;
  title: string;
  subject: string;
  description: string;
  file_url: string;
  resource_type: string;
  level?: number;
  created_at: string;
}

const Resources = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [resourceType, setResourceType] = useState("pdf");
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("learning_resources")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      const resourcesData = data || [];
      setResources(resourcesData);
      setFilteredResources(resourcesData);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const filterResources = () => {
    let filtered = resources;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by level
    if (selectedLevel !== "all") {
      const levelNum = parseInt(selectedLevel);
      filtered = filtered.filter(r => r.level === levelNum);
    }
    
    setFilteredResources(filtered);
  };

  useEffect(() => {
    filterResources();
  }, [searchTerm, selectedLevel, resources]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!googleDriveLink) {
      toast({
        title: "Link Required",
        description: "Please provide a Google Drive link.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("learning_resources")
        .insert({
          title,
          subject,
          level: level ? parseInt(level) : null,
          description,
          file_url: googleDriveLink,
          resource_type: resourceType,
          uploaded_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Resource Added! 📚",
        description: "Students can now access this learning resource.",
      });

      setTitle("");
      setSubject("");
      setLevel("");
      setDescription("");
      setGoogleDriveLink("");
      setResourceType("pdf");
      setIsUploading(false);
      fetchResources();
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

  const handleDelete = async () => {
    if (!resourceToDelete) return;

    try {
      const { error } = await supabase
        .from("learning_resources")
        .delete()
        .eq("id", resourceToDelete);

      if (error) throw error;

      toast({
        title: "Resource Deleted! 🗑️",
        description: "Learning resource has been removed successfully.",
      });

      fetchResources();
      setDeleteDialogOpen(false);
      setResourceToDelete(null);
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
            Learning Resources 📚
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access study materials, lecture notes, and learning resources! 📖
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search resources by title, subject, or description..."
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
        {user && userRole === 'admin' && !isUploading && (
          <div className="text-center mb-12">
            <Button
              onClick={() => setIsUploading(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Learning Resource 📤
            </Button>
          </div>
        )}

        {/* Upload Form (Admin Only) */}
        {isUploading && userRole === 'admin' && (
          <Card className="mb-12 border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center text-accent">
                <Upload className="h-5 w-5 mr-2" />
                Add New Learning Resource 📋
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Resource Title 📝
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Introduction to Data Structures"
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
                      placeholder="e.g., Computer Science"
                      required
                      className="border-accent/30 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
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
                      Resource Type 📄
                    </label>
                    <Select value={resourceType} onValueChange={setResourceType}>
                      <SelectTrigger className="border-accent/30 focus:border-accent">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="slides">Presentation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Google Drive Link 🔗
                    </label>
                    <Input
                      type="url"
                      value={googleDriveLink}
                      onChange={(e) => setGoogleDriveLink(e.target.value)}
                      placeholder="https://drive.google.com/..."
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
                    placeholder="Brief description of this learning resource..."
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
                    {submitting ? "Adding..." : "Add Resource 🚀"}
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

        {/* Resources by Level */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all">
              <span className="sm:hidden">All</span>
              <span className="hidden sm:inline">All Resources</span>
            </TabsTrigger>
            <TabsTrigger value="100">
              <span className="sm:hidden">100</span>
              <span className="hidden sm:inline">100 Level</span>
            </TabsTrigger>
            <TabsTrigger value="200">
              <span className="sm:hidden">200</span>
              <span className="hidden sm:inline">200 Level</span>
            </TabsTrigger>
            <TabsTrigger value="300">
              <span className="sm:hidden">300</span>
              <span className="hidden sm:inline">300 Level</span>
            </TabsTrigger>
            <TabsTrigger value="400">
              <span className="sm:hidden">400</span>
              <span className="hidden sm:inline">400 Level</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
              <Card key={resource.id} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-primary mb-2">
                        {resource.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded">
                          {resource.subject}
                        </span>
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">
                          {resource.resource_type}
                        </span>
                        {resource.level && (
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                            {resource.level} Level
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {resource.file_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(resource.file_url, '_blank')}
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                      )}
                      {userRole === 'admin' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setResourceToDelete(resource.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {resource.description && (
                  <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardContent>
                )}
              </Card>
              ))
            ) : (
              <Card className="text-center py-12 border-primary/20">
                <CardContent>
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    No Resources Found 📚
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
              {resources.filter(r => r.level === levelNum).length > 0 ? (
                resources
                  .filter(r => r.level === levelNum)
                  .filter(r => 
                    !searchTerm || 
                    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((resource) => (
                    <Card key={resource.id} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-primary mb-2">
                              {resource.title}
                            </CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="bg-accent/20 text-accent px-2 py-1 rounded">
                                {resource.subject}
                              </span>
                              <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">
                                {resource.resource_type}
                              </span>
                              {resource.level && (
                                <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                                  {resource.level} Level
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {resource.file_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(resource.file_url, '_blank')}
                                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open
                              </Button>
                            )}
                            {userRole === 'admin' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setResourceToDelete(resource.id);
                                  setDeleteDialogOpen(true);
                                }}
                                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      {resource.description && (
                        <CardContent>
                          <p className="text-muted-foreground">{resource.description}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))
              ) : (
                <Card className="text-center py-12 border-primary/20">
                  <CardContent>
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      No Resources Found for {levelNum} Level 📚
                    </h3>
                    <p className="text-muted-foreground">
                      Check back soon for new learning materials! 📖
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Learning Resource?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the learning resource from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setResourceToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Resources;
