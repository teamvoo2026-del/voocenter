import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { c as useLectures, a as useCourses, d as useInstructors, u as useStudents, b as useCourseStudents, f as useAttendance } from "./data-CTypYknh.mjs";
import { f as formatArabicDate, e as ATTENDANCE_STATUSES } from "./constants-DSyRhD0w.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CaankBVl.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { C as Checkbox } from "./checkbox-DgfiZdjL.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logAction } from "./router-B0juCGTQ.mjs";
import "../_libs/ws.mjs";
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
import "../_libs/lucide-react.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
function AttendancePage() {
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
    data: students = []
  } = useStudents();
  const {
    data: cs = []
  } = useCourseStudents();
  const {
    data: attendance = []
  } = useAttendance();
  const [lectureId, setLectureId] = reactExports.useState("");
  const [state, setState] = reactExports.useState({});
  const [enrollOpen, setEnrollOpen] = reactExports.useState(false);
  const [extraEnrolled, setExtraEnrolled] = reactExports.useState(/* @__PURE__ */ new Set());
  const lecture = lectures.find((l) => l.id === lectureId);
  const enrolledIds = reactExports.useMemo(() => {
    if (!lecture) return [];
    const matches = cs.filter((x) => {
      if (x.course_id !== lecture.course_id) return false;
      if (lecture.run_id) return x.run_id === lecture.run_id;
      return true;
    });
    const base = matches.map((x) => x.student_id);
    return [.../* @__PURE__ */ new Set([...base, ...extraEnrolled])];
  }, [lecture, cs, extraEnrolled]);
  const enrolledStudents = students.filter((s) => enrolledIds.includes(s.id));
  reactExports.useEffect(() => {
    if (!lectureId) {
      setState({});
      return;
    }
    const existing = attendance.filter((a) => a.lecture_id === lectureId);
    const init = {};
    existing.forEach((a) => init[a.student_id] = a.status);
    setState(init);
    setExtraEnrolled(/* @__PURE__ */ new Set());
  }, [lectureId, attendance]);
  const setAll = (status) => {
    const next = {};
    enrolledStudents.forEach((s) => next[s.id] = status);
    setState(next);
  };
  const [focusIdx, setFocusIdx] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!lectureId || enrolledStudents.length === 0) return;
    const handler = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      const map = {
        h: "حاضر",
        p: "حاضر",
        a: "غائب",
        l: "متأخر"
      };
      if (map[key]) {
        const s = enrolledStudents[focusIdx];
        if (s) {
          setState((prev) => ({
            ...prev,
            [s.id]: map[key]
          }));
          setFocusIdx((i) => Math.min(i + 1, enrolledStudents.length - 1));
          e.preventDefault();
        }
      } else if (e.key === "ArrowDown") {
        setFocusIdx((i) => Math.min(i + 1, enrolledStudents.length - 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setFocusIdx((i) => Math.max(i - 1, 0));
        e.preventDefault();
      } else if (e.ctrlKey && key === "s") {
        save();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lectureId, enrolledStudents, focusIdx]);
  const save = async () => {
    if (!lectureId) return;
    await supabase.from("attendance").delete().eq("lecture_id", lectureId);
    const rows = Object.entries(state).map(([student_id, status]) => ({
      lecture_id: lectureId,
      student_id,
      status
    }));
    if (rows.length === 0) {
      toast.success("تم الحفظ");
      qc.invalidateQueries({
        queryKey: ["attendance"]
      });
      return;
    }
    const {
      error
    } = await supabase.from("attendance").insert(rows);
    if (error) toast.error(error.message);
    else {
      toast.success("تم حفظ الحضور");
      logAction({
        action_type: "UPDATE",
        entity_type: "attendance_batch",
        entity_id: lectureId,
        new_values: rows
      });
      qc.invalidateQueries({
        queryKey: ["attendance"]
      });
    }
  };
  const enrollStudent = async (studentId) => {
    if (!lecture) return;
    const {
      error
    } = await supabase.from("course_students").insert({
      course_id: lecture.course_id,
      student_id: studentId
    });
    if (error && !error.message.includes("duplicate")) {
      toast.error(error.message);
      return;
    }
    setExtraEnrolled((prev) => new Set(prev).add(studentId));
    qc.invalidateQueries({
      queryKey: ["course_students"]
    });
    toast.success("تم تسجيل الطالب في الكورس");
    logAction({
      action_type: "CREATE",
      entity_type: "enrollment",
      entity_id: studentId,
      new_values: {
        course_id: lecture.course_id,
        lecture_id: lecture.id
      }
    });
  };
  const counts = {
    حاضر: 0,
    غائب: 0,
    متأخر: 0
  };
  Object.values(state).forEach((s) => counts[s]++);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "تسجيل الحضور" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "اختر المحاضرة" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: lectureId, onValueChange: setLectureId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "— اختر محاضرة —" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: lectures.map((l) => {
          const c = courses.find((c2) => c2.id === l.course_id);
          const i = instructors.find((i2) => i2.id === l.instructor_id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: l.id, children: [
            formatArabicDate(l.date),
            " - ",
            c?.name,
            " (",
            i?.full_name,
            ")"
          ] }, l.id);
        }) })
      ] }) })
    ] }),
    lecture && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: counts.حاضر }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "حاضر" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: counts.غائب }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "غائب" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-amber-600", children: counts.متأخر }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "متأخر" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
            "الطلاب المسجلون (",
            enrolledStudents.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setEnrollOpen((o) => !o), children: enrollOpen ? "إخفاء" : "تسجيل طلاب للكورس" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, children: "حفظ الحضور" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          enrollOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 border rounded-md bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-2 font-medium", children: "إضافة طلاب لهذا الكورس:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto", children: students.filter((s) => !enrolledIds.includes(s.id)).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { onCheckedChange: () => enrollStudent(s.id) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                s.full_name,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "(",
                  s.academic_year,
                  ")"
                ] })
              ] })
            ] }, s.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap gap-2 items-center text-xs text-muted-foreground bg-muted/40 p-2 rounded", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "اختصارات:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 bg-background border rounded", children: "H" }),
            " حاضر",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 bg-background border rounded", children: "A" }),
            " غائب",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 bg-background border rounded", children: "L" }),
            " متأخر",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 bg-background border rounded", children: "↑↓" }),
            " تنقل",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 bg-background border rounded", children: "Ctrl+S" }),
            " حفظ"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "text-green-700 border-green-300", onClick: () => setAll("حاضر"), children: "تحديد الكل حاضر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "text-red-700 border-red-300", onClick: () => setAll("غائب"), children: "تحديد الكل غائب" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "text-amber-700 border-amber-300", onClick: () => setAll("متأخر"), children: "تحديد الكل متأخر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setState({}), children: "مسح الكل" })
          ] }),
          enrolledStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "لا يوجد طلاب مسجلون في هذا الكورس بعد" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: enrolledStudents.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setFocusIdx(idx), className: `flex items-center justify-between p-3 border rounded-md bg-card cursor-pointer transition ${idx === focusIdx ? "ring-2 ring-primary" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: s.full_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                s.academic_year,
                " • ",
                s.gender
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ATTENDANCE_STATUSES.map((st) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: state[s.id] === st ? "default" : "outline", onClick: () => setState({
              ...state,
              [s.id]: st
            }), className: state[s.id] === st ? st === "حاضر" ? "bg-green-600 hover:bg-green-700" : st === "غائب" ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700" : "", children: st }, st)) })
          ] }, s.id)) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AttendancePage as component
};
