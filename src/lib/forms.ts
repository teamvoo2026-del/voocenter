import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type FieldType =
  | "short_answer"
  | "paragraph"
  | "multiple_choice"
  | "checkboxes"
  | "dropdown"
  | "linear_scale"
  | "date"
  | "time";

export type FormField = {
  id: string;
  type: FieldType;
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  scale_min?: number;
  scale_max?: number;
  scale_min_label?: string;
  scale_max_label?: string;
};

export type FormMode = "all_at_once" | "one_at_a_time";

export type FormRow = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  header_color: string;
  fields: FormField[];
  form_mode: FormMode;
  confirmation_message: string;
  show_progress_bar: boolean;
  shuffle_questions: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type FormResponseRow = {
  id: string;
  form_id: string;
  data: Record<string, unknown>;
  submitted_at: string;
};

export const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  short_answer: "إجابة قصيرة",
  paragraph: "فقرة",
  multiple_choice: "اختيار من متعدد",
  checkboxes: "مربعات اختيار",
  dropdown: "قائمة منسدلة",
  linear_scale: "مقياس خطي",
  date: "تاريخ",
  time: "وقت",
};

export const HEADER_COLORS = [
  "#673AB7", "#3F51B5", "#2196F3", "#009688", "#4CAF50",
  "#FF9800", "#FF5722", "#F44336", "#E91E63", "#9C27B0",
  "#607D8B", "#795548",
];

export function newField(type: FieldType = "short_answer"): FormField {
  const base: FormField = {
    id: crypto.randomUUID(),
    type,
    title: "سؤال بدون عنوان",
    required: false,
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

export function slugify(title: string): string {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40) || "form";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

export const useForms = () =>
  useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forms")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as unknown as FormRow[];
    },
  });

export const useForm = (id: string | undefined) =>
  useQuery({
    queryKey: ["forms", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forms")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as FormRow | null;
    },
  });

export const useFormBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: ["forms", "slug", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forms")
        .select("*")
        .eq("slug", slug!)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as FormRow | null;
    },
  });

export const useFormResponses = (formId: string | undefined) =>
  useQuery({
    queryKey: ["form_responses", formId],
    enabled: !!formId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_responses")
        .select("*")
        .eq("form_id", formId!)
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data as unknown as FormResponseRow[];
    },
  });

export const useFormResponseCounts = () =>
  useQuery({
    queryKey: ["form_response_counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_responses")
        .select("form_id");
      if (error) throw error;
      const counts: Record<string, number> = {};
      for (const r of data as { form_id: string }[]) {
        counts[r.form_id] = (counts[r.form_id] ?? 0) + 1;
      }
      return counts;
    },
  });
