import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type StudentStatus = "active" | "inactive" | "graduated" | "suspended";

export type Student = {
  id: string; full_name: string; birth_date: string; gender: "ذكر"|"أنثى";
  academic_year: string; stage: string; parent_phone: string; student_phone: string | null;
  enrollment_date: string; payment_status: "مدفوع"|"غير مدفوع"|"مدفوع جزئياً"; notes: string | null;
  status?: StudentStatus; student_code?: string | null; marketing_source?: string | null;
};
export type Instructor = { id: string; full_name: string; specialty: string; phone: string; is_active: boolean; notes: string | null; };
export type Course = { id: string; name: string; subject: string; target_stage: string[]; target_gender: "ذكور"|"إناث"|"مختلط"; description: string | null; syllabus: string | null; price: number; min_batch_size?: number; level?: string | null; };
export type CourseStudent = { course_id: string; student_id: string; discount: number; paid_amount: number; run_id: string | null; agreed_price?: number; };
export type Lecture = { id: string; course_id: string; instructor_id: string; date: string; start_time: string; end_time: string; location: "A"|"B"|"C"; notes: string | null; run_id: string | null; };
export type Attendance = { id: string; lecture_id: string; student_id: string; status: "حاضر"|"غائب"|"متأخر"; notes: string | null; };
export type RunStatus = "open" | "active" | "completed" | "cancelled";
export type CourseRun = { id: string; course_id: string; name: string; instructor_id: string | null; location: string | null; start_date: string | null; end_date: string | null; notes: string | null; min_capacity?: number; max_capacity?: number; status?: RunStatus; };
export type CourseRunSchedule = { id: string; run_id: string; weekday: number; start_time: string; end_time: string; };

export const useCourseRuns = () => useQuery({
  queryKey: ["course_runs"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_runs" as any).select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data as unknown as CourseRun[];
  },
});

export const useCourseRunSchedules = () => useQuery({
  queryKey: ["course_run_schedules"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_run_schedules" as any).select("*");
    if (error) throw error;
    return data as unknown as CourseRunSchedule[];
  },
});

export const useStudents = () => useQuery({
  queryKey: ["students"],
  queryFn: async () => {
    const { data, error } = await supabase.from("students").select("*").order("full_name");
    if (error) throw error;
    return data as unknown as Student[];
  },
});

export const useInstructors = () => useQuery({
  queryKey: ["instructors"],
  queryFn: async () => {
    const { data, error } = await supabase.from("instructors").select("*").order("full_name");
    if (error) throw error;
    return data as Instructor[];
  },
});

export const useCourses = () => useQuery({
  queryKey: ["courses"],
  queryFn: async () => {
    const { data, error } = await supabase.from("courses").select("*").order("name");
    if (error) throw error;
    return data as unknown as Course[];
  },
});

export const useLectures = () => useQuery({
  queryKey: ["lectures"],
  queryFn: async () => {
    const { data, error } = await supabase.from("lectures").select("*").order("date", { ascending: false });
    if (error) throw error;
    return data as Lecture[];
  },
});

export const useCourseInstructors = () => useQuery({
  queryKey: ["course_instructors"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_instructors").select("*");
    if (error) throw error;
    return data as { course_id: string; instructor_id: string }[];
  },
});

export const useCourseStudents = () => useQuery({
  queryKey: ["course_students"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_students").select("*");
    if (error) throw error;
    return data as CourseStudent[];
  },
});

export const useAttendance = () => useQuery({
  queryKey: ["attendance"],
  queryFn: async () => {
    const { data, error } = await supabase.from("attendance").select("*");
    if (error) throw error;
    return data as Attendance[];
  },
});

export type Payment = {
  id: string;
  student_id: string;
  course_id: string;
  amount: number;
  payment_method: string;
  payment_date: string;
  notes: string | null;
  created_at?: string;
  students?: { full_name: string } | null;
  courses?: { name: string } | null;
};

export const usePayments = () => useQuery({
  queryKey: ["payments"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("payments" as any)
      .select("*, students(full_name), courses(name)")
      .order("payment_date", { ascending: false });
    if (error) throw error;
    return data as unknown as Payment[];
  },
});

export const STUDENT_STATUSES: { value: StudentStatus; label: string; color: string }[] = [
  { value: "active",    label: "نشط",      color: "bg-emerald-500" },
  { value: "inactive",  label: "غير نشط",  color: "bg-slate-400" },
  { value: "graduated", label: "متخرج",    color: "bg-blue-500" },
  { value: "suspended", label: "موقوف",    color: "bg-red-500" },
];

export const RUN_STATUSES: { value: RunStatus; label: string }[] = [
  { value: "open",      label: "مفتوحة للتسجيل" },
  { value: "active",    label: "جارية" },
  { value: "completed", label: "مكتملة" },
  { value: "cancelled", label: "ملغاة" },
];
