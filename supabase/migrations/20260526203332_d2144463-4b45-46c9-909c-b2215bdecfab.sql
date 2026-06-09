
-- Enums
CREATE TYPE public.gender_t AS ENUM ('ذكر','أنثى');
CREATE TYPE public.target_gender_t AS ENUM ('ذكور','إناث','مختلط');
CREATE TYPE public.payment_status_t AS ENUM ('مدفوع','غير مدفوع','مدفوع جزئياً');
CREATE TYPE public.attendance_status_t AS ENUM ('حاضر','غائب','متأخر');
CREATE TYPE public.location_t AS ENUM ('A','B','C');
CREATE TYPE public.stage_t AS ENUM ('ابتدائي صغير','ابتدائي كبير','إعدادي','ثانوي','جامعة / متخرج');
CREATE TYPE public.academic_year_t AS ENUM (
  'الصف الأول الابتدائي','الصف الثاني الابتدائي','الصف الثالث الابتدائي',
  'الصف الرابع الابتدائي','الصف الخامس الابتدائي','الصف السادس الابتدائي',
  'الصف الأول الإعدادي','الصف الثاني الإعدادي','الصف الثالث الإعدادي',
  'الصف الأول الثانوي','الصف الثاني الثانوي','الصف الثالث الثانوي',
  'الفرقة الأولى جامعة','الفرقة الثانية جامعة','الفرقة الثالثة جامعة',
  'الفرقة الرابعة جامعة','الفرقة الخامسة جامعة','متخرج'
);

-- Stage derivation function
CREATE OR REPLACE FUNCTION public.derive_stage(_y public.academic_year_t)
RETURNS public.stage_t LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE _y
    WHEN 'الصف الأول الابتدائي' THEN 'ابتدائي صغير'::public.stage_t
    WHEN 'الصف الثاني الابتدائي' THEN 'ابتدائي صغير'
    WHEN 'الصف الثالث الابتدائي' THEN 'ابتدائي صغير'
    WHEN 'الصف الرابع الابتدائي' THEN 'ابتدائي كبير'
    WHEN 'الصف الخامس الابتدائي' THEN 'ابتدائي كبير'
    WHEN 'الصف السادس الابتدائي' THEN 'ابتدائي كبير'
    WHEN 'الصف الأول الإعدادي' THEN 'إعدادي'
    WHEN 'الصف الثاني الإعدادي' THEN 'إعدادي'
    WHEN 'الصف الثالث الإعدادي' THEN 'إعدادي'
    WHEN 'الصف الأول الثانوي' THEN 'ثانوي'
    WHEN 'الصف الثاني الثانوي' THEN 'ثانوي'
    WHEN 'الصف الثالث الثانوي' THEN 'ثانوي'
    ELSE 'جامعة / متخرج'
  END;
$$;

-- Students
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender public.gender_t NOT NULL,
  academic_year public.academic_year_t NOT NULL,
  stage public.stage_t NOT NULL,
  parent_phone TEXT NOT NULL,
  student_phone TEXT,
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_status public.payment_status_t NOT NULL DEFAULT 'غير مدفوع',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all students" ON public.students FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_student_stage() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.stage := public.derive_stage(NEW.academic_year); RETURN NEW; END; $$;
CREATE TRIGGER trg_set_student_stage BEFORE INSERT OR UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION public.set_student_stage();

-- Instructors
CREATE TABLE public.instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.instructors TO authenticated;
GRANT ALL ON public.instructors TO service_role;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all instructors" ON public.instructors FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Courses
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  target_stage public.stage_t[] NOT NULL DEFAULT '{}',
  target_gender public.target_gender_t NOT NULL DEFAULT 'مختلط',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all courses" ON public.courses FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course-Instructors (many-to-many)
CREATE TABLE public.course_instructors (
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES public.instructors(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, instructor_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_instructors TO authenticated;
GRANT ALL ON public.course_instructors TO service_role;
ALTER TABLE public.course_instructors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all ci" ON public.course_instructors FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course-Students (enrollment)
CREATE TABLE public.course_students (
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_students TO authenticated;
GRANT ALL ON public.course_students TO service_role;
ALTER TABLE public.course_students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all cs" ON public.course_students FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Lectures
CREATE TABLE public.lectures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES public.instructors(id) ON DELETE RESTRICT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location public.location_t NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lectures TO authenticated;
GRANT ALL ON public.lectures TO service_role;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all lectures" ON public.lectures FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Attendance
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecture_id UUID NOT NULL REFERENCES public.lectures(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  status public.attendance_status_t NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (lecture_id, student_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance TO authenticated;
GRANT ALL ON public.attendance TO service_role;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth all attendance" ON public.attendance FOR ALL TO authenticated USING (true) WITH CHECK (true);
