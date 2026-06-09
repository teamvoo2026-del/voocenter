-- Migration: Payments Module
-- Creates the payments table, policies, and an aggregated trigger for paid_amount

CREATE TYPE public.payment_method_t AS ENUM ('كاش', 'فودافون كاش', 'إنستاباي', 'تحويل بنكي');

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  payment_method public.payment_method_t NOT NULL,
  payment_date date NOT NULL DEFAULT current_date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;

CREATE POLICY "auth all payments" ON public.payments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Indexes for fast querying
CREATE INDEX idx_payments_student_id ON public.payments(student_id);
CREATE INDEX idx_payments_course_id ON public.payments(course_id);
CREATE INDEX idx_payments_date ON public.payments(payment_date);

-- Trigger to update updated_at
CREATE TRIGGER trg_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.forms_set_updated_at();

-- Function and trigger to auto-update course_students paid_amount
CREATE OR REPLACE FUNCTION public.recalculate_course_student_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_student_id uuid;
  v_course_id uuid;
  v_total_paid numeric;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_student_id := OLD.student_id;
    v_course_id := OLD.course_id;
  ELSE
    v_student_id := NEW.student_id;
    v_course_id := NEW.course_id;
  END IF;

  -- Calculate the total payments for this specific student and course
  SELECT COALESCE(SUM(amount), 0) INTO v_total_paid
  FROM public.payments
  WHERE student_id = v_student_id AND course_id = v_course_id;

  -- Update the course_students table
  UPDATE public.course_students
  SET paid_amount = v_total_paid
  WHERE student_id = v_student_id AND course_id = v_course_id;

  -- If this was an UPDATE that changed the course or student (should be rare, but possible),
  -- we also need to recalculate for the OLD references
  IF TG_OP = 'UPDATE' AND (OLD.student_id != NEW.student_id OR OLD.course_id != NEW.course_id) THEN
    SELECT COALESCE(SUM(amount), 0) INTO v_total_paid
    FROM public.payments
    WHERE student_id = OLD.student_id AND course_id = OLD.course_id;

    UPDATE public.course_students
    SET paid_amount = v_total_paid
    WHERE student_id = OLD.student_id AND course_id = OLD.course_id;
  END IF;

  RETURN NULL; -- AFTER trigger
END;
$$;

-- Fire AFTER so the row is already inserted/deleted/updated in the table
CREATE TRIGGER trg_payments_balance_update
AFTER INSERT OR UPDATE OR DELETE ON public.payments
FOR EACH ROW EXECUTE FUNCTION public.recalculate_course_student_balance();
