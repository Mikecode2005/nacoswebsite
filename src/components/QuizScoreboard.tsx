import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Clock, Target } from "lucide-react";

interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
  time_taken: number | null;
  user_name: string;
  quiz_title: string;
}

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  total_score: number;
  attempts_count: number;
  average_score: number;
  best_score: number;
}

const QuizScoreboard = () => {
  const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScoreboardData();
  }, []);

  const fetchScoreboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent quiz attempts
      const { data: attemptsData, error: attemptsError } = await supabase
        .from("quiz_attempts")
        .select(`
          id,
          quiz_id,
          user_id,
          score,
          total_questions,
          completed_at,
          time_taken,
          quizzes(title)
        `)
        .order("completed_at", { ascending: false })
        .limit(20);

      if (attemptsError) throw attemptsError;

      // Get unique user IDs
      const userIds = [...new Set(attemptsData?.map(attempt => attempt.user_id) || [])];
      
      // Fetch user profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      if (profilesError) throw profilesError;

      // Create a map of user profiles
      const profilesMap = new Map(
        (profilesData || []).map(profile => [profile.user_id, profile.display_name])
      );

      // Transform attempts data
      const transformedAttempts: QuizAttempt[] = (attemptsData || []).map(attempt => ({
        id: attempt.id,
        quiz_id: attempt.quiz_id,
        user_id: attempt.user_id,
        score: attempt.score,
        total_questions: attempt.total_questions,
        completed_at: attempt.completed_at,
        time_taken: attempt.time_taken,
        user_name: profilesMap.get(attempt.user_id) || 'Anonymous User',
        quiz_title: (attempt.quizzes as any)?.title || 'Unknown Quiz'
      })).slice(0, 10);

      // Calculate leaderboard from attempts
      const userStats = new Map<string, {
        user_id: string;
        user_name: string;
        total_score: number;
        attempts_count: number;
        scores: number[];
      }>();

      transformedAttempts.forEach(attempt => {
        const key = attempt.user_id;
        if (!userStats.has(key)) {
          userStats.set(key, {
            user_id: attempt.user_id,
            user_name: attempt.user_name,
            total_score: 0,
            attempts_count: 0,
            scores: []
          });
        }

        const stats = userStats.get(key)!;
        const percentage = Math.round((attempt.score / attempt.total_questions) * 100);
        stats.total_score += attempt.score;
        stats.attempts_count += 1;
        stats.scores.push(percentage);
      });

      // Convert to leaderboard format and sort by average score
      const leaderboardData: LeaderboardEntry[] = Array.from(userStats.values())
        .map(stats => ({
          user_id: stats.user_id,
          user_name: stats.user_name,
          total_score: stats.total_score,
          attempts_count: stats.attempts_count,
          average_score: stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length,
          best_score: Math.max(...stats.scores)
        }))
        .sort((a, b) => b.average_score - a.average_score)
        .slice(0, 10);

      setRecentAttempts(transformedAttempts);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching scoreboard data:", error);
      // Fallback to empty arrays if there's an error
      setRecentAttempts([]);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Target className="h-6 w-6 text-primary" />;
    }
  };

  const formatTime = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-primary/10 rounded"></div>
                  <div className="h-3 bg-primary/10 rounded w-5/6"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Leaderboard */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-primary">
            <Trophy className="h-6 w-6 mr-2" />
            Quiz Leaderboard 🏆
          </CardTitle>
          <p className="text-muted-foreground">
            Top performers across all quizzes! 🌟
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.user_id} 
                className={`p-4 rounded-lg border ${
                  index === 0 ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
                  index === 1 ? 'border-gray-200 bg-gray-50 dark:bg-gray-900/20' :
                  index === 2 ? 'border-amber-200 bg-amber-50 dark:bg-amber-900/20' :
                  'border-primary/20 bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getScoreIcon(index + 1)}
                      <span className="font-bold text-lg">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{entry.user_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.attempts_count} quiz{entry.attempts_count !== 1 ? 'es' : ''} completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className={`font-bold text-lg ${getScoreColor(entry.average_score)}`}>
                          {entry.average_score.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Best Score</p>
                        <p className={`font-bold text-lg ${getScoreColor(entry.best_score)}`}>
                          {entry.best_score}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attempts */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-accent">
            <Clock className="h-6 w-6 mr-2" />
            Recent Quiz Attempts 📚
          </CardTitle>
          <p className="text-muted-foreground">
            Latest quiz completions from our community
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recentAttempts.map((attempt) => {
              const percentage = Math.round((attempt.score / attempt.total_questions) * 100);
              return (
                <div key={attempt.id} className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-primary">{attempt.user_name}</h4>
                      <p className="text-sm text-muted-foreground">{attempt.quiz_title}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getScoreColor(percentage)} bg-transparent border-current`}>
                        {attempt.score}/{attempt.total_questions} ({percentage}%)
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      ⏱️ {formatTime(attempt.time_taken)}
                    </span>
                    <span>
                      📅 {new Date(attempt.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary">{leaderboard.length}</h3>
            <p className="text-muted-foreground">Active Participants 🎯</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-accent/20 bg-accent/5">
          <CardContent className="p-6">
            <Target className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-accent">{recentAttempts.length}</h3>
            <p className="text-muted-foreground">Recent Attempts 📊</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-secondary/20 bg-secondary/5">
          <CardContent className="p-6">
            <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary">
              {Math.round(recentAttempts.reduce((acc, attempt) => acc + (attempt.time_taken || 0), 0) / recentAttempts.length / 60)}m
            </h3>
            <p className="text-muted-foreground">Avg Time ⏱️</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizScoreboard;