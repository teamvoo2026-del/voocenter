import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { C as Card } from "./card-CaankBVl.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BP4zpGrs.mjs";
import { c as useForm, d as useFormResponses } from "./forms-NEnUjjeh.mjs";
import { a as Route$1 } from "./router-B0juCGTQ.mjs";
import "../_libs/ws.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowRight, D as Download } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, P as PieChart, b as Pie, c as Cell, T as Tooltip, B as BarChart, X as XAxis, Y as YAxis, a as Bar } from "../_libs/recharts.mjs";
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
import "./sonner-DeNSN9-c.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
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
const PIE_COLORS = ["#673AB7", "#2196F3", "#4CAF50", "#FF9800", "#F44336", "#9C27B0", "#009688", "#FF5722"];
function ResponsesPage() {
  const {
    id
  } = Route$1.useParams();
  const {
    data: form
  } = useForm(id);
  const {
    data: responses = []
  } = useFormResponses(id);
  const exportCsv = () => {
    if (!form) return;
    const headers = ["تاريخ الإرسال", ...form.fields.map((f) => f.title)];
    const rows = responses.map((r) => [new Date(r.submitted_at).toLocaleString("ar-EG"), ...form.fields.map((f) => {
      const v = r.data[f.id];
      return Array.isArray(v) ? v.join("؛ ") : v ?? "";
    })]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title}-responses.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  if (!form) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "جاري التحميل..." }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forms", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1" }),
          "رجوع"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: form.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          responses.length,
          " إجابة"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: exportCsv, variant: "outline", disabled: responses.length === 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 ml-2" }),
        "تصدير CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "summary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "summary", children: "ملخص" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "individual", children: "إجابات فردية" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "summary", className: "space-y-4 mt-4", children: responses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 text-center text-muted-foreground", children: "لا توجد إجابات بعد" }) : form.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionSummary, { field: f, responses })
      ] }, f.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "individual", className: "space-y-3 mt-4", children: responses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 text-center text-muted-foreground", children: "لا توجد إجابات بعد" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IndividualResponses, { form, responses }) })
    ] })
  ] }) });
}
function QuestionSummary({
  field,
  responses
}) {
  const values = responses.map((r) => r.data[field.id]).filter((v) => v !== void 0 && v !== null && v !== "");
  if (["multiple_choice", "dropdown", "checkboxes", "linear_scale"].includes(field.type)) {
    const counts = {};
    for (const v of values) {
      if (Array.isArray(v)) v.forEach((x) => {
        counts[String(x)] = (counts[String(x)] ?? 0) + 1;
      });
      else counts[String(v)] = (counts[String(v)] ?? 0) + 1;
    }
    const data = Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
    if (field.type === "multiple_choice" || field.type === "dropdown") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data, dataKey: "value", nameKey: "name", outerRadius: 80, label: true, children: data.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "#673AB7" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto", children: values.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "لا توجد إجابات" }) : values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-muted/50 rounded text-sm", children: String(v) }, i)) });
}
function IndividualResponses({
  form,
  responses
}) {
  const [page, setPage] = reactExports.useState(0);
  const r = responses[page];
  const total = responses.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        "إجابة ",
        page + 1,
        " من ",
        total,
        " · ",
        new Date(r.submitted_at).toLocaleString("ar-EG")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setPage((p) => Math.max(0, p - 1)), disabled: page === 0, children: "السابق" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setPage((p) => Math.min(total - 1, p + 1)), disabled: page === total - 1, children: "التالي" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: form.fields.map((f) => {
      const v = r.data[f.id];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: Array.isArray(v) ? v.join("، ") : v !== void 0 && v !== null && v !== "" ? String(v) : "—" })
      ] }, f.id);
    }) })
  ] }) });
}
export {
  ResponsesPage as component
};
