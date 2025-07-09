-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'student');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create past questions table
CREATE TABLE public.past_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  year INTEGER,
  file_url TEXT,
  description TEXT,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'sports', 'events', 'academic')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create executives table
CREATE TABLE public.executives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT,
  bio TEXT,
  email TEXT,
  linkedin TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lecturers table
CREATE TABLE public.lecturers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  specialization TEXT,
  image_url TEXT,
  bio TEXT,
  email TEXT,
  office_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sports table
CREATE TABLE public.sports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  schedule TEXT,
  location TEXT,
  contact_person TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.past_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON public.quizzes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'display_name'),
    new.email
  );
  
  -- Assign default student role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'student');
  
  RETURN new;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blog_posts
CREATE POLICY "Everyone can view published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Users can create blog posts" ON public.blog_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own blog posts" ON public.blog_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for quizzes
CREATE POLICY "Everyone can view quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Only admins can manage quizzes" ON public.quizzes FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update quizzes" ON public.quizzes FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete quizzes" ON public.quizzes FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for past_questions
CREATE POLICY "Everyone can view past questions" ON public.past_questions FOR SELECT USING (true);
CREATE POLICY "Only admins can upload past questions" ON public.past_questions FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update past questions" ON public.past_questions FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete past questions" ON public.past_questions FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for gallery, executives, lecturers, sports (public read, admin write)
CREATE POLICY "Everyone can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Only admins can manage gallery" ON public.gallery FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Everyone can view executives" ON public.executives FOR SELECT USING (true);
CREATE POLICY "Only admins can manage executives" ON public.executives FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Everyone can view lecturers" ON public.lecturers FOR SELECT USING (true);
CREATE POLICY "Only admins can manage lecturers" ON public.lecturers FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Everyone can view sports" ON public.sports FOR SELECT USING (true);
CREATE POLICY "Only admins can manage sports" ON public.sports FOR ALL USING (public.has_role(auth.uid(), 'admin'));