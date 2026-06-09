import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent, e as CardFooter } from "./card-CaankBVl.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logAction } from "./router-B0juCGTQ.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CtblATKM.mjs";
import "../_libs/ws.mjs";
import { D as Download, L as LoaderCircle, U as Upload, c as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const DELETE_ORDER = [
  "camp_attendance",
  "attendance",
  "lectures",
  "course_instructors",
  "course_students",
  "payments",
  "supply_loans",
  "form_responses",
  "camp_students",
  "camp_session_slots",
  "camp_subjects",
  "courses",
  "students",
  "instructors",
  "forms",
  "supplies",
  "camps"
];
const INSERT_ORDER = [
  "camps",
  "courses",
  "students",
  "instructors",
  "forms",
  "supplies",
  "camp_subjects",
  "camp_session_slots",
  "camp_students",
  "lectures",
  "form_responses",
  "supply_loans",
  "course_instructors",
  "course_students",
  "payments",
  "attendance",
  "camp_attendance"
];
async function exportDatabase() {
  try {
    const backup = {};
    for (const table of INSERT_ORDER) {
      const { data, error } = await supabase.from(table).select("*");
      if (error) throw error;
      backup[table] = data || [];
    }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voocenter_backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Backup error:", error);
    toast.error("فشل في إنشاء النسخة الاحتياطية: " + error.message);
    return false;
  }
}
async function restoreDatabase(jsonString) {
  try {
    const backup = JSON.parse(jsonString);
    const tablesInBackup = Object.keys(backup);
    if (!tablesInBackup.includes("students") || !tablesInBackup.includes("courses")) {
      throw new Error("ملف النسخة الاحتياطية غير صالح أو تالف.");
    }
    for (const table of DELETE_ORDER) {
      const { error } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
      if (error) {
        console.error(`Error deleting table ${table}:`, error);
        throw new Error(`فشل في مسح بيانات الجدول: ${table} - ` + error.message);
      }
    }
    for (const table of INSERT_ORDER) {
      const rows = backup[table];
      if (rows && rows.length > 0) {
        const { error } = await supabase.from(table).insert(rows);
        if (error) {
          console.error(`Error inserting into ${table}:`, error);
          throw new Error(`فشل في استرجاع بيانات الجدول: ${table} - ` + error.message);
        }
      }
    }
    return true;
  } catch (error) {
    console.error("Restore error:", error);
    toast.error("فشل في الاسترجاع: " + (error.message || "خطأ غير معروف"));
    return false;
  }
}
function SettingsPage() {
  const [exporting, setExporting] = reactExports.useState(false);
  const [restoring, setRestoring] = reactExports.useState(false);
  const [showRestoreWarning, setShowRestoreWarning] = reactExports.useState(false);
  const [selectedFileContent, setSelectedFileContent] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const handleExport = async () => {
    setExporting(true);
    try {
      const success = await exportDatabase();
      if (success) {
        toast.success("تم تنزيل النسخة الاحتياطية بنجاح!");
        logAction({
          action_type: "CREATE",
          entity_type: "backup",
          new_values: {
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
      } else {
        toast.error("حدث خطأ أثناء تنزيل النسخة الاحتياطية.");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تنزيل النسخة الاحتياطية.");
    }
    setExporting(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setSelectedFileContent(result);
        setShowRestoreWarning(true);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const confirmRestore = async () => {
    setShowRestoreWarning(false);
    if (!selectedFileContent) return;
    setRestoring(true);
    toast.info("جاري استعادة النسخة الاحتياطية... برجاء عدم إغلاق الصفحة.");
    const success = await restoreDatabase(selectedFileContent);
    if (success) {
      toast.success("تم استعادة قاعدة البيانات بنجاح! جاري تحديث الصفحة...");
      logAction({
        action_type: "UPDATE",
        entity_type: "database_restore",
        new_values: {
          restored_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
      setTimeout(() => {
        window.location.reload();
      }, 2e3);
    } else {
      toast.error("فشل في استعادة قاعدة البيانات. قد يكون الملف تالفاً أو هنالك خطأ بالاتصال.");
    }
    setRestoring(false);
    setSelectedFileContent(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "الإعدادات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "تكوين النظام وإدارة قاعدة البيانات" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5 text-emerald-600" }),
              "أخذ نسخة احتياطية"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "تحميل جميع بيانات النظام الحالية (الطلاب، الكورسات، المدفوعات، إلخ) في ملف JSON." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "يُنصح بأخذ نسخة احتياطية بشكل دوري لتجنب فقدان البيانات." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleExport, disabled: exporting || restoring, className: "w-full", children: [
            exporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin ml-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 ml-2" }),
            exporting ? "جاري التحميل..." : "تحميل نسخة احتياطية"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/20 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1 bg-destructive h-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl flex items-center gap-2 text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }),
              "استعادة نسخة احتياطية"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "استعادة بيانات النظام من ملف JSON تم تحميله مسبقاً." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "تحذير هام:" }),
              " عملية الاستعادة ستقوم بمسح جميع البيانات الحالية واستبدالها ببيانات النسخة الاحتياطية. لا يمكن التراجع عن هذه الخطوة!"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: ".json", className: "hidden", ref: fileInputRef, onChange: handleFileChange }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: () => fileInputRef.current?.click(), disabled: exporting || restoring, className: "w-full", children: [
              restoring ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin ml-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 ml-2" }),
              restoring ? "جاري الاستعادة..." : "استعادة البيانات (حذف و استبدال)"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showRestoreWarning, onOpenChange: setShowRestoreWarning, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "text-destructive flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
          "تأكيد استعادة النظام"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "أنت على وشك استعادة النظام من النسخة الاحتياطية.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "سيتم مسح جميع بيانات الطلاب، الكورسات، المدفوعات و الايرادات المسجلة حالياً!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "هل أنت متأكد من رغبتك بالاستمرار واستبدال قاعدة البيانات؟"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: confirmRestore, className: "bg-destructive hover:bg-destructive/90", children: "نعم، استعادة النظام" })
      ] })
    ] }) })
  ] });
}
export {
  SettingsPage as component
};
