-- Create ad_carousel table for advertisements
CREATE TABLE public.ad_carousel (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_id UUID,
    image_url TEXT,
    button_text TEXT DEFAULT 'Learn More',
    button_link TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ad_carousel ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can view active ads"
ON public.ad_carousel
FOR SELECT
USING (is_active = true);

CREATE POLICY "Only admins can manage ads"
ON public.ad_carousel
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ad_carousel_updated_at
BEFORE UPDATE ON public.ad_carousel
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample ad carousel data
INSERT INTO public.ad_carousel (title, subtitle, image_url, button_text, button_link, display_order, is_active) VALUES
('NACOS Hackathon 2025', 'Join the biggest coding competition of the year! Build innovative solutions and compete for amazing prizes.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=600&fit=crop', 'Register Now', '/events', 1, true),
('Learn From The Best', 'Access past questions, quizzes, and resources to ace your exams', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=600&fit=crop', 'Explore Resources', '/resources', 2, true),
('Join Our Community', 'Connect with fellow computer science students and grow together', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop', 'Join Now', '/complaints', 3, true);
