const ACADEMIC_YEARS = [
  "الصف الأول الابتدائي",
  "الصف الثاني الابتدائي",
  "الصف الثالث الابتدائي",
  "الصف الرابع الابتدائي",
  "الصف الخامس الابتدائي",
  "الصف السادس الابتدائي",
  "الصف الأول الإعدادي",
  "الصف الثاني الإعدادي",
  "الصف الثالث الإعدادي",
  "الصف الأول الثانوي",
  "الصف الثاني الثانوي",
  "الصف الثالث الثانوي",
  "الفرقة الأولى جامعة",
  "الفرقة الثانية جامعة",
  "الفرقة الثالثة جامعة",
  "الفرقة الرابعة جامعة",
  "الفرقة الخامسة جامعة",
  "متخرج"
];
const STAGES = ["ابتدائي صغير", "ابتدائي كبير", "إعدادي", "ثانوي", "جامعة / متخرج"];
const GENDERS = ["ذكر", "أنثى"];
const TARGET_GENDERS = ["ذكور", "إناث", "مختلط"];
const PAYMENT_STATUSES = ["مدفوع", "غير مدفوع", "مدفوع جزئياً"];
const PAYMENT_METHODS = ["كاش", "فودافون كاش", "إنستاباي", "تحويل بنكي"];
const ATTENDANCE_STATUSES = ["حاضر", "غائب", "متأخر"];
const LOCATIONS = ["A", "B", "C"];
function deriveStage(y) {
  if (y.includes("الأول الابتدائي") || y.includes("الثاني الابتدائي") || y.includes("الثالث الابتدائي")) return "ابتدائي صغير";
  if (y.includes("الرابع الابتدائي") || y.includes("الخامس الابتدائي") || y.includes("السادس الابتدائي")) return "ابتدائي كبير";
  if (y.includes("الإعدادي")) return "إعدادي";
  if (y.includes("الثانوي")) return "ثانوي";
  return "جامعة / متخرج";
}
function calcAge(birth) {
  const b = new Date(birth);
  const t = /* @__PURE__ */ new Date();
  let a = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || m === 0 && t.getDate() < b.getDate()) a--;
  return a;
}
const LOCATION_COLORS = {
  A: "bg-blue-100 text-blue-800 border-blue-300",
  B: "bg-green-100 text-green-800 border-green-300",
  C: "bg-orange-100 text-orange-800 border-orange-300"
};
function formatArabicDate(d) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}
export {
  ACADEMIC_YEARS as A,
  GENDERS as G,
  LOCATIONS as L,
  PAYMENT_STATUSES as P,
  STAGES as S,
  TARGET_GENDERS as T,
  LOCATION_COLORS as a,
  PAYMENT_METHODS as b,
  calcAge as c,
  deriveStage as d,
  ATTENDANCE_STATUSES as e,
  formatArabicDate as f
};
