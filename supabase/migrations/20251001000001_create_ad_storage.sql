-- Create storage bucket for ad carousel images
INSERT INTO storage.buckets (id, name, public) VALUES ('ad-images', 'ad-images', true);

-- Create storage policies for ad images
CREATE POLICY "Ad images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'ad-images');

CREATE POLICY "Authenticated users can upload ad images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'ad-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update ad images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'ad-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete ad images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'ad-images' AND auth.uid() IS NOT NULL);
