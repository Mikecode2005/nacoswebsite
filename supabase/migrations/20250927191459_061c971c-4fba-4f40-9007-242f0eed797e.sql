-- Remove the restrictive category check constraint to allow any category value
ALTER TABLE public.gallery DROP CONSTRAINT gallery_category_check;