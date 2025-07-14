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
import { MessageSquare, AlertTriangle, Lightbulb, Send } from "lucide-react";

interface Complaint {
  id: string;
  subject: string;
  message: string;
  type: string;
  status: string;
  created_at: string;
}

const Complaints = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("suggestion");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchComplaints();
    }
  }, [user, loading, navigate]);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("complaints")
        .insert({
          subject,
          message,
          type,
          user_id: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Submitted Successfully! 📝",
        description: "Your feedback has been received and will be reviewed.",
      });

      setSubject("");
      setMessage("");
      setType("suggestion");
      fetchComplaints();
    } catch (error: any) {
      toast({
        title: "Submission Failed 😞",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "report":
        return <MessageSquare className="h-5 w-5 text-warning" />;
      default:
        return <Lightbulb className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-600 bg-green-50";
      case "in_progress":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-orange-600 bg-orange-50";
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-orbitron">
            Feedback & Suggestions 💬
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Your voice matters! Share your thoughts, suggestions, or report any issues to help us improve.
          </p>
        </div>

        {/* Submission Form */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center text-primary font-orbitron">
              <Send className="h-5 w-5 mr-2" />
              Submit Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                    Type of Feedback
                  </label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="border-primary/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suggestion">💡 Suggestion</SelectItem>
                      <SelectItem value="complaint">⚠️ Complaint</SelectItem>
                      <SelectItem value="report">📢 Report Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                    Subject
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your feedback"
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-primary mb-2 block font-rajdhani">
                  Message
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide detailed information about your feedback..."
                  rows={6}
                  required
                  className="border-primary/30 focus:border-primary"
                />
              </div>
              
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani"
              >
                {submitting ? "Submitting..." : "Submit Feedback 🚀"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Previous Submissions */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 font-orbitron">Your Previous Submissions</h2>
          <div className="space-y-4">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <Card key={complaint.id} className="border-border/50 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(complaint.type)}
                        <CardTitle className="text-lg text-primary font-rajdhani">
                          {complaint.subject}
                        </CardTitle>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-exo leading-relaxed">
                      {complaint.message}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12 border-primary/20">
                <CardContent>
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2 font-rajdhani">
                    No Submissions Yet
                  </h3>
                  <p className="text-muted-foreground font-exo">
                    Submit your first feedback using the form above! 📝
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Complaints;