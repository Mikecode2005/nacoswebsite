import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  FileText, 
  Trophy, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Award,
  Target
} from "lucide-react";
import { useEffect, useState } from "react";

interface StatsData {
  totalUsers: number;
  totalBlogs: number;
  totalQuizzes: number;
  userBlogCount: number;
  userQuizAttempts: number;
  weeklyActivity: number;
  achievementRate: number;
  studyStreak: number;
}

interface StatsCardsProps {
  stats: StatsData;
  loading?: boolean;
}

const StatsCards = ({ stats, loading }: StatsCardsProps) => {
  const [animatedValues, setAnimatedValues] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalQuizzes: 0,
    userBlogCount: 0,
    userQuizAttempts: 0,
    weeklyActivity: 0,
    achievementRate: 0,
    studyStreak: 0,
  });

  // Animate numbers on load
  useEffect(() => {
    if (!loading) {
      const animateValue = (key: keyof StatsData, target: number) => {
        const increment = target / 50; // 50 frames
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 20);
      };

      Object.entries(stats).forEach(([key, value]) => {
        animateValue(key as keyof StatsData, value);
      });
    }
  }, [stats, loading]);

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = "text-primary" }) => {
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
            className="text-muted-foreground/20"
          />
          <circle
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
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${color}`}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Personal Blog Count */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            My Blog Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-orbitron font-bold text-primary">
                {loading ? "..." : animatedValues.userBlogCount}
              </div>
              <p className="text-sm text-muted-foreground font-exo">Published articles</p>
            </div>
            <CircularProgress 
              percentage={Math.min((animatedValues.userBlogCount / 10) * 100, 100)} 
              size={60} 
              strokeWidth={6}
              color="text-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiz Performance */}
      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <Trophy className="h-5 w-5 mr-2 text-accent" />
            Quiz Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-orbitron font-bold text-accent">
                {loading ? "..." : animatedValues.achievementRate}%
              </div>
              <p className="text-sm text-muted-foreground font-exo">Average score</p>
            </div>
            <CircularProgress 
              percentage={animatedValues.achievementRate} 
              size={60} 
              strokeWidth={6}
              color="text-accent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Study Streak */}
      <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <Target className="h-5 w-5 mr-2 text-secondary" />
            Study Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-orbitron font-bold text-secondary">
                {loading ? "..." : animatedValues.studyStreak}
              </div>
              <p className="text-sm text-muted-foreground font-exo">Days active</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-secondary mb-1" />
              <span className="text-xs text-secondary font-medium">
                {animatedValues.studyStreak > 7 ? "Great!" : "Keep going!"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="border-hero-accent/20 bg-gradient-to-br from-hero-accent/5 to-hero-accent/10 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <TrendingUp className="h-5 w-5 mr-2 text-hero-accent" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-orbitron font-bold text-hero-accent">
                {loading ? "..." : animatedValues.weeklyActivity}%
              </span>
              <Clock className="h-5 w-5 text-hero-accent" />
            </div>
            <Progress 
              value={animatedValues.weeklyActivity} 
              className="h-2 bg-hero-accent/20"
            />
            <p className="text-sm text-muted-foreground font-exo">This week's engagement</p>
          </div>
        </CardContent>
      </Card>

      {/* Platform Stats Overview */}
      <Card className="md:col-span-2 lg:col-span-4 border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-rajdhani">
            <Users className="h-6 w-6 mr-2 text-primary" />
            NACOS Platform Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-orbitron font-bold text-primary">
                  {loading ? "..." : animatedValues.totalUsers}
                </span>
              </div>
              <p className="text-muted-foreground font-exo">Active Students</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <FileText className="h-8 w-8 text-accent mr-2" />
                <span className="text-3xl font-orbitron font-bold text-accent">
                  {loading ? "..." : animatedValues.totalBlogs}
                </span>
              </div>
              <p className="text-muted-foreground font-exo">Blog Articles</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Trophy className="h-8 w-8 text-secondary mr-2" />
                <span className="text-3xl font-orbitron font-bold text-secondary">
                  {loading ? "..." : animatedValues.totalQuizzes}
                </span>
              </div>
              <p className="text-muted-foreground font-exo">Available Quizzes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;