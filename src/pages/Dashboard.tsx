import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, BookOpen, Trophy, ArrowRight, Star, Target, TrendingUp, Zap, Bell, MessageSquare, FileText, Clock, CheckCircle, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
};

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0, totalBlogs: 0, totalQuizzes: 0,
    userBlogCount: 0, userQuizAttempts: 0, averageScore: 0,
  });
  const [recentActivities, setRecentActivities] = useState<{action: string; time: string; type: string}[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchDashboardData();
    }
  }, [user, loading, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, blogsRes, quizzesRes, userBlogsRes, userQuizAttemptsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: 'exact' }),
        supabase.from("blog_posts").select("id", { count: 'exact' }),
        supabase.from("quizzes").select("id", { count: 'exact' }),
        supabase.from("blog_posts").select("id", { count: 'exact' }).eq("author_id", user?.id),
        supabase.from("quiz_attempts").select("*").eq("user_id", user?.id).order("completed_at", { ascending: false })
      ]);

      const attempts = userQuizAttemptsRes.data || [];
      const avgScore = attempts.length > 0
        ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.total_questions) * 100, 0) / attempts.length)
        : 0;

      setDashboardStats({
        totalUsers: usersRes.count || 0, totalBlogs: blogsRes.count || 0, totalQuizzes: quizzesRes.count || 0,
        userBlogCount: userBlogsRes.count || 0, userQuizAttempts: attempts.length, averageScore: avgScore,
      });

      const [recentBlogs, recentQuizzes] = await Promise.all([
        supabase.from("blog_posts").select("title, created_at").order("created_at", { ascending: false }).limit(2),
        supabase.from("quizzes").select("title, created_at").order("created_at", { ascending: false }).limit(2)
      ]);

      const activities = [
        ...(recentQuizzes.data?.map(q => ({ action: `New quiz: ${q.title}`, time: new Date(q.created_at).toLocaleDateString(), type: "Quiz" })) || []),
        ...(recentBlogs.data?.map(b => ({ action: `Blog posted: ${b.title}`, time: new Date(b.created_at).toLocaleDateString(), type: "Blog" })) || [])
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);

      setRecentActivities(activities);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <p className="text-lg font-exo text-muted-foreground">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  const quickActions = [
    { label: "Take Quiz", icon: Trophy, color: "text-accent", bg: "bg-accent/10", route: "/quizzes", description: "Test your knowledge" },
    { label: "Read Blog", icon: BookOpen, color: "text-primary", bg: "bg-primary/10", route: "/blog", description: "Tech insights" },
    { label: "View Events", icon: Calendar, color: "text-secondary", bg: "bg-secondary/10", route: "/events", description: "Upcoming events" },
    { label: "Gallery", icon: Star, color: "text-accent", bg: "bg-accent/10", route: "/gallery", description: "Photo gallery" },
  ];

  const userStats = [
    { label: "My Blogs", value: dashboardStats.userBlogCount, icon: FileText },
    { label: "Quiz Attempts", value: dashboardStats.userQuizAttempts, icon: Target },
    { label: "Avg Score", value: dashboardStats.averageScore, suffix: "%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-border/50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="text-accent font-medium text-sm">Welcome back!</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-orbitron text-primary mb-2">
                    Hello, {user.email?.split('@')[0]}! 👋
                  </h1>
                  <p className="text-muted-foreground font-exo">
                    Ready to continue your learning journey?
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-primary" />
                      <span className="capitalize">{userRole}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <User className="h-12 w-12 text-primary" />
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-orbitron text-primary mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={action.route}>
                  <Card className={`cursor-pointer border-border/30 ${action.bg} hover:border-accent/30 transition-all hover:shadow-lg`}>
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center mx-auto mb-3`}>
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <p className={`text-sm font-medium ${action.color}`}>{action.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats & Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  My Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="text-xl font-bold font-orbitron text-accent">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30 hover:border-accent/20 transition-all"
                  >
                    <div>
                      <p className="font-medium text-primary">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      {activity.type}
                    </span>
                  </motion.div>
                )) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-accent/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No recent activity</p>
                    <p className="text-sm text-muted-foreground">Start exploring to see updates here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Platform Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Total Students", value: dashboardStats.totalUsers },
                  { label: "Blog Posts", value: dashboardStats.totalBlogs },
                  { label: "Available Quizzes", value: dashboardStats.totalQuizzes },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center p-4 bg-background/30 rounded-xl"
                  >
                    <p className="text-3xl font-bold font-orbitron text-primary">
                      <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
            <CardContent className="p-6 sm:p-8 text-center">
              <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold font-orbitron text-primary mb-2">Ready for a Challenge?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Test your knowledge with our interactive quizzes and see how you stack up!
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90 text-primary font-rajdhani font-semibold px-8 py-6">
                <Link to="/quizzes">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
