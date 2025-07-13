-- Create events table for upcoming events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  image_url TEXT,
  registration_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Everyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage events" 
ON public.events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::user_role));

-- Create learning resources table
CREATE TABLE public.learning_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  resource_type TEXT NOT NULL DEFAULT 'pdf', -- pdf, image, video, link
  subject TEXT,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

-- Create policies for learning resources
CREATE POLICY "Everyone can view learning resources" 
ON public.learning_resources 
FOR SELECT 
USING (true);

CREATE POLICY "Lecturers and admins can upload resources" 
ON public.learning_resources 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Lecturers and admins can update their resources" 
ON public.learning_resources 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::user_role) OR uploaded_by = auth.uid());

CREATE POLICY "Admins can delete resources" 
ON public.learning_resources 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::user_role));

-- Create trigger for automatic timestamp updates on events
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on learning resources  
CREATE TRIGGER update_learning_resources_updated_at
BEFORE UPDATE ON public.learning_resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample hackathon event
INSERT INTO public.events (title, description, event_date, location, created_by) VALUES 
('NACOS Hackathon 2025', 'Annual coding competition for computer science students. Build innovative solutions and compete for amazing prizes!', '2025-08-15 10:00:00+00', 'Computer Science Laboratory', '00000000-0000-0000-0000-000000000000');