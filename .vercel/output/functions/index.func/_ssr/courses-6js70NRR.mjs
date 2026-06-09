import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { a as useCourses, d as useInstructors, e as useCourseInstructors, h as useCourseRuns, b as useCourseStudents, i as useCourseRunSchedules, u as useStudents, R as RUN_STATUSES } from "./data-CTypYknh.mjs";
import { S as STAGES, T as TARGET_GENDERS, L as LOCATIONS } from "./constants-DSyRhD0w.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { C as Card, a as CardContent } from "./card-CaankBVl.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-C9L4k44O.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CtblATKM.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { C as Checkbox } from "./checkbox-DgfiZdjL.mjs";
import { T as Textarea } from "./textarea-CKmLuS07.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logAction } from "./router-B0juCGTQ.mjs";
import "../_libs/ws.mjs";
import { P as Plus, n as Layers, h as Users, l as BookOpen, b as Pencil, T as Trash2, o as UserPlus, p as Calendar } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/radix-ui__react-checkbox.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
function SyllabusViewer({
  course,
  onClose
}) {
  if (!course) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!course, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", className: "sm:max-w-[700px] border-none shadow-2xl bg-card/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "border-b border-border/40 pb-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-2xl font-bold flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "المحتوى الدراسي: ",
        course.name
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[500px] overflow-y-auto px-1", children: course.syllabus ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-foreground leading-relaxed text-lg bg-muted/20 p-6 rounded-2xl border border-border/30", children: course.syllabus }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-muted-foreground bg-muted/10 rounded-2xl border border-dashed border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 mb-4 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: "لم يتم إضافة محتوى دراسي لهذا الكورس بعد" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "mt-6 border-t border-border/40 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onClose, variant: "secondary", className: "w-full sm:w-auto px-8", children: "إغلاق" }) })
  ] }) });
}
const WEEKDAYS_AR = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const empty = {
  name: "",
  subject: "",
  target_stage: [],
  target_gender: "مختلط",
  description: "",
  syllabus: "",
  price: 0,
  instructor_ids: [],
  min_batch_size: 8,
  level: ""
};
function CoursesPage() {
  const qc = useQueryClient();
  const {
    data: courses = []
  } = useCourses();
  const {
    data: instructors = []
  } = useInstructors();
  const {
    data: ci = []
  } = useCourseInstructors();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [viewingSyllabus, setViewingSyllabus] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(empty);
  const [del, setDel] = reactExports.useState(null);
  const [runsCourse, setRunsCourse] = reactExports.useState(null);
  const [fStage, setFStage] = reactExports.useState("all");
  const [fGender, setFGender] = reactExports.useState("all");
  const {
    data: runs = []
  } = useCourseRuns();
  const {
    data: cs = []
  } = useCourseStudents();
  const filtered = courses.filter((c) => {
    if (fStage !== "all" && !c.target_stage.includes(fStage)) return false;
    if (fGender !== "all" && c.target_gender !== fGender) return false;
    return true;
  });
  const filteredInstructorsForSelection = reactExports.useMemo(() => {
    if (!form.subject) return [];
    return instructors.filter((i) => {
      if (!i.specialty) return false;
      const list = i.specialty.split(",").map((s) => s.trim());
      return list.includes(form.subject);
    });
  }, [instructors, form.subject]);
  const availableSubjects = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    instructors.forEach((i) => {
      if (i.specialty) i.specialty.split(",").forEach((s) => set.add(s.trim()));
    });
    return Array.from(set).sort();
  }, [instructors]);
  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (c) => {
    setEditing(c);
    setForm({
      name: c.name,
      subject: c.subject,
      target_stage: c.target_stage,
      target_gender: c.target_gender,
      description: c.description || "",
      syllabus: c.syllabus || "",
      price: c.price ?? 0,
      min_batch_size: c.min_batch_size ?? 8,
      level: c.level ?? "",
      instructor_ids: ci.filter((x) => x.course_id === c.id).map((x) => x.instructor_id)
    });
    setOpen(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.subject) {
      toast.error("يرجى اختيار مادة الكورس");
      return;
    }
    const {
      instructor_ids,
      ...rest
    } = form;
    const payload = {
      ...rest,
      description: rest.description || null,
      syllabus: rest.syllabus || null,
      price: Number(rest.price) || 0,
      min_batch_size: Number(rest.min_batch_size) || 8,
      level: rest.level || null
    };
    let courseId = editing?.id;
    if (editing) {
      const {
        error
      } = await supabase.from("courses").update(payload).eq("id", editing.id);
      if (error) {
        toast.error(error.message);
        return;
      }
    } else {
      const {
        data,
        error
      } = await supabase.from("courses").insert(payload).select().single();
      if (error) {
        toast.error(error.message);
        return;
      }
      courseId = data.id;
    }
    if (courseId) {
      await supabase.from("course_instructors").delete().eq("course_id", courseId);
      if (instructor_ids.length) {
        await supabase.from("course_instructors").insert(instructor_ids.map((id) => ({
          course_id: courseId,
          instructor_id: id
        })));
      }
    }
    toast.success(editing ? "تم تحديث بيانات الكورس" : "تم إضافة كورس جديد");
    logAction({
      action_type: editing ? "UPDATE" : "CREATE",
      entity_type: "course",
      entity_id: courseId,
      old_values: editing || null,
      new_values: payload
    });
    setOpen(false);
    qc.invalidateQueries({
      queryKey: ["courses"]
    });
    qc.invalidateQueries({
      queryKey: ["course_instructors"]
    });
  };
  const doDelete = async () => {
    if (!del) return;
    const {
      error
    } = await supabase.from("courses").delete().eq("id", del.id);
    if (error) toast.error(error.message);
    else {
      toast.success("تم حذف الكورس بنجاح");
      logAction({
        action_type: "DELETE",
        entity_type: "course",
        entity_id: del.id,
        old_values: del
      });
    }
    setDel(null);
    qc.invalidateQueries({
      queryKey: ["courses"]
    });
  };
  const toggleStage = (s) => {
    setForm((f) => ({
      ...f,
      target_stage: f.target_stage.includes(s) ? f.target_stage.filter((x) => x !== s) : [...f.target_stage, s]
    }));
  };
  const toggleInstructor = (id) => {
    setForm((f) => ({
      ...f,
      instructor_ids: f.instructor_ids.includes(id) ? f.instructor_ids.filter((x) => x !== id) : [...f.instructor_ids, id]
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "إدارة الكورسات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, className: "shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-2 h-4 w-4" }),
          " إضافة كورس جديد"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs mr-1", children: "تصفية حسب المرحلة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fStage, onValueChange: setFStage, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "المرحلة" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل المراحل" }),
              STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs mr-1", children: "تصفية حسب الجنس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fGender, onValueChange: setFGender, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "الجنس" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "الكل" }),
              TARGET_GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g))
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-12 w-12 mb-4 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "لا توجد كورسات مطابقة للبحث" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "اسم الكورس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "المادة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "السعر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "المحاضرون" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "المراحل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "المجموعات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4 min-w-[120px]", children: "الانتظار" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right py-4", children: "إجراءات" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((c) => {
          const insNames = ci.filter((x) => x.course_id === c.id).map((x) => instructors.find((i) => i.id === x.instructor_id)?.full_name).filter(Boolean).join("، ");
          const runCount = runs.filter((r) => r.course_id === c.id).length;
          const waitlistCount = cs.filter((x) => x.course_id === c.id && !x.run_id).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "group transition-colors border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold py-4", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-medium bg-secondary/50", children: c.subject }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-4 font-semibold text-primary", children: [
              c.price?.toLocaleString("ar-EG"),
              " ج.م"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-4 max-w-[200px] truncate", title: insNames, children: insNames || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              c.target_stage.slice(0, 2).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-full bg-muted border border-border/50", children: s }, s)),
              c.target_stage.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px]", children: [
                "+",
                c.target_stage.length - 2
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: runCount > 0 ? "default" : "secondary", className: "rounded-md", children: [
              runCount,
              " مجموعة"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: waitlistCount > 0 ? "destructive" : "outline", className: "flex items-center gap-1.5 px-2 bg-opacity-10 capitalize", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              waitlistCount,
              " طالب"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors", title: "المحتوى الدراسي", onClick: () => setViewingSyllabus(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-blue-600 hover:bg-blue-50", title: "المجموعات", onClick: () => setRunsCourse(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: () => openEdit(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive", onClick: () => setDel(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, c.id);
        }) })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SyllabusViewer, { course: viewingSyllabus, onClose: () => setViewingSyllabus(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto border-none shadow-2xl", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "border-b border-border/40 pb-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-bold", children: editing ? "تعديل بيانات الكورس" : "إضافة كورس جديد" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "اسم الكورس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), className: "bg-muted/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "المادة (التخصص)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.subject, onValueChange: (v) => setForm({
            ...form,
            subject: v,
            instructor_ids: []
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر المادة" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: availableSubjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "سعر الكورس (ج.م)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", step: "0.01", value: form.price, onChange: (e) => setForm({
            ...form,
            price: e.target.value
          }), className: "bg-muted/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "الحد الأدنى للمشاركة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: form.min_batch_size, onChange: (e) => setForm({
            ...form,
            min_batch_size: e.target.value
          }), className: "bg-muted/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 space-y-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "المستوى التعليمي" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.level, onChange: (e) => setForm({
            ...form,
            level: e.target.value
          }), placeholder: "مبتدئ / متوسط / متقدم", className: "bg-muted/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 space-y-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "الجنس المستهدف" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.target_gender, onValueChange: (v) => setForm({
            ...form,
            target_gender: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TARGET_GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "المراحل المستهدفة (متعدد)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 mt-2 p-4 bg-muted/20 rounded-xl border border-border/50", children: STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: form.target_stage.includes(s), onCheckedChange: () => toggleStage(s), className: "rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium group-hover:text-primary transition-colors", children: s })
          ] }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-semibold flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المحاضرون المتاحون لهذا التخصص" }),
            form.subject && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] border-primary/20", children: form.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 mt-2 p-4 bg-muted/20 rounded-xl border border-border/50 min-h-[80px]", children: !form.subject ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-col items-center justify-center py-2 text-muted-foreground italic text-xs", children: "يرجى اختيار مادة الكورس أولاً لعرض المحاضرين المتخصصين" }) : filteredInstructorsForSelection.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-col items-center justify-center py-2 text-destructive font-medium text-xs", children: "لا يوجد محاضرين مسجلين لهذا التخصص حالياً" }) : filteredInstructorsForSelection.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer group bg-background/50 hover:bg-background pr-2 pl-4 py-1.5 rounded-full border border-border/30 transition-all shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: form.instructor_ids.includes(i.id), onCheckedChange: () => toggleInstructor(i.id), className: "rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold group-hover:text-primary transition-colors", children: i.full_name })
          ] }, i.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "المحتوى الدراسي (المنهج)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.syllabus, onChange: (e) => setForm({
              ...form,
              syllabus: e.target.value
            }), placeholder: "أدخل تفاصيل الدروس أو المنهج هنا...", className: "bg-muted/30 min-h-[150px] text-right" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "absolute bottom-3 left-3 h-5 w-5 text-muted-foreground/30 pointer-events-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold", children: "وصف الكورس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }), className: "bg-muted/30 min-h-[80px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "col-span-2 gap-3 pt-4 border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), className: "flex-1", children: "إلغاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "flex-1 shadow-lg bg-primary hover:scale-[1.02] transition-transform", children: "حفظ البيانات" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!del, onOpenChange: (o) => !o && setDel(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "هل أنت متأكد من الحذف؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'سيتم حذف "',
          del?.name,
          '" نهائياً مع كل محاضراته.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: doDelete, children: "حذف" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RunsDialog, { course: runsCourse, onClose: () => setRunsCourse(null) })
  ] });
}
const addHours = (time, hours) => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + Math.round(hours * 60);
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};
function RunsDialog({
  course,
  onClose
}) {
  const qc = useQueryClient();
  const {
    data: runs = []
  } = useCourseRuns();
  const {
    data: schedules = []
  } = useCourseRunSchedules();
  const {
    data: instructors = []
  } = useInstructors();
  const {
    data: ci = []
  } = useCourseInstructors();
  const {
    data: cs = []
  } = useCourseStudents();
  const {
    data: students = []
  } = useStudents();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [delRun, setDelRun] = reactExports.useState(null);
  const [assignRun, setAssignRun] = reactExports.useState(null);
  const [picked, setPicked] = reactExports.useState(/* @__PURE__ */ new Set());
  const [name, setName] = reactExports.useState("");
  const [instructorId, setInstructorId] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("A");
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [slots, setSlots] = reactExports.useState([]);
  const [minCapacity, setMinCapacity] = reactExports.useState(5);
  const [maxCapacity, setMaxCapacity] = reactExports.useState(25);
  const [runStatus, setRunStatus] = reactExports.useState("open");
  const courseRuns = course ? runs.filter((r) => r.course_id === course.id) : [];
  const availableInstructors = course ? instructors.filter((i) => ci.some((x) => x.course_id === course.id && x.instructor_id === i.id)) : [];
  const waitlistEnrolls = course ? cs.filter((x) => x.course_id === course.id && !x.run_id) : [];
  const waitlistStudents = waitlistEnrolls.map((e) => students.find((s) => s.id === e.student_id)).filter(Boolean);
  const togglePick = (id) => setPicked((p) => {
    const n = new Set(p);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const assignToRun = async () => {
    if (!assignRun || picked.size === 0) return;
    const ids = Array.from(picked);
    const {
      error
    } = await supabase.from("course_students").update({
      run_id: assignRun.id
    }).eq("course_id", assignRun.course_id).in("student_id", ids);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`تم نقل ${ids.length} طالب لمجموعة "${assignRun.name}"`);
    setAssignRun(null);
    setPicked(/* @__PURE__ */ new Set());
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
  };
  const [totalHours, setTotalHours] = reactExports.useState(0);
  const resetForm = () => {
    setEditing(null);
    setName("");
    setInstructorId(availableInstructors[0]?.id ?? "");
    setLocation("A");
    setStartDate("");
    setEndDate("");
    setNotes("");
    setTotalHours(0);
    setMinCapacity(5);
    setMaxCapacity(25);
    setRunStatus("open");
    setSlots([{
      weekday: 1,
      start_time: "16:00",
      hours: 2
    }]);
  };
  const openNew = () => {
    resetForm();
    setShowForm(true);
  };
  const openEditRun = (r) => {
    setEditing(r);
    setName(r.name);
    setInstructorId(r.instructor_id ?? "");
    setLocation(r.location ?? "A");
    setStartDate(r.start_date ?? "");
    setEndDate(r.end_date ?? "");
    setNotes(r.notes ?? "");
    setMinCapacity(r.min_capacity ?? 5);
    setMaxCapacity(r.max_capacity ?? 25);
    setRunStatus(r.status ?? "open");
    const sch = schedules.filter((s) => s.run_id === r.id).map((s) => {
      const [sh, sm] = s.start_time.slice(0, 5).split(":").map(Number);
      const [eh, em] = s.end_time.slice(0, 5).split(":").map(Number);
      const hrs = (eh * 60 + em - (sh * 60 + sm)) / 60;
      return {
        id: s.id,
        weekday: s.weekday,
        start_time: s.start_time.slice(0, 5),
        hours: hrs
      };
    });
    setSlots(sch.length > 0 ? sch : [{
      weekday: 1,
      start_time: "16:00",
      hours: 2
    }]);
    setTotalHours(0);
    setShowForm(true);
  };
  const save = async () => {
    if (!course) return;
    if (!name.trim()) {
      toast.error("اسم المجموعة مطلوب");
      return;
    }
    if (slots.length === 0) {
      toast.error("أضف موعد أسبوعي واحد على الأقل");
      return;
    }
    for (const s of slots) if (!(s.hours > 0)) {
      toast.error("مدة المحاضرة لازم تكون أكبر من صفر");
      return;
    }
    if (!startDate) {
      toast.error("حدد تاريخ بداية الكورس");
      return;
    }
    const payload = {
      course_id: course.id,
      name: name.trim(),
      instructor_id: instructorId || null,
      location: location || null,
      start_date: startDate || null,
      end_date: endDate || null,
      notes: notes || null,
      min_capacity: Number(minCapacity) || 5,
      max_capacity: Number(maxCapacity) || 25,
      status: runStatus
    };
    let runId = editing?.id;
    if (editing) {
      const {
        error
      } = await supabase.from("course_runs").update(payload).eq("id", editing.id);
      if (error) {
        toast.error(error.message);
        return;
      }
    } else {
      const {
        data,
        error
      } = await supabase.from("course_runs").insert(payload).select().single();
      if (error) {
        toast.error(error.message);
        return;
      }
      runId = data.id;
    }
    await supabase.from("course_run_schedules").delete().eq("run_id", runId);
    await supabase.from("course_run_schedules").insert(slots.map((s) => ({
      run_id: runId,
      weekday: s.weekday,
      start_time: s.start_time,
      end_time: addHours(s.start_time, s.hours)
    })));
    let generated = 0;
    let conflicts = 0;
    let hoursLeft = 0;
    if (instructorId && (totalHours > 0 || endDate)) {
      const {
        data: existingLectures
      } = await supabase.from("lectures").select("*");
      const existing = existingLectures ?? [];
      if (editing) await supabase.from("lectures").delete().eq("run_id", runId);
      const filteredExisting = editing ? existing.filter((l) => l.run_id !== runId) : existing;
      const rowsToInsert = [];
      const start = new Date(startDate);
      const hardCap = endDate ? new Date(endDate) : new Date(start.getTime() + 365 * 24 * 3600 * 1e3);
      let accumulated = 0;
      const target = totalHours > 0 ? totalHours : Infinity;
      for (let d = new Date(start); d <= hardCap && accumulated < target; d.setDate(d.getDate() + 1)) {
        const wd = d.getDay();
        const todaySlots = slots.filter((s) => s.weekday === wd).sort((a, b) => a.start_time.localeCompare(b.start_time));
        for (const slot of todaySlots) {
          if (accumulated >= target) break;
          const dateStr = d.toISOString().slice(0, 10);
          const slotEnd = addHours(slot.start_time, slot.hours);
          const conflict = filteredExisting.find((l) => l.date === dateStr && l.location === location && slot.start_time < l.end_time.slice(0, 5) && slotEnd > l.start_time.slice(0, 5)) || rowsToInsert.find((r) => r.date === dateStr && r.location === location && slot.start_time < r.end_time && slotEnd > r.start_time);
          if (conflict) {
            conflicts++;
            continue;
          }
          rowsToInsert.push({
            course_id: course.id,
            run_id: runId,
            instructor_id: instructorId,
            date: dateStr,
            start_time: slot.start_time,
            end_time: slotEnd,
            location
          });
          accumulated += slot.hours;
        }
      }
      hoursLeft = Math.max(0, target === Infinity ? 0 : target - accumulated);
      if (rowsToInsert.length > 0) {
        const {
          error: lecErr
        } = await supabase.from("lectures").insert(rowsToInsert);
        if (lecErr) {
          toast.error("حفظ المجموعة تم لكن توليد المحاضرات فشل: " + lecErr.message);
        } else generated = rowsToInsert.length;
      }
    }
    toast.success(`تم الحفظ${generated ? ` — تم توليد ${generated} محاضرة` : ""}${conflicts ? ` (تخطّى ${conflicts} بسبب تعارض القاعة)` : ""}${hoursLeft > 0 ? ` — متبقي ${hoursLeft} ساعة لم تجدول` : ""}`);
    setShowForm(false);
    qc.invalidateQueries({
      queryKey: ["course_runs"]
    });
    qc.invalidateQueries({
      queryKey: ["course_run_schedules"]
    });
    qc.invalidateQueries({
      queryKey: ["lectures"]
    });
  };
  const doDeleteRun = async () => {
    if (!delRun) return;
    await supabase.from("lectures").delete().eq("run_id", delRun.id);
    const {
      error
    } = await supabase.from("course_runs").delete().eq("id", delRun.id);
    if (error) toast.error(error.message);
    else {
      toast.success("تم حذف المجموعة");
      qc.invalidateQueries({
        queryKey: ["course_runs"]
      });
      qc.invalidateQueries({
        queryKey: ["lectures"]
      });
    }
    setDelRun(null);
  };
  reactExports.useEffect(() => {
    if (!course) setShowForm(false);
  }, [course]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!course, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "مجموعات: ",
        course?.name
      ] }) }),
      !showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        (() => {
          const minBatch = course?.min_batch_size ?? 8;
          const isReady = waitlistStudents.length >= minBatch;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: isReady ? "border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20" : "border-amber-300/60 bg-amber-50/40 dark:bg-amber-950/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
                " قائمة الانتظار",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: waitlistStudents.length > 0 ? "destructive" : "secondary", children: [
                  waitlistStudents.length,
                  " / ",
                  minBatch,
                  " طالب"
                ] })
              ] }),
              isReady && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-600 hover:bg-emerald-700", children: "✓ جاهز لفتح مجموعة جديدة" })
            ] }),
            waitlistStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "مفيش طلاب في انتظار التوزيع لمجموعة." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: waitlistStudents.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: s.full_name }, s.id)) })
          ] }) });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-2 h-4 w-4" }),
          " مجموعة جديدة"
        ] }) }),
        courseRuns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: 'لا توجد مجموعات بعد. اضغط "مجموعة جديدة" لبدء أول مجموعة.' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: courseRuns.map((r) => {
          const sch = schedules.filter((s) => s.run_id === r.id);
          const insName = instructors.find((i) => i.id === r.instructor_id)?.full_name ?? "—";
          const runStudentCount = cs.filter((x) => x.run_id === r.id).length;
          const maxCap = r.max_capacity ?? 25;
          const minCap = r.min_capacity ?? 5;
          const fillPct = Math.min(100, Math.round(runStudentCount / Math.max(maxCap, 1) * 100));
          const runStatus2 = r.status ?? "open";
          const statusLabel = RUN_STATUSES.find((x) => x.value === runStatus2)?.label ?? runStatus2;
          const statusColor = runStatus2 === "open" ? "bg-blue-100 text-blue-700 border-blue-300" : runStatus2 === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-300" : runStatus2 === "completed" ? "bg-slate-100 text-slate-700 border-slate-300" : "bg-red-100 text-red-700 border-red-300";
          const barColor = fillPct >= 100 ? "bg-emerald-500" : fillPct >= 80 ? "bg-amber-500" : "bg-primary";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: statusColor, children: statusLabel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                  setPicked(/* @__PURE__ */ new Set());
                  setAssignRun(r);
                }, disabled: waitlistStudents.length === 0 || runStudentCount >= maxCap, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 ml-1" }),
                  " إضافة طلاب"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEditRun(r), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setDelRun(r), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "التسجيل: ",
                  runStudentCount,
                  " / ",
                  maxCap,
                  " طالب (حد أدنى ",
                  minCap,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  fillPct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${barColor} transition-all`, style: {
                width: `${fillPct}%`
              } }) }),
              runStudentCount >= maxCap && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-700 font-medium", children: "✓ المجموعة مكتملة" }),
              runStudentCount > 0 && runStudentCount < minCap && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700", children: "⚠ أقل من الحد الأدنى" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                "المحاضر: ",
                insName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                "قاعة ",
                r.location ?? "—"
              ] }),
              r.start_date && r.end_date && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 ml-1" }),
                r.start_date,
                " → ",
                r.end_date
              ] })
            ] }),
            sch.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: sch.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary hover:bg-primary/20", children: [
              WEEKDAYS_AR[s.weekday],
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { dir: "ltr", className: "mr-1", children: [
                s.start_time.slice(0, 5),
                "-",
                s.end_time.slice(0, 5)
              ] })
            ] }, s.id)) })
          ] }) }, r.id);
        }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "اسم المجموعة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "مثال: مجموعة الصباح" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المحاضر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: instructorId, onValueChange: setInstructorId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: availableInstructors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-xs text-muted-foreground", children: "أضف محاضر للكورس أولاً" }) : availableInstructors.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.id, children: i.full_name }, i.id)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "القاعة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: location, onValueChange: setLocation, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LOCATIONS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: l, children: [
                "قاعة ",
                l
              ] }, l)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "أقل عدد طلاب" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: minCapacity, onChange: (e) => setMinCapacity(Number(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "أقصى عدد طلاب" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: maxCapacity, onChange: (e) => setMaxCapacity(Number(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "حالة المجموعة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: runStatus, onValueChange: (v) => setRunStatus(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: RUN_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "تاريخ البداية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "إجمالي ساعات الكورس" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", step: "0.5", value: totalHours || "", placeholder: "مثلاً 24", onChange: (e) => setTotalHours(Number(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "تاريخ نهاية (اختياري)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "أيام المحاضرات في الأسبوع" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setSlots([...slots, {
              weekday: 1,
              start_time: "16:00",
              hours: 2
            }]), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-1 h-4 w-4" }),
              " إضافة يوم"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: slots.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-end p-2 border rounded", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "اليوم" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(s.weekday), onValueChange: (v) => setSlots(slots.map((x, idx) => idx === i ? {
                ...x,
                weekday: Number(v)
              } : x)), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: WEEKDAYS_AR.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(idx), children: d }, idx)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "يبدأ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: s.start_time, onChange: (e) => setSlots(slots.map((x, idx) => idx === i ? {
                ...x,
                start_time: e.target.value
              } : x)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "مدة (ساعة)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0.5", step: "0.5", value: s.hours, onChange: (e) => setSlots(slots.map((x, idx) => idx === i ? {
                ...x,
                hours: Number(e.target.value) || 0
              } : x)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => setSlots(slots.filter((_, idx) => idx !== i)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
          ] }, i)) }),
          slots.length > 0 && totalHours > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "إجمالي ساعات أسبوعية: ",
            slots.reduce((sum, s) => sum + (s.hours || 0), 0),
            " — تقريباً ",
            Math.ceil(totalHours / Math.max(1, slots.reduce((sum, s) => sum + (s.hours || 0), 0))),
            " أسبوع"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ملاحظات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value) })
        ] }),
        startDate && instructorId && (totalHours > 0 || endDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground p-2 bg-primary/5 rounded", children: [
          "💡 المحاضرات هتتوزع تلقائياً من تاريخ البداية على الأيام المحددة لحد ما نخلص ",
          totalHours > 0 ? `${totalHours} ساعة` : "تاريخ النهاية",
          ". لو في تعارض في القاعة هيتم تخطي المحاضرة."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setShowForm(false), children: "إلغاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: save, children: "حفظ" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!delRun, onOpenChange: (o) => !o && setDelRun(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "حذف المجموعة؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'سيتم حذف "',
          delRun?.name,
          '" مع كل المحاضرات المتولدة منها.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: doDeleteRun, children: "حذف" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!assignRun, onOpenChange: (o) => {
      if (!o) {
        setAssignRun(null);
        setPicked(/* @__PURE__ */ new Set());
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        'إضافة طلاب لمجموعة "',
        assignRun?.name,
        '"'
      ] }) }),
      waitlistStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-6", children: "مفيش طلاب في قائمة الانتظار." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            picked.size,
            " / ",
            waitlistStudents.length,
            " محدد"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setPicked(new Set(waitlistStudents.map((s) => s.id))), children: "تحديد الكل" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto space-y-1 border rounded p-2", children: waitlistStudents.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: picked.has(s.id), onCheckedChange: () => togglePick(s.id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: s.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.academic_year })
        ] }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setAssignRun(null);
          setPicked(/* @__PURE__ */ new Set());
        }, children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: assignToRun, disabled: picked.size === 0, children: [
          "نقل للمجموعة (",
          picked.size,
          ")"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CoursesPage as component
};
