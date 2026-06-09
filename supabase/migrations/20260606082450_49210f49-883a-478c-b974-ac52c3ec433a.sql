
CREATE TABLE public.forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'نموذج بدون عنوان',
  description text DEFAULT '',
  slug text NOT NULL UNIQUE,
  header_color text NOT NULL DEFAULT '#673AB7',
  fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  form_mode text NOT NULL DEFAULT 'all_at_once' CHECK (form_mode IN ('all_at_once','one_at_a_time')),
  confirmation_message text NOT NULL DEFAULT 'تم استلام إجابتك. شكراً!',
  show_progress_bar boolean NOT NULL DEFAULT true,
  shuffle_questions boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.forms TO authenticated;
GRANT SELECT ON public.forms TO anon;
GRANT ALL ON public.forms TO service_role;

ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated can manage forms" ON public.forms
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon can read active forms" ON public.forms
  FOR SELECT TO anon USING (is_active = true);

CREATE TABLE public.form_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.form_responses TO authenticated;
GRANT INSERT ON public.form_responses TO anon, authenticated;
GRANT ALL ON public.form_responses TO service_role;

ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert responses" ON public.form_responses
  FOR INSERT TO anon, authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.is_active = true)
  );

CREATE POLICY "authenticated can read responses" ON public.form_responses
  FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_form_responses_form_id ON public.form_responses(form_id);
CREATE INDEX idx_forms_slug ON public.forms(slug);

CREATE OR REPLACE FUNCTION public.forms_set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_forms_updated_at BEFORE UPDATE ON public.forms
  FOR EACH ROW EXECUTE FUNCTION public.forms_set_updated_at();
