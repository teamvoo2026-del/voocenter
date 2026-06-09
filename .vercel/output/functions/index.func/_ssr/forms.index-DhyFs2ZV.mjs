import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { C as Card } from "./card-CaankBVl.mjs";
import { u as useForms, a as useFormResponseCounts, s as slugify } from "./forms-NEnUjjeh.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import "../_libs/ws.mjs";
import { P as Plus, t as FileText, u as ChartColumn, b as Pencil, v as ExternalLink, w as Copy, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/tailwind-merge.mjs";
function FormsList() {
  const {
    data: forms = [],
    isLoading
  } = useForms();
  const {
    data: counts = {}
  } = useFormResponseCounts();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const handleNew = async () => {
    const title = "نموذج بدون عنوان";
    const {
      data,
      error
    } = await supabase.from("forms").insert({
      title,
      slug: slugify(title),
      fields: []
    }).select().single();
    if (error) return toast.error("فشل إنشاء النموذج");
    qc.invalidateQueries({
      queryKey: ["forms"]
    });
    navigate({
      to: "/forms/$id/edit",
      params: {
        id: data.id
      }
    });
  };
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا النموذج وكل إجاباته؟")) return;
    const {
      error
    } = await supabase.from("forms").delete().eq("id", id);
    if (error) return toast.error("فشل الحذف");
    toast.success("تم الحذف");
    qc.invalidateQueries({
      queryKey: ["forms"]
    });
  };
  const copyLink = (slug) => {
    const url = `${window.location.origin}/form/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("تم نسخ الرابط");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "النماذج" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "إنشاء نماذج لجمع البيانات من الطلاب" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleNew, size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 ml-2" }),
        " نموذج جديد"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "جاري التحميل..." }) : forms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "لا توجد نماذج بعد" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleNew, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 ml-2" }),
        "إنشاء أول نموذج"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: forms.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden group hover:shadow-lg transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 relative", style: {
        backgroundColor: f.header_color
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "absolute bottom-3 right-3 h-6 w-6 text-white/80" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold truncate", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "آخر تعديل ",
            new Date(f.updated_at).toLocaleDateString("ar-EG")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            f.fields.length,
            " سؤال"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forms/$id/responses", params: {
            id: f.id
          }, className: "flex items-center gap-1 text-primary hover:underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-3 w-3" }),
            " ",
            counts[f.id] ?? 0,
            " إجابة"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 pt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "ghost", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forms/$id/edit", params: {
            id: f.id
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "ghost", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/form/${f.slug}`, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "flex-1", onClick: () => copyLink(f.slug), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "flex-1 text-destructive", onClick: () => handleDelete(f.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] })
    ] }, f.id)) })
  ] }) });
}
export {
  FormsList as component
};
