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
  Target,
  Activity,
  Brain
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const CircularProgress = ({ 
    percentage, 
    size = 80, 
    strokeWidth = 6, 
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
              className={`text-lg font-bold font-orbitron ${color}`}
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

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    color, 
    gradient, 
    progress, 
    delay = 0 
  }: {
    title: string;
    value: number | string;
    subtitle: string;
    icon: any;
    color: string;
    gradient: string;
    progress?: number;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        z: 20
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className={`border-${color}/20 bg-gradient-to-br ${gradient} hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-${color}/10 rounded-full transform translate-x-10 -translate-y-10`}></div>
        <div className={`absolute bottom-0 left-0 w-16 h-16 bg-${color}/5 rounded-full transform -translate-x-8 translate-y-8`}></div>
        
        <CardHeader className="pb-3 relative z-10">
          <CardTitle className={`flex items-center text-lg font-rajdhani text-${color}`}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={`h-5 w-5 mr-2 text-${color}`} />
            </motion.div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <motion.div 
                className={`text-3xl font-orbitron font-bold text-${color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: delay + 0.3 }}
              >
                {loading ? "..." : value}
              </motion.div>
              <p className="text-sm text-muted-foreground font-exo">{subtitle}</p>
            </div>
            {progress !== undefined && (
              <CircularProgress 
                percentage={progress} 
                size={60} 
                strokeWidth={4}
                color={`text-${color}`}
              />
            )}
          </div>
          {progress !== undefined && (
            <div className="mt-4">
              <Progress 
                value={progress} 
                className={`h-2 bg-${color}/20`}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="My Blog Posts"
        value={animatedValues.userBlogCount}
        subtitle="Published articles"
        icon={FileText}
        color="primary"
        gradient="from-primary/5 to-primary/10"
        progress={Math.min((animatedValues.userBlogCount / 10) * 100, 100)}
        delay={0}
      />

      <StatCard
        title="Quiz Score"
        value={`${animatedValues.achievementRate}%`}
        subtitle="Average performance"
        icon={Brain}
        color="accent"
        gradient="from-accent/5 to-accent/10"
        progress={animatedValues.achievementRate}
        delay={0.1}
      />

      <StatCard
        title="Study Streak"
        value={animatedValues.studyStreak}
        subtitle="Days active"
        icon={Target}
        color="secondary"
        gradient="from-secondary/5 to-secondary/10"
        progress={Math.min((animatedValues.studyStreak / 30) * 100, 100)}
        delay={0.2}
      />

      <StatCard
        title="Weekly Activity"
        value={`${animatedValues.weeklyActivity}%`}
        subtitle="This week's engagement"
        icon={Activity}
        color="hero-accent"
        gradient="from-hero-accent/5 to-hero-accent/10"
        progress={animatedValues.weeklyActivity}
        delay={0.3}
      />

      {/* Platform Stats Overview */}
      <motion.div 
        className="md:col-span-2 lg:col-span-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden">
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-primary/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-accent/30 rounded-lg rotate-45"></div>
          </div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center text-xl font-rajdhani">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Users className="h-6 w-6 mr-2 text-primary" />
              </motion.div>
              NACOS Platform Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <CircularProgress 
                    percentage={Math.min((animatedValues.totalUsers / 1000) * 100, 100)}
                    size={100}
                    color="text-primary"
                    showPercentage={false}
                  />
                </div>
                <motion.span 
                  className="text-3xl font-orbitron font-bold text-primary block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {loading ? "..." : animatedValues.totalUsers}
                </motion.span>
                <p className="text-muted-foreground font-exo">Active Students</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <CircularProgress 
                    percentage={Math.min((animatedValues.totalBlogs / 100) * 100, 100)}
                    size={100}
                    color="text-accent"
                    showPercentage={false}
                  />
                </div>
                <motion.span 
                  className="text-3xl font-orbitron font-bold text-accent block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {loading ? "..." : animatedValues.totalBlogs}
                </motion.span>
                <p className="text-muted-foreground font-exo">Blog Articles</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <CircularProgress 
                    percentage={Math.min((animatedValues.totalQuizzes / 50) * 100, 100)}
                    size={100}
                    color="text-secondary"
                    showPercentage={false}
                  />
                </div>
                <motion.span 
                  className="text-3xl font-orbitron font-bold text-secondary block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  {loading ? "..." : animatedValues.totalQuizzes}
                </motion.span>
                <p className="text-muted-foreground font-exo">Available Quizzes</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsCards;