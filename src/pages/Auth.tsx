import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! 🎉",
        description: "You've successfully signed in.",
      });

      // Redirect based on user role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .single();
      
      const role = roleData?.role;
      if (role === 'lecturer') {
        navigate("/lecturer");
      } else if (role === 'admin' || role === 'superadmin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Sign In Failed 😞",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account Created! 🚀",
        description: "Check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Sign Up Failed 😞",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Welcome to NACOS 💻
          </CardTitle>
          <p className="text-muted-foreground">
            Join the tech community today! 🚀
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Email 📧</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Password 🔒</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In 🚀"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Display Name 👤</label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Email 📧</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Password 🔒</label>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account ✨"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;