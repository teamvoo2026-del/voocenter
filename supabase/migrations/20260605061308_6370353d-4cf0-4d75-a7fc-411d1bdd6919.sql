
-- Phase 2: Schema additions for student status, batch capacity, course min batch size

-- Students: status, student code, marketing source
ALTER TABLE public.students 
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active' 
    CHECK (status IN ('active','inactive','graduated','suspended'));
ALTER TABLE public.students 
  ADD COLUMN IF NOT EXISTS student_code TEXT UNIQUE;
ALTER TABLE public.students 
  ADD COLUMN IF NOT EXISTS marketing_source TEXT;

-- Course runs: capacity and status
ALTER TABLE public.course_runs 
  ADD COLUMN IF NOT EXISTS min_capacity INT NOT NULL DEFAULT 5;
ALTER TABLE public.course_runs 
  ADD COLUMN IF NOT EXISTS max_capacity INT NOT NULL DEFAULT 25;
ALTER TABLE public.course_runs 
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open','active','completed','cancelled'));

-- Courses: min batch size + level
ALTER TABLE public.courses 
  ADD COLUMN IF NOT EXISTS min_batch_size INT NOT NULL DEFAULT 8;
ALTER TABLE public.courses 
  ADD COLUMN IF NOT EXISTS level TEXT;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_course_students_course_run ON public.course_students(course_id, run_id);
CREATE INDEX IF NOT EXISTS idx_attendance_lecture ON public.attendance(lecture_id);
CREATE INDEX IF NOT EXISTS idx_lectures_run ON public.lectures(run_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);

-- Auto-generate student_code for existing rows (ST0001, ST0002 ...)
DO $$
DECLARE
  r RECORD;
  i INT := 1;
BEGIN
  FOR r IN SELECT id FROM public.students WHERE student_code IS NULL ORDER BY created_at LOOP
    UPDATE public.students SET student_code = 'ST' || LPAD(i::text, 4, '0') WHERE id = r.id;
    i := i + 1;
  END LOOP;
END $$;

-- Sequence for new codes
CREATE SEQUENCE IF NOT EXISTS public.student_code_seq START 1;
SELECT setval('public.student_code_seq', 
  COALESCE((SELECT MAX(CAST(SUBSTRING(student_code FROM 3) AS INT)) FROM public.students WHERE student_code ~ '^ST[0-9]+$'), 0) + 1, 
  false);
