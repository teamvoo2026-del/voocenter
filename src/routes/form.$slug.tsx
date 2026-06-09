import { createFileRoute } from "@tanstack/react-router";
import { useFormBySlug, type FormField, type FormRow } from "@/lib/forms";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/form/$slug")({ component: PublicForm });

function PublicForm() {
  const { slug } = Route.useParams();
  const { data: form, isLoading } = useFormBySlug(slug);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const fields = useMemo(() => {
    if (!form) return [];
    if (!form.shuffle_questions) return form.fields;
    return [...form.fields].sort(() => Math.random() - 0.5);
  }, [form]);

  if (isLoading) {
    return <div dir="rtl" className="min-h-screen flex items-center justify-center bg-muted/30">جاري التحميل...</div>;
  }
  if (!form) {
    return <div dir="rtl" className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="p-8 text-center max-w-md">
        <p className="font-medium">النموذج غير متاح</p>
        <p className="text-sm text-muted-foreground mt-2">قد يكون الرابط غير صحيح أو تم إيقاف النموذج.</p>
      </Card>
    </div>;
  }

  const isOneAtTime = form.form_mode === "one_at_a_time";

  const validate = (f: FormField) => {
    if (!f.required) return true;
    const v = answers[f.id];
    if (v === undefined || v === null || v === "") return false;
    if (Array.isArray(v) && v.length === 0) return false;
    return true;
  };

  const submit = async () => {
    for (const f of fields) {
      if (!validate(f)) { toast.error(`السؤال "${f.title}" مطلوب`); return; }
    }
    setSubmitting(true);
    const { error } = await supabase.from("form_responses").insert({
      form_id: form.id, data: answers as never,
    } as never);
    setSubmitting(false);
    if (error) return toast.error("فشل الإرسال");
    setDone(true);
  };

  if (done) {
    return (
      <div dir="rtl" className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Toaster position="top-center" richColors />
        <Card className="overflow-hidden max-w-xl w-full">
          <div className="h-2" style={{ backgroundColor: form.header_color }} />
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 mx-auto" style={{ color: form.header_color }} />
            <h2 className="text-xl font-bold">{form.title}</h2>
            <p className="text-muted-foreground">{form.confirmation_message}</p>
            <Button variant="outline" onClick={() => { setAnswers({}); setStep(0); setDone(false); }}>
              إرسال إجابة أخرى
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-muted/30 py-8 px-4">
      <Toaster position="top-center" richColors />
      <div className="max-w-2xl mx-auto space-y-3">
        {isOneAtTime && form.show_progress_bar && fields.length > 0 && (
          <div className="space-y-1">
            <Progress value={((step + 1) / fields.length) * 100} className="h-1.5" />
            <p className="text-xs text-muted-foreground text-center">{step + 1} من {fields.length}</p>
          </div>
        )}

        <Card className="overflow-hidden">
          <div className="h-2" style={{ backgroundColor: form.header_color }} />
          <div className="p-6 border-t-4" style={{ borderTopColor: form.header_color }}>
            <h1 className="text-2xl font-bold">{form.title}</h1>
            {form.description && <p className="text-muted-foreground mt-2 text-sm whitespace-pre-wrap">{form.description}</p>}
          </div>
        </Card>

        {isOneAtTime ? (
          <OneAtTime
            form={form} fields={fields} step={step} setStep={setStep}
            answers={answers} setAnswers={setAnswers}
            validate={validate} submit={submit} submitting={submitting}
          />
        ) : (
          <>
            {fields.map(f => (
              <Card key={f.id} className="p-5 transition-shadow">
                <FieldRenderer field={f} value={answers[f.id]} onChange={(v) => setAnswers(a => ({ ...a, [f.id]: v }))} />
              </Card>
            ))}
            <div className="flex justify-end">
              <Button onClick={submit} disabled={submitting} size="lg" style={{ backgroundColor: form.header_color }}>
                {submitting ? "جاري الإرسال..." : "إرسال"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OneAtTime(props: {
  form: FormRow; fields: FormField[]; step: number; setStep: (n: number) => void;
  answers: Record<string, unknown>; setAnswers: (f: (a: Record<string, unknown>) => Record<string, unknown>) => void;
  validate: (f: FormField) => boolean; submit: () => void; submitting: boolean;
}) {
  const { form, fields, step, setStep, answers, setAnswers, validate, submit, submitting } = props;
  const f = fields[step];
  if (!f) return null;
  const isLast = step === fields.length - 1;

  const next = () => {
    if (!validate(f)) { toast.error("هذا السؤال مطلوب"); return; }
    if (isLast) submit(); else setStep(step + 1);
  };

  return (
    <Card key={f.id} className="p-6 animate-in slide-in-from-left-4 duration-200">
      <FieldRenderer field={f} value={answers[f.id]} onChange={(v) => setAnswers(a => ({ ...a, [f.id]: v }))} large />
      <div className="flex justify-between mt-6 pt-4 border-t">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>السابق</Button>
        <Button onClick={next} disabled={submitting} style={{ backgroundColor: form.header_color }}>
          {isLast ? (submitting ? "..." : "إرسال") : "التالي"}
        </Button>
      </div>
    </Card>
  );
}

function FieldRenderer({ field, value, onChange, large }: {
  field: FormField; value: unknown; onChange: (v: unknown) => void; large?: boolean;
}) {
  const titleCls = large ? "text-xl font-medium" : "font-medium";
  return (
    <div className="space-y-3">
      <div>
        <p className={titleCls}>{field.title}{field.required && <span className="text-destructive mr-1">*</span>}</p>
        {field.description && <p className="text-sm text-muted-foreground mt-1">{field.description}</p>}
      </div>
      {field.type === "short_answer" && (
        <Input value={(value as string) ?? ""} onChange={e => onChange(e.target.value)} />
      )}
      {field.type === "paragraph" && (
        <Textarea value={(value as string) ?? ""} onChange={e => onChange(e.target.value)} rows={4} />
      )}
      {field.type === "date" && (
        <Input type="date" value={(value as string) ?? ""} onChange={e => onChange(e.target.value)} />
      )}
      {field.type === "time" && (
        <Input type="time" value={(value as string) ?? ""} onChange={e => onChange(e.target.value)} />
      )}
      {field.type === "dropdown" && (
        <Select value={(value as string) ?? ""} onValueChange={onChange}>
          <SelectTrigger><SelectValue placeholder="اختر..." /></SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((o, i) => <SelectItem key={i} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      )}
      {field.type === "multiple_choice" && (
        <div className="space-y-2">
          {(field.options ?? []).map((o, i) => (
            <label key={i} className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
              <input type="radio" name={field.id} checked={value === o} onChange={() => onChange(o)} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      )}
      {field.type === "checkboxes" && (
        <div className="space-y-2">
          {(field.options ?? []).map((o, i) => {
            const arr = Array.isArray(value) ? (value as string[]) : [];
            const checked = arr.includes(o);
            return (
              <label key={i} className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
                <input type="checkbox" checked={checked} onChange={() => {
                  onChange(checked ? arr.filter(x => x !== o) : [...arr, o]);
                }} />
                <span>{o}</span>
              </label>
            );
          })}
        </div>
      )}
      {field.type === "linear_scale" && (() => {
        const min = field.scale_min ?? 1; const max = field.scale_max ?? 5;
        const vals = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        return (
          <div className="flex items-center justify-center gap-4 flex-wrap py-2">
            {field.scale_min_label && <span className="text-sm text-muted-foreground">{field.scale_min_label}</span>}
            {vals.map(v => (
              <label key={v} className="flex flex-col items-center gap-1 cursor-pointer">
                <span className="text-sm">{v}</span>
                <input type="radio" name={field.id} checked={value === v} onChange={() => onChange(v)} />
              </label>
            ))}
            {field.scale_max_label && <span className="text-sm text-muted-foreground">{field.scale_max_label}</span>}
          </div>
        );
      })()}
    </div>
  );
}
