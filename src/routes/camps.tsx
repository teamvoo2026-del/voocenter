import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, Tent, AlertTriangle, CheckCircle2, Users as UsersIcon, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/camps")({ component: CampsPage });

const LEVELS = ["ابتدائي صغير", "ابتدائي كبير", "إعدادي"] as const;
const LEVEL_GRADES: Record<string, number[]> = {
  "ابتدائي صغير": [1, 2, 3],
  "ابتدائي كبير": [4, 5, 6],
  "إعدادي": [7, 8, 9],
};
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
const ICONS = ["🤖", "🧠", "💻", "🎵", "🎨", "🔬", "📚", "⚽", "🌍", "🎭", "🧪", "🚀"];
const WEEKDAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const ATT_STATUSES = ["حاضر", "غائب", "متأخر"] as const;
type AttStatus = typeof ATT_STATUSES[number];

type Camp = { id: string; name: string; target_levels: string[]; weeks: number; sessions_per_week: number };
type CampSubject = { id: string; camp_id: string; name: string; color: string; icon: string; hours: number; sort_order: number };
type CampStudent = { id: string; camp_id: string; full_name: string; parent_phone: string; email: string | null; level: string; grade: number };
type CampSlot = { id: string; camp_id: string; weekday: number; start_time: string; end_time: string; sort_order: number };
type CampAtt = { id: string; camp_id: string; slot_id: string; week_number: number; student_id: string; status: AttStatus };

function CampsPage() {
  const qc = useQueryClient();
  const { data: camps = [] } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data, error } = await supabase.from("camps" as any).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Camp[];
    },
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [campDialog, setCampDialog] = useState(false);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);
  const [delCamp, setDelCamp] = useState<Camp | null>(null);

  useEffect(() => {
    if (!selectedId && camps.length > 0) setSelectedId(camps[0].id);
  }, [camps, selectedId]);

  const selected = camps.find((c) => c.id === selectedId) || null;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white">
              <Tent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">المعسكرات</h1>
              <p className="text-sm text-muted-foreground">إدارة المعسكرات والمواد والطلاب والحضور</p>
            </div>
          </div>
          <Button onClick={() => { setEditingCamp(null); setCampDialog(true); }}>
            <Plus className="ml-2 h-4 w-4" /> معسكر جديد
          </Button>
        </div>

        {camps.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {camps.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`group relative px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedId === c.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {c.weeks} أسبوع × {c.sessions_per_week} حصص
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); setEditingCamp(c); setCampDialog(true); }}
                  className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-accent cursor-pointer"
                  aria-label="تعديل"
                >
                  <Pencil className="h-3 w-3" />
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); setDelCamp(c); }}
                  className="absolute top-1 left-7 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 cursor-pointer"
                  aria-label="حذف"
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </span>
              </button>
            ))}
          </div>
        )}

        {!selected ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Tent className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>لا توجد معسكرات. ابدأ بإنشاء معسكر جديد.</p>
            </CardContent>
          </Card>
        ) : (
          <CampWorkspace camp={selected} />
        )}
      </div>

      <CampDialog
        open={campDialog}
        onOpenChange={setCampDialog}
        editing={editingCamp}
        onSaved={(id) => { qc.invalidateQueries({ queryKey: ["camps"] }); setSelectedId(id); }}
      />

      <AlertDialog open={!!delCamp} onOpenChange={(o) => !o && setDelCamp(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف المعسكر؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف "{delCamp?.name}" وكل المواد والطلاب والحضور المرتبط به.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!delCamp) return;
                const { error } = await supabase.from("camps" as any).delete().eq("id", delCamp.id);
                if (error) toast.error(error.message);
                else {
                  toast.success("تم الحذف");
                  if (selectedId === delCamp.id) setSelectedId(null);
                  qc.invalidateQueries({ queryKey: ["camps"] });
                }
                setDelCamp(null);
              }}
            >حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}

type SlotDraft = { id?: string; weekday: number; start_time: string; end_time: string };

function CampDialog({ open, onOpenChange, editing, onSaved }: {
  open: boolean; onOpenChange: (o: boolean) => void; editing: Camp | null; onSaved: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [levels, setLevels] = useState<string[]>([]);
  const [weeks, setWeeks] = useState(4);
  const [slots, setSlots] = useState<SlotDraft[]>([]);

  useEffect(() => {
    if (!open) return;
    setName(editing?.name ?? "");
    setLevels(editing?.target_levels ?? []);
    setWeeks(editing?.weeks ?? 4);
    if (editing) {
      supabase.from("camp_session_slots" as any).select("*").eq("camp_id", editing.id).order("sort_order").then(({ data }) => {
        setSlots(((data as any[]) ?? []).map((s) => ({ id: s.id, weekday: s.weekday, start_time: s.start_time?.slice(0,5) ?? "09:00", end_time: s.end_time?.slice(0,5) ?? "10:00" })));
      });
    } else {
      setSlots([{ weekday: 0, start_time: "09:00", end_time: "10:00" }]);
    }
  }, [open, editing]);

  const toggleLevel = (lvl: string) => {
    setLevels((prev) => prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]);
  };

  const hoursOfSlot = (s: SlotDraft) => {
    const [h1, m1] = s.start_time.split(":").map(Number);
    const [h2, m2] = s.end_time.split(":").map(Number);
    return Math.max(0, ((h2*60+m2) - (h1*60+m1)) / 60);
  };
  const totalWeeklyHours = slots.reduce((a, s) => a + hoursOfSlot(s), 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("اسم المعسكر مطلوب"); return; }
    if (levels.length === 0) { toast.error("اختر مرحلة واحدة على الأقل"); return; }
    if (weeks < 1) { toast.error("عدد الأسابيع يجب أن يكون أكبر من صفر"); return; }
    if (slots.length === 0) { toast.error("أضف موعد محاضرة واحد على الأقل"); return; }
    for (const s of slots) {
      if (s.start_time >= s.end_time) { toast.error("وقت بداية أصغر من وقت النهاية في كل المحاضرات"); return; }
    }

    const payload = { name: name.trim(), target_levels: levels, weeks, sessions_per_week: slots.length };
    let campId = editing?.id;
    if (editing) {
      const { error } = await supabase.from("camps" as any).update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { data, error } = await supabase.from("camps" as any).insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      campId = (data as any).id;
    }

    // Replace slots
    await supabase.from("camp_session_slots" as any).delete().eq("camp_id", campId!);
    if (slots.length > 0) {
      const rows = slots.map((s, i) => ({ camp_id: campId, weekday: s.weekday, start_time: s.start_time, end_time: s.end_time, sort_order: i }));
      const { error: sErr } = await supabase.from("camp_session_slots" as any).insert(rows);
      if (sErr) { toast.error(sErr.message); return; }
    }

    toast.success(editing ? "تم التحديث" : "تم الإنشاء");
    onSaved(campId!);
    onOpenChange(false);
  };

  const addSlot = () => setSlots([...slots, { weekday: 0, start_time: "09:00", end_time: "10:00" }]);
  const updateSlot = (i: number, patch: Partial<SlotDraft>) => setSlots(slots.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  const removeSlot = (i: number) => setSlots(slots.filter((_, idx) => idx !== i));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{editing ? "تعديل معسكر" : "معسكر جديد"}</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>اسم المعسكر</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="معسكر الصيف 2026" required />
          </div>
          <div>
            <Label>المراحل المستهدفة</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {LEVELS.map((lvl) => (
                <label key={lvl} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <Checkbox checked={levels.includes(lvl)} onCheckedChange={() => toggleLevel(lvl)} />
                  <span>{lvl}</span>
                  <span className="text-xs text-muted-foreground mr-auto">
                    الصفوف {LEVEL_GRADES[lvl].join("، ")}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label>عدد الأسابيع</Label>
            <Input type="number" min={1} value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>أيام ومواعيد المحاضرات في الأسبوع</Label>
              <Button type="button" size="sm" variant="outline" onClick={addSlot}><Plus className="ml-1 h-4 w-4" /> إضافة محاضرة</Button>
            </div>
            <div className="space-y-2">
              {slots.map((s, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-end p-2 border rounded-lg">
                  <div className="col-span-4">
                    <Label className="text-xs">اليوم</Label>
                    <Select value={String(s.weekday)} onValueChange={(v) => updateSlot(i, { weekday: Number(v) })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{WEEKDAYS.map((d, idx) => <SelectItem key={idx} value={String(idx)}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">من</Label>
                    <Input type="time" value={s.start_time} onChange={(e) => updateSlot(i, { start_time: e.target.value })} />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">إلى</Label>
                    <Input type="time" value={s.end_time} onChange={(e) => updateSlot(i, { end_time: e.target.value })} />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSlot(i)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {slots.length === 0 && <p className="text-sm text-muted-foreground text-center py-3">لا توجد محاضرات. اضغط "إضافة محاضرة".</p>}
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-sm space-y-1">
            <div><span className="text-muted-foreground">عدد المحاضرات أسبوعياً: </span><span className="font-bold">{slots.length}</span></div>
            <div><span className="text-muted-foreground">ساعات الأسبوع: </span><span className="font-bold">{totalWeeklyHours}</span></div>
            <div><span className="text-muted-foreground">إجمالي الساعات المتاحة: </span><span className="font-bold text-primary">{weeks * slots.length} ساعة</span> <span className="text-xs text-muted-foreground">(كل حصة = ساعة لأغراض توزيع المواد)</span></div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
            <Button type="submit">حفظ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CampWorkspace({ camp }: { camp: Camp }) {
  return (
    <Tabs defaultValue="subjects" className="space-y-4">
      <TabsList>
        <TabsTrigger value="subjects">المواد والساعات</TabsTrigger>
        <TabsTrigger value="schedule">الجدول الأسبوعي</TabsTrigger>
        <TabsTrigger value="students">تسجيل الطلاب</TabsTrigger>
        <TabsTrigger value="attendance">الحضور</TabsTrigger>
      </TabsList>
      <TabsContent value="subjects"><SubjectsTab camp={camp} /></TabsContent>
      <TabsContent value="schedule"><ScheduleTab camp={camp} /></TabsContent>
      <TabsContent value="students"><StudentsTab camp={camp} /></TabsContent>
      <TabsContent value="attendance"><AttendanceTab camp={camp} /></TabsContent>
    </Tabs>
  );
}

function useSubjects(campId: string) {
  return useQuery({
    queryKey: ["camp_subjects", campId],
    queryFn: async () => {
      const { data, error } = await supabase.from("camp_subjects" as any).select("*").eq("camp_id", campId).order("sort_order");
      if (error) throw error;
      return data as unknown as CampSubject[];
    },
  });
}

function useSlots(campId: string) {
  return useQuery({
    queryKey: ["camp_slots", campId],
    queryFn: async () => {
      const { data, error } = await supabase.from("camp_session_slots" as any).select("*").eq("camp_id", campId).order("sort_order");
      if (error) throw error;
      return data as unknown as CampSlot[];
    },
  });
}

function useCampStudents(campId: string) {
  return useQuery({
    queryKey: ["camp_students", campId],
    queryFn: async () => {
      const { data, error } = await supabase.from("camp_students" as any).select("*").eq("camp_id", campId).order("full_name");
      if (error) throw error;
      return data as unknown as CampStudent[];
    },
  });
}

function SubjectsTab({ camp }: { camp: Camp }) {
  const qc = useQueryClient();
  const { data: subjects = [] } = useSubjects(camp.id);
  const totalAvailable = camp.weeks * camp.sessions_per_week;
  const totalAssigned = subjects.reduce((s, x) => s + (x.hours || 0), 0);
  const diff = totalAvailable - totalAssigned;
  const matched = diff === 0 && subjects.length > 0;

  const addSubject = async () => {
    const { error } = await supabase.from("camp_subjects" as any).insert({
      camp_id: camp.id,
      name: "مادة جديدة",
      color: COLORS[subjects.length % COLORS.length],
      icon: ICONS[subjects.length % ICONS.length],
      hours: 0,
      sort_order: subjects.length,
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["camp_subjects", camp.id] });
  };

  const updateSubject = async (id: string, patch: Partial<CampSubject>) => {
    const { error } = await supabase.from("camp_subjects" as any).update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["camp_subjects", camp.id] });
  };

  const removeSubject = async (id: string) => {
    const { error } = await supabase.from("camp_subjects" as any).delete().eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["camp_subjects", camp.id] });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground">الساعات المتاحة</div><div className="text-3xl font-bold mt-1">{totalAvailable}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground">الساعات المخصصة</div><div className="text-3xl font-bold mt-1">{totalAssigned}</div></CardContent></Card>
        <Card className={matched ? "border-emerald-500" : diff !== 0 ? "border-destructive" : ""}>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">{diff > 0 ? "ساعات متبقية" : diff < 0 ? "ساعات زائدة" : "متطابق"}</div>
            <div className={`text-3xl font-bold mt-1 flex items-center gap-2 ${matched ? "text-emerald-600" : diff !== 0 ? "text-destructive" : ""}`}>
              {Math.abs(diff)}
              {matched ? <CheckCircle2 className="h-6 w-6" /> : diff !== 0 ? <AlertTriangle className="h-6 w-6" /> : null}
            </div>
          </CardContent>
        </Card>
      </div>

      {!matched && subjects.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          مجموع الساعات المخصصة ({totalAssigned}) لا يساوي الساعات المتاحة ({totalAvailable}). الرجاء تعديل التوزيع.
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="font-bold">المواد</h3>
        <Button onClick={addSubject} size="sm"><Plus className="ml-1 h-4 w-4" /> إضافة مادة</Button>
      </div>

      {subjects.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">لا توجد مواد. اضغط "إضافة مادة" للبدء.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {subjects.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className="h-2" style={{ background: s.color }} />
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ background: `${s.color}20` }}>
                    {s.icon}
                  </div>
                  <Input
                    defaultValue={s.name}
                    onBlur={(e) => e.target.value !== s.name && updateSubject(s.id, { name: e.target.value })}
                    className="font-bold"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeSubject(s.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div>
                  <Label className="text-xs">عدد الساعات</Label>
                  <Input
                    type="number"
                    min={0}
                    defaultValue={s.hours}
                    onBlur={(e) => {
                      const v = Number(e.target.value) || 0;
                      if (v !== s.hours) updateSubject(s.id, { hours: v });
                    }}
                  />
                </div>
                <div>
                  <Label className="text-xs">اللون</Label>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {COLORS.map((c) => (
                      <button key={c} type="button" onClick={() => updateSubject(s.id, { color: c })}
                        className={`h-6 w-6 rounded-full border-2 ${s.color === c ? "border-foreground" : "border-transparent"}`}
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">الأيقونة</Label>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {ICONS.map((ic) => (
                      <button key={ic} type="button" onClick={() => updateSubject(s.id, { icon: ic })}
                        className={`h-8 w-8 rounded text-lg flex items-center justify-center hover:bg-accent ${s.icon === ic ? "bg-accent ring-2 ring-primary" : ""}`}>
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleTab({ camp }: { camp: Camp }) {
  const { data: subjects = [] } = useSubjects(camp.id);
  const { data: slots = [] } = useSlots(camp.id);
  const totalAvailable = camp.weeks * camp.sessions_per_week;
  const totalAssigned = subjects.reduce((s, x) => s + (x.hours || 0), 0);
  const matched = totalAssigned === totalAvailable && subjects.length > 0;

  const schedule = useMemo(() => {
    if (!matched || slots.length === 0) return null;
    const GROUPS = 3;
    const totalSessions = camp.weeks * slots.length;
    // Remaining hours per subject
    const remaining: Record<string, number> = {};
    subjects.forEach((s) => { remaining[s.id] = s.hours; });
    // For each group, build a sequence of subjects interleaved (avoid back-to-back same subject when possible, prefer subject with most remaining)
    const groupSequences: (CampSubject | null)[][] = Array.from({ length: GROUPS }, () => []);
    for (let g = 0; g < GROUPS; g++) {
      let lastId: string | null = null;
      for (let i = 0; i < totalSessions; i++) {
        // Candidates with remaining > 0
        let candidates = subjects.filter((s) => remaining[s.id] > 0);
        if (candidates.length === 0) { groupSequences[g].push(null); continue; }
        // Prefer not-last
        const nonRepeat = candidates.filter((s) => s.id !== lastId);
        const pool = nonRepeat.length > 0 ? nonRepeat : candidates;
        // Pick subject with max remaining
        pool.sort((a, b) => remaining[b.id] - remaining[a.id]);
        const picked = pool[0];
        remaining[picked.id]--;
        lastId = picked.id;
        groupSequences[g].push(picked);
      }
    }
    const weeks: { week: number; sessions: { slot: CampSlot; groups: (CampSubject | null)[] }[] }[] = [];
    for (let w = 0; w < camp.weeks; w++) {
      const sessions = slots.map((slot, sIdx) => {
        const idx = w * slots.length + sIdx;
        return { slot, groups: [groupSequences[0][idx] ?? null, groupSequences[1][idx] ?? null, groupSequences[2][idx] ?? null] };
      });
      weeks.push({ week: w + 1, sessions });
    }
    return weeks;
  }, [subjects, slots, camp, matched]);

  if (slots.length === 0) {
    return <Card><CardContent className="py-12 text-center text-muted-foreground">لم يتم تحديد مواعيد المحاضرات بعد. عدّل المعسكر لإضافة الأيام والمواعيد.</CardContent></Card>;
  }

  if (!matched) {
    return (
      <Card><CardContent className="py-12 text-center">
        <AlertTriangle className="h-10 w-10 mx-auto text-destructive mb-3" />
        <p className="font-bold">لا يمكن توليد الجدول</p>
        <p className="text-sm text-muted-foreground mt-1">يجب أن يكون مجموع ساعات المواد ({totalAssigned}) مساوياً للساعات المتاحة ({totalAvailable}).</p>
      </CardContent></Card>
    );
  }

  return (
    <div className="space-y-6">
      {schedule!.map((w) => (
        <Card key={w.week}>
          <CardHeader className="pb-3"><CardTitle>الأسبوع {w.week}</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اليوم والوقت</TableHead>
                    <TableHead className="text-right">المجموعة 1</TableHead>
                    <TableHead className="text-right">المجموعة 2</TableHead>
                    <TableHead className="text-right">المجموعة 3</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {w.sessions.map((s, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold">
                        <div>{WEEKDAYS[s.slot.weekday]}</div>
                        <div className="text-xs text-muted-foreground" dir="ltr">{s.slot.start_time.slice(0,5)} - {s.slot.end_time.slice(0,5)}</div>
                      </TableCell>
                      {s.groups.map((g, gi) => (
                        <TableCell key={gi}>
                          {g ? (
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md" style={{ background: `${g.color}20`, borderRight: `3px solid ${g.color}` }}>
                              <span className="text-lg">{g.icon}</span>
                              <span className="font-medium">{g.name}</span>
                            </div>
                          ) : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader className="pb-3"><CardTitle>إجمالي ساعات كل مادة</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {subjects.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: `${s.color}15` }}>
                <div className="flex items-center gap-2"><span className="text-xl">{s.icon}</span><span className="font-medium">{s.name}</span></div>
                <Badge style={{ background: s.color, color: "white" }}>{s.hours} س</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentsTab({ camp }: { camp: Camp }) {
  const qc = useQueryClient();
  const { data: students = [] } = useCampStudents(camp.id);

  const [filter, setFilter] = useState<string>("all");
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState<CampStudent | null>(null);
  const [del, setDel] = useState<CampStudent | null>(null);
  const empty = { full_name: "", parent_phone: "", email: "", level: camp.target_levels[0] ?? "", grade: 1 };
  const [form, setForm] = useState<any>(empty);

  const openAdd = () => { setEditing(null); setForm({ ...empty, level: camp.target_levels[0] ?? "" }); setDialog(true); };
  const openEdit = (s: CampStudent) => { setEditing(s); setForm({ full_name: s.full_name, parent_phone: s.parent_phone, email: s.email ?? "", level: s.level, grade: s.grade }); setDialog(true); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.level) { toast.error("اختر المرحلة"); return; }
    const payload = { camp_id: camp.id, full_name: form.full_name.trim(), parent_phone: form.parent_phone.trim(), email: form.email?.trim() || null, level: form.level, grade: Number(form.grade) };
    const { error } = editing
      ? await supabase.from("camp_students" as any).update(payload).eq("id", editing.id)
      : await supabase.from("camp_students" as any).insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "تم التحديث" : "تم التسجيل");
    setDialog(false);
    qc.invalidateQueries({ queryKey: ["camp_students", camp.id] });
  };

  const filtered = filter === "all" ? students : students.filter((s) => s.level === filter);
  const countByLevel = (lvl: string) => students.filter((s) => s.level === lvl).length;
  const grades = form.level ? LEVEL_GRADES[form.level] ?? [] : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 text-sm text-muted-foreground"><UsersIcon className="h-4 w-4" />إجمالي الطلاب</div><div className="text-3xl font-bold mt-1">{students.length}</div></CardContent></Card>
        {LEVELS.map((lvl) => (
          <Card key={lvl}><CardContent className="pt-6"><div className="text-sm text-muted-foreground">{lvl}</div><div className="text-3xl font-bold mt-1">{countByLevel(lvl)}</div></CardContent></Card>
        ))}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm">تصفية:</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل المراحل</SelectItem>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAdd}><Plus className="ml-2 h-4 w-4" /> تسجيل طالب</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">لا يوجد طلاب مسجلون</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">هاتف ولي الأمر</TableHead>
                  <TableHead className="text-right">البريد</TableHead>
                  <TableHead className="text-right">المرحلة</TableHead>
                  <TableHead className="text-right">الصف</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell dir="ltr" className="text-right">{s.parent_phone}</TableCell>
                    <TableCell>{s.email || "—"}</TableCell>
                    <TableCell><Badge variant="outline">{s.level}</Badge></TableCell>
                    <TableCell>{s.grade}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => setDel(s)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent dir="rtl">
          <DialogHeader><DialogTitle>{editing ? "تعديل بيانات طالب" : "تسجيل طالب جديد"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <div><Label>الاسم الكامل</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
            <div><Label>هاتف ولي الأمر</Label><Input required value={form.parent_phone} onChange={(e) => setForm({ ...form, parent_phone: e.target.value })} /></div>
            <div><Label>البريد الإلكتروني (اختياري)</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>المرحلة</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v, grade: LEVEL_GRADES[v]?.[0] ?? 1 })}>
                  <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                  <SelectContent>{LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>الصف</Label>
                <Select value={String(form.grade)} onValueChange={(v) => setForm({ ...form, grade: Number(v) })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{grades.map((g) => <SelectItem key={g} value={String(g)}>الصف {g}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setDialog(false)}>إلغاء</Button>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف الطالب؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف "{del?.full_name}" من المعسكر.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!del) return;
                const { error } = await supabase.from("camp_students" as any).delete().eq("id", del.id);
                if (error) toast.error(error.message);
                else { toast.success("تم الحذف"); qc.invalidateQueries({ queryKey: ["camp_students", camp.id] }); }
                setDel(null);
              }}
            >حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function AttendanceTab({ camp }: { camp: Camp }) {
  const qc = useQueryClient();
  const { data: slots = [] } = useSlots(camp.id);
  const { data: students = [] } = useCampStudents(camp.id);
  const [week, setWeek] = useState(1);
  const [slotId, setSlotId] = useState<string>("");

  useEffect(() => {
    if (!slotId && slots.length > 0) setSlotId(slots[0].id);
  }, [slots, slotId]);

  const { data: records = [] } = useQuery({
    queryKey: ["camp_attendance", camp.id, week, slotId],
    queryFn: async () => {
      if (!slotId) return [];
      const { data, error } = await supabase.from("camp_attendance" as any)
        .select("*").eq("camp_id", camp.id).eq("week_number", week).eq("slot_id", slotId);
      if (error) throw error;
      return data as unknown as CampAtt[];
    },
    enabled: !!slotId,
  });

  const statusFor = (sid: string): AttStatus | null => records.find((r) => r.student_id === sid)?.status ?? null;

  const setStatus = async (studentId: string, status: AttStatus) => {
    if (!slotId) return;
    const existing = records.find((r) => r.student_id === studentId);
    if (existing) {
      const { error } = await supabase.from("camp_attendance" as any).update({ status }).eq("id", existing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("camp_attendance" as any).insert({
        camp_id: camp.id, slot_id: slotId, week_number: week, student_id: studentId, status,
      });
      if (error) { toast.error(error.message); return; }
    }
    qc.invalidateQueries({ queryKey: ["camp_attendance", camp.id, week, slotId] });
  };

  const markAll = async (status: AttStatus) => {
    for (const s of students) {
      // sequential to keep it simple
      // eslint-disable-next-line no-await-in-loop
      await setStatus(s.id, status);
    }
    toast.success("تم تسجيل الحضور للجميع");
  };

  const weekOptions = Array.from({ length: camp.weeks }, (_, i) => i + 1);
  const currentSlot = slots.find((s) => s.id === slotId);

  if (slots.length === 0) {
    return <Card><CardContent className="py-12 text-center text-muted-foreground">لم يتم تحديد مواعيد المحاضرات. عدّل المعسكر لإضافة المواعيد.</CardContent></Card>;
  }
  if (students.length === 0) {
    return <Card><CardContent className="py-12 text-center text-muted-foreground">لا يوجد طلاب مسجلون في هذا المعسكر.</CardContent></Card>;
  }

  const counts = {
    حاضر: records.filter((r) => r.status === "حاضر").length,
    غائب: records.filter((r) => r.status === "غائب").length,
    متأخر: records.filter((r) => r.status === "متأخر").length,
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>الأسبوع</Label>
              <Select value={String(week)} onValueChange={(v) => setWeek(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{weekOptions.map((w) => <SelectItem key={w} value={String(w)}>الأسبوع {w}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>المحاضرة</Label>
              <Select value={slotId} onValueChange={setSlotId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {slots.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {WEEKDAYS[s.weekday]} — {s.start_time.slice(0,5)} → {s.end_time.slice(0,5)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-emerald-500">حاضر: {counts["حاضر"]}</Badge>
            <Badge className="bg-destructive">غائب: {counts["غائب"]}</Badge>
            <Badge className="bg-amber-500">متأخر: {counts["متأخر"]}</Badge>
            <div className="mr-auto flex gap-2">
              <Button size="sm" variant="outline" onClick={() => markAll("حاضر")}>تحديد الكل حاضر</Button>
              <Button size="sm" variant="outline" onClick={() => markAll("غائب")}>تحديد الكل غائب</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            حضور الأسبوع {week} — {currentSlot ? `${WEEKDAYS[currentSlot.weekday]} ${currentSlot.start_time.slice(0,5)}` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الطالب</TableHead>
                <TableHead className="text-right">المرحلة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((st) => {
                const s = statusFor(st.id);
                return (
                  <TableRow key={st.id}>
                    <TableCell className="font-medium">{st.full_name}</TableCell>
                    <TableCell><Badge variant="outline">{st.level} - {st.grade}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {ATT_STATUSES.map((status) => {
                          const active = s === status;
                          const cls = status === "حاضر"
                            ? (active ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "")
                            : status === "غائب"
                            ? (active ? "bg-destructive hover:bg-destructive/90 text-white" : "")
                            : (active ? "bg-amber-500 hover:bg-amber-600 text-white" : "");
                          return (
                            <Button key={status} size="sm" variant={active ? "default" : "outline"}
                              className={cls}
                              onClick={() => setStatus(st.id, status)}>
                              {status}
                            </Button>
                          );
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
