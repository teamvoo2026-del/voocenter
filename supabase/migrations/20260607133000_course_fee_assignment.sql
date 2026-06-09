-- Migration: Course Fee Assignment Rule
-- Implements the agreed_price historical logging for enrollments.

ALTER TABLE public.course_students ADD COLUMN IF NOT EXISTS agreed_price numeric(10,2) NOT NULL DEFAULT 0;

-- Backfill the historical prices for existing enrollments
UPDATE public.course_students cs
SET agreed_price = c.price
FROM public.courses c
WHERE cs.course_id = c.id;

-- Function to automatically assign course price upon enrollment
CREATE OR REPLACE FUNCTION public.set_enrolled_course_price()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If the user provides an agreed_price explicitly (e.g. 0 during testing), allow it, 
  -- but generally we overwrite it with the true price. Usually it defaults to 0 on insert.
  -- To force it, we unconditionally fetch the course price.
  SELECT price INTO NEW.agreed_price
  FROM public.courses
  WHERE id = NEW.course_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_enrolled_course_price
BEFORE INSERT ON public.course_students
FOR EACH ROW EXECUTE FUNCTION public.set_enrolled_course_price();
