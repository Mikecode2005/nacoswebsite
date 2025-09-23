-- Create quiz_attempts table to store quiz results
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  time_taken INTEGER, -- in seconds
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts" 
ON public.quiz_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'superadmin'::user_role));

-- Create trigger for timestamps
CREATE TRIGGER update_quiz_attempts_created_at
BEFORE UPDATE ON public.quiz_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();