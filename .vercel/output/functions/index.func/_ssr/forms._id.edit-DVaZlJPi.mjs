import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { C as Card } from "./card-CaankBVl.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { T as Textarea } from "./textarea-CKmLuS07.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { S as Switch } from "./switch-DUmf1qOg.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-C9L4k44O.mjs";
import { c as useForm, H as HEADER_COLORS, F as FIELD_TYPE_LABELS, n as newField } from "./forms-NEnUjjeh.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as useSensors, d as useSensor, D as DndContext, e as closestCenter, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { S as SortableContext, v as verticalListSortingStrategy, a as arrayMove, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { b as Route } from "./router-B0juCGTQ.mjs";
import "../_libs/ws.mjs";
import { A as ArrowRight, E as Eye, x as Settings, y as Send, P as Plus, z as GripVertical, X, w as Copy, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/dnd-kit__accessibility.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
function FormBuilder() {
  const {
    id
  } = Route.useParams();
  const {
    data: form,
    isLoading
  } = useForm(id);
  useNavigate();
  const qc = useQueryClient();
  const [local, setLocal] = reactExports.useState(null);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [settingsOpen, setSettingsOpen] = reactExports.useState(false);
  const [previewOpen, setPreviewOpen] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (form) setLocal(form);
  }, [form]);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }));
  if (isLoading || !local) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "جاري التحميل..." }) });
  }
  const update = (patch) => setLocal({
    ...local,
    ...patch
  });
  const updateField = (fid, patch) => {
    update({
      fields: local.fields.map((f) => f.id === fid ? {
        ...f,
        ...patch
      } : f)
    });
  };
  const addField = () => {
    const f = newField("short_answer");
    update({
      fields: [...local.fields, f]
    });
    setSelectedId(f.id);
  };
  const duplicateField = (fid) => {
    const idx = local.fields.findIndex((f) => f.id === fid);
    if (idx < 0) return;
    const copy = {
      ...local.fields[idx],
      id: crypto.randomUUID()
    };
    const next = [...local.fields];
    next.splice(idx + 1, 0, copy);
    update({
      fields: next
    });
    setSelectedId(copy.id);
  };
  const deleteField = (fid) => {
    update({
      fields: local.fields.filter((f) => f.id !== fid)
    });
    if (selectedId === fid) setSelectedId(null);
  };
  const handleDragEnd = (e) => {
    const {
      active,
      over
    } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = local.fields.findIndex((f) => f.id === active.id);
    const newIdx = local.fields.findIndex((f) => f.id === over.id);
    update({
      fields: arrayMove(local.fields, oldIdx, newIdx)
    });
  };
  const save = async () => {
    setSaving(true);
    const {
      error
    } = await supabase.from("forms").update({
      title: local.title,
      description: local.description,
      header_color: local.header_color,
      fields: local.fields,
      form_mode: local.form_mode,
      confirmation_message: local.confirmation_message,
      show_progress_bar: local.show_progress_bar,
      shuffle_questions: local.shuffle_questions,
      is_active: local.is_active
    }).eq("id", id);
    setSaving(false);
    if (error) return toast.error("فشل الحفظ");
    toast.success("تم الحفظ");
    qc.invalidateQueries({
      queryKey: ["forms"]
    });
  };
  const copyLink = () => {
    const url = `${window.location.origin}/form/${local.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("تم نسخ رابط النموذج");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 sticky top-0 bg-background z-10 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forms", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1" }),
          " رجوع"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setPreviewOpen(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 ml-1" }),
            "معاينة"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setSettingsOpen(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 ml-1" }),
            "إعدادات"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: copyLink, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 ml-1" }),
            "إرسال"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, disabled: saving, children: saving ? "..." : "حفظ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3", style: {
          backgroundColor: local.header_color
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3 border-t-4", style: {
          borderTopColor: local.header_color
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: local.title, onChange: (e) => update({
            title: e.target.value
          }), className: "text-2xl font-bold border-0 px-0 shadow-none focus-visible:ring-0", placeholder: "عنوان النموذج" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: local.description ?? "", onChange: (e) => update({
            description: e.target.value
          }), className: "border-0 px-0 shadow-none focus-visible:ring-0 resize-none", placeholder: "وصف النموذج", rows: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 pt-2", children: HEADER_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update({
            header_color: c
          }), className: `w-6 h-6 rounded-full border-2 ${local.header_color === c ? "border-foreground" : "border-transparent"}`, style: {
            backgroundColor: c
          } }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: local.fields.map((f) => f.id), strategy: verticalListSortingStrategy, children: local.fields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableFieldCard, { field, selected: selectedId === field.id, onSelect: () => setSelectedId(field.id), onUpdate: (p) => updateField(field.id, p), onDuplicate: () => duplicateField(field.id), onDelete: () => deleteField(field.id) }, field.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addField, variant: "outline", size: "lg", className: "rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5 ml-2" }),
        " إضافة سؤال"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: settingsOpen, onOpenChange: setSettingsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "إعدادات النموذج" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "وضع العرض" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: local.form_mode, onValueChange: (v) => update({
            form_mode: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all_at_once", children: "كل الأسئلة في صفحة واحدة" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "one_at_a_time", children: "سؤال واحد في كل مرة" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "عرض شريط التقدم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: local.show_progress_bar, onCheckedChange: (v) => update({
            show_progress_bar: v
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ترتيب عشوائي للأسئلة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: local.shuffle_questions, onCheckedChange: (v) => update({
            shuffle_questions: v
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "النموذج مفعل (مفتوح للاستجابات)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: local.is_active, onCheckedChange: (v) => update({
            is_active: v
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "رسالة التأكيد بعد الإرسال" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: local.confirmation_message, onChange: (e) => update({
            confirmation_message: e.target.value
          }), rows: 3 })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: previewOpen, onOpenChange: setPreviewOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "معاينة النموذج" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormPreview, { form: local })
    ] }) })
  ] });
}
function SortableFieldCard(props) {
  const {
    field,
    selected,
    onSelect,
    onUpdate,
    onDuplicate,
    onDelete
  } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: field.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? "0 10px 30px rgba(0,0,0,0.2)" : void 0
  };
  const isChoice = field.type === "multiple_choice" || field.type === "checkboxes" || field.type === "dropdown";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { ref: setNodeRef, style, onClick: onSelect, className: `relative cursor-pointer transition-all ${selected ? "ring-2 ring-primary" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...attributes, ...listeners, className: "px-2 flex items-center cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: field.title, onChange: (e) => onUpdate({
          title: e.target.value
        }), className: "flex-1 text-base", placeholder: "السؤال" }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.type, onValueChange: (v) => {
          const t = v;
          const patch = {
            type: t
          };
          if (["multiple_choice", "checkboxes", "dropdown"].includes(t) && !field.options?.length) patch.options = ["خيار 1"];
          if (t === "linear_scale" && !field.scale_max) {
            patch.scale_min = 1;
            patch.scale_max = 5;
          }
          onUpdate(patch);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(FIELD_TYPE_LABELS).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: FIELD_TYPE_LABELS[t] }, t)) })
        ] })
      ] }),
      field.type === "short_answer" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { disabled: true, placeholder: "إجابة قصيرة" }),
      field.type === "paragraph" && /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { disabled: true, placeholder: "إجابة طويلة", rows: 2 }),
      field.type === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", disabled: true }),
      field.type === "time" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", disabled: true }),
      isChoice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        (field.options ?? []).map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm w-5", children: field.type === "checkboxes" ? "☐" : field.type === "dropdown" ? `${i + 1}.` : "○" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: opt, onChange: (e) => {
            const next = [...field.options ?? []];
            next[i] = e.target.value;
            onUpdate({
              options: next
            });
          } }),
          (field.options?.length ?? 0) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: (e) => {
            e.stopPropagation();
            const next = (field.options ?? []).filter((_, idx) => idx !== i);
            onUpdate({
              options: next
            });
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: (e) => {
          e.stopPropagation();
          onUpdate({
            options: [...field.options ?? [], `خيار ${(field.options?.length ?? 0) + 1}`]
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 ml-1" }),
          "إضافة خيار"
        ] })
      ] }),
      field.type === "linear_scale" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(field.scale_min ?? 1), onValueChange: (v) => onUpdate({
            scale_min: Number(v)
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [0, 1].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(n), children: n }, n)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إلى" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(field.scale_max ?? 5), onValueChange: (v) => onUpdate({
            scale_max: Number(v)
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(n), children: n }, n)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "تسمية الحد الأدنى (اختياري)", value: field.scale_min_label ?? "", onChange: (e) => onUpdate({
          scale_min_label: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "تسمية الحد الأقصى (اختياري)", value: field.scale_max_label ?? "", onChange: (e) => onUpdate({
          scale_max_label: e.target.value
        }) })
      ] }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-3 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: (e) => {
          e.stopPropagation();
          onDuplicate();
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: (e) => {
          e.stopPropagation();
          onDelete();
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border mx-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm flex items-center gap-2 cursor-pointer", children: [
          "مطلوب",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: field.required, onCheckedChange: (v) => onUpdate({
            required: v
          }) })
        ] })
      ] })
    ] })
  ] }) });
}
function FormPreview({
  form
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2", style: {
        backgroundColor: form.header_color
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t-4", style: {
        borderTopColor: form.header_color
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: form.title }),
        form.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: form.description })
      ] })
    ] }),
    form.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mb-2", children: [
        f.title,
        f.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive mr-1", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewInput, { field: f })
    ] }, f.id))
  ] });
}
function PreviewInput({
  field
}) {
  if (field.type === "short_answer") return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { disabled: true });
  if (field.type === "paragraph") return /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { disabled: true, rows: 3 });
  if (field.type === "date") return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", disabled: true });
  if (field.type === "time") return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", disabled: true });
  if (field.type === "dropdown") return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { disabled: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر..." }) }) });
  if (field.type === "multiple_choice" || field.type === "checkboxes") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: (field.options ?? []).map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: field.type === "checkboxes" ? "checkbox" : "radio", disabled: true }),
    o
  ] }, i)) });
  if (field.type === "linear_scale") {
    const min = field.scale_min ?? 1;
    const max = field.scale_max ?? 5;
    const vals = Array.from({
      length: max - min + 1
    }, (_, i) => min + i);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
      field.scale_min_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: field.scale_min_label }),
      vals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", disabled: true })
      ] }, v)),
      field.scale_max_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: field.scale_max_label })
    ] });
  }
  return null;
}
export {
  FormBuilder as component
};
