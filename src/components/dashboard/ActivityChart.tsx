import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ActivityChart = () => {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyPerformance, setMonthlyPerformance] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchActivityData();
    }
  }, [user]);

  const fetchActivityData = async () => {
    try {
      // Get quiz attempts for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: quizData } = await supabase
        .from("quiz_attempts")
        .select("completed_at, score, total_questions")
        .eq("user_id", user?.id)
        .gte("completed_at", sevenDaysAgo.toISOString());

      const { data: blogData } = await supabase
        .from("blog_posts")
        .select("created_at")
        .eq("author_id", user?.id)
        .gte("created_at", sevenDaysAgo.toISOString());

      // Process weekly data
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weekly = days.map((day, index) => {
        const dayQuizzes = quizData?.filter(q => new Date(q.completed_at).getDay() === index).length || 0;
        const dayBlogs = blogData?.filter(b => new Date(b.created_at).getDay() === index).length || 0;
        return { day, quizzes: dayQuizzes, blogs: dayBlogs };
      });
      setWeeklyData(weekly);

      // Get monthly performance (last 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: performanceData } = await supabase
        .from("quiz_attempts")
        .select("completed_at, score, total_questions")
        .eq("user_id", user?.id)
        .gte("completed_at", sixMonthsAgo.toISOString());

      // Group by month
      const monthlyScores = new Map();
      performanceData?.forEach(attempt => {
        const month = new Date(attempt.completed_at).toLocaleString('default', { month: 'short' });
        const score = (attempt.score / attempt.total_questions) * 100;
        if (!monthlyScores.has(month)) {
          monthlyScores.set(month, []);
        }
        monthlyScores.get(month).push(score);
      });

      const performance = Array.from(monthlyScores.entries()).map(([month, scores]) => ({
        month,
        score: Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
      }));

      setMonthlyPerformance(performance.length > 0 ? performance : [{ month: "No data", score: 0 }]);

    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Activity Bar Chart */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontFamily: "Exo 2"
                }}
              />
              <Bar dataKey="quizzes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="blogs" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 text-sm font-exo">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded mr-2"></div>
              <span>Quizzes</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent rounded mr-2"></div>
              <span>Blogs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trend */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <TrendingUp className="h-5 w-5 mr-2 text-accent" />
            Quiz Performance Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontFamily: "Exo 2"
                }}
              />
              <Bar 
                dataKey="score" 
                fill="hsl(var(--accent))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground font-exo">
              {monthlyPerformance.length > 1 ? "Monthly average quiz scores" : "Start taking quizzes to see your performance!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityChart;
