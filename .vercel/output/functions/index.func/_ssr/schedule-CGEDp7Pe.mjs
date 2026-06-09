import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { c as useLectures, a as useCourses, d as useInstructors, e as useCourseInstructors } from "./data-CTypYknh.mjs";
import { L as LOCATIONS, a as LOCATION_COLORS, f as formatArabicDate } from "./constants-DSyRhD0w.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { C as Card, a as CardContent } from "./card-CaankBVl.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-C9L4k44O.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CtblATKM.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { T as Textarea } from "./textarea-CKmLuS07.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/ws.mjs";
import { P as Plus, d as ChevronRight, e as ChevronLeft, M as MapPin, f as Clock, g as User, b as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./router-B0juCGTQ.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./sonner-DeNSN9-c.mjs";
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
const empty = {
  course_id: "",
  instructor_id: "",
  date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  start_time: "10:00",
  end_time: "12:00",
  location: "A",
  notes: ""
};
function SchedulePage() {
  const qc = useQueryClient();
  const {
    data: lectures = []
  } = useLectures();
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
  const [form, setForm] = reactExports.useState(empty);
  const [del, setDel] = reactExports.useState(null);
  const [dayOpen, setDayOpen] = reactExports.useState(null);
  const [fFrom, setFFrom] = reactExports.useState("");
  const [fTo, setFTo] = reactExports.useState("");
  const [fLoc, setFLoc] = reactExports.useState("all");
  const [fCourse, setFCourse] = reactExports.useState("all");
  const [fInstr, setFInstr] = reactExports.useState("all");
  const [month, setMonth] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 7));
  const filtered = lectures.filter((l) => {
    if (fFrom && l.date < fFrom) return false;
    if (fTo && l.date > fTo) return false;
    if (fLoc !== "all" && l.location !== fLoc) return false;
    if (fCourse !== "all" && l.course_id !== fCourse) return false;
    if (fInstr !== "all" && l.instructor_id !== fInstr) return false;
    return true;
  });
  const availableInstructors = reactExports.useMemo(() => {
    if (!form.course_id) return [];
    const ids = ci.filter((x) => x.course_id === form.course_id).map((x) => x.instructor_id);
    return instructors.filter((i) => ids.includes(i.id));
  }, [form.course_id, ci, instructors]);
  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (l) => {
    setEditing(l);
    setForm({
      course_id: l.course_id,
      instructor_id: l.instructor_id,
      date: l.date,
      start_time: l.start_time.slice(0, 5),
      end_time: l.end_time.slice(0, 5),
      location: l.location,
      notes: l.notes || ""
    });
    setOpen(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (form.start_time >= form.end_time) {
      toast.error("وقت النهاية يجب أن يكون بعد وقت البداية");
      return;
    }
    const conflict = lectures.find((l) => l.id !== editing?.id && l.date === form.date && l.location === form.location && form.start_time < l.end_time.slice(0, 5) && form.end_time > l.start_time.slice(0, 5));
    if (conflict) {
      const cName = courses.find((c) => c.id === conflict.course_id)?.name ?? "محاضرة أخرى";
      toast.error(`تعارض في الحجز: قاعة ${conflict.location} محجوزة لـ "${cName}" من ${conflict.start_time.slice(0, 5)} إلى ${conflict.end_time.slice(0, 5)}`);
      return;
    }
    const payload = {
      ...form,
      notes: form.notes || null
    };
    const {
      error
    } = editing ? await supabase.from("lectures").update(payload).eq("id", editing.id) : await supabase.from("lectures").insert(payload);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? "تم التحديث" : "تم الإضافة");
    setOpen(false);
    qc.invalidateQueries({
      queryKey: ["lectures"]
    });
  };
  const doDelete = async () => {
    if (!del) return;
    const {
      error
    } = await supabase.from("lectures").delete().eq("id", del.id);
    if (error) toast.error(error.message);
    else toast.success("تم الحذف");
    setDel(null);
    qc.invalidateQueries({
      queryKey: ["lectures"]
    });
  };
  const [y, m] = month.split("-").map(Number);
  const firstDay = new Date(y, m - 1, 1);
  const daysInMonth = new Date(y, m, 0).getDate();
  const startWeekday = firstDay.getDay();
  const calendarCells = [];
  for (let i = 0; i < startWeekday; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  const lecturesByDay = (d) => filtered.filter((l) => l.date === `${month}-${String(d).padStart(2, "0")}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "جدول المحاضرات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-2 h-4 w-4" }),
          " إضافة محاضرة"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-2 md:grid-cols-5 gap-3 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "من" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: fFrom, onChange: (e) => setFFrom(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "إلى" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: fTo, onChange: (e) => setFTo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "القاعة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fLoc, onValueChange: setFLoc, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "الكل" }),
              LOCATIONS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الكورس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fCourse, onValueChange: setFCourse, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "الكل" }),
              courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "المحاضر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fInstr, onValueChange: setFInstr, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "الكل" }),
              instructors.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.id, children: i.full_name }, i.id))
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => {
            const nd = new Date(y, m - 2, 1);
            setMonth(`${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, "0")}`);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold", children: firstDay.toLocaleDateString("ar-EG", {
            month: "long",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => {
            const nd = new Date(y, m, 1);
            setMonth(`${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, "0")}`);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2", children: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: d }, d)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: calendarCells.map((d, i) => {
          if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-28" }, i);
          const dateStr = `${month}-${String(d).padStart(2, "0")}`;
          const dayLectures = lecturesByDay(d);
          const isToday = dateStr === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDayOpen(dateStr), className: `min-h-28 border rounded p-1.5 text-xs bg-card hover:bg-accent transition text-right ${isToday ? "ring-2 ring-primary" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-bold mb-1 ${isToday ? "text-primary" : ""}`, children: d }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              dayLectures.slice(0, 3).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-1.5 py-0.5 rounded text-[10px] truncate ${LOCATION_COLORS[l.location]}`, children: [
                l.start_time.slice(0, 5),
                " ",
                courses.find((c) => c.id === l.course_id)?.name
              ] }, l.id)),
              dayLectures.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                "+",
                dayLectures.length - 3,
                " المزيد"
              ] })
            ] })
          ] }, i);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!dayOpen, onOpenChange: (o) => !o && setDayOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "محاضرات يوم ",
        dayOpen && formatArabicDate(dayOpen)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[60vh] overflow-y-auto", children: (() => {
        const list = dayOpen ? filtered.filter((l) => l.date === dayOpen).sort((a, b) => a.start_time.localeCompare(b.start_time)) : [];
        if (list.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "لا توجد محاضرات في هذا اليوم" });
        return list.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: courses.find((c) => c.id === l.course_id)?.name ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: LOCATION_COLORS[l.location], variant: "outline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 ml-1" }),
              "قاعة ",
              l.location
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { dir: "ltr", children: [
                l.start_time.slice(0, 5),
                " - ",
                l.end_time.slice(0, 5)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
              instructors.find((i) => i.id === l.instructor_id)?.full_name ?? "—"
            ] })
          ] }),
          l.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: l.notes }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => {
              setDayOpen(null);
              openEdit(l);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 ml-1" }),
              "تعديل"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => {
              setDayOpen(null);
              setDel(l);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 ml-1 text-destructive" }),
              "حذف"
            ] })
          ] })
        ] }) }, l.id));
      })() })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "تعديل محاضرة" : "إضافة محاضرة" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الكورس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.course_id, onValueChange: (v) => setForm({
            ...form,
            course_id: v,
            instructor_id: ""
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر كورس" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المحاضر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.instructor_id, onValueChange: (v) => setForm({
            ...form,
            instructor_id: v
          }), disabled: !form.course_id, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: form.course_id ? "اختر محاضر" : "اختر الكورس أولاً" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: availableInstructors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-xs text-muted-foreground", children: "لا يوجد محاضرين لهذا الكورس" }) : availableInstructors.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.id, children: i.full_name }, i.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "التاريخ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", required: true, value: form.date, onChange: (e) => setForm({
              ...form,
              date: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "وقت البداية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", required: true, value: form.start_time, onChange: (e) => setForm({
              ...form,
              start_time: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "وقت النهاية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", required: true, value: form.end_time, onChange: (e) => setForm({
              ...form,
              end_time: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المكان" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.location, onValueChange: (v) => setForm({
            ...form,
            location: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LOCATIONS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: l, children: [
              "قاعة ",
              l
            ] }, l)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ملاحظات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
            ...form,
            notes: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "إلغاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: !form.course_id || !form.instructor_id, children: "حفظ" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!del, onOpenChange: (o) => !o && setDel(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "هل أنت متأكد من الحذف؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "سيتم حذف المحاضرة وكل سجلات الحضور المرتبطة بها." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: doDelete, children: "حذف" })
      ] })
    ] }) })
  ] });
}
export {
  SchedulePage as component
};
