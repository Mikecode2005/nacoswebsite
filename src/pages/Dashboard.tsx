import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSections from "@/components/dashboard/DashboardSections";
import QuizScoreboard from "@/components/QuizScoreboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, BookOpen, Trophy, Users, GraduationCap } from "lucide-react";

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <User className="h-6 w-6 mr-2" />
                Welcome to NACOS Dashboard! 🚀
              </CardTitle>
              <p className="text-muted-foreground">
                Hello <span className="font-semibold text-primary">{user.email}</span>! 
                You're logged in as a <span className="font-semibold text-accent">{userRole}</span>. 
                Explore all the amazing features below! ✨
              </p>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={() => navigate("/blog")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Tech Blog 📝</h3>
              <p className="text-muted-foreground text-sm">Share your tech knowledge and insights</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={() => navigate("/past-questions")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Past Questions 📚</h3>
              <p className="text-muted-foreground text-sm">Access previous exam materials</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={() => navigate("/quizzes")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Quizzes 🧠</h3>
              <p className="text-muted-foreground text-sm">Test your programming skills</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={() => navigate("/sports")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Sports Hub ⚽</h3>
              <p className="text-muted-foreground text-sm">Join sports activities and events</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={() => navigate("/executives")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Executives 👥</h3>
              <p className="text-muted-foreground text-sm">Meet our leadership team</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={() => navigate("/lecturers")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Lecturers 🎓</h3>
              <p className="text-muted-foreground text-sm">Connect with our academic staff</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Sections */}
        <DashboardSections />
        
        {/* Quiz Scoreboard */}
        <section>
          <QuizScoreboard />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;