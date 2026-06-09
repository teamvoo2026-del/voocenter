import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { C as Card, a as CardContent } from "./card-CaankBVl.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-C9L4k44O.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import "../_libs/sonner.mjs";
import "../_libs/ws.mjs";
import { f as Clock, S as Search, F as FingerprintPattern, s as Funnel, R as RotateCcw, E as Eye, g as User } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
function AuditLogsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [fAction, setFAction] = reactExports.useState("all");
  const [fEntity, setFEntity] = reactExports.useState("all");
  const [selectedLog, setSelectedLog] = reactExports.useState(null);
  const {
    data: logs = [],
    isLoading,
    isError,
    error: queryError
  } = useQuery({
    queryKey: ["audit_logs"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("audit_logs").select("*").order("created_at", {
        ascending: false
      }).limit(500);
      if (error) throw error;
      return data;
    }
  });
  const filtered = reactExports.useMemo(() => {
    return logs.filter((l) => {
      const matchSearch = !search || l.user_name?.toLowerCase().includes(search.toLowerCase()) || l.user_email?.toLowerCase().includes(search.toLowerCase()) || l.entity_id?.toLowerCase().includes(search.toLowerCase());
      const matchAction = fAction === "all" || l.action_type === fAction;
      const matchEntity = fEntity === "all" || l.entity_type === fEntity;
      return matchSearch && matchAction && matchEntity;
    });
  }, [logs, search, fAction, fEntity]);
  const uniqueEntities = reactExports.useMemo(() => {
    const set = new Set(logs.map((l) => l.entity_type).filter(Boolean));
    return Array.from(set).sort();
  }, [logs]);
  const resetFilters = () => {
    setSearch("");
    setFAction("all");
    setFEntity("all");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-primary" }),
          "سجل الأنشطة (Audit Logs)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "تتبع كل العمليات والتحركات التي تمت على النظام" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30 border-none shadow-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
            " بحث"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "اسم المستخدم، الإيميل، أو معرف الكيان...", value: search, onChange: (e) => setSearch(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "h-3.5 w-3.5" }),
            " نوع العملية"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fAction, onValueChange: setFAction, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل العمليات" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "CREATE", children: "إضافة (CREATE)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "UPDATE", children: "تعديل (UPDATE)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "DELETE", children: "حذف (DELETE)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "LOGIN", children: "دخول (LOGIN)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "LOGOUT", children: "خروج (LOGOUT)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
            " الكيان"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fEntity, onValueChange: setFEntity, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل الكيانات" }),
              uniqueEntities.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: e, children: e }, e))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full", onClick: resetFilters, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "ml-2 h-4 w-4" }),
          " ريست الفلاتر"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
        isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center text-destructive bg-destructive/10 border-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "فشل تحميل السجلات:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: queryError?.message || "حدث خطأ غير معروف" })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground italic", children: "جاري تحميل السجلات..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground italic", children: "لا توجد سجلات مطابقة للبحث" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "التوقيت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المستخدم" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "العملية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الكيان" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "معرف الكيان" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right w-[100px]", children: "التفاصيل" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-muted/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-medium", dir: "ltr", children: new Date(log.created_at).toLocaleString("ar-EG") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: log.user_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: log.user_email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "w-fit text-[9px] h-4 px-1 mt-0.5", children: log.user_role })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: log.action_type === "CREATE" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : log.action_type === "UPDATE" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" : log.action_type === "DELETE" ? "bg-red-500/10 text-red-600 hover:bg-red-500/20" : "bg-slate-500/10 text-slate-600", children: log.action_type }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize", children: log.entity_type || "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[10px] font-mono text-muted-foreground", children: log.entity_id || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setSelectedLog(log), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) })
          ] }, log.id)) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedLog, onOpenChange: (o) => !o && setSelectedLog(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", className: "max-w-3xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }),
        " تفاصيل العملية"
      ] }) }),
      selectedLog && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground italic", children: "المستخدم" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
              " ",
              selectedLog.user_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground italic", children: "نوع العملية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", children: [
              selectedLog.action_type,
              " / ",
              selectedLog.entity_type || "—"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground italic", children: "التاريخ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", dir: "ltr", children: new Date(selectedLog.created_at).toLocaleString("ar-EG") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full border-t pt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground italic", children: "معلومات الجهاز (User Agent)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono bg-muted p-2 rounded", children: selectedLog.user_agent })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 border-t pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-blue-600 font-bold", children: "القيم القديمة (Before)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[10px] p-3 bg-slate-50 dark:bg-slate-900 rounded-md overflow-x-auto min-h-[100px]", children: JSON.stringify(selectedLog.old_values, null, 2) || "لا توجد بيانات" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-emerald-600 font-bold", children: "القيم الجديدة (After)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[10px] p-3 bg-slate-50 dark:bg-slate-900 rounded-md overflow-x-auto min-h-[100px]", children: JSON.stringify(selectedLog.new_values, null, 2) || "لا توجد بيانات" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AuditLogsPage as component
};
