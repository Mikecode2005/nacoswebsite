import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, BookOpen, Trophy, FileText, Shield, GraduationCap, Calendar, Activity, TrendingUp, Database, MessageSquare, Image, Award, Target, Clock, ChartBar as BarChart3 } from "lucide-react";
import { Navigate } from "react-router-dom";
import AdminEventsManager from "@/components/AdminEventsManager";
import { motion } from "framer-motion";

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalQuizzes: number;
  totalEvents: number;
  totalGalleryImages: number;
  totalQuizAttempts: number;
  totalComplaints: number;
  totalExecutives: number;
  totalLecturers: number;
  totalSports: number;
  totalPastQuestions: number;
  totalHallOfFame: number;
}

interface User {
  id: string;
  email: string;
  display_name: string;
  role: string;
}

const AdminDashboard = () => {
  const { userRole, loading } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalQuizzes: 0,
    totalEvents: 0,
    totalGalleryImages: 0,
    totalQuizAttempts: 0,
    totalComplaints: 0,
    totalExecutives: 0,
    totalLecturers: 0,
    totalSports: 0,
    totalPastQuestions: 0,
    totalHallOfFame: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<string>("student");
  const [loadingStats, setLoadingStats] = useState(true);
  const [animatedStats, setAnimatedStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalQuizzes: 0,
    totalEvents: 0,
    totalGalleryImages: 0,
    totalQuizAttempts: 0,
    totalComplaints: 0,
    totalExecutives: 0,
    totalLecturers: 0,
    totalSports: 0,
    totalPastQuestions: 0,
    totalHallOfFame: 0,
  });

  useEffect(() => {
    if (userRole && (userRole === 'admin' || userRole === 'superadmin')) {
      fetchStats();
      fetchUsers();
    }
  }, [userRole]);

  // Animate numbers when stats load
  useEffect(() => {
    if (!loadingStats) {
      Object.entries(stats).forEach(([key, value]) => {
        const increment = value / 50;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      });
    }
  }, [stats, loadingStats]);

  const fetchStats = async () => {
    try {
      const [
        usersRes,
        blogsRes,
        quizzesRes,
        eventsRes,
        galleryRes,
        attemptsRes,
        complaintsRes,
        executivesRes,
        lecturersRes,
        sportsRes,
        pastQuestionsRes,
        hallOfFameRes
      ] = await Promise.all([
        supabase.from("profiles").select("id", { count: 'exact' }),
        supabase.from("blog_posts").select("id", { count: 'exact' }),
        supabase.from("quizzes").select("id", { count: 'exact' }),
        supabase.from("events").select("id", { count: 'exact' }),
        supabase.from("gallery").select("id", { count: 'exact' }),
        supabase.from("quiz_attempts").select("id", { count: 'exact' }),
        supabase.from("complaints").select("id", { count: 'exact' }),
        supabase.from("executives").select("id", { count: 'exact' }),
        supabase.from("lecturers").select("id", { count: 'exact' }),
        supabase.from("sports").select("id", { count: 'exact' }),
        supabase.from("past_questions").select("id", { count: 'exact' }),
        supabase.from("hall_of_fame").select("id", { count: 'exact' })
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalBlogs: blogsRes.count || 0,
        totalQuizzes: quizzesRes.count || 0,
        totalEvents: eventsRes.count || 0,
        totalGalleryImages: galleryRes.count || 0,
        totalQuizAttempts: attemptsRes.count || 0,
        totalComplaints: complaintsRes.count || 0,
        totalExecutives: executivesRes.count || 0,
        totalLecturers: lecturersRes.count || 0,
        totalSports: sportsRes.count || 0,
        totalPastQuestions: pastQuestionsRes.count || 0,
        totalHallOfFame: hallOfFameRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select(`
          user_id,
          email,
          display_name,
          user_roles(role)
        `);

      const formattedUsers = data?.map(user => ({
        id: user.user_id,
        email: user.email || '',
        display_name: user.display_name || '',
        role: (user.user_roles as any)?.[0]?.role || 'student'
      })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const assignRole = async () => {
    if (!newUserEmail || !newUserRole) return;

    try {
      toast({
        title: "Feature Coming Soon",
        description: "Role assignment functionality will be available soon.",
        variant: "destructive",
      });
      return;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const CircularProgress = ({ 
    percentage, 
    size = 120, 
    strokeWidth = 8, 
    color = "text-primary",
    bgColor = "text-muted-foreground/20",
    showPercentage = true 
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className={bgColor}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`${color} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className={`text-xl sm:text-2xl font-bold font-orbitron ${color}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {percentage}%
            </motion.span>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-exo text-muted-foreground">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!userRole || (userRole !== 'admin' && userRole !== 'superadmin')) {
    return <Navigate to="/" replace />;
  }

  const statCards = [
    {
      title: "Total Users",
      value: animatedStats.totalUsers,
      icon: Users,
      color: "primary",
      gradient: "from-primary/10 to-primary/20",
      progress: Math.min((animatedStats.totalUsers / 1000) * 100, 100),
      description: "Registered students"
    },
    {
      title: "Blog Posts",
      value: animatedStats.totalBlogs,
      icon: FileText,
      color: "accent",
      gradient: "from-accent/10 to-accent/20",
      progress: Math.min((animatedStats.totalBlogs / 100) * 100, 100),
      description: "Published articles"
    },
    {
      title: "Active Quizzes",
      value: animatedStats.totalQuizzes,
      icon: Trophy,
      color: "secondary",
      gradient: "from-secondary/10 to-secondary/20",
      progress: Math.min((animatedStats.totalQuizzes / 50) * 100, 100),
      description: "Available quizzes"
    },
    {
      title: "Quiz Attempts",
      value: animatedStats.totalQuizAttempts,
      icon: Target,
      color: "hero-accent",
      gradient: "from-hero-accent/10 to-hero-accent/20",
      progress: Math.min((animatedStats.totalQuizAttempts / 500) * 100, 100),
      description: "Student attempts"
    },
    {
      title: "Upcoming Events",
      value: animatedStats.totalEvents,
      icon: Calendar,
      color: "primary",
      gradient: "from-primary/10 to-blue-500/20",
      progress: Math.min((animatedStats.totalEvents / 20) * 100, 100),
      description: "Scheduled events"
    },
    {
      title: "Gallery Images",
      value: animatedStats.totalGalleryImages,
      icon: Image,
      color: "accent",
      gradient: "from-accent/10 to-green-500/20",
      progress: Math.min((animatedStats.totalGalleryImages / 100) * 100, 100),
      description: "Photo gallery"
    },
    {
      title: "Feedback Items",
      value: animatedStats.totalComplaints,
      icon: MessageSquare,
      color: "secondary",
      gradient: "from-secondary/10 to-purple-500/20",
      progress: Math.min((animatedStats.totalComplaints / 50) * 100, 100),
      description: "User feedback"
    },
    {
      title: "Executives",
      value: animatedStats.totalExecutives,
      icon: Award,
      color: "hero-accent",
      gradient: "from-hero-accent/10 to-orange-500/20",
      progress: Math.min((animatedStats.totalExecutives / 20) * 100, 100),
      description: "Leadership team"
    },
    {
      title: "Lecturers",
      value: animatedStats.totalLecturers,
      icon: GraduationCap,
      color: "primary",
      gradient: "from-primary/10 to-indigo-500/20",
      progress: Math.min((animatedStats.totalLecturers / 30) * 100, 100),
      description: "Faculty members"
    },
    {
      title: "Sports Activities",
      value: animatedStats.totalSports,
      icon: Activity,
      color: "accent",
      gradient: "from-accent/10 to-red-500/20",
      progress: Math.min((animatedStats.totalSports / 15) * 100, 100),
      description: "Sports programs"
    },
    {
      title: "Past Questions",
      value: animatedStats.totalPastQuestions,
      icon: BookOpen,
      color: "secondary",
      gradient: "from-secondary/10 to-cyan-500/20",
      progress: Math.min((animatedStats.totalPastQuestions / 100) * 100, 100),
      description: "Study materials"
    },
    {
      title: "Hall of Fame",
      value: animatedStats.totalHallOfFame,
      icon: Trophy,
      color: "hero-accent",
      gradient: "from-hero-accent/10 to-yellow-500/20",
      progress: Math.min((animatedStats.totalHallOfFame / 20) * 100, 100),
      description: "Top achievers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <div className="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24 space-y-6 sm:space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 font-orbitron"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {userRole === 'superadmin' ? 'Super Admin' : 'Admin'} Command Center 🛡️
            </motion.h1>
            <p className="text-muted-foreground font-exo text-base sm:text-lg max-w-2xl mx-auto">
              Advanced platform management and real-time analytics dashboard
            </p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Enhanced Stats Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 20
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className={`border-${card.color}/20 bg-gradient-to-br ${card.gradient} hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full`}>
                  {/* Background decoration */}
                  <div className={`absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-${card.color}/10 rounded-full transform translate-x-8 sm:translate-x-10 -translate-y-8 sm:-translate-y-10`}></div>
                  <div className={`absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-${card.color}/5 rounded-full transform -translate-x-6 sm:-translate-x-8 translate-y-6 sm:translate-y-8`}></div>
                  
                  <CardContent className="p-3 sm:p-4 md:p-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-${card.color}/20 rounded-xl flex items-center justify-center`}
                      >
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-${card.color}`} />
                      </motion.div>
                      
                      <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
                        <motion.div 
                          className={`text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-${card.color}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                        >
                          {loadingStats ? "..." : card.value}
                        </motion.div>
                        <p className={`text-xs sm:text-sm font-rajdhani font-semibold text-${card.color}`}>
                          {card.title}
                        </p>
                        <p className="text-xs text-muted-foreground font-exo hidden sm:block">
                          {card.description}
                        </p>
                      </div>

                      {/* Circular Progress - Hidden on mobile */}
                      <div className="mt-1 hidden sm:block">
                        <CircularProgress 
                          percentage={card.progress} 
                          size={50} 
                          strokeWidth={3}
                          color={`text-${card.color}`}
                          showPercentage={false}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Platform Overview - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-24 sm:w-32 h-24 sm:h-32 border border-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-16 sm:w-24 h-16 sm:h-24 border border-accent/30 rounded-lg rotate-45 animate-bounce"></div>
            </div>
            
            <CardHeader className="relative z-10 text-center">
              <CardTitle className="flex items-center justify-center text-xl sm:text-2xl font-orbitron text-primary">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
                </motion.div>
                NACOS Platform Analytics
              </CardTitle>
              <p className="text-muted-foreground font-exo text-sm sm:text-base">
                Real-time insights into platform performance and user engagement
              </p>
            </CardHeader>
            
            <CardContent className="relative z-10 p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {[
                  { label: "Active Students", value: animatedStats.totalUsers, max: 1000, color: "primary" },
                  { label: "Content Items", value: animatedStats.totalBlogs + animatedStats.totalPastQuestions, max: 200, color: "accent" },
                  { label: "Assessments", value: animatedStats.totalQuizzes + animatedStats.totalQuizAttempts, max: 600, color: "secondary" },
                  { label: "Community", value: animatedStats.totalExecutives + animatedStats.totalLecturers + animatedStats.totalSports, max: 100, color: "hero-accent" }
                ].map((item, index) => (
                   <motion.div 
                    key={item.label}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <CircularProgress 
                        percentage={Math.min((item.value / item.max) * 100, 100)}
                        size={80}
                        strokeWidth={6}
                        color={`text-${item.color}`}
                        showPercentage={false}
                      />
                    </div>
                    <motion.span 
                      className={`text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-${item.color} block`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                    >
                      {loadingStats ? "..." : item.value}
                    </motion.span>
                    <p className="text-xs sm:text-sm text-muted-foreground font-exo mt-1">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Management - Mobile Responsive */}
        {userRole === 'superadmin' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl sm:text-2xl text-primary font-orbitron">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  User Role Management 👑
                </CardTitle>
                <p className="text-muted-foreground font-exo text-sm sm:text-base">
                  Manage user roles and permissions across the platform
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Role Form - Mobile Responsive */}
                <div className="bg-primary/5 p-4 sm:p-6 rounded-lg space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-primary font-rajdhani">
                    Assign Role to User
                  </h3>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4">
                    <Input
                      placeholder="User email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="border-primary/30 text-sm sm:text-base"
                    />
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger className="border-primary/30">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="lecturer">Lecturer</SelectItem>
                        {userRole === 'superadmin' && <SelectItem value="admin">Admin</SelectItem>}
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={assignRole} 
                      className="bg-primary hover:bg-primary/90 font-rajdhani w-full sm:w-auto"
                    >
                      Assign Role ✨
                    </Button>
                  </div>
                </div>

                {/* Users List - Mobile Responsive */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-primary font-rajdhani">
                    Current Users ({users.length})
                  </h3>
                  <div className="grid gap-3 sm:gap-4 max-h-96 overflow-y-auto">
                    {users.slice(0, 10).map((user) => (
                      <motion.div 
                        key={user.id} 
                        className="bg-background/50 p-3 sm:p-4 rounded-lg border border-primary/20 hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-primary font-rajdhani text-sm sm:text-base truncate">
                              {user.display_name || user.email}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground font-exo truncate">
                              {user.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium font-rajdhani ${
                              user.role === 'superadmin' ? 'bg-red-100 text-red-700' :
                              user.role === 'admin' ? 'bg-orange-100 text-orange-700' :
                              user.role === 'lecturer' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {user.role}
                            </span>
                            {user.role !== 'student' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="text-xs px-2 py-1 h-auto"
                                onClick={() => {}}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {users.length > 10 && (
                      <p className="text-center text-muted-foreground text-sm font-exo">
                        ... and {users.length - 10} more users
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Events Management - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-xl sm:text-2xl text-primary font-orbitron">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                Events Management 📅
              </CardTitle>
              <p className="text-muted-foreground font-exo text-sm sm:text-base">
                Create and manage upcoming events for the NACOS community
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <AdminEventsManager />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-accent font-orbitron text-center">
                Quick Actions ⚡
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {[
                  { label: "Blog Posts", route: "/blog", icon: FileText, color: "primary" },
                  { label: "Quizzes", route: "/quizzes", icon: Trophy, color: "accent" },
                  { label: "Gallery", route: "/gallery", icon: Image, color: "secondary" },
                  { label: "Events", route: "/events", icon: Calendar, color: "hero-accent" },
                  { label: "Executives", route: "/executives", icon: Award, color: "primary" },
                  { label: "Feedback", route: "/complaints", icon: MessageSquare, color: "accent" }
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.label}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                    >
                      <Card className={`cursor-pointer border-${action.color}/20 bg-${action.color}/5 hover:shadow-lg transition-all duration-300`}>
                        <CardContent className="p-3 sm:p-4 text-center">
                          <Icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${action.color} mx-auto mb-2`} />
                          <p className={`text-xs sm:text-sm font-rajdhani font-semibold text-${action.color}`}>
                            {action.label}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;