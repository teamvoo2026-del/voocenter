
CREATE TABLE public.course_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL,
  name TEXT NOT NULL,
  instructor_id UUID,
  location TEXT,
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_runs TO authenticated;
GRANT ALL ON public.course_runs TO service_role;
ALTER TABLE public.course_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all course_runs" ON public.course_runs FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.course_run_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID NOT NULL REFERENCES public.course_runs(id) ON DELETE CASCADE,
  weekday SMALLINT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_run_schedules TO authenticated;
GRANT ALL ON public.course_run_schedules TO service_role;
ALTER TABLE public.course_run_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all course_run_schedules" ON public.course_run_schedules FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.course_students ADD COLUMN run_id UUID;
ALTER TABLE public.lectures ADD COLUMN run_id UUID;
