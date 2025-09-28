import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { label: "HOME", href: "/" },
    { label: "BLOG", href: "/blog" },
    { label: "GALLERY", href: "/gallery" },
    { label: "PAST QUESTIONS", href: "/past-questions" },
    { label: "QUIZZES", href: "/quizzes" },
    { label: "DASHBOARD", href: userRole === 'lecturer' ? "/lecturer" : "/dashboard" },
  ];

  return (
    <header className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="p-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-6 w-6"
              />
            </div>
            <div className="text-primary-foreground font-orbitron">
              <div className="font-bold text-lg">NACOS</div>
              <div className="text-xs opacity-80 font-exo">JABU CHAPTER</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="text-primary-foreground font-medium hover:text-hero-accent transition-colors text-sm font-rajdhani tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm text-primary-foreground">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-primary-foreground hover:text-hero-accent hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="text-primary-foreground hover:text-hero-accent hover:bg-primary-foreground/10"
              >
                <User className="h-4 w-4 mr-1" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-primary border-primary-foreground/20">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.href)}
                    className="text-primary-foreground font-medium text-lg hover:text-hero-accent transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Auth */}
                <div className="pt-6 border-t border-primary-foreground/20">
                  {user ? (
                    <div className="space-y-4">
                      <div className="text-primary-foreground text-sm">
                        Signed in as: {user.email}
                      </div>
                      <Button
                        variant="ghost"
                        onClick={signOut}
                        className="w-full text-primary-foreground hover:text-hero-accent hover:bg-primary-foreground/10"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/auth")}
                      className="w-full text-primary-foreground hover:text-hero-accent hover:bg-primary-foreground/10"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;