import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
const FIELD_TYPE_LABELS = {
  short_answer: "إجابة قصيرة",
  paragraph: "فقرة",
  multiple_choice: "اختيار من متعدد",
  checkboxes: "مربعات اختيار",
  dropdown: "قائمة منسدلة",
  linear_scale: "مقياس خطي",
  date: "تاريخ",
  time: "وقت"
};
const HEADER_COLORS = [
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#009688",
  "#4CAF50",
  "#FF9800",
  "#FF5722",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#607D8B",
  "#795548"
];
function newField(type = "short_answer") {
  const base = {
    id: crypto.randomUUID(),
    type,
    title: "سؤال بدون عنوان",
    required: false
  };
  if (["multiple_choice", "checkboxes", "dropdown"].includes(type)) {
    base.options = ["خيار 1"];
  }
  if (type === "linear_scale") {
    base.scale_min = 1;
    base.scale_max = 5;
    base.scale_min_label = "";
    base.scale_max_label = "";
  }
  return base;
}
function slugify(title) {
  const base = title.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "").replace(/\s+/g, "-").slice(0, 40) || "form";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}
const useForms = () => useQuery({
  queryKey: ["forms"],
  queryFn: async () => {
    const { data, error } = await supabase.from("forms").select("*").order("updated_at", { ascending: false });
    if (error) throw error;
    return data;
  }
});
const useForm = (id) => useQuery({
  queryKey: ["forms", id],
  enabled: !!id,
  queryFn: async () => {
    const { data, error } = await supabase.from("forms").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data;
  }
});
const useFormBySlug = (slug) => useQuery({
  queryKey: ["forms", "slug", slug],
  enabled: !!slug,
  queryFn: async () => {
    const { data, error } = await supabase.from("forms").select("*").eq("slug", slug).eq("is_active", true).maybeSingle();
    if (error) throw error;
    return data;
  }
});
const useFormResponses = (formId) => useQuery({
  queryKey: ["form_responses", formId],
  enabled: !!formId,
  queryFn: async () => {
    const { data, error } = await supabase.from("form_responses").select("*").eq("form_id", formId).order("submitted_at", { ascending: false });
    if (error) throw error;
    return data;
  }
});
const useFormResponseCounts = () => useQuery({
  queryKey: ["form_response_counts"],
  queryFn: async () => {
    const { data, error } = await supabase.from("form_responses").select("form_id");
    if (error) throw error;
    const counts = {};
    for (const r of data) {
      counts[r.form_id] = (counts[r.form_id] ?? 0) + 1;
    }
    return counts;
  }
});
export {
  FIELD_TYPE_LABELS as F,
  HEADER_COLORS as H,
  useFormResponseCounts as a,
  useFormBySlug as b,
  useForm as c,
  useFormResponses as d,
  newField as n,
  slugify as s,
  useForms as u
};
