import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { c as useLectures, a as useCourses, u as useStudents, b as useCourseStudents, f as useAttendance } from "./data-CTypYknh.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CaankBVl.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BP4zpGrs.mjs";
import "../_libs/ws.mjs";
import "../_libs/sonner.mjs";
import { D as Download } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "../_libs/recharts.mjs";
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
import "./client-CtBVxJGa.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./router-B0juCGTQ.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function ReportsPage() {
  const {
    data: lectures = []
  } = useLectures();
  const {
    data: courses = []
  } = useCourses();
  const {
    data: students = []
  } = useStudents();
  const {
    data: cs = []
  } = useCourseStudents();
  const {
    data: attendance = []
  } = useAttendance();
  const [aCourse, setACourse] = reactExports.useState("");
  const [aFrom, setAFrom] = reactExports.useState("");
  const [aTo, setATo] = reactExports.useState("");
  const [threshold, setThreshold] = reactExports.useState(3);
  const absenceRows = reactExports.useMemo(() => {
    if (!aCourse) return [];
    const lecs = lectures.filter((l) => l.course_id === aCourse && (!aFrom || l.date >= aFrom) && (!aTo || l.date <= aTo));
    const lecIds = lecs.map((l) => l.id);
    const studentIds = cs.filter((x) => x.course_id === aCourse).map((x) => x.student_id);
    return studentIds.map((sid) => {
      const recs = attendance.filter((a) => a.student_id === sid && lecIds.includes(a.lecture_id));
      const present = recs.filter((r) => r.status === "حاضر").length;
      const absent = recs.filter((r) => r.status === "غائب").length;
      const late = recs.filter((r) => r.status === "متأخر").length;
      const total = lecs.length;
      const rate = total ? Math.round(present / total * 100) : 0;
      return {
        student: students.find((s) => s.id === sid)?.full_name ?? "—",
        total,
        present,
        absent,
        late,
        rate
      };
    });
  }, [aCourse, aFrom, aTo, lectures, cs, attendance, students]);
  const exportCSV = () => {
    const rows = [["اسم الطالب", "الغياب", "نسبة الحضور"], ...absenceRows.map((r) => [r.student, String(r.absent), r.rate + "%"])];
    const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "تقرير_الغياب.csv";
    a.click();
  };
  const [sCourse, setSCourse] = reactExports.useState("");
  const summary = reactExports.useMemo(() => {
    if (!sCourse) return null;
    const c = courses.find((x) => x.id === sCourse);
    const enrolled = cs.filter((x) => x.course_id === sCourse).length;
    const lecs = lectures.filter((l) => l.course_id === sCourse);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const completed = lecs.filter((l) => l.date <= today).length;
    const upcoming = lecs.filter((l) => l.date > today).length;
    const lecIds = lecs.map((l) => l.id);
    const recs = attendance.filter((a) => lecIds.includes(a.lecture_id));
    const avg = recs.length ? Math.round(recs.filter((r) => r.status === "حاضر").length / recs.length * 100) : 0;
    const chart = lecs.sort((a, b) => a.date.localeCompare(b.date)).map((l) => {
      const r = attendance.filter((a) => a.lecture_id === l.id);
      const p = r.filter((x) => x.status === "حاضر").length;
      return {
        date: l.date.slice(5),
        rate: r.length ? Math.round(p / r.length * 100) : 0
      };
    });
    return {
      course: c,
      enrolled,
      completed,
      upcoming,
      avg,
      chart
    };
  }, [sCourse, courses, cs, lectures, attendance]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "التقارير" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "absence", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "absence", children: "تقرير غياب الطلاب" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "summary", children: "ملخص الكورس" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "absence", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "تقرير غياب الطلاب" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الكورس" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: aCourse, onValueChange: setACourse, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "من" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: aFrom, onChange: (e) => setAFrom(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "إلى" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: aTo, onChange: (e) => setATo(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "حد الغياب" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: threshold, onChange: (e) => setThreshold(Number(e.target.value)) })
            ] })
          ] }),
          aCourse && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: exportCSV, variant: "outline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "ml-2 h-4 w-4" }),
              " تصدير CSV"
            ] }) }),
            absenceRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "لا يوجد طلاب مسجلين" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الطالب" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "إجمالي المحاضرات" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "حاضر" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "غائب" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "متأخر" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "نسبة الحضور" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: absenceRows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: r.absent > threshold ? "bg-red-50 text-red-900" : "", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.student }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.total }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.present }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.absent }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.late }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  r.rate,
                  "%"
                ] })
              ] }, i)) })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "summary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "تقرير ملخص الكورس" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sCourse, onValueChange: setSCourse, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر كورس" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
          ] }),
          summary && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: summary.enrolled }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "طلاب مسجلون" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
                  summary.avg,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "متوسط الحضور" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: summary.completed }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "محاضرات منتهية" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: summary.upcoming }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "محاضرات قادمة" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              "الكورس: ",
              summary.course.name
            ] }),
            summary.chart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: summary.chart, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "rate", fill: "hsl(220 70% 50%)", name: "نسبة الحضور %" })
            ] }) }) })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ReportsPage as component
};
