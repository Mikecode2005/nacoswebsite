-- Create hall_of_fame table for admin management
CREATE TABLE public.hall_of_fame (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  achievement TEXT NOT NULL,
  gpa TEXT NOT NULL,
  year TEXT NOT NULL,
  project TEXT NOT NULL,
  rank INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hall_of_fame ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view hall of fame" 
ON public.hall_of_fame 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage hall of fame" 
ON public.hall_of_fame 
FOR ALL
USING (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'superadmin'::user_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hall_of_fame_updated_at
BEFORE UPDATE ON public.hall_of_fame
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();