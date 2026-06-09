CREATE TABLE public.course_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL,
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location location_t NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_schedules TO authenticated;
GRANT ALL ON public.course_schedules TO service_role;

ALTER TABLE public.course_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth all course_schedules" ON public.course_schedules FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX idx_course_schedules_course ON public.course_schedules(course_id);