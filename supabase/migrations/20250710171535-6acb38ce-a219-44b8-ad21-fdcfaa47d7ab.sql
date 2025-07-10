-- Add superadmin role to existing user_role enum
ALTER TYPE user_role ADD VALUE 'superadmin';
ALTER TYPE user_role ADD VALUE 'lecturer';

-- Assign superadmin role to femimike2005@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'superadmin'::user_role 
FROM auth.users 
WHERE email = 'femimike2005@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create materials table for lecturers to upload content
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  subject TEXT NOT NULL,
  uploaded_by UUID NOT NULL,
  material_type TEXT DEFAULT 'document', -- document, video, assignment, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on materials
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- RLS policies for materials
CREATE POLICY "Everyone can view materials" 
ON public.materials 
FOR SELECT 
USING (true);

CREATE POLICY "Lecturers and admins can insert materials" 
ON public.materials 
FOR INSERT 
WITH CHECK (
  has_role(auth.uid(), 'lecturer') OR 
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

CREATE POLICY "Lecturers can update their own materials" 
ON public.materials 
FOR UPDATE 
USING (
  auth.uid() = uploaded_by OR 
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

CREATE POLICY "Admins and superadmins can delete any materials" 
ON public.materials 
FOR DELETE 
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

-- Create quiz_attempts table for scoreboard
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL,
  user_id UUID NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_taken INTEGER, -- in seconds
  answers JSONB DEFAULT '[]'::jsonb
);

-- Enable RLS on quiz_attempts
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS policies for quiz_attempts
CREATE POLICY "Users can view their own attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attempts" 
ON public.quiz_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

-- Update existing policies to include superadmin and lecturer roles

-- Update quizzes policies to allow lecturers to create
DROP POLICY "Only admins can manage quizzes" ON public.quizzes;
CREATE POLICY "Lecturers and admins can create quizzes" 
ON public.quizzes 
FOR INSERT 
WITH CHECK (
  has_role(auth.uid(), 'lecturer') OR 
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

CREATE POLICY "Creators and admins can update quizzes" 
ON public.quizzes 
FOR UPDATE 
USING (
  auth.uid() = created_by OR 
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

CREATE POLICY "Admins and superadmins can delete quizzes" 
ON public.quizzes 
FOR DELETE 
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'superadmin')
);

-- Update user_roles policies for superadmin management
DROP POLICY "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Superadmins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (has_role(auth.uid(), 'superadmin'));

CREATE POLICY "Admins can manage student and lecturer roles" 
ON public.user_roles 
FOR ALL 
USING (
  has_role(auth.uid(), 'admin') AND 
  role IN ('student', 'lecturer')
);

-- Add trigger for materials updated_at
CREATE TRIGGER update_materials_updated_at
BEFORE UPDATE ON public.materials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();