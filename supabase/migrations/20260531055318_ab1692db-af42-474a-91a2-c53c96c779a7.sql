CREATE TABLE public.supplies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  total_quantity integer NOT NULL DEFAULT 1 CHECK (total_quantity >= 0),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.supplies TO authenticated;
GRANT ALL ON public.supplies TO service_role;

ALTER TABLE public.supplies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth all supplies" ON public.supplies FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.supply_loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supply_id uuid NOT NULL REFERENCES public.supplies(id) ON DELETE CASCADE,
  borrower_name text NOT NULL,
  borrower_phone text,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  borrowed_at timestamptz NOT NULL DEFAULT now(),
  returned_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.supply_loans TO authenticated;
GRANT ALL ON public.supply_loans TO service_role;

ALTER TABLE public.supply_loans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth all supply_loans" ON public.supply_loans FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX idx_supply_loans_supply ON public.supply_loans(supply_id) WHERE returned_at IS NULL;

CREATE OR REPLACE FUNCTION public.check_loan_availability()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  total INTEGER;
  borrowed INTEGER;
BEGIN
  IF NEW.returned_at IS NOT NULL THEN
    RETURN NEW;
  END IF;
  SELECT total_quantity INTO total FROM public.supplies WHERE id = NEW.supply_id;
  SELECT COALESCE(SUM(quantity), 0) INTO borrowed
    FROM public.supply_loans
    WHERE supply_id = NEW.supply_id
      AND returned_at IS NULL
      AND (TG_OP = 'INSERT' OR id <> NEW.id);
  IF (borrowed + NEW.quantity) > total THEN
    RAISE EXCEPTION 'الكمية المطلوبة غير متاحة. المتاح: %', (total - borrowed);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_check_loan_availability
BEFORE INSERT OR UPDATE ON public.supply_loans
FOR EACH ROW EXECUTE FUNCTION public.check_loan_availability();