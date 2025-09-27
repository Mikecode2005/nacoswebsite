-- Add level field to past_questions table
ALTER TABLE public.past_questions 
ADD COLUMN level integer CHECK (level IN (100, 200, 300, 400));

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);

-- Create storage policies for gallery images
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update gallery images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete gallery images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

-- Create storage bucket for past questions files
INSERT INTO storage.buckets (id, name, public) VALUES ('past-questions', 'past-questions', true);

-- Create storage policies for past questions files
CREATE POLICY "Past question files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'past-questions');

CREATE POLICY "Authenticated users can upload past question files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'past-questions' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update past question files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'past-questions' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete past question files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'past-questions' AND auth.uid() IS NOT NULL);