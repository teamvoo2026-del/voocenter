
-- Camp session slots: weekly day/time slots
CREATE TABLE public.camp_session_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  camp_id UUID NOT NULL REFERENCES public.camps(id) ON DELETE CASCADE,
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.camp_session_slots TO authenticated;
GRANT ALL ON public.camp_session_slots TO service_role;
ALTER TABLE public.camp_session_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all camp_session_slots" ON public.camp_session_slots FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Camp attendance per student per (week, slot)
CREATE TABLE public.camp_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  camp_id UUID NOT NULL REFERENCES public.camps(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES public.camp_session_slots(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL CHECK (week_number >= 1),
  student_id UUID NOT NULL REFERENCES public.camp_students(id) ON DELETE CASCADE,
  status public.attendance_status_t NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (slot_id, week_number, student_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.camp_attendance TO authenticated;
GRANT ALL ON public.camp_attendance TO service_role;
ALTER TABLE public.camp_attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all camp_attendance" ON public.camp_attendance FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX idx_camp_session_slots_camp ON public.camp_session_slots(camp_id);
CREATE INDEX idx_camp_attendance_lookup ON public.camp_attendance(camp_id, week_number, slot_id);
