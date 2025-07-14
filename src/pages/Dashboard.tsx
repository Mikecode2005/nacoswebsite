import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsCards from "@/components/dashboard/StatsCards";
import ActivityChart from "@/components/dashboard/ActivityChart";
import NavigationCards from "@/components/dashboard/NavigationCards";
import QuizScoreboard from "@/components/QuizScoreboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Sparkles, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalQuizzes: 0,
    userBlogCount: 5, // Mock data for demo
    userQuizAttempts: 12,
    weeklyActivity: 78,
    achievementRate: 85,
    studyStreak: 14,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchDashboardData();
    }
  }, [user, loading, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, blogsRes, quizzesRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: 'exact' }),
        supabase.from("blog_posts").select("id", { count: 'exact' }),
        supabase.from("quizzes").select("id", { count: 'exact' })
      ]);

      setDashboardStats(prev => ({
        ...prev,
        totalUsers: usersRes.count || 0,
        totalBlogs: blogsRes.count || 0,
        totalQuizzes: quizzesRes.count || 0,
      }));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-exo text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center text-3xl text-primary font-orbitron">
                <Sparkles className="h-8 w-8 mr-3 text-hero-accent" />
                Welcome to NACOS Dashboard!
              </CardTitle>
              <p className="text-muted-foreground font-exo text-lg">
                Hello <span className="font-semibold text-primary font-rajdhani">{user.email}</span>! 
                You're logged in as a <span className="font-semibold text-accent font-rajdhani">{userRole}</span>. 
                Ready to explore the future of computer science? 🚀
              </p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center text-sm text-muted-foreground font-exo">
                <TrendingUp className="h-4 w-4 mr-2 text-hero-accent" />
                <span>Your learning journey continues here</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Cards */}
        <StatsCards stats={dashboardStats} loading={loadingStats} />

        {/* Navigation Cards */}
        <NavigationCards userRole={userRole} />

        {/* Personal Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-blue-400/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2 font-orbitron">{dashboardStats.userBlogCount}</h3>
              <p className="text-muted-foreground font-exo">Blog Posts Created</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-accent/10 to-purple-400/10 border-accent/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-accent mb-2 font-orbitron">{dashboardStats.userQuizAttempts}</h3>
              <p className="text-muted-foreground font-exo">Quiz Attempts</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-secondary/10 to-green-400/10 border-secondary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-secondary mb-2 font-orbitron">{dashboardStats.studyStreak}</h3>
              <p className="text-muted-foreground font-exo">Day Study Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Charts */}
        <ActivityChart />
        
        {/* Quiz Scoreboard */}
        <section className="mb-8">
          <QuizScoreboard />
        </section>

        {/* Achievement Badge */}
        <Card className="bg-gradient-to-r from-hero-accent/10 to-primary/10 border-hero-accent/20 text-center">
          <CardContent className="p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-hero-accent/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-hero-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-hero-accent mb-2 font-rajdhani">
              Keep up the great work! 🎯
            </h3>
            <p className="text-muted-foreground font-exo">
              You're making excellent progress in your computer science journey. 
              Continue exploring and learning! 💫
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;