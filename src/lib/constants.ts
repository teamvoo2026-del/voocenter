export const ACADEMIC_YEARS = [
  "الصف الأول الابتدائي","الصف الثاني الابتدائي","الصف الثالث الابتدائي",
  "الصف الرابع الابتدائي","الصف الخامس الابتدائي","الصف السادس الابتدائي",
  "الصف الأول الإعدادي","الصف الثاني الإعدادي","الصف الثالث الإعدادي",
  "الصف الأول الثانوي","الصف الثاني الثانوي","الصف الثالث الثانوي",
  "الفرقة الأولى جامعة","الفرقة الثانية جامعة","الفرقة الثالثة جامعة",
  "الفرقة الرابعة جامعة","الفرقة الخامسة جامعة","متخرج",
] as const;
export type AcademicYear = typeof ACADEMIC_YEARS[number];

export const STAGES = ["ابتدائي صغير","ابتدائي كبير","إعدادي","ثانوي","جامعة / متخرج"] as const;
export type Stage = typeof STAGES[number];

export const GENDERS = ["ذكر","أنثى"] as const;
export const TARGET_GENDERS = ["ذكور","إناث","مختلط"] as const;
export const PAYMENT_STATUSES = ["مدفوع","غير مدفوع","مدفوع جزئياً"] as const;
export const PAYMENT_METHODS = ["كاش","فودافون كاش","إنستاباي","تحويل بنكي"] as const;
export const ATTENDANCE_STATUSES = ["حاضر","غائب","متأخر"] as const;
export const LOCATIONS = ["A","B","C"] as const;
export const WEEKDAYS = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"] as const;

export function deriveStage(y: AcademicYear): Stage {
  if (y.includes("الأول الابتدائي") || y.includes("الثاني الابتدائي") || y.includes("الثالث الابتدائي")) return "ابتدائي صغير";
  if (y.includes("الرابع الابتدائي") || y.includes("الخامس الابتدائي") || y.includes("السادس الابتدائي")) return "ابتدائي كبير";
  if (y.includes("الإعدادي")) return "إعدادي";
  if (y.includes("الثانوي")) return "ثانوي";
  return "جامعة / متخرج";
}

export function calcAge(birth: string): number {
  const b = new Date(birth);
  const t = new Date();
  let a = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
  return a;
}

export const LOCATION_COLORS: Record<string, string> = {
  A: "bg-blue-100 text-blue-800 border-blue-300",
  B: "bg-green-100 text-green-800 border-green-300",
  C: "bg-orange-100 text-orange-800 border-orange-300",
};

export function formatArabicDate(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}
