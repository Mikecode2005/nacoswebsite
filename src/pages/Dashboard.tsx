import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  BookOpen, 
  Trophy, 
  FileText, 
  TrendingUp, 
  Calendar,
  Users,
  Brain,
  Target,
  Zap,
  ArrowRight,
  Activity,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalQuizzes: 0,
    userBlogCount: 5,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
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

  const quickActions = [
    {
      title: "Tech Blog",
      description: "Share your knowledge",
      icon: BookOpen,
      route: "/blog",
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      title: "Take Quiz",
      description: "Test your skills",
      icon: Brain,
      route: "/quizzes",
      color: "accent",
      bgColor: "bg-accent/10",
      textColor: "text-accent"
    },
    {
      title: "Past Questions",
      description: "Study materials",
      icon: FileText,
      route: "/past-questions",
      color: "secondary",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary"
    },
    {
      title: "Sports Hub",
      description: "Join activities",
      icon: Trophy,
      route: "/sports",
      color: "hero-accent",
      bgColor: "bg-hero-accent/10",
      textColor: "text-hero-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary font-orbitron mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-muted-foreground font-exo text-lg">
                  Hello <span className="font-semibold text-primary">{user.email}</span>! 
                  Ready to continue your learning journey?
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1 text-primary" />
                    <span className="capitalize">{userRole}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1 text-primary" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                  <p className="text-2xl font-bold text-primary">{dashboardStats.userBlogCount}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <Progress value={60} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">+2 this week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Quiz Score</p>
                  <p className="text-2xl font-bold text-accent">{dashboardStats.achievementRate}%</p>
                </div>
                <Brain className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4">
                <Progress value={dashboardStats.achievementRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Average performance</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold text-secondary">{dashboardStats.studyStreak}</p>
                </div>
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <div className="mt-4">
                <Progress value={70} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Days active</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-hero-accent/20 bg-gradient-to-br from-hero-accent/5 to-hero-accent/10 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Activity</p>
                  <p className="text-2xl font-bold text-hero-accent">{dashboardStats.weeklyActivity}%</p>
                </div>
                <Activity className="h-8 w-8 text-hero-accent" />
              </div>
              <div className="mt-4">
                <Progress value={dashboardStats.weeklyActivity} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">This week</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-primary font-orbitron mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 border-${action.color}/20 ${action.bgColor} group`}
                    onClick={() => navigate(action.route)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${action.bgColor} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-8 w-8 ${action.textColor}`} />
                      </div>
                      <h3 className={`font-bold text-lg ${action.textColor} mb-2 font-rajdhani`}>
                        {action.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-exo">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity & Platform Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary font-orbitron">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: "Completed Data Structures Quiz", time: "2 hours ago", score: "95%" },
                  { action: "Posted blog: React Best Practices", time: "1 day ago", score: "Published" },
                  { action: "Downloaded Algorithm Notes", time: "2 days ago", score: "PDF" },
                  { action: "Joined Sports Event", time: "3 days ago", score: "Football" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div>
                      <p className="font-medium text-primary">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded">
                      {activity.score}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Platform Stats */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary font-orbitron">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Total Students</span>
                  </div>
                  <span className="font-bold text-primary">{dashboardStats.totalUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-accent mr-2" />
                    <span className="text-sm">Blog Posts</span>
                  </div>
                  <span className="font-bold text-accent">{dashboardStats.totalBlogs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-sm">Quizzes</span>
                  </div>
                  <span className="font-bold text-secondary">{dashboardStats.totalQuizzes}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-hero-accent/20 bg-gradient-to-br from-hero-accent/5 to-hero-accent/10">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-hero-accent mx-auto mb-4" />
                <h3 className="font-bold text-hero-accent mb-2">Keep Learning!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You're making great progress. Continue exploring!
                </p>
                <Button 
                  asChild
                  size="sm" 
                  className="bg-hero-accent hover:bg-hero-accent/90 text-primary"
                >
                  <Link to="/quizzes">
                    Take Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;