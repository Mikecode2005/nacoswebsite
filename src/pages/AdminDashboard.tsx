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
import { Users, BookOpen, Trophy, FileText, Shield, GraduationCap } from "lucide-react";
import { Navigate } from "react-router-dom";

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalQuizzes: number;
  totalMaterials: number;
  totalAttempts: number;
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
    totalMaterials: 0,
    totalAttempts: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<string>("student");
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (userRole && (userRole === 'admin' || userRole === 'superadmin')) {
      fetchStats();
      fetchUsers();
    }
  }, [userRole]);

  const fetchStats = async () => {
    try {
      const [usersRes, blogsRes, quizzesRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: 'exact' }),
        supabase.from("blog_posts").select("id", { count: 'exact' }),
        supabase.from("quizzes").select("id", { count: 'exact' })
      ]);

      // These tables might not exist yet in types, so we'll set them to 0 for now
      const materialsCount = 0;
      const attemptsCount = 0;

      setStats({
        totalUsers: usersRes.count || 0,
        totalBlogs: blogsRes.count || 0,
        totalQuizzes: quizzesRes.count || 0,
        totalMaterials: materialsCount,
        totalAttempts: attemptsCount,
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
      // For now, we'll use a placeholder since admin functions aren't available
      // In a real implementation, you'd need server-side functionality
      toast({
        title: "Feature Coming Soon",
        description: "Role assignment functionality will be available soon.",
        variant: "destructive",
      });
      return;

      toast({
        title: "Success! 🎉",
        description: `Role ${newUserRole} assigned to ${newUserEmail}`,
      });

      setNewUserEmail("");
      setNewUserRole("student");
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeRole = async (userId: string, role: string) => {
    try {
      // For now, placeholder functionality
      toast({
        title: "Feature Coming Soon",
        description: "Role removal functionality will be available soon.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!userRole || (userRole !== 'admin' && userRole !== 'superadmin')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-4 font-orbitron">
            {userRole === 'superadmin' ? 'Super Admin' : 'Admin'} Command Center 🛡️
          </h1>
          <p className="text-muted-foreground font-exo text-lg">
            Advanced platform management and analytics dashboard
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Stats Grid with Circular Progress */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <Users className="h-12 w-12 text-primary mx-auto mb-4 relative z-10" />
              <h3 className="text-3xl font-bold text-primary font-orbitron">
                {loadingStats ? "..." : stats.totalUsers}
              </h3>
              <p className="text-muted-foreground font-exo">Total Users 👥</p>
              <div className="mt-3 w-full bg-primary/20 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((stats.totalUsers / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <FileText className="h-12 w-12 text-accent mx-auto mb-4 relative z-10" />
              <h3 className="text-3xl font-bold text-accent font-orbitron">
                {loadingStats ? "..." : stats.totalBlogs}
              </h3>
              <p className="text-muted-foreground font-exo">Blog Posts 📝</p>
              <div className="mt-3 w-full bg-accent/20 rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((stats.totalBlogs / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <Trophy className="h-12 w-12 text-secondary mx-auto mb-4 relative z-10" />
              <h3 className="text-3xl font-bold text-secondary font-orbitron">
                {loadingStats ? "..." : stats.totalQuizzes}
              </h3>
              <p className="text-muted-foreground font-exo">Quizzes 🧠</p>
              <div className="mt-3 w-full bg-secondary/20 rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((stats.totalQuizzes / 30) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-hero-accent/20 bg-gradient-to-br from-hero-accent/10 to-hero-accent/5 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-hero-accent/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <BookOpen className="h-12 w-12 text-hero-accent mx-auto mb-4 relative z-10" />
              <h3 className="text-3xl font-bold text-hero-accent font-orbitron">
                {loadingStats ? "..." : stats.totalMaterials}
              </h3>
              <p className="text-muted-foreground font-exo">Materials 📚</p>
              <div className="mt-3 w-full bg-hero-accent/20 rounded-full h-2">
                <div 
                  className="bg-hero-accent h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((stats.totalMaterials / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4 relative z-10" />
              <h3 className="text-3xl font-bold text-primary font-orbitron">
                {loadingStats ? "..." : stats.totalAttempts}
              </h3>
              <p className="text-muted-foreground font-exo">Quiz Attempts 📊</p>
              <div className="mt-3 w-full bg-primary/20 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((stats.totalAttempts / 200) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        {userRole === 'superadmin' && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <Shield className="h-6 w-6 mr-2" />
                User Role Management 👑
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Role Form */}
              <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-primary">Assign Role to User</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    placeholder="User email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="border-primary/30"
                  />
                  <Select value={newUserRole} onValueChange={setNewUserRole}>
                    <SelectTrigger className="border-primary/30">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={assignRole} className="bg-primary hover:bg-primary/90">
                    Assign Role ✨
                  </Button>
                </div>
              </div>

              {/* Users List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Current Users</h3>
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="bg-background/50 p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-primary">{user.display_name || user.email}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                            {user.role}
                          </span>
                          {user.role !== 'student' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeRole(user.id, user.role)}
                            >
                              Remove Role
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;