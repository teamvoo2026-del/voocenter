import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { u as useStudents, a as useCourses, b as useCourseStudents, S as STUDENT_STATUSES } from "./data-CTypYknh.mjs";
import { A as ACADEMIC_YEARS, S as STAGES, G as GENDERS, P as PAYMENT_STATUSES, c as calcAge, d as deriveStage } from "./constants-DSyRhD0w.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CaankBVl.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-C9L4k44O.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CtblATKM.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { T as Textarea } from "./textarea-CKmLuS07.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logAction } from "./router-B0juCGTQ.mjs";
import "../_libs/ws.mjs";
import { P as Plus, S as Search, B as BookPlus, W as Wallet, b as Pencil, T as Trash2, C as CreditCard } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./sonner-DeNSN9-c.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const emptyStudent = {
  full_name: "",
  birth_date: "",
  gender: "ذكر",
  academic_year: ACADEMIC_YEARS[0],
  parent_phone: "",
  student_phone: "",
  enrollment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  payment_status: "غير مدفوع",
  notes: "",
  status: "active",
  marketing_source: ""
};
function StudentsPage() {
  const qc = useQueryClient();
  const {
    data: students = []
  } = useStudents();
  const {
    data: courses = []
  } = useCourses();
  const {
    data: cs = []
  } = useCourseStudents();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyStudent);
  const [enrollRows, setEnrollRows] = reactExports.useState([]);
  const [del, setDel] = reactExports.useState(null);
  const [finance, setFinance] = reactExports.useState(null);
  const [quickEnroll, setQuickEnroll] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [fStage, setFStage] = reactExports.useState("all");
  const [fYear, setFYear] = reactExports.useState("all");
  const [fGender, setFGender] = reactExports.useState("all");
  const [fPay, setFPay] = reactExports.useState("all");
  const [fCourse, setFCourse] = reactExports.useState("all");
  const [fStatus, setFStatus] = reactExports.useState("all");
  const filtered = students.filter((s) => {
    if (search && !s.full_name.includes(search) && !(s.student_code || "").toLowerCase().includes(search.toLowerCase())) return false;
    if (fStage !== "all" && s.stage !== fStage) return false;
    if (fYear !== "all" && s.academic_year !== fYear) return false;
    if (fGender !== "all" && s.gender !== fGender) return false;
    if (fPay !== "all" && s.payment_status !== fPay) return false;
    if (fStatus !== "all" && (s.status || "active") !== fStatus) return false;
    if (fCourse !== "all") {
      const enrolled = cs.filter((x) => x.course_id === fCourse).map((x) => x.student_id);
      if (!enrolled.includes(s.id)) return false;
    }
    return true;
  });
  const openAdd = () => {
    setEditing(null);
    setForm(emptyStudent);
    setEnrollRows([{
      course_id: "",
      discount: "0",
      paid_amount: "0",
      payment_method: "كاش"
    }]);
    setOpen(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setForm({
      full_name: s.full_name,
      birth_date: s.birth_date,
      gender: s.gender,
      academic_year: s.academic_year,
      parent_phone: s.parent_phone,
      student_phone: s.student_phone || "",
      enrollment_date: s.enrollment_date,
      payment_status: s.payment_status,
      notes: s.notes || "",
      status: s.status || "active",
      marketing_source: s.marketing_source || ""
    });
    setEnrollRows([]);
    setOpen(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    const validEnrolls = enrollRows.filter((r) => r.course_id);
    if (!editing && validEnrolls.length === 0) {
      toast.error("لازم تختار كورس واحد على الأقل للطالب");
      return;
    }
    const courseIds = validEnrolls.map((r) => r.course_id);
    if (new Set(courseIds).size !== courseIds.length) {
      toast.error("لا يمكن تكرار نفس الكورس");
      return;
    }
    const payload = {
      ...form,
      student_phone: form.student_phone || null,
      notes: form.notes || null,
      stage: deriveStage(form.academic_year)
    };
    let studentId = editing?.id;
    if (editing) {
      const {
        error
      } = await supabase.from("students").update(payload).eq("id", editing.id);
      if (error) {
        toast.error("خطأ: " + error.message);
        return;
      }
      logAction({
        action_type: "UPDATE",
        entity_type: "student",
        entity_id: editing.id,
        old_values: editing,
        new_values: payload
      });
    } else {
      const {
        data,
        error
      } = await supabase.from("students").insert(payload).select("id").single();
      if (error || !data) {
        toast.error("خطأ: " + (error?.message || ""));
        return;
      }
      studentId = data.id;
      logAction({
        action_type: "CREATE",
        entity_type: "student",
        entity_id: studentId,
        new_values: payload
      });
    }
    if (validEnrolls.length > 0 && studentId) {
      const rows = validEnrolls.map((r) => ({
        student_id: studentId,
        course_id: r.course_id,
        run_id: null,
        discount: Number(r.discount) || 0,
        paid_amount: 0
        // Will be updated by payments trigger
      }));
      const {
        error: enrErr
      } = await supabase.from("course_students").insert(rows);
      if (enrErr) {
        toast.error("تم حفظ الطالب لكن فشل التسجيل في الكورس: " + enrErr.message);
      } else {
        logAction({
          action_type: "CREATE",
          entity_type: "enrollment",
          entity_id: studentId,
          new_values: rows
        });
        for (const r of validEnrolls) {
          const amount = Number(r.paid_amount) || 0;
          if (amount > 0) {
            const {
              error: payErr
            } = await supabase.from("payments").insert({
              student_id: studentId,
              course_id: r.course_id,
              amount,
              payment_method: r.payment_method,
              payment_date: payload.enrollment_date,
              notes: "دفعة أولى عند التسجيل"
            });
            if (payErr) {
              toast.error("فشل تسجيل الدفعة المالية: " + payErr.message);
            } else {
              logAction({
                action_type: "CREATE",
                entity_type: "payment",
                entity_id: studentId,
                new_values: {
                  amount,
                  course_id: r.course_id
                }
              });
            }
          }
        }
      }
    }
    toast.success(editing ? "تم تحديث الطالب" : "تم إضافة الطالب وتسجيله في الكورسات");
    setOpen(false);
    qc.invalidateQueries({
      queryKey: ["students"]
    });
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
  };
  const doDelete = async () => {
    if (!del) return;
    const {
      error
    } = await supabase.from("students").delete().eq("id", del.id);
    if (error) toast.error(error.message);
    else {
      toast.success("تم حذف الطالب");
      logAction({
        action_type: "DELETE",
        entity_type: "student",
        entity_id: del.id,
        old_values: del
      });
    }
    setDel(null);
    qc.invalidateQueries({
      queryKey: ["students"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "الطلاب" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-2 h-4 w-4" }),
          " إضافة طالب"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "الفلاتر" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "بحث بالاسم/الكود", value: search, onChange: (e) => setSearch(e.target.value), className: "pr-8" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fStatus, onValueChange: setFStatus, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "حالة الطالب" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل الحالات" }),
              STUDENT_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fStage, onValueChange: setFStage, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "المرحلة" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل المراحل" }),
              STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fYear, onValueChange: setFYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "السنة الدراسية" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل السنوات" }),
              ACADEMIC_YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fGender, onValueChange: setFGender, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "الجنس" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "الكل" }),
              GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fPay, onValueChange: setFPay, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "حالة الدفع" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "الكل" }),
              PAYMENT_STATUSES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fCourse, onValueChange: setFCourse, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "الكورس" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل الكورسات" }),
              courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "لا يوجد طلاب مسجلين" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الكود" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الاسم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الحالة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "السن" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "السنة الدراسية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المرحلة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "رقم ولي الأمر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "حالة الدفع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "إجراءات" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((s) => {
          const st = STUDENT_STATUSES.find((x) => x.value === (s.status || "active"));
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: s.student_code || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${st?.color}` }),
              st?.label
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: calcAge(s.birth_date) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.academic_year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: s.stage }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { dir: "ltr", children: s.parent_phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: s.payment_status === "مدفوع" ? "default" : s.payment_status === "غير مدفوع" ? "destructive" : "secondary", children: s.payment_status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "إضافة لكورس", onClick: () => setQuickEnroll(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookPlus, { className: "h-4 w-4 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "المالية والكورسات", onClick: () => setFinance(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-emerald-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setDel(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] }) })
          ] }, s.id);
        }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "تعديل طالب" : "إضافة طالب جديد" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الاسم الكامل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.full_name, onChange: (e) => setForm({
            ...form,
            full_name: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "تاريخ الميلاد" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", required: true, value: form.birth_date, onChange: (e) => setForm({
            ...form,
            birth_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الجنس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.gender, onValueChange: (v) => setForm({
            ...form,
            gender: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "السنة الدراسية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.academic_year, onValueChange: (v) => setForm({
            ...form,
            academic_year: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ACADEMIC_YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المرحلة (تلقائي)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: deriveStage(form.academic_year), readOnly: true, className: "bg-muted" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "تاريخ التسجيل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", required: true, value: form.enrollment_date, onChange: (e) => setForm({
            ...form,
            enrollment_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "رقم ولي الأمر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.parent_phone, onChange: (e) => setForm({
            ...form,
            parent_phone: e.target.value
          }), dir: "ltr" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "رقم الطالب (اختياري)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.student_phone, onChange: (e) => setForm({
            ...form,
            student_phone: e.target.value
          }), dir: "ltr" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "حالة الدفع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.payment_status, onValueChange: (v) => setForm({
            ...form,
            payment_status: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAYMENT_STATUSES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "حالة الطالب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (v) => setForm({
            ...form,
            status: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STUDENT_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "مصدر التسويق (اختياري)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.marketing_source || "", onChange: (e) => setForm({
            ...form,
            marketing_source: e.target.value
          }), placeholder: "فيسبوك، صديق، إعلان..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ملاحظات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
            ...form,
            notes: e.target.value
          }) })
        ] }),
        !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2 border-t pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-base font-semibold", children: [
              "الكورسات المسجل فيها ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setEnrollRows([...enrollRows, {
              course_id: "",
              discount: "0",
              paid_amount: "0",
              payment_method: "كاش"
            }]), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 ml-1" }),
              " إضافة كورس"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "💡 الطالب يدخل قائمة انتظار الكورس. توزيع المجموعات يتم لاحقاً من صفحة الكورسات." }),
          enrollRows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "لازم تختار كورس واحد على الأقل" }),
          enrollRows.map((r, idx) => {
            const c = courses.find((x) => x.id === r.course_id);
            const originalPrice = c?.price ?? 0;
            const price = r.agreed_price !== void 0 ? r.agreed_price : originalPrice;
            const remaining = Math.max(0, price - (Number(r.discount) || 0) - (Number(r.paid_amount) || 0));
            const usedIds = enrollRows.filter((_, i) => i !== idx).map((x) => x.course_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-end p-2 border rounded-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الكورس" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.course_id, onValueChange: (v) => setEnrollRows((rows) => rows.map((x, i) => i === idx ? {
                  ...x,
                  course_id: v
                } : x)), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: courses.filter((co) => !usedIds.includes(co.id)).map((co) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: co.id, children: [
                    co.name,
                    " — ",
                    co.price?.toLocaleString("ar-EG"),
                    " ج.م"
                  ] }, co.id)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "السعر" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { readOnly: true, value: price.toLocaleString("ar-EG"), className: "bg-muted" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الخصم" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: r.discount, onChange: (e) => setEnrollRows((rows) => rows.map((x, i) => i === idx ? {
                  ...x,
                  discount: e.target.value
                } : x)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "المدفوع" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: r.paid_amount, onChange: (e) => setEnrollRows((rows) => rows.map((x, i) => i === idx ? {
                  ...x,
                  paid_amount: e.target.value
                } : x)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الطريقة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.payment_method, onValueChange: (v) => setEnrollRows((rows) => rows.map((x, i) => i === idx ? {
                  ...x,
                  payment_method: v
                } : x)), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-[10px] px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "كاش", children: "كاش" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "فودافون كاش", children: "فودافون" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "إنستاباي", children: "إنستاباي" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "تحويل بنكي", children: "بنك" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "المتبقي" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pt-2 font-medium ${remaining > 0 ? "text-destructive" : "text-emerald-600"}`, children: remaining.toLocaleString("ar-EG") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "ghost", onClick: () => setEnrollRows((rows) => rows.filter((_, i) => i !== idx)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
            ] }, idx);
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "col-span-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "إلغاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "حفظ" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!del, onOpenChange: (o) => !o && setDel(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "هل أنت متأكد من الحذف؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'سيتم حذف الطالب "',
          del?.full_name,
          '" نهائياً.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: doDelete, children: "حذف" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FinanceDialog, { student: finance, onClose: () => setFinance(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QuickEnrollDialog, { student: quickEnroll, onClose: () => setQuickEnroll(null) })
  ] });
}
function QuickEnrollDialog({
  student,
  onClose
}) {
  const qc = useQueryClient();
  const {
    data: courses = []
  } = useCourses();
  const {
    data: cs = []
  } = useCourseStudents();
  const [courseId, setCourseId] = reactExports.useState("");
  const [discount, setDiscount] = reactExports.useState("0");
  const [paid, setPaid] = reactExports.useState("0");
  const [method, setMethod] = reactExports.useState("كاش");
  const enrolled = student ? cs.filter((x) => x.student_id === student.id).map((x) => x.course_id) : [];
  const available = courses.filter((c) => !enrolled.includes(c.id));
  const selected = courses.find((c) => c.id === courseId);
  const isEnrolled = !!cs.find((x) => x.student_id === student?.id && x.course_id === selected?.id);
  const existingSub = isEnrolled ? cs.find((x) => x.student_id === student?.id && x.course_id === selected?.id) : null;
  const originalPrice = selected?.price ?? 0;
  const price = existingSub?.agreed_price !== void 0 ? existingSub.agreed_price : originalPrice;
  const remaining = Math.max(0, price - (Number(discount) || 0) - (Number(paid) || 0));
  const reset = () => {
    setCourseId("");
    setDiscount("0");
    setPaid("0");
  };
  const save = async () => {
    if (!student || !courseId) {
      toast.error("اختر كورس");
      return;
    }
    const {
      error
    } = await supabase.from("course_students").insert({
      student_id: student.id,
      course_id: courseId,
      discount: Number(discount) || 0,
      paid_amount: 0
      // Updated by trigger
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    const amount = Number(paid) || 0;
    if (amount > 0) {
      await supabase.from("payments").insert({
        student_id: student.id,
        course_id: courseId,
        amount,
        payment_method: method,
        payment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        notes: "دفعة أولى عند التسجيل السريع"
      });
      logAction({
        action_type: "CREATE",
        entity_type: "payment",
        entity_id: student.id,
        new_values: {
          amount,
          course_id: courseId
        }
      });
    }
    toast.success(`تم تسجيل ${student.full_name} في الكورس`);
    logAction({
      action_type: "CREATE",
      entity_type: "enrollment",
      entity_id: student.id,
      new_values: {
        course_id: courseId,
        paid: amount
      }
    });
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
    qc.invalidateQueries({
      queryKey: ["payments"]
    });
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!student, onOpenChange: (o) => {
    if (!o) {
      reset();
      onClose();
    }
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
      "إضافة ",
      student?.full_name,
      " لكورس"
    ] }) }),
    available.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-6", children: "الطالب مسجل في كل الكورسات المتاحة" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الكورس" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: courseId, onValueChange: setCourseId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر كورس" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: available.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id, children: [
            c.name,
            " — ",
            c.price?.toLocaleString("ar-EG"),
            " ج.م"
          ] }, c.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "السعر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { readOnly: true, value: price.toLocaleString("ar-EG"), className: "bg-muted" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الخصم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: discount, onChange: (e) => setDiscount(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "المدفوع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: paid, onChange: (e) => setPaid(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الطريقة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: method, onValueChange: setMethod, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "كاش", children: "كاش" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "فودافون كاش", children: "فودافون" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "إنستاباي", children: "إنستاباي" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "تحويل بنكي", children: "بنك" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        "المتبقي: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: remaining > 0 ? "text-destructive font-bold" : "text-emerald-600 font-bold", children: [
          remaining.toLocaleString("ar-EG"),
          " ج.م"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "إلغاء" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: !courseId || available.length === 0, children: "تسجيل" })
    ] })
  ] }) });
}
function FinanceDialog({
  student,
  onClose
}) {
  const qc = useQueryClient();
  const {
    data: courses = []
  } = useCourses();
  const {
    data: cs = []
  } = useCourseStudents();
  const [addCourseId, setAddCourseId] = reactExports.useState("");
  const [rows, setRows] = reactExports.useState({});
  const open = !!student;
  const enrollments = student ? cs.filter((x) => x.student_id === student.id) : [];
  const getRow = (cid) => {
    if (rows[cid]) return rows[cid];
    const e = enrollments.find((x) => x.course_id === cid);
    return {
      discount: String(e?.discount ?? 0),
      paid_amount: String(e?.paid_amount ?? 0),
      agreed_price: e?.agreed_price
    };
  };
  const setRow = (cid, patch) => {
    setRows((r) => ({
      ...r,
      [cid]: {
        ...getRow(cid),
        ...patch
      }
    }));
  };
  const save = async (cid) => {
    const r = getRow(cid);
    const {
      error
    } = await supabase.from("course_students").update({
      discount: Number(r.discount) || 0
    }).eq("student_id", student.id).eq("course_id", cid);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم الحفظ");
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
  };
  const enroll = async () => {
    if (!addCourseId || !student) return;
    const {
      error
    } = await supabase.from("course_students").insert({
      student_id: student.id,
      course_id: addCourseId
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم التسجيل في الكورس");
    setAddCourseId("");
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
  };
  const unenroll = async (cid) => {
    const {
      error
    } = await supabase.from("course_students").delete().eq("student_id", student.id).eq("course_id", cid);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم إلغاء التسجيل");
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
  };
  const available = courses.filter((c) => !enrollments.some((e) => e.course_id === c.id));
  const totals = enrollments.reduce((acc, e) => {
    const c = courses.find((x) => x.id === e.course_id);
    const r = rows[e.course_id];
    const price = e.agreed_price ?? c?.price ?? 0;
    const discount = r ? Number(r.discount) || 0 : e.discount;
    const paid = r ? Number(r.paid_amount) || 0 : e.paid_amount;
    const due = Math.max(0, price - discount);
    acc.total += due;
    acc.paid += paid;
    acc.remaining += Math.max(0, due - paid);
    return acc;
  }, {
    total: 0,
    paid: 0,
    remaining: 0
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
      "المالية — ",
      student?.full_name
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 my-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "إجمالي المستحق" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold", children: [
          totals.total.toLocaleString("ar-EG"),
          " ج.م"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "المدفوع" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-emerald-600", children: [
          totals.paid.toLocaleString("ar-EG"),
          " ج.م"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "المتبقي" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-destructive", children: [
          totals.remaining.toLocaleString("ar-EG"),
          " ج.م"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "تسجيل في كورس جديد" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: addCourseId, onValueChange: setAddCourseId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر كورس" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: available.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-sm text-muted-foreground", children: "لا يوجد كورسات متاحة" }) : available.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id, children: [
            c.name,
            " — ",
            c.price?.toLocaleString("ar-EG"),
            " ج.م"
          ] }, c.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: enroll, disabled: !addCourseId, children: "تسجيل" })
    ] }),
    enrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "الطالب غير مسجل في أي كورس" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الكورس" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "السعر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الخصم" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المدفوع" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المتبقي" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "إجراءات" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: enrollments.map((e) => {
        const c = courses.find((x) => x.id === e.course_id);
        const r = getRow(e.course_id);
        const price = e.agreed_price ?? c?.price ?? 0;
        const due = Math.max(0, price - (Number(r.discount) || 0));
        const remaining = Math.max(0, due - (Number(r.paid_amount) || 0));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: c?.name || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: price.toLocaleString("ar-EG") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", step: "0.01", className: "w-24", value: r.discount, onChange: (ev) => setRow(e.course_id, {
            discount: ev.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-emerald-600", children: Number(e.paid_amount || 0).toLocaleString("ar-EG") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: remaining > 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium", children: remaining.toLocaleString("ar-EG") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => save(e.course_id), children: "حفظ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => unenroll(e.course_id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] }) })
        ] }, e.course_id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex items-center justify-between mt-4 border-t pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/payments", className: "text-sm font-medium text-emerald-600 hover:underline flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
        " الذهاب لصفحة تسجيل المدفوعات"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "إغلاق" })
    ] })
  ] }) });
}
export {
  StudentsPage as component
};
