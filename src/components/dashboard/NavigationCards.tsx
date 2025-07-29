import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  FileText, 
  Settings, 
  GraduationCap,
  Calendar,
  Image,
  Clipboard,
  MessageSquare,
  Star,
  Zap
} from "lucide-react";

interface NavigationCardsProps {
  userRole?: string;
}

const NavigationCards = ({ userRole }: NavigationCardsProps) => {
  const navigate = useNavigate();

  const baseCards = [
    {
      title: "Tech Blog",
      description: "Share knowledge & insights",
      icon: BookOpen,
      route: "/blog",
      color: "primary",
      gradient: "from-primary/10 to-primary/20"
    },
    {
      title: "Past Questions",
      description: "Access exam materials",
      icon: FileText,
      route: "/past-questions",
      color: "accent",
      gradient: "from-accent/10 to-accent/20"
    },
    {
      title: "Quizzes",
      description: "Test your skills",
      icon: Trophy,
      route: "/quizzes",
      color: "secondary",
      gradient: "from-secondary/10 to-secondary/20"
    },
    {
      title: "Sports Hub",
      description: "Join activities & events",
      icon: Zap,
      route: "/sports",
      color: "hero-accent",
      gradient: "from-hero-accent/10 to-hero-accent/20"
    },
    {
      title: "Executives",
      description: "Meet our leadership",
      icon: Users,
      route: "/executives",
      color: "primary",
      gradient: "from-primary/10 to-primary/20"
    },
    {
      title: "Academic Team",
      description: "Connect with lecturers",
      icon: GraduationCap,
      route: "/lecturers",
      color: "secondary",
      gradient: "from-secondary/10 to-secondary/20"
    },
    {
      title: "Hall of Fame",
      description: "Celebrate achievements",
      icon: Star,
      route: "/hall-of-fame",
      color: "accent",
      gradient: "from-accent/10 to-accent/20"
    },
    {
      title: "Tech Giants",
      description: "Learn from the best",
      icon: Clipboard,
      route: "/tech-giants",
      color: "hero-accent",
      gradient: "from-hero-accent/10 to-hero-accent/20"
    }
  ];

  const adminCards = [
    {
      title: "Admin Panel",
      description: "Manage platform settings",
      icon: Settings,
      route: "/admin",
      color: "destructive",
      gradient: "from-destructive/10 to-destructive/20"
    }
  ];

  const lecturerCards = [
    {
      title: "Lecturer Dashboard",
      description: "Manage materials & quizzes",
      icon: GraduationCap,
      route: "/lecturer",
      color: "secondary",
      gradient: "from-secondary/10 to-secondary/20"
    }
  ];
  let allCards = baseCards;
  
  if (userRole === 'admin' || userRole === 'superadmin') {
    allCards = [...baseCards, ...adminCards];
  } else if (userRole === 'lecturer') {
    allCards = [...baseCards, ...lecturerCards];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {allCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.title}
            className={`cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-${card.color}/20 bg-gradient-to-br ${card.gradient} hover:border-${card.color}/40 group`}
            onClick={() => navigate(card.route)}
          >
            <CardContent className="p-6 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className={`absolute -top-6 -right-6 w-20 h-20 bg-${card.color}/10 rounded-full transition-all duration-300 group-hover:scale-110`}></div>
              <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-${card.color}/5 rounded-full transition-all duration-300 group-hover:scale-110`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-${card.color}/20 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:bg-${card.color}/30 group-hover:scale-110 relative z-10`}>
                <Icon className={`h-8 w-8 text-${card.color} transition-all duration-300 group-hover:scale-110`} />
              </div>
              
              {/* Content */}
              <h3 className={`font-bold text-lg text-${card.color} mb-2 font-rajdhani transition-colors duration-300 relative z-10`}>
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm font-exo relative z-10 transition-colors duration-300 group-hover:text-foreground/80">
                {card.description}
              </p>
              
              {/* Hover effect indicator */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-${card.color} transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NavigationCards;