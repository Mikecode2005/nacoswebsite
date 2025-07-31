import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import StatsCards from "@/components/dashboard/StatsCards";
import ActivityChart from "@/components/dashboard/ActivityChart";
import NavigationCards from "@/components/dashboard/NavigationCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity,
  ArrowRight,
  Award,
  User,
  Calendar,
  Users,
  FileText,
  Brain
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

        {/* Enhanced Stats Overview with Circular Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatsCards stats={dashboardStats} loading={loadingStats} />
        </motion.div>

        {/* Enhanced Navigation Cards */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-primary font-orbitron mb-6">Quick Actions</h2>
          <NavigationCards userRole={userRole} />
        </motion.div>

        {/* Activity Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ActivityChart />
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
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  >
                    <div>
                      <p className="font-medium text-primary">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <motion.span 
                      className="text-sm bg-accent/20 text-accent px-2 py-1 rounded font-rajdhani font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      {activity.score}
                    </motion.span>
                  </motion.div>
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
                <motion.div 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="h-4 w-4 text-primary mr-2" />
                    </motion.div>
                    <span className="text-sm">Total Students</span>
                  </div>
                  <span className="font-bold text-primary">{dashboardStats.totalUsers}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileText className="h-4 w-4 text-accent mr-2" />
                    </motion.div>
                    <span className="text-sm">Blog Posts</span>
                  </div>
                  <span className="font-bold text-accent">{dashboardStats.totalBlogs}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Brain className="h-4 w-4 text-secondary mr-2" />
                    </motion.div>
                    <span className="text-sm">Quizzes</span>
                  </div>
                  <span className="font-bold text-secondary">{dashboardStats.totalQuizzes}</span>
                </motion.div>
              </CardContent>
            </Card>

            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="border-hero-accent/20 bg-gradient-to-br from-hero-accent/5 to-hero-accent/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-hero-accent/10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <CardContent className="p-8 text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="h-12 w-12 text-hero-accent mx-auto mb-4" />
                </motion.div>
                <h3 className="font-bold text-hero-accent mb-2">Keep Learning!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You're making great progress. Continue exploring!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.div>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;