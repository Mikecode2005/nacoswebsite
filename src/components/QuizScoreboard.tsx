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
      // For now, we'll use sample data since the tables might not be fully set up
      const sampleAttempts: QuizAttempt[] = [
        {
          id: '1',
          quiz_id: '1',
          user_id: '1',
          score: 18,
          total_questions: 20,
          completed_at: '2024-01-10T14:30:00Z',
          time_taken: 480,
          user_name: 'John Doe',
          quiz_title: 'Data Structures Quiz'
        },
        {
          id: '2',
          quiz_id: '2',
          user_id: '2',
          score: 16,
          total_questions: 20,
          completed_at: '2024-01-10T13:45:00Z',
          time_taken: 420,
          user_name: 'Jane Smith',
          quiz_title: 'Algorithms Quiz'
        },
        {
          id: '3',
          quiz_id: '1',
          user_id: '3',
          score: 19,
          total_questions: 20,
          completed_at: '2024-01-10T12:15:00Z',
          time_taken: 360,
          user_name: 'Michael Chen',
          quiz_title: 'Data Structures Quiz'
        },
        {
          id: '4',
          quiz_id: '3',
          user_id: '4',
          score: 15,
          total_questions: 20,
          completed_at: '2024-01-10T11:30:00Z',
          time_taken: 540,
          user_name: 'Sarah Johnson',
          quiz_title: 'Database Design Quiz'
        },
        {
          id: '5',
          quiz_id: '2',
          user_id: '1',
          score: 17,
          total_questions: 20,
          completed_at: '2024-01-10T10:20:00Z',
          time_taken: 390,
          user_name: 'John Doe',
          quiz_title: 'Algorithms Quiz'
        }
      ];

      const sampleLeaderboard: LeaderboardEntry[] = [
        {
          user_id: '3',
          user_name: 'Michael Chen',
          total_score: 19,
          attempts_count: 1,
          average_score: 95,
          best_score: 95
        },
        {
          user_id: '1',
          user_name: 'John Doe',
          total_score: 35,
          attempts_count: 2,
          average_score: 87.5,
          best_score: 90
        },
        {
          user_id: '2',
          user_name: 'Jane Smith',
          total_score: 16,
          attempts_count: 1,
          average_score: 80,
          best_score: 80
        },
        {
          user_id: '4',
          user_name: 'Sarah Johnson',
          total_score: 15,
          attempts_count: 1,
          average_score: 75,
          best_score: 75
        }
      ];

      setRecentAttempts(sampleAttempts);
      setLeaderboard(sampleLeaderboard);
    } catch (error) {
      console.error("Error fetching scoreboard data:", error);
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