
CREATE TABLE public.camps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  target_levels text[] NOT NULL DEFAULT '{}',
  weeks integer NOT NULL DEFAULT 1 CHECK (weeks > 0),
  sessions_per_week integer NOT NULL DEFAULT 1 CHECK (sessions_per_week > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.camps TO authenticated;
GRANT ALL ON public.camps TO service_role;
ALTER TABLE public.camps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all camps" ON public.camps FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.camp_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id uuid NOT NULL REFERENCES public.camps(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL DEFAULT '#3b82f6',
  icon text NOT NULL DEFAULT '📚',
  hours integer NOT NULL DEFAULT 0 CHECK (hours >= 0),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.camp_subjects TO authenticated;
GRANT ALL ON public.camp_subjects TO service_role;
ALTER TABLE public.camp_subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all camp_subjects" ON public.camp_subjects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.camp_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id uuid NOT NULL REFERENCES public.camps(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  parent_phone text NOT NULL,
  email text,
  level text NOT NULL,
  grade integer NOT NULL CHECK (grade > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.camp_students TO authenticated;
GRANT ALL ON public.camp_students TO service_role;
ALTER TABLE public.camp_students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all camp_students" ON public.camp_students FOR ALL TO authenticated USING (true) WITH CHECK (true);
