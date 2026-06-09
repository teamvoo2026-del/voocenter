import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
const useCourseRuns = () => useQuery({
  queryKey: ["course_runs"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_runs").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }
});
const useCourseRunSchedules = () => useQuery({
  queryKey: ["course_run_schedules"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_run_schedules").select("*");
    if (error) throw error;
    return data;
  }
});
const useStudents = () => useQuery({
  queryKey: ["students"],
  queryFn: async () => {
    const { data, error } = await supabase.from("students").select("*").order("full_name");
    if (error) throw error;
    return data;
  }
});
const useInstructors = () => useQuery({
  queryKey: ["instructors"],
  queryFn: async () => {
    const { data, error } = await supabase.from("instructors").select("*").order("full_name");
    if (error) throw error;
    return data;
  }
});
const useCourses = () => useQuery({
  queryKey: ["courses"],
  queryFn: async () => {
    const { data, error } = await supabase.from("courses").select("*").order("name");
    if (error) throw error;
    return data;
  }
});
const useLectures = () => useQuery({
  queryKey: ["lectures"],
  queryFn: async () => {
    const { data, error } = await supabase.from("lectures").select("*").order("date", { ascending: false });
    if (error) throw error;
    return data;
  }
});
const useCourseInstructors = () => useQuery({
  queryKey: ["course_instructors"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_instructors").select("*");
    if (error) throw error;
    return data;
  }
});
const useCourseStudents = () => useQuery({
  queryKey: ["course_students"],
  queryFn: async () => {
    const { data, error } = await supabase.from("course_students").select("*");
    if (error) throw error;
    return data;
  }
});
const useAttendance = () => useQuery({
  queryKey: ["attendance"],
  queryFn: async () => {
    const { data, error } = await supabase.from("attendance").select("*");
    if (error) throw error;
    return data;
  }
});
const usePayments = () => useQuery({
  queryKey: ["payments"],
  queryFn: async () => {
    const { data, error } = await supabase.from("payments").select("*, students(full_name), courses(name)").order("payment_date", { ascending: false });
    if (error) throw error;
    return data;
  }
});
const STUDENT_STATUSES = [
  { value: "active", label: "نشط", color: "bg-emerald-500" },
  { value: "inactive", label: "غير نشط", color: "bg-slate-400" },
  { value: "graduated", label: "متخرج", color: "bg-blue-500" },
  { value: "suspended", label: "موقوف", color: "bg-red-500" }
];
const RUN_STATUSES = [
  { value: "open", label: "مفتوحة للتسجيل" },
  { value: "active", label: "جارية" },
  { value: "completed", label: "مكتملة" },
  { value: "cancelled", label: "ملغاة" }
];
export {
  RUN_STATUSES as R,
  STUDENT_STATUSES as S,
  useCourses as a,
  useCourseStudents as b,
  useLectures as c,
  useInstructors as d,
  useCourseInstructors as e,
  useAttendance as f,
  usePayments as g,
  useCourseRuns as h,
  useCourseRunSchedules as i,
  useStudents as u
};
