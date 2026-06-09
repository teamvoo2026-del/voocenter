import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm, newField, FIELD_TYPE_LABELS, HEADER_COLORS, type FormField, type FieldType, type FormRow } from "@/lib/forms";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  GripVertical, Plus, Copy, Trash2, Settings, Eye, Send, ArrowRight, X,
} from "lucide-react";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Route = createFileRoute("/forms/$id/edit")({ component: FormBuilder });

function FormBuilder() {
  const { id } = Route.useParams();
  const { data: form, isLoading } = useForm(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [local, setLocal] = useState<FormRow | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (form) setLocal(form); }, [form]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  if (isLoading || !local) {
    return <AppLayout><p className="text-muted-foreground">جاري التحميل...</p></AppLayout>;
  }

  const update = (patch: Partial<FormRow>) => setLocal({ ...local, ...patch });

  const updateField = (fid: string, patch: Partial<FormField>) => {
    update({ fields: local.fields.map(f => f.id === fid ? { ...f, ...patch } : f) });
  };

  const addField = () => {
    const f = newField("short_answer");
    update({ fields: [...local.fields, f] });
    setSelectedId(f.id);
  };

  const duplicateField = (fid: string) => {
    const idx = local.fields.findIndex(f => f.id === fid);
    if (idx < 0) return;
    const copy = { ...local.fields[idx], id: crypto.randomUUID() };
    const next = [...local.fields];
    next.splice(idx + 1, 0, copy);
    update({ fields: next });
    setSelectedId(copy.id);
  };

  const deleteField = (fid: string) => {
    update({ fields: local.fields.filter(f => f.id !== fid) });
    if (selectedId === fid) setSelectedId(null);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = local.fields.findIndex(f => f.id === active.id);
    const newIdx = local.fields.findIndex(f => f.id === over.id);
    update({ fields: arrayMove(local.fields, oldIdx, newIdx) });
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("forms").update({
      title: local.title,
      description: local.description,
      header_color: local.header_color,
      fields: local.fields as never,
      form_mode: local.form_mode,
      confirmation_message: local.confirmation_message,
      show_progress_bar: local.show_progress_bar,
      shuffle_questions: local.shuffle_questions,
      is_active: local.is_active,
    } as never).eq("id", id);
    setSaving(false);
    if (error) return toast.error("فشل الحفظ");
    toast.success("تم الحفظ");
    qc.invalidateQueries({ queryKey: ["forms"] });
  };

  const copyLink = () => {
    const url = `${window.location.origin}/form/${local.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("تم نسخ رابط النموذج");
  };

  return (
    <AppLayout>
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 sticky top-0 bg-background z-10 py-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/forms"><ArrowRight className="h-4 w-4 ml-1" /> رجوع</Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4 ml-1" />معاينة</Button>
            <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}><Settings className="h-4 w-4 ml-1" />إعدادات</Button>
            <Button variant="outline" size="sm" onClick={copyLink}><Send className="h-4 w-4 ml-1" />إرسال</Button>
            <Button size="sm" onClick={save} disabled={saving}>{saving ? "..." : "حفظ"}</Button>
          </div>
        </div>

        {/* Header card */}
        <Card className="overflow-hidden">
          <div className="h-3" style={{ backgroundColor: local.header_color }} />
          <div className="p-6 space-y-3 border-t-4" style={{ borderTopColor: local.header_color }}>
            <Input
              value={local.title}
              onChange={e => update({ title: e.target.value })}
              className="text-2xl font-bold border-0 px-0 shadow-none focus-visible:ring-0"
              placeholder="عنوان النموذج"
            />
            <Textarea
              value={local.description ?? ""}
              onChange={e => update({ description: e.target.value })}
              className="border-0 px-0 shadow-none focus-visible:ring-0 resize-none"
              placeholder="وصف النموذج"
              rows={2}
            />
            <div className="flex gap-1 pt-2">
              {HEADER_COLORS.map(c => (
                <button key={c} onClick={() => update({ header_color: c })}
                  className={`w-6 h-6 rounded-full border-2 ${local.header_color === c ? "border-foreground" : "border-transparent"}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </Card>

        {/* Fields */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={local.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            {local.fields.map((field) => (
              <SortableFieldCard
                key={field.id}
                field={field}
                selected={selectedId === field.id}
                onSelect={() => setSelectedId(field.id)}
                onUpdate={(p) => updateField(field.id, p)}
                onDuplicate={() => duplicateField(field.id)}
                onDelete={() => deleteField(field.id)}
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className="flex justify-center">
          <Button onClick={addField} variant="outline" size="lg" className="rounded-full">
            <Plus className="h-5 w-5 ml-2" /> إضافة سؤال
          </Button>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>إعدادات النموذج</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>وضع العرض</Label>
              <Select value={local.form_mode} onValueChange={(v) => update({ form_mode: v as FormRow["form_mode"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_at_once">كل الأسئلة في صفحة واحدة</SelectItem>
                  <SelectItem value="one_at_a_time">سؤال واحد في كل مرة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>عرض شريط التقدم</Label>
              <Switch checked={local.show_progress_bar} onCheckedChange={(v) => update({ show_progress_bar: v })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>ترتيب عشوائي للأسئلة</Label>
              <Switch checked={local.shuffle_questions} onCheckedChange={(v) => update({ shuffle_questions: v })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>النموذج مفعل (مفتوح للاستجابات)</Label>
              <Switch checked={local.is_active} onCheckedChange={(v) => update({ is_active: v })} />
            </div>
            <div className="space-y-2">
              <Label>رسالة التأكيد بعد الإرسال</Label>
              <Textarea
                value={local.confirmation_message}
                onChange={e => update({ confirmation_message: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>معاينة النموذج</DialogTitle></DialogHeader>
          <FormPreview form={local} />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

function SortableFieldCard(props: {
  field: FormField;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (p: Partial<FormField>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { field, selected, onSelect, onUpdate, onDuplicate, onDelete } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? "0 10px 30px rgba(0,0,0,0.2)" : undefined,
  };

  const isChoice = field.type === "multiple_choice" || field.type === "checkboxes" || field.type === "dropdown";

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`relative cursor-pointer transition-all ${selected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="flex">
        <div {...attributes} {...listeners}
          className="px-2 flex items-center cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          onClick={(e) => e.stopPropagation()}>
          <GripVertical className="h-5 w-5" />
        </div>
        <div className="flex-1 p-4 space-y-3">
          <div className="flex gap-2 items-start">
            <Input
              value={field.title}
              onChange={e => onUpdate({ title: e.target.value })}
              className="flex-1 text-base"
              placeholder="السؤال"
            />
            {selected && (
              <Select value={field.type} onValueChange={(v) => {
                const t = v as FieldType;
                const patch: Partial<FormField> = { type: t };
                if (["multiple_choice", "checkboxes", "dropdown"].includes(t) && !field.options?.length) patch.options = ["خيار 1"];
                if (t === "linear_scale" && !field.scale_max) { patch.scale_min = 1; patch.scale_max = 5; }
                onUpdate(patch);
              }}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(FIELD_TYPE_LABELS) as FieldType[]).map(t => (
                    <SelectItem key={t} value={t}>{FIELD_TYPE_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Preview / options */}
          {field.type === "short_answer" && <Input disabled placeholder="إجابة قصيرة" />}
          {field.type === "paragraph" && <Textarea disabled placeholder="إجابة طويلة" rows={2} />}
          {field.type === "date" && <Input type="date" disabled />}
          {field.type === "time" && <Input type="time" disabled />}

          {isChoice && (
            <div className="space-y-2">
              {(field.options ?? []).map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-muted-foreground text-sm w-5">
                    {field.type === "checkboxes" ? "☐" : field.type === "dropdown" ? `${i + 1}.` : "○"}
                  </span>
                  <Input value={opt} onChange={e => {
                    const next = [...(field.options ?? [])];
                    next[i] = e.target.value;
                    onUpdate({ options: next });
                  }} />
                  {(field.options?.length ?? 0) > 1 && (
                    <Button size="icon" variant="ghost" onClick={(e) => {
                      e.stopPropagation();
                      const next = (field.options ?? []).filter((_, idx) => idx !== i);
                      onUpdate({ options: next });
                    }}><X className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={(e) => {
                e.stopPropagation();
                onUpdate({ options: [...(field.options ?? []), `خيار ${(field.options?.length ?? 0) + 1}`] });
              }}><Plus className="h-3.5 w-3.5 ml-1" />إضافة خيار</Button>
            </div>
          )}

          {field.type === "linear_scale" && (
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <Select value={String(field.scale_min ?? 1)} onValueChange={(v) => onUpdate({ scale_min: Number(v) })}>
                  <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                  <SelectContent>{[0, 1].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                </Select>
                <span>إلى</span>
                <Select value={String(field.scale_max ?? 5)} onValueChange={(v) => onUpdate({ scale_max: Number(v) })}>
                  <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                  <SelectContent>{[2,3,4,5,6,7,8,9,10].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Input placeholder="تسمية الحد الأدنى (اختياري)" value={field.scale_min_label ?? ""} onChange={e => onUpdate({ scale_min_label: e.target.value })} />
              <Input placeholder="تسمية الحد الأقصى (اختياري)" value={field.scale_max_label ?? ""} onChange={e => onUpdate({ scale_max_label: e.target.value })} />
            </div>
          )}

          {selected && (
            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onDuplicate(); }}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-border mx-1" />
              <Label className="text-sm flex items-center gap-2 cursor-pointer">
                مطلوب
                <Switch checked={field.required} onCheckedChange={(v) => onUpdate({ required: v })} />
              </Label>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function FormPreview({ form }: { form: FormRow }) {
  return (
    <div className="space-y-3">
      <Card className="overflow-hidden">
        <div className="h-2" style={{ backgroundColor: form.header_color }} />
        <div className="p-5 border-t-4" style={{ borderTopColor: form.header_color }}>
          <h2 className="text-xl font-bold">{form.title}</h2>
          {form.description && <p className="text-muted-foreground mt-2 text-sm">{form.description}</p>}
        </div>
      </Card>
      {form.fields.map(f => (
        <Card key={f.id} className="p-4">
          <p className="font-medium mb-2">{f.title}{f.required && <span className="text-destructive mr-1">*</span>}</p>
          <PreviewInput field={f} />
        </Card>
      ))}
    </div>
  );
}

function PreviewInput({ field }: { field: FormField }) {
  if (field.type === "short_answer") return <Input disabled />;
  if (field.type === "paragraph") return <Textarea disabled rows={3} />;
  if (field.type === "date") return <Input type="date" disabled />;
  if (field.type === "time") return <Input type="time" disabled />;
  if (field.type === "dropdown")
    return <Select disabled><SelectTrigger><SelectValue placeholder="اختر..." /></SelectTrigger></Select>;
  if (field.type === "multiple_choice" || field.type === "checkboxes")
    return (
      <div className="space-y-1.5">
        {(field.options ?? []).map((o, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <input type={field.type === "checkboxes" ? "checkbox" : "radio"} disabled />
            {o}
          </div>
        ))}
      </div>
    );
  if (field.type === "linear_scale") {
    const min = field.scale_min ?? 1; const max = field.scale_max ?? 5;
    const vals = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    return (
      <div className="flex items-center gap-3 text-sm">
        {field.scale_min_label && <span className="text-muted-foreground">{field.scale_min_label}</span>}
        {vals.map(v => (
          <label key={v} className="flex flex-col items-center gap-1">
            <span>{v}</span><input type="radio" disabled />
          </label>
        ))}
        {field.scale_max_label && <span className="text-muted-foreground">{field.scale_max_label}</span>}
      </div>
    );
  }
  return null;
}
