import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CaankBVl.mjs";
import { u as useStudents, d as useInstructors, a as useCourses, c as useLectures, f as useAttendance } from "./data-CTypYknh.mjs";
import { a as LOCATION_COLORS } from "./constants-DSyRhD0w.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import "../_libs/ws.mjs";
import "../_libs/sonner.mjs";
import { h as Users, k as ClipboardCheck, G as GraduationCap, l as BookOpen, m as Percent } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
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
function Dashboard() {
  const {
    data: students = []
  } = useStudents();
  const {
    data: instructors = []
  } = useInstructors();
  const {
    data: courses = []
  } = useCourses();
  const {
    data: lectures = []
  } = useLectures();
  const {
    data: attendance = []
  } = useAttendance();
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todaysLectures = lectures.filter((l) => l.date === today);
  const activeInstructors = instructors.filter((i) => i.is_active);
  const ongoingCourses = courses.filter((c) => lectures.some((l) => l.course_id === c.id && l.date >= today));
  const present = attendance.filter((a) => a.status === "حاضر").length;
  const attendanceRate = attendance.length ? Math.round(present / attendance.length * 100) : 0;
  const courseAttendance = courses.map((c) => {
    const lectureIds = lectures.filter((l) => l.course_id === c.id).map((l) => l.id);
    const recs = attendance.filter((a) => lectureIds.includes(a.lecture_id));
    const pres = recs.filter((r) => r.status === "حاضر").length;
    return {
      name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
      rate: recs.length ? Math.round(pres / recs.length * 100) : 0
    };
  }).filter((c) => c.rate > 0).slice(0, 8);
  const stats = [{
    label: "إجمالي الطلاب",
    value: students.length,
    icon: Users,
    color: "text-blue-600 bg-blue-100"
  }, {
    label: "محاضرات اليوم",
    value: todaysLectures.length,
    icon: ClipboardCheck,
    color: "text-purple-600 bg-purple-100"
  }, {
    label: "المحاضرين النشطين",
    value: activeInstructors.length,
    icon: GraduationCap,
    color: "text-green-600 bg-green-100"
  }, {
    label: "الكورسات الجارية",
    value: ongoingCourses.length,
    icon: BookOpen,
    color: "text-orange-600 bg-orange-100"
  }, {
    label: "نسبة الحضور",
    value: attendanceRate + "%",
    icon: Percent,
    color: "text-pink-600 bg-pink-100"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "لوحة التحكم" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "نظرة عامة على المركز" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-2 lg:grid-cols-5", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-lg ${s.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: s.value })
      ] })
    ] }) }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "محاضرات اليوم" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: todaysLectures.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "لا توجد محاضرات اليوم" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الكورس" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المحاضر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الوقت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "القاعة" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: todaysLectures.map((l) => {
            const c = courses.find((c2) => c2.id === l.course_id);
            const i = instructors.find((i2) => i2.id === l.instructor_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: c?.name ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: i?.full_name ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { dir: "ltr", children: [
                l.start_time.slice(0, 5),
                " - ",
                l.end_time.slice(0, 5)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: LOCATION_COLORS[l.location], variant: "outline", children: l.location }) })
            ] }, l.id);
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "نسبة الحضور لكل كورس" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: courseAttendance.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "لا توجد بيانات حضور بعد" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: courseAttendance, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "rate", fill: "hsl(220 70% 50%)", name: "نسبة الحضور %" })
        ] }) }) })
      ] })
    ] })
  ] }) });
}
export {
  Dashboard as component
};
