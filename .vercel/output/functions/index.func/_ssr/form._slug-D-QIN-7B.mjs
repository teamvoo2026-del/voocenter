import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useFormBySlug } from "./forms-NEnUjjeh.mjs";
import { C as Card, f as cn } from "./card-CaankBVl.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { T as Textarea } from "./textarea-CKmLuS07.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Toaster } from "./sonner-DeNSN9-c.mjs";
import { R as Route$2 } from "./router-B0juCGTQ.mjs";
import "../_libs/ws.mjs";
import { r as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
function PublicForm() {
  const {
    slug
  } = Route$2.useParams();
  const {
    data: form,
    isLoading
  } = useFormBySlug(slug);
  const [answers, setAnswers] = reactExports.useState({});
  const [step, setStep] = reactExports.useState(0);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const fields = reactExports.useMemo(() => {
    if (!form) return [];
    if (!form.shuffle_questions) return form.fields;
    return [...form.fields].sort(() => Math.random() - 0.5);
  }, [form]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: "rtl", className: "min-h-screen flex items-center justify-center bg-muted/30", children: "جاري التحميل..." });
  }
  if (!form) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: "rtl", className: "min-h-screen flex items-center justify-center bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8 text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "النموذج غير متاح" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "قد يكون الرابط غير صحيح أو تم إيقاف النموذج." })
    ] }) });
  }
  const isOneAtTime = form.form_mode === "one_at_a_time";
  const validate = (f) => {
    if (!f.required) return true;
    const v = answers[f.id];
    if (v === void 0 || v === null || v === "") return false;
    if (Array.isArray(v) && v.length === 0) return false;
    return true;
  };
  const submit = async () => {
    for (const f of fields) {
      if (!validate(f)) {
        toast.error(`السؤال "${f.title}" مطلوب`);
        return;
      }
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.from("form_responses").insert({
      form_id: form.id,
      data: answers
    });
    setSubmitting(false);
    if (error) return toast.error("فشل الإرسال");
    setDone(true);
  };
  if (done) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: "rtl", className: "min-h-screen bg-muted/30 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden max-w-xl w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2", style: {
          backgroundColor: form.header_color
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 mx-auto", style: {
            color: form.header_color
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: form.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: form.confirmation_message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
            setAnswers({});
            setStep(0);
            setDone(false);
          }, children: "إرسال إجابة أخرى" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: "rtl", className: "min-h-screen bg-muted/30 py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-3", children: [
      isOneAtTime && form.show_progress_bar && fields.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: (step + 1) / fields.length * 100, className: "h-1.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
          step + 1,
          " من ",
          fields.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2", style: {
          backgroundColor: form.header_color
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t-4", style: {
          borderTopColor: form.header_color
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: form.title }),
          form.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm whitespace-pre-wrap", children: form.description })
        ] })
      ] }),
      isOneAtTime ? /* @__PURE__ */ jsxRuntimeExports.jsx(OneAtTime, { form, fields, step, setStep, answers, setAnswers, validate, submit, submitting }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRenderer, { field: f, value: answers[f.id], onChange: (v) => setAnswers((a) => ({
          ...a,
          [f.id]: v
        })) }) }, f.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: submitting, size: "lg", style: {
          backgroundColor: form.header_color
        }, children: submitting ? "جاري الإرسال..." : "إرسال" }) })
      ] })
    ] })
  ] });
}
function OneAtTime(props) {
  const {
    form,
    fields,
    step,
    setStep,
    answers,
    setAnswers,
    validate,
    submit,
    submitting
  } = props;
  const f = fields[step];
  if (!f) return null;
  const isLast = step === fields.length - 1;
  const next = () => {
    if (!validate(f)) {
      toast.error("هذا السؤال مطلوب");
      return;
    }
    if (isLast) submit();
    else setStep(step + 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 animate-in slide-in-from-left-4 duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRenderer, { field: f, value: answers[f.id], onChange: (v) => setAnswers((a) => ({
      ...a,
      [f.id]: v
    })), large: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-6 pt-4 border-t", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setStep(Math.max(0, step - 1)), disabled: step === 0, children: "السابق" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: next, disabled: submitting, style: {
        backgroundColor: form.header_color
      }, children: isLast ? submitting ? "..." : "إرسال" : "التالي" })
    ] })
  ] }, f.id);
}
function FieldRenderer({
  field,
  value,
  onChange,
  large
}) {
  const titleCls = large ? "text-xl font-medium" : "font-medium";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: titleCls, children: [
        field.title,
        field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive mr-1", children: "*" })
      ] }),
      field.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: field.description })
    ] }),
    field.type === "short_answer" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: value ?? "", onChange: (e) => onChange(e.target.value) }),
    field.type === "paragraph" && /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: value ?? "", onChange: (e) => onChange(e.target.value), rows: 4 }),
    field.type === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: value ?? "", onChange: (e) => onChange(e.target.value) }),
    field.type === "time" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: value ?? "", onChange: (e) => onChange(e.target.value) }),
    field.type === "dropdown" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: value ?? "", onValueChange: onChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر..." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (field.options ?? []).map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, i)) })
    ] }),
    field.type === "multiple_choice" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (field.options ?? []).map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: field.id, checked: value === o, onChange: () => onChange(o) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o })
    ] }, i)) }),
    field.type === "checkboxes" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (field.options ?? []).map((o, i) => {
      const arr = Array.isArray(value) ? value : [];
      const checked = arr.includes(o);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked, onChange: () => {
          onChange(checked ? arr.filter((x) => x !== o) : [...arr, o]);
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o })
      ] }, i);
    }) }),
    field.type === "linear_scale" && (() => {
      const min = field.scale_min ?? 1;
      const max = field.scale_max ?? 5;
      const vals = Array.from({
        length: max - min + 1
      }, (_, i) => min + i);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 flex-wrap py-2", children: [
        field.scale_min_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: field.scale_min_label }),
        vals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center gap-1 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: field.id, checked: value === v, onChange: () => onChange(v) })
        ] }, v)),
        field.scale_max_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: field.scale_max_label })
      ] });
    })()
  ] });
}
export {
  PublicForm as component
};
