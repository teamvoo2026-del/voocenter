    -- Migration: Add syllabus column to courses table
    ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS syllabus text;
