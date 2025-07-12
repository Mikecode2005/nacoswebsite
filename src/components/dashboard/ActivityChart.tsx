import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Activity, Calendar, TrendingUp } from "lucide-react";

const weeklyData = [
  { day: "Mon", quizzes: 3, blogs: 1, study: 45 },
  { day: "Tue", quizzes: 5, blogs: 2, study: 60 },
  { day: "Wed", quizzes: 2, blogs: 0, study: 30 },
  { day: "Thu", quizzes: 7, blogs: 3, study: 80 },
  { day: "Fri", quizzes: 4, blogs: 1, study: 55 },
  { day: "Sat", quizzes: 6, blogs: 2, study: 70 },
  { day: "Sun", quizzes: 2, blogs: 1, study: 25 },
];

const studyData = [
  { name: "Algorithms", value: 35, color: "hsl(var(--primary))" },
  { name: "Data Structures", value: 25, color: "hsl(var(--accent))" },
  { name: "Web Dev", value: 20, color: "hsl(var(--secondary))" },
  { name: "Databases", value: 15, color: "hsl(var(--hero-accent))" },
  { name: "Others", value: 5, color: "hsl(var(--muted))" },
];

const performanceData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 88 },
  { month: "May", score: 91 },
  { month: "Jun", score: 89 },
];

const ActivityChart = () => {
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

      {/* Performance Trend Line Chart */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <TrendingUp className="h-5 w-5 mr-2 text-accent" />
            Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[70, 95]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontFamily: "Exo 2"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground font-exo">
              Average quiz performance over time
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Study Distribution Pie Chart */}
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <Calendar className="h-5 w-5 mr-2 text-secondary" />
            Study Focus Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={studyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {studyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontFamily: "Exo 2"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-exo">
            {studyData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Time Heatmap */}
      <Card className="border-hero-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-rajdhani">
            <Activity className="h-5 w-5 mr-2 text-hero-accent" />
            Study Time (Minutes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number"
                className="text-xs font-exo"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                type="category"
                dataKey="day" 
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
              <Bar 
                dataKey="study" 
                fill="hsl(var(--hero-accent))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground font-exo">
              Daily study time in minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityChart;