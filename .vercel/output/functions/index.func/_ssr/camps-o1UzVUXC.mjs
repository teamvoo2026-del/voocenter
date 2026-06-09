import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CaankBVl.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-C9L4k44O.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CtblATKM.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { C as Checkbox } from "./checkbox-DgfiZdjL.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BP4zpGrs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/ws.mjs";
import { q as Tent, P as Plus, b as Pencil, T as Trash2, r as CircleCheck, c as TriangleAlert, h as Users, k as ClipboardCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
const LEVELS = ["ابتدائي صغير", "ابتدائي كبير", "إعدادي"];
const LEVEL_GRADES = {
  "ابتدائي صغير": [1, 2, 3],
  "ابتدائي كبير": [4, 5, 6],
  "إعدادي": [7, 8, 9]
};
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
const ICONS = ["🤖", "🧠", "💻", "🎵", "🎨", "🔬", "📚", "⚽", "🌍", "🎭", "🧪", "🚀"];
const WEEKDAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const ATT_STATUSES = ["حاضر", "غائب", "متأخر"];
function CampsPage() {
  const qc = useQueryClient();
  const {
    data: camps = []
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camps").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [campDialog, setCampDialog] = reactExports.useState(false);
  const [editingCamp, setEditingCamp] = reactExports.useState(null);
  const [delCamp, setDelCamp] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!selectedId && camps.length > 0) setSelectedId(camps[0].id);
  }, [camps, selectedId]);
  const selected = camps.find((c) => c.id === selectedId) || null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tent, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "المعسكرات" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "إدارة المعسكرات والمواد والطلاب والحضور" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setEditingCamp(null);
          setCampDialog(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-2 h-4 w-4" }),
          " معسكر جديد"
        ] })
      ] }),
      camps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: camps.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedId(c.id), className: `group relative px-4 py-3 rounded-xl border-2 transition-all ${selectedId === c.id ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50 bg-card"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
          c.weeks,
          " أسبوع × ",
          c.sessions_per_week,
          " حصص"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "button", tabIndex: 0, onClick: (e) => {
          e.stopPropagation();
          setEditingCamp(c);
          setCampDialog(true);
        }, className: "absolute top-1 left-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-accent cursor-pointer", "aria-label": "تعديل", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "button", tabIndex: 0, onClick: (e) => {
          e.stopPropagation();
          setDelCamp(c);
        }, className: "absolute top-1 left-7 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 cursor-pointer", "aria-label": "حذف", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" }) })
      ] }, c.id)) }),
      !selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tent, { className: "h-12 w-12 mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "لا توجد معسكرات. ابدأ بإنشاء معسكر جديد." })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CampWorkspace, { camp: selected })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CampDialog, { open: campDialog, onOpenChange: setCampDialog, editing: editingCamp, onSaved: (id) => {
      qc.invalidateQueries({
        queryKey: ["camps"]
      });
      setSelectedId(id);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!delCamp, onOpenChange: (o) => !o && setDelCamp(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "حذف المعسكر؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'سيتم حذف "',
          delCamp?.name,
          '" وكل المواد والطلاب والحضور المرتبط به.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: async () => {
          if (!delCamp) return;
          const {
            error
          } = await supabase.from("camps").delete().eq("id", delCamp.id);
          if (error) toast.error(error.message);
          else {
            toast.success("تم الحذف");
            if (selectedId === delCamp.id) setSelectedId(null);
            qc.invalidateQueries({
              queryKey: ["camps"]
            });
          }
          setDelCamp(null);
        }, children: "حذف" })
      ] })
    ] }) })
  ] });
}
function CampDialog({
  open,
  onOpenChange,
  editing,
  onSaved
}) {
  const [name, setName] = reactExports.useState("");
  const [levels, setLevels] = reactExports.useState([]);
  const [weeks, setWeeks] = reactExports.useState(4);
  const [slots, setSlots] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!open) return;
    setName(editing?.name ?? "");
    setLevels(editing?.target_levels ?? []);
    setWeeks(editing?.weeks ?? 4);
    if (editing) {
      supabase.from("camp_session_slots").select("*").eq("camp_id", editing.id).order("sort_order").then(({
        data
      }) => {
        setSlots((data ?? []).map((s) => ({
          id: s.id,
          weekday: s.weekday,
          start_time: s.start_time?.slice(0, 5) ?? "09:00",
          end_time: s.end_time?.slice(0, 5) ?? "10:00"
        })));
      });
    } else {
      setSlots([{
        weekday: 0,
        start_time: "09:00",
        end_time: "10:00"
      }]);
    }
  }, [open, editing]);
  const toggleLevel = (lvl) => {
    setLevels((prev) => prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]);
  };
  const hoursOfSlot = (s) => {
    const [h1, m1] = s.start_time.split(":").map(Number);
    const [h2, m2] = s.end_time.split(":").map(Number);
    return Math.max(0, (h2 * 60 + m2 - (h1 * 60 + m1)) / 60);
  };
  const totalWeeklyHours = slots.reduce((a, s) => a + hoursOfSlot(s), 0);
  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("اسم المعسكر مطلوب");
      return;
    }
    if (levels.length === 0) {
      toast.error("اختر مرحلة واحدة على الأقل");
      return;
    }
    if (weeks < 1) {
      toast.error("عدد الأسابيع يجب أن يكون أكبر من صفر");
      return;
    }
    if (slots.length === 0) {
      toast.error("أضف موعد محاضرة واحد على الأقل");
      return;
    }
    for (const s of slots) {
      if (s.start_time >= s.end_time) {
        toast.error("وقت بداية أصغر من وقت النهاية في كل المحاضرات");
        return;
      }
    }
    const payload = {
      name: name.trim(),
      target_levels: levels,
      weeks,
      sessions_per_week: slots.length
    };
    let campId = editing?.id;
    if (editing) {
      const {
        error
      } = await supabase.from("camps").update(payload).eq("id", editing.id);
      if (error) {
        toast.error(error.message);
        return;
      }
    } else {
      const {
        data,
        error
      } = await supabase.from("camps").insert(payload).select().single();
      if (error) {
        toast.error(error.message);
        return;
      }
      campId = data.id;
    }
    await supabase.from("camp_session_slots").delete().eq("camp_id", campId);
    if (slots.length > 0) {
      const rows = slots.map((s, i) => ({
        camp_id: campId,
        weekday: s.weekday,
        start_time: s.start_time,
        end_time: s.end_time,
        sort_order: i
      }));
      const {
        error: sErr
      } = await supabase.from("camp_session_slots").insert(rows);
      if (sErr) {
        toast.error(sErr.message);
        return;
      }
    }
    toast.success(editing ? "تم التحديث" : "تم الإنشاء");
    onSaved(campId);
    onOpenChange(false);
  };
  const addSlot = () => setSlots([...slots, {
    weekday: 0,
    start_time: "09:00",
    end_time: "10:00"
  }]);
  const updateSlot = (i, patch) => setSlots(slots.map((s, idx) => idx === i ? {
    ...s,
    ...patch
  } : s));
  const removeSlot = (i) => setSlots(slots.filter((_, idx) => idx !== i));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "تعديل معسكر" : "معسكر جديد" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "اسم المعسكر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "معسكر الصيف 2026", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المراحل المستهدفة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2 mt-2", children: LEVELS.map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: levels.includes(lvl), onCheckedChange: () => toggleLevel(lvl) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lvl }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mr-auto", children: [
            "الصفوف ",
            LEVEL_GRADES[lvl].join("، ")
          ] })
        ] }, lvl)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "عدد الأسابيع" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: weeks, onChange: (e) => setWeeks(Number(e.target.value)), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "أيام ومواعيد المحاضرات في الأسبوع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: addSlot, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-1 h-4 w-4" }),
            " إضافة محاضرة"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          slots.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-end p-2 border rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "اليوم" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(s.weekday), onValueChange: (v) => updateSlot(i, {
                weekday: Number(v)
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: WEEKDAYS.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(idx), children: d }, idx)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "من" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: s.start_time, onChange: (e) => updateSlot(i, {
                start_time: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "إلى" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: s.end_time, onChange: (e) => updateSlot(i, {
                end_time: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeSlot(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
          ] }, i)),
          slots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-3", children: 'لا توجد محاضرات. اضغط "إضافة محاضرة".' })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/10 p-3 text-sm space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "عدد المحاضرات أسبوعياً: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: slots.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "ساعات الأسبوع: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: totalWeeklyHours })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "إجمالي الساعات المتاحة: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
            weeks * slots.length,
            " ساعة"
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(كل حصة = ساعة لأغراض توزيع المواد)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "حفظ" })
      ] })
    ] })
  ] }) });
}
function CampWorkspace({
  camp
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "subjects", className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "subjects", children: "المواد والساعات" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "schedule", children: "الجدول الأسبوعي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "students", children: "تسجيل الطلاب" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "attendance", children: "الحضور" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "subjects", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectsTab, { camp }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "schedule", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleTab, { camp }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "students", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentsTab, { camp }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "attendance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceTab, { camp }) })
  ] });
}
function useSubjects(campId) {
  return useQuery({
    queryKey: ["camp_subjects", campId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camp_subjects").select("*").eq("camp_id", campId).order("sort_order");
      if (error) throw error;
      return data;
    }
  });
}
function useSlots(campId) {
  return useQuery({
    queryKey: ["camp_slots", campId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camp_session_slots").select("*").eq("camp_id", campId).order("sort_order");
      if (error) throw error;
      return data;
    }
  });
}
function useCampStudents(campId) {
  return useQuery({
    queryKey: ["camp_students", campId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camp_students").select("*").eq("camp_id", campId).order("full_name");
      if (error) throw error;
      return data;
    }
  });
}
function SubjectsTab({
  camp
}) {
  const qc = useQueryClient();
  const {
    data: subjects = []
  } = useSubjects(camp.id);
  const totalAvailable = camp.weeks * camp.sessions_per_week;
  const totalAssigned = subjects.reduce((s, x) => s + (x.hours || 0), 0);
  const diff = totalAvailable - totalAssigned;
  const matched = diff === 0 && subjects.length > 0;
  const addSubject = async () => {
    const {
      error
    } = await supabase.from("camp_subjects").insert({
      camp_id: camp.id,
      name: "مادة جديدة",
      color: COLORS[subjects.length % COLORS.length],
      icon: ICONS[subjects.length % ICONS.length],
      hours: 0,
      sort_order: subjects.length
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["camp_subjects", camp.id]
    });
  };
  const updateSubject = async (id, patch) => {
    const {
      error
    } = await supabase.from("camp_subjects").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["camp_subjects", camp.id]
    });
  };
  const removeSubject = async (id) => {
    const {
      error
    } = await supabase.from("camp_subjects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["camp_subjects", camp.id]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "الساعات المتاحة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold mt-1", children: totalAvailable })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "الساعات المخصصة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold mt-1", children: totalAssigned })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: matched ? "border-emerald-500" : diff !== 0 ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: diff > 0 ? "ساعات متبقية" : diff < 0 ? "ساعات زائدة" : "متطابق" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-3xl font-bold mt-1 flex items-center gap-2 ${matched ? "text-emerald-600" : diff !== 0 ? "text-destructive" : ""}`, children: [
          Math.abs(diff),
          matched ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) : diff !== 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-6 w-6" }) : null
        ] })
      ] }) })
    ] }),
    !matched && subjects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0" }),
      "مجموع الساعات المخصصة (",
      totalAssigned,
      ") لا يساوي الساعات المتاحة (",
      totalAvailable,
      "). الرجاء تعديل التوزيع."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "المواد" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addSubject, size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-1 h-4 w-4" }),
        " إضافة مادة"
      ] })
    ] }),
    subjects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: 'لا توجد مواد. اضغط "إضافة مادة" للبدء.' }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: subjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2", style: {
        background: s.color
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-lg flex items-center justify-center text-2xl shrink-0", style: {
            background: `${s.color}20`
          }, children: s.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: s.name, onBlur: (e) => e.target.value !== s.name && updateSubject(s.id, {
            name: e.target.value
          }), className: "font-bold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeSubject(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "عدد الساعات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, defaultValue: s.hours, onBlur: (e) => {
            const v = Number(e.target.value) || 0;
            if (v !== s.hours) updateSubject(s.id, {
              hours: v
            });
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "اللون" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap mt-1", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateSubject(s.id, {
            color: c
          }), className: `h-6 w-6 rounded-full border-2 ${s.color === c ? "border-foreground" : "border-transparent"}`, style: {
            background: c
          } }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "الأيقونة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap mt-1", children: ICONS.map((ic) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateSubject(s.id, {
            icon: ic
          }), className: `h-8 w-8 rounded text-lg flex items-center justify-center hover:bg-accent ${s.icon === ic ? "bg-accent ring-2 ring-primary" : ""}`, children: ic }, ic)) })
        ] })
      ] })
    ] }, s.id)) })
  ] });
}
function ScheduleTab({
  camp
}) {
  const {
    data: subjects = []
  } = useSubjects(camp.id);
  const {
    data: slots = []
  } = useSlots(camp.id);
  const totalAvailable = camp.weeks * camp.sessions_per_week;
  const totalAssigned = subjects.reduce((s, x) => s + (x.hours || 0), 0);
  const matched = totalAssigned === totalAvailable && subjects.length > 0;
  const schedule = reactExports.useMemo(() => {
    if (!matched || slots.length === 0) return null;
    const GROUPS = 3;
    const totalSessions = camp.weeks * slots.length;
    const remaining = {};
    subjects.forEach((s) => {
      remaining[s.id] = s.hours;
    });
    const groupSequences = Array.from({
      length: GROUPS
    }, () => []);
    for (let g = 0; g < GROUPS; g++) {
      let lastId = null;
      for (let i = 0; i < totalSessions; i++) {
        let candidates = subjects.filter((s) => remaining[s.id] > 0);
        if (candidates.length === 0) {
          groupSequences[g].push(null);
          continue;
        }
        const nonRepeat = candidates.filter((s) => s.id !== lastId);
        const pool = nonRepeat.length > 0 ? nonRepeat : candidates;
        pool.sort((a, b) => remaining[b.id] - remaining[a.id]);
        const picked = pool[0];
        remaining[picked.id]--;
        lastId = picked.id;
        groupSequences[g].push(picked);
      }
    }
    const weeks = [];
    for (let w = 0; w < camp.weeks; w++) {
      const sessions = slots.map((slot, sIdx) => {
        const idx = w * slots.length + sIdx;
        return {
          slot,
          groups: [groupSequences[0][idx] ?? null, groupSequences[1][idx] ?? null, groupSequences[2][idx] ?? null]
        };
      });
      weeks.push({
        week: w + 1,
        sessions
      });
    }
    return weeks;
  }, [subjects, slots, camp, matched]);
  if (slots.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: "لم يتم تحديد مواعيد المحاضرات بعد. عدّل المعسكر لإضافة الأيام والمواعيد." }) });
  }
  if (!matched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-10 w-10 mx-auto text-destructive mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "لا يمكن توليد الجدول" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "يجب أن يكون مجموع ساعات المواد (",
        totalAssigned,
        ") مساوياً للساعات المتاحة (",
        totalAvailable,
        ")."
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    schedule.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
        "الأسبوع ",
        w.week
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "اليوم والوقت" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المجموعة 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المجموعة 2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المجموعة 3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: w.sessions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: WEEKDAYS[s.slot.weekday] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", dir: "ltr", children: [
              s.slot.start_time.slice(0, 5),
              " - ",
              s.slot.end_time.slice(0, 5)
            ] })
          ] }),
          s.groups.map((g, gi) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: g ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 rounded-md", style: {
            background: `${g.color}20`,
            borderRight: `3px solid ${g.color}`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: g.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: g.name })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }, gi))
        ] }, i)) })
      ] }) }) })
    ] }, w.week)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "إجمالي ساعات كل مادة" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2", children: subjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg", style: {
        background: `${s.color}15`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: s.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: s.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { style: {
          background: s.color,
          color: "white"
        }, children: [
          s.hours,
          " س"
        ] })
      ] }, s.id)) }) })
    ] })
  ] });
}
function StudentsTab({
  camp
}) {
  const qc = useQueryClient();
  const {
    data: students = []
  } = useCampStudents(camp.id);
  const [filter, setFilter] = reactExports.useState("all");
  const [dialog, setDialog] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [del, setDel] = reactExports.useState(null);
  const empty = {
    full_name: "",
    parent_phone: "",
    email: "",
    level: camp.target_levels[0] ?? "",
    grade: 1
  };
  const [form, setForm] = reactExports.useState(empty);
  const openAdd = () => {
    setEditing(null);
    setForm({
      ...empty,
      level: camp.target_levels[0] ?? ""
    });
    setDialog(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setForm({
      full_name: s.full_name,
      parent_phone: s.parent_phone,
      email: s.email ?? "",
      level: s.level,
      grade: s.grade
    });
    setDialog(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.level) {
      toast.error("اختر المرحلة");
      return;
    }
    const payload = {
      camp_id: camp.id,
      full_name: form.full_name.trim(),
      parent_phone: form.parent_phone.trim(),
      email: form.email?.trim() || null,
      level: form.level,
      grade: Number(form.grade)
    };
    const {
      error
    } = editing ? await supabase.from("camp_students").update(payload).eq("id", editing.id) : await supabase.from("camp_students").insert(payload);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? "تم التحديث" : "تم التسجيل");
    setDialog(false);
    qc.invalidateQueries({
      queryKey: ["camp_students", camp.id]
    });
  };
  const filtered = filter === "all" ? students : students.filter((s) => s.level === filter);
  const countByLevel = (lvl) => students.filter((s) => s.level === lvl).length;
  const grades = form.level ? LEVEL_GRADES[form.level] ?? [] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          "إجمالي الطلاب"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold mt-1", children: students.length })
      ] }) }),
      LEVELS.map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: lvl }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold mt-1", children: countByLevel(lvl) })
      ] }) }, lvl))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "تصفية:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filter, onValueChange: setFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "كل المراحل" }),
            LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-2 h-4 w-4" }),
        " تسجيل طالب"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "لا يوجد طلاب مسجلون" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الاسم" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "هاتف ولي الأمر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "البريد" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المرحلة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الصف" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "إجراءات" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { dir: "ltr", className: "text-right", children: s.parent_phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.email || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: s.level }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.grade }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setDel(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }) })
      ] }, s.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialog, onOpenChange: setDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "تعديل بيانات طالب" : "تسجيل طالب جديد" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الاسم الكامل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.full_name, onChange: (e) => setForm({
            ...form,
            full_name: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "هاتف ولي الأمر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.parent_phone, onChange: (e) => setForm({
            ...form,
            parent_phone: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "البريد الإلكتروني (اختياري)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المرحلة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.level, onValueChange: (v) => setForm({
              ...form,
              level: v,
              grade: LEVEL_GRADES[v]?.[0] ?? 1
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الصف" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(form.grade), onValueChange: (v) => setForm({
              ...form,
              grade: Number(v)
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: grades.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(g), children: [
                "الصف ",
                g
              ] }, g)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setDialog(false), children: "إلغاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "حفظ" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!del, onOpenChange: (o) => !o && setDel(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "حذف الطالب؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'سيتم حذف "',
          del?.full_name,
          '" من المعسكر.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: async () => {
          if (!del) return;
          const {
            error
          } = await supabase.from("camp_students").delete().eq("id", del.id);
          if (error) toast.error(error.message);
          else {
            toast.success("تم الحذف");
            qc.invalidateQueries({
              queryKey: ["camp_students", camp.id]
            });
          }
          setDel(null);
        }, children: "حذف" })
      ] })
    ] }) })
  ] });
}
function AttendanceTab({
  camp
}) {
  const qc = useQueryClient();
  const {
    data: slots = []
  } = useSlots(camp.id);
  const {
    data: students = []
  } = useCampStudents(camp.id);
  const [week, setWeek] = reactExports.useState(1);
  const [slotId, setSlotId] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!slotId && slots.length > 0) setSlotId(slots[0].id);
  }, [slots, slotId]);
  const {
    data: records = []
  } = useQuery({
    queryKey: ["camp_attendance", camp.id, week, slotId],
    queryFn: async () => {
      if (!slotId) return [];
      const {
        data,
        error
      } = await supabase.from("camp_attendance").select("*").eq("camp_id", camp.id).eq("week_number", week).eq("slot_id", slotId);
      if (error) throw error;
      return data;
    },
    enabled: !!slotId
  });
  const statusFor = (sid) => records.find((r) => r.student_id === sid)?.status ?? null;
  const setStatus = async (studentId, status) => {
    if (!slotId) return;
    const existing = records.find((r) => r.student_id === studentId);
    if (existing) {
      const {
        error
      } = await supabase.from("camp_attendance").update({
        status
      }).eq("id", existing.id);
      if (error) {
        toast.error(error.message);
        return;
      }
    } else {
      const {
        error
      } = await supabase.from("camp_attendance").insert({
        camp_id: camp.id,
        slot_id: slotId,
        week_number: week,
        student_id: studentId,
        status
      });
      if (error) {
        toast.error(error.message);
        return;
      }
    }
    qc.invalidateQueries({
      queryKey: ["camp_attendance", camp.id, week, slotId]
    });
  };
  const markAll = async (status) => {
    for (const s of students) {
      await setStatus(s.id, status);
    }
    toast.success("تم تسجيل الحضور للجميع");
  };
  const weekOptions = Array.from({
    length: camp.weeks
  }, (_, i) => i + 1);
  const currentSlot = slots.find((s) => s.id === slotId);
  if (slots.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: "لم يتم تحديد مواعيد المحاضرات. عدّل المعسكر لإضافة المواعيد." }) });
  }
  if (students.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: "لا يوجد طلاب مسجلون في هذا المعسكر." }) });
  }
  const counts = {
    حاضر: records.filter((r) => r.status === "حاضر").length,
    غائب: records.filter((r) => r.status === "غائب").length,
    متأخر: records.filter((r) => r.status === "متأخر").length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الأسبوع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(week), onValueChange: (v) => setWeek(Number(v)), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: weekOptions.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(w), children: [
              "الأسبوع ",
              w
            ] }, w)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "المحاضرة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: slotId, onValueChange: setSlotId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: slots.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
              WEEKDAYS[s.weekday],
              " — ",
              s.start_time.slice(0, 5),
              " → ",
              s.end_time.slice(0, 5)
            ] }, s.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500", children: [
          "حاضر: ",
          counts["حاضر"]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive", children: [
          "غائب: ",
          counts["غائب"]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500", children: [
          "متأخر: ",
          counts["متأخر"]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mr-auto flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => markAll("حاضر"), children: "تحديد الكل حاضر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => markAll("غائب"), children: "تحديد الكل غائب" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-5 w-5" }),
        "حضور الأسبوع ",
        week,
        " — ",
        currentSlot ? `${WEEKDAYS[currentSlot.weekday]} ${currentSlot.start_time.slice(0, 5)}` : ""
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الطالب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "المرحلة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "الحالة" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: students.map((st) => {
          const s = statusFor(st.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: st.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
              st.level,
              " - ",
              st.grade
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ATT_STATUSES.map((status) => {
              const active = s === status;
              const cls = status === "حاضر" ? active ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "" : status === "غائب" ? active ? "bg-destructive hover:bg-destructive/90 text-white" : "" : active ? "bg-amber-500 hover:bg-amber-600 text-white" : "";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: active ? "default" : "outline", className: cls, onClick: () => setStatus(st.id, status), children: status }, status);
            }) }) })
          ] }, st.id);
        }) })
      ] }) })
    ] })
  ] });
}
export {
  CampsPage as component
};
