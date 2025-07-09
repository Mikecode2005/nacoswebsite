import { Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navItems = [
    { label: "BLOG", href: "#blog" },
    { label: "PAST QUESTIONS", href: "#past-questions" },
    { label: "QUIZZES", href: "#quizzes" },
  ];

  return (
    <header className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-primary-foreground">
              <div className="font-bold text-lg">NACOS</div>
              <div className="text-xs opacity-80">JABU CHAPTER</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-primary-foreground font-medium hover:text-hero-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

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
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-primary-foreground font-medium text-lg hover:text-hero-accent transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;