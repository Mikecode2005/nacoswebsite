import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id?: string;
  question: string;
  options: string[];
  correct: number;
  type: 'multiple-choice' | 'true-false';
}

interface QuizTakerProps {
  quiz: Quiz;
  onComplete: () => void;
  onBack: () => void;
}

const QuizTaker = ({ quiz, onComplete, onBack }: QuizTakerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeStarted, setTimeStarted] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === undefined) {
      toast({
        title: "Answer Required",
        description: "Please select an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      // Calculate score
      let correctAnswers = 0;
      quiz.questions.forEach((question, index) => {
        if (answers[index] === question.correct) {
          correctAnswers++;
        }
      });

      const finalScore = correctAnswers;
      const timeElapsed = Math.floor((new Date().getTime() - timeStarted.getTime()) / 1000);

      // Save quiz attempt to database
      const { error } = await supabase
        .from("quiz_attempts")
        .insert({
          quiz_id: quiz.id,
          user_id: user.id,
          score: finalScore,
          total_questions: quiz.questions.length,
          answers: Object.values(answers),
          time_taken: timeElapsed,
        });

      if (error) throw error;

      setScore(finalScore);
      setQuizCompleted(true);

      const percentage = Math.round((finalScore / quiz.questions.length) * 100);
      
      toast({
        title: "Quiz Completed! 🎉",
        description: `You scored ${finalScore}/${quiz.questions.length} (${percentage}%)`,
      });

    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center justify-center text-3xl font-orbitron">
              <Trophy className="h-8 w-8 mr-3" />
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-6xl font-bold text-primary mb-4">
                {percentage}%
              </div>
              
              <div className="text-2xl font-semibold text-primary mb-2">
                {score}/{quiz.questions.length} Correct
              </div>
              
              <div className="text-lg text-muted-foreground mb-6">
                {percentage >= 90 ? "🌟 Excellent work!" :
                 percentage >= 80 ? "🎯 Great job!" :
                 percentage >= 70 ? "👍 Good effort!" :
                 "📚 Keep studying!"}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={onComplete}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-rajdhani"
                >
                  View Leaderboard
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="px-8 py-3 text-lg font-rajdhani"
                >
                  Take Another Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-6 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-accent">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-secondary/20 rounded-full h-2">
            <motion.div 
              className="bg-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl font-orbitron flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              {quiz.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-6 font-rajdhani">
                  {currentQuestion.question}
                </h3>
                
                <RadioGroup
                  value={answers[currentQuestionIndex]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 text-lg cursor-pointer font-exo"
                      >
                        <span className="font-medium mr-3">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-primary/20">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="px-6 py-3 font-rajdhani"
                >
                  Previous
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  {Object.keys(answers).length}/{quiz.questions.length} answered
                </div>
                
                <Button
                  onClick={handleNext}
                  disabled={answers[currentQuestionIndex] === undefined || isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-rajdhani"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : isLastQuestion ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit Quiz
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Back to Quizzes */}
      <div className="text-center mt-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-muted-foreground hover:text-primary font-exo"
        >
          ← Back to Quizzes
        </Button>
      </div>
    </div>
  );
};

export default QuizTaker;