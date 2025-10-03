-- Add level column to learning_resources table
ALTER TABLE public.learning_resources 
ADD COLUMN level integer;

-- Add index for better performance
CREATE INDEX idx_learning_resources_level ON public.learning_resources(level);