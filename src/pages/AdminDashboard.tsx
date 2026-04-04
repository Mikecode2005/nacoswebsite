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
import { Users, FileText, Trophy, Calendar, Image as ImageIcon, MessageSquare, Award, GraduationCap, Activity, BookOpen, Target, Shield, Sparkles, BarChart3, Settings, Users2, TrendingUp, Zap, Bell, Search, ChevronRight, Plus, Edit, Trash2 } from "lucide-react";
import { Navigate } from "react-router-dom";
import AdminEventsManager from "@/components/AdminEventsManager";
import AdminAdCarouselManager from "@/components/AdminAdCarouselManager";
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

const AnimatedNumber = ({ value }: { value: number }) => {
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
  
  return <span>{count}</span>;
};

const StatCard = ({ title, value, icon: Icon, color, delay }: { title: string; value: number; icon: React.ElementType; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <Card className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-background hover:shadow-xl transition-all duration-300`}>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}/10 rounded-full -translate-y-8 translate-x-8`} />
      <CardContent className="p-5 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold font-orbitron mt-1"><AnimatedNumber value={value} /></p>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-${color}/20 flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${color}`} />
          </div>
        </div>
        <div className={`mt-3 h-1 w-full bg-${color}/10 rounded-full overflow-hidden`}>
          <motion.div 
            className={`h-full bg-${color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(value / 10, 100)}%` }}
            transition={{ delay: delay + 0.5, duration: 1 }}
          />
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AdminDashboard = () => {
  const { userRole, loading } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0, totalBlogs: 0, totalQuizzes: 0, totalEvents: 0,
    totalGalleryImages: 0, totalQuizAttempts: 0, totalComplaints: 0,
    totalExecutives: 0, totalLecturers: 0, totalSports: 0,
    totalPastQuestions: 0, totalHallOfFame: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<string>("student");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (userRole && (userRole === 'admin' || userRole === 'superadmin')) {
      fetchStats();
      fetchUsers();
    }
  }, [userRole]);

  const fetchStats = async () => {
    try {
      const [usersRes, blogsRes, quizzesRes, eventsRes, galleryRes, attemptsRes, complaintsRes, executivesRes, lecturersRes, sportsRes, pastQuestionsRes, hallOfFameRes] = await Promise.all([
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
        totalUsers: usersRes.count || 0, totalBlogs: blogsRes.count || 0, totalQuizzes: quizzesRes.count || 0,
        totalEvents: eventsRes.count || 0, totalGalleryImages: galleryRes.count || 0, totalQuizAttempts: attemptsRes.count || 0,
        totalComplaints: complaintsRes.count || 0, totalExecutives: executivesRes.count || 0, totalLecturers: lecturersRes.count || 0,
        totalSports: sportsRes.count || 0, totalPastQuestions: pastQuestionsRes.count || 0, totalHallOfFame: hallOfFameRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data: profilesData } = await supabase.from("profiles").select("user_id, email, display_name");
      
      const { data: rolesData } = await supabase.from("user_roles").select("user_id, role");
      
      const formattedUsers = profilesData?.map(profile => {
        const userRole = rolesData?.find(r => r.user_id === profile.user_id);
        return {
          id: profile.user_id,
          email: profile.email || '',
          display_name: profile.display_name || '',
          role: userRole?.role || 'student'
        };
      }) || [];
      
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Use sample data as fallback
      setUsers([
        { id: '1', email: 'demo@nacos.edu.ng', display_name: 'Demo User', role: 'student' },
        { id: '2', email: 'lecturer@nacos.edu.ng', display_name: 'Demo Lecturer', role: 'lecturer' },
        { id: '3', email: 'admin@nacos.edu.ng', display_name: 'Demo Admin', role: 'admin' },
      ]);
    }
  };

  const assignRole = async () => {
    toast({ title: "Feature Coming Soon", description: "Role assignment functionality will be available soon.", variant: "destructive" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <p className="text-lg font-exo text-muted-foreground">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!userRole || (userRole !== 'admin' && userRole !== 'superadmin')) {
    return <Navigate to="/" replace />;
  }

  const statItems = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { title: "Blog Posts", value: stats.totalBlogs, icon: FileText, color: "text-accent", bg: "bg-accent/10" },
    { title: "Quizzes", value: stats.totalQuizzes, icon: Trophy, color: "text-secondary", bg: "bg-secondary/10" },
    { title: "Events", value: stats.totalEvents, icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
    { title: "Gallery", value: stats.totalGalleryImages, icon: ImageIcon, color: "text-accent", bg: "bg-accent/10" },
    { title: "Feedback", value: stats.totalComplaints, icon: MessageSquare, color: "text-secondary", bg: "bg-secondary/10" },
  ];

  const quickActions = [
    { label: "Blog Posts", icon: FileText, color: "text-primary", bg: "bg-primary/10", route: "/blog" },
    { label: "Quizzes", icon: Trophy, color: "text-accent", bg: "bg-accent/10", route: "/quizzes" },
    { label: "Gallery", icon: ImageIcon, color: "text-secondary", bg: "bg-secondary/10", route: "/gallery" },
    { label: "Events", icon: Calendar, color: "text-primary", bg: "bg-primary/10", route: "/events" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users2 },
    { id: "events", label: "Events", icon: Calendar },
    { id: "ads", label: "Advertisements", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-orbitron text-primary">
                {userRole === 'superadmin' ? 'Super Admin' : 'Admin'} Panel
              </h1>
              <p className="text-sm text-muted-foreground">Manage your NACOS platform</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? "bg-accent text-primary" : "text-muted-foreground"}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {statItems.map((stat, index) => (
                <StatCard key={stat.title} {...stat} color={stat.color.replace("text-", "")} delay={index * 0.1} />
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className={`cursor-pointer border-border/30 ${action.bg} hover:border-accent/30 transition-all`}>
                        <CardContent className="p-4 text-center">
                          <action.icon className={`h-8 w-8 ${action.color} mx-auto mb-2`} />
                          <p className={`text-sm font-medium ${action.color}`}>{action.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Platform Overview */}
            <Card className="border-border/50 bg-gradient-to-br from-card to-accent/5">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    { label: "Active Students", value: stats.totalUsers, color: "text-primary" },
                    { label: "Content Items", value: stats.totalBlogs + stats.totalPastQuestions, color: "text-accent" },
                    { label: "Assessments", value: stats.totalQuizzes + stats.totalQuizAttempts, color: "text-secondary" },
                    { label: "Community", value: stats.totalExecutives + stats.totalLecturers, color: "text-primary" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <p className={`text-3xl font-bold font-orbitron ${item.color}`}>
                        <AnimatedNumber value={item.value} />
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "users" && userRole === 'superadmin' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input placeholder="User email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="flex-1" />
                  <Select value={newUserRole} onValueChange={setNewUserRole}>
                    <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                      {userRole === 'superadmin' && <SelectItem value="admin">Admin</SelectItem>}
                    </SelectContent>
                  </Select>
                  <Button onClick={assignRole} className="bg-accent text-primary hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />Assign Role
                  </Button>
                </div>

                <div className="space-y-3">
                  {users.slice(0, 10).map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary">{user.display_name || user.email}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'superadmin' ? 'bg-red-500/20 text-red-500' :
                        user.role === 'admin' ? 'bg-orange-500/20 text-orange-500' :
                        user.role === 'lecturer' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {user.role}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "events" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Events Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminEventsManager />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "ads" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-accent" />
                  Advertisement Carousel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminAdCarouselManager />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-primary flex items-center gap-2">
                  <Settings className="h-5 w-5 text-accent" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings coming soon...</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
