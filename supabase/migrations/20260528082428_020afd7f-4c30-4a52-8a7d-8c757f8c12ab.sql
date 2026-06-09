
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price numeric NOT NULL DEFAULT 0;
ALTER TABLE public.course_students ADD COLUMN IF NOT EXISTS discount numeric NOT NULL DEFAULT 0;
ALTER TABLE public.course_students ADD COLUMN IF NOT EXISTS paid_amount numeric NOT NULL DEFAULT 0;
