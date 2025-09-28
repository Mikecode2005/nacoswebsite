import { Menu, Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Image from "next/image";

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
              <Image
             src="data:image/png;base64,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" 
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
