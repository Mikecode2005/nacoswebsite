-- Create complaints table for feedback and suggestions
CREATE TABLE public.complaints (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'suggestion', -- 'complaint', 'suggestion', 'report'
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'resolved', 'in_progress'
  reported_executive_id uuid NULL, -- for executive reports
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create policies for complaints
CREATE POLICY "Users can create complaints"
  ON public.complaints FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own complaints"
  ON public.complaints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Superadmins can view all complaints"
  ON public.complaints FOR SELECT
  USING (has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Superadmins can update complaints"
  ON public.complaints FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::user_role));

-- Create hall of fame table
CREATE TABLE public.hall_of_fame (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  achievement text NOT NULL,
  category text NOT NULL DEFAULT 'student', -- 'student', 'lecturer'
  gpa text NULL, -- for students
  year text NOT NULL,
  project text NULL, -- for students
  department text NULL, -- for lecturers
  specialization text NULL, -- for lecturers
  image_url text NULL,
  bio text NULL,
  rank_position integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hall_of_fame ENABLE ROW LEVEL SECURITY;

-- Create policies for hall of fame
CREATE POLICY "Everyone can view hall of fame"
  ON public.hall_of_fame FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage hall of fame"
  ON public.hall_of_fame FOR ALL
  USING (has_role(auth.uid(), 'admin'::user_role));

-- Create tech giants table
CREATE TABLE public.tech_giants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  position text NOT NULL,
  company text NOT NULL,
  bio text NULL,
  image_url text NULL,
  achievements text NULL,
  years_experience integer NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tech_giants ENABLE ROW LEVEL SECURITY;

-- Create policies for tech giants
CREATE POLICY "Everyone can view tech giants"
  ON public.tech_giants FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage tech giants"
  ON public.tech_giants FOR ALL
  USING (has_role(auth.uid(), 'admin'::user_role));

-- Add trigger for updated_at
CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hall_of_fame_updated_at
  BEFORE UPDATE ON public.hall_of_fame
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tech_giants_updated_at
  BEFORE UPDATE ON public.tech_giants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for tech giants
INSERT INTO public.tech_giants (name, position, company, bio, achievements, years_experience, image_url) VALUES
('Mark Zuckerberg', 'CEO & Founder', 'Meta (Facebook)', 'Co-founder and CEO of Meta, leading the development of the metaverse and social technologies that connect billions of people worldwide. Started Facebook from his Harvard dorm room and has grown it into one of the world''s largest technology companies.', 'Founded Facebook, Built global social network, Leading metaverse development', 20, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'),
('Sundar Pichai', 'CEO', 'Google & Alphabet', 'CEO of Alphabet Inc. and Google, driving innovation in artificial intelligence, cloud computing, and search technologies. Under his leadership, Google has expanded into AI, autonomous vehicles, and quantum computing.', 'Leading Google AI initiatives, Expanded cloud services globally, Advanced quantum computing research', 18, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'),
('Satya Nadella', 'CEO', 'Microsoft', 'Leading Microsoft''s transformation to a cloud-first, AI-powered company. Has successfully repositioned Microsoft as a leader in cloud computing, productivity software, and enterprise solutions.', 'Transformed Microsoft to cloud-first, Built Azure platform, Advanced AI integration', 22, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face'),
('Tim Cook', 'CEO', 'Apple', 'CEO of Apple Inc., leading the company to record-breaking revenues and expanding Apple''s ecosystem of products and services. Known for operational excellence and supply chain management.', 'Led Apple to trillion-dollar valuation, Expanded services revenue, Advanced privacy initiatives', 25, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face');

-- Insert sample data for hall of fame
INSERT INTO public.hall_of_fame (name, achievement, category, gpa, year, project, rank_position) VALUES
('Adebayo Oluwaseun', 'Best Final Year Project 2024', 'student', '4.95', '2024', 'AI-Powered Learning Management System', 1),
('Fatima Muhammad', 'Outstanding Academic Performance', 'student', '4.89', '2024', 'Blockchain-based Student Record System', 2),
('Chinedu Okwu', 'Innovation in Software Development', 'student', '4.85', '2023', 'Smart Campus Navigation App', 3),
('Dr. Sarah Johnson', 'Excellence in Research', 'lecturer', NULL, '2023', NULL, 1),
('Prof. Michael Chen', 'Outstanding Teaching Award', 'lecturer', NULL, '2024', NULL, 2);

-- Add upcoming events data
INSERT INTO public.events (title, description, event_date, location, image_url, registration_link, created_by) VALUES
('NACOS Hackathon 2024', 'Join us for the biggest coding competition of the year! Build innovative solutions and compete for amazing prizes.', '2024-08-15 09:00:00+00', 'Computer Science Department', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop', 'https://forms.google.com/hackathon2024', '6bd6df8e-81b4-4c43-a1bb-4fa3c72a131a'),
('Tech Bootcamp: Full Stack Development', 'Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, and cloud deployment.', '2024-08-22 10:00:00+00', 'ICT Center', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop', 'https://forms.google.com/bootcamp2024', '6bd6df8e-81b4-4c43-a1bb-4fa3c72a131a'),
('AI & Machine Learning Workshop', 'Hands-on workshop exploring artificial intelligence and machine learning concepts with practical projects.', '2024-09-05 14:00:00+00', 'Lab A & B', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop', 'https://forms.google.com/aiworkshop2024', '6bd6df8e-81b4-4c43-a1bb-4fa3c72a131a');