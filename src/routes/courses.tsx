import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useEffect, useMemo } from "react";
import { useCourses, useInstructors, useCourseInstructors, useCourseRuns, useCourseRunSchedules, useCourseStudents, useStudents, RUN_STATUSES, type Course, type CourseRun, type RunStatus } from "@/lib/data";
import { STAGES, TARGET_GENDERS, LOCATIONS } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Layers, Calendar, Users, UserPlus, BookOpen } from "lucide-react";

import { logAction } from "@/lib/audit";

export const Route = createFileRoute("/courses")({ component: CoursesPage });

/* ── Syllabus Viewer Component ── */
function SyllabusViewer({ course, onClose }: { course: Course | null; onClose: () => void }) {
  if (!course) return null;
  return (
    <Dialog open={!!course} onOpenChange={(o) => !o && onClose()}>
      <DialogContent dir="rtl" className="sm:max-w-[700px] border-none shadow-2xl bg-card/80 backdrop-blur-xl">
        <DialogHeader className="border-b border-border/40 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary"><BookOpen className="h-6 w-6" /></div>
            <span>المحتوى الدراسي: {course.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto px-1">
          {course.syllabus ? (
            <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg bg-muted/20 p-6 rounded-2xl border border-border/30">
              {course.syllabus}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-muted/10 rounded-2xl border border-dashed border-border/50">
              <BookOpen className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg">لم يتم إضافة محتوى دراسي لهذا الكورس بعد</p>
            </div>
          )}
        </div>
        <DialogFooter className="mt-6 border-t border-border/40 pt-4">
          <Button onClick={onClose} variant="secondary" className="w-full sm:w-auto px-8">إغلاق</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const WEEKDAYS_AR = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const empty = { name: "", subject: "", target_stage: [] as string[], target_gender: "مختلط" as const, description: "", syllabus: "", price: 0, instructor_ids: [] as string[], min_batch_size: 8, level: "" };

function CoursesPage() {
  const qc = useQueryClient();
  const { data: courses = [] } = useCourses();
  const { data: instructors = [] } = useInstructors();
  const { data: ci = [] } = useCourseInstructors();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [viewingSyllabus, setViewingSyllabus] = useState<Course | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [del, setDel] = useState<Course | null>(null);
  const [runsCourse, setRunsCourse] = useState<Course | null>(null);
  const [fStage, setFStage] = useState("all");
  const [fGender, setFGender] = useState("all");
  const { data: runs = [] } = useCourseRuns();
  const { data: cs = [] } = useCourseStudents();

  const filtered = courses.filter(c => {
    if (fStage !== "all" && !c.target_stage.includes(fStage)) return false;
    if (fGender !== "all" && c.target_gender !== fGender) return false;
    return true;
  });

  /* Filter instructors based on subject specialty */
  const filteredInstructorsForSelection = useMemo(() => {
    if (!form.subject) return [];
    return instructors.filter(i => {
      if (!i.specialty) return false;
      const list = i.specialty.split(",").map(s => s.trim());
      return list.includes(form.subject);
    });
  }, [instructors, form.subject]);

  /* Derive unique subjects from active instructor specialties */
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    instructors.forEach(i => {
      if (i.specialty) i.specialty.split(",").forEach(s => set.add(s.trim()));
    });
    return Array.from(set).sort();
  }, [instructors]);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({
      name: c.name, subject: c.subject, target_stage: c.target_stage, target_gender: c.target_gender,
      description: c.description || "", syllabus: c.syllabus || "", price: c.price ?? 0,
      min_batch_size: c.min_batch_size ?? 8, level: c.level ?? "",
      instructor_ids: ci.filter(x => x.course_id === c.id).map(x => x.instructor_id),
    });
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject) { toast.error("يرجى اختيار مادة الكورس"); return; }
    const { instructor_ids, ...rest } = form;
    const payload = { ...rest, description: rest.description || null, syllabus: rest.syllabus || null, price: Number(rest.price) || 0, min_batch_size: Number(rest.min_batch_size) || 8, level: rest.level || null };
    let courseId = editing?.id;
    if (editing) {
      const { error } = await supabase.from("courses").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { data, error } = await supabase.from("courses").insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      courseId = data.id;
    }
    if (courseId) {
      await supabase.from("course_instructors").delete().eq("course_id", courseId);
      if (instructor_ids.length) {
        await supabase.from("course_instructors").insert(instructor_ids.map((id: string) => ({ course_id: courseId, instructor_id: id })));
      }
    }
    toast.success(editing ? "تم تحديث بيانات الكورس" : "تم إضافة كورس جديد");
    logAction({ action_type: editing ? "UPDATE" : "CREATE", entity_type: "course", entity_id: courseId, old_values: editing || null, new_values: payload });
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["courses"] });
    qc.invalidateQueries({ queryKey: ["course_instructors"] });
  };

  const doDelete = async () => {
    if (!del) return;
    const { error } = await supabase.from("courses").delete().eq("id", del.id);
    if (error) toast.error(error.message); 
    else { toast.success("تم حذف الكورس بنجاح"); logAction({ action_type: "DELETE", entity_type: "course", entity_id: del.id, old_values: del }); }
    setDel(null);
    qc.invalidateQueries({ queryKey: ["courses"] });
  };

  const toggleStage = (s: string) => {
    setForm((f: any) => ({ ...f, target_stage: f.target_stage.includes(s) ? f.target_stage.filter((x: string) => x !== s) : [...f.target_stage, s] }));
  };
  const toggleInstructor = (id: string) => {
    setForm((f: any) => ({ ...f, instructor_ids: f.instructor_ids.includes(id) ? f.instructor_ids.filter((x: string) => x !== id) : [...f.instructor_ids, id] }));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">إدارة الكورسات</h1>
          <Button onClick={openAdd} className="shadow-md"><Plus className="ml-2 h-4 w-4" /> إضافة كورس جديد</Button>
        </div>

        <Card className="border-none shadow-sm bg-muted/20">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div className="space-y-1">
              <Label className="text-xs mr-1">تصفية حسب المرحلة</Label>
              <Select value={fStage} onValueChange={setFStage}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="المرحلة" /></SelectTrigger>
                <SelectContent><SelectItem value="all">كل المراحل</SelectItem>{STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs mr-1">تصفية حسب الجنس</Label>
              <Select value={fGender} onValueChange={setFGender}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="الجنس" /></SelectTrigger>
                <SelectContent><SelectItem value="all">الكل</SelectItem>{TARGET_GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Layers className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">لا توجد كورسات مطابقة للبحث</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-right py-4">اسم الكورس</TableHead>
                      <TableHead className="text-right py-4">المادة</TableHead>
                      <TableHead className="text-right py-4">السعر</TableHead>
                      <TableHead className="text-right py-4">المحاضرون</TableHead>
                      <TableHead className="text-right py-4">المراحل</TableHead>
                      <TableHead className="text-right py-4">المجموعات</TableHead>
                      <TableHead className="text-right py-4 min-w-[120px]">الانتظار</TableHead>
                      <TableHead className="text-right py-4">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(c => {
                      const insNames = ci.filter(x => x.course_id === c.id).map(x => instructors.find(i => i.id === x.instructor_id)?.full_name).filter(Boolean).join("، ");
                      const runCount = runs.filter(r => r.course_id === c.id).length;
                      const waitlistCount = cs.filter((x: any) => x.course_id === c.id && !x.run_id).length;
                      return (
                        <TableRow key={c.id} className="group transition-colors border-border/40">
                          <TableCell className="font-bold py-4">{c.name}</TableCell>
                          <TableCell className="py-4"><Badge variant="secondary" className="font-medium bg-secondary/50">{c.subject}</Badge></TableCell>
                          <TableCell className="py-4 font-semibold text-primary">{c.price?.toLocaleString("ar-EG")} ج.م</TableCell>
                          <TableCell className="py-4 max-w-[200px] truncate" title={insNames}>{insNames || "—"}</TableCell>
                          <TableCell className="py-4"><div className="flex flex-wrap gap-1">{c.target_stage.slice(0, 2).map(s => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted border border-border/50">{s}</span>)}{c.target_stage.length > 2 && <span className="text-[10px]">+{c.target_stage.length-2}</span>}</div></TableCell>
                          <TableCell className="py-4"><Badge variant={runCount > 0 ? "default" : "secondary"} className="rounded-md">{runCount} مجموعة</Badge></TableCell>
                          <TableCell className="py-4">
                            <Badge variant={waitlistCount > 0 ? "destructive" : "outline"} className="flex items-center gap-1.5 px-2 bg-opacity-10 capitalize">
                              <Users className="h-3 w-3" />{waitlistCount} طالب
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors" title="المحتوى الدراسي" onClick={() => setViewingSyllabus(c)}><BookOpen className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:bg-blue-50" title="المجموعات" onClick={() => setRunsCourse(c)}><Layers className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => setDel(c)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <SyllabusViewer course={viewingSyllabus} onClose={() => setViewingSyllabus(null)} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-none shadow-2xl" dir="rtl">
          <DialogHeader className="border-b border-border/40 pb-4 mb-4">
            <DialogTitle className="text-2xl font-bold">{editing ? "تعديل بيانات الكورس" : "إضافة كورس جديد"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="grid grid-cols-2 gap-6">
            <div className="space-y-2"><Label className="font-semibold">اسم الكورس</Label><Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-muted/30" /></div>
            <div className="space-y-2">
              <Label className="font-semibold">المادة (التخصص)</Label>
              <Select value={form.subject} onValueChange={v => setForm({...form, subject: v, instructor_ids: []})}>
                <SelectTrigger className="bg-muted/30"><SelectValue placeholder="اختر المادة" /></SelectTrigger>
                <SelectContent>{availableSubjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2"><Label className="font-semibold">سعر الكورس (ج.م)</Label><Input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-muted/30" /></div>
            <div className="space-y-2"><Label className="font-semibold">الحد الأدنى للمشاركة</Label><Input type="number" min="1" value={form.min_batch_size} onChange={e => setForm({...form, min_batch_size: e.target.value})} className="bg-muted/30" /></div>
            
            <div className="col-span-1 space-y-2 text-right">
              <Label className="font-semibold">المستوى التعليمي</Label>
              <Input value={form.level} onChange={e => setForm({...form, level: e.target.value})} placeholder="مبتدئ / متوسط / متقدم" className="bg-muted/30" />
            </div>

            <div className="col-span-1 space-y-2 text-right">
              <Label className="font-semibold">الجنس المستهدف</Label>
              <Select value={form.target_gender} onValueChange={v => setForm({...form, target_gender: v})}>
                <SelectTrigger className="bg-muted/30"><SelectValue /></SelectTrigger>
                <SelectContent>{TARGET_GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2 text-right">
              <Label className="font-semibold">المراحل المستهدفة (متعدد)</Label>
              <div className="flex flex-wrap gap-4 mt-2 p-4 bg-muted/20 rounded-xl border border-border/50">
                {STAGES.map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer group">
                    <Checkbox checked={form.target_stage.includes(s)} onCheckedChange={() => toggleStage(s)} className="rounded-full" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-2 space-y-2 text-right">
              <Label className="font-semibold flex items-center justify-between">
                <span>المحاضرون المتاحون لهذا التخصص</span>
                {form.subject && <Badge variant="outline" className="text-[10px] border-primary/20">{form.subject}</Badge>}
              </Label>
              <div className="flex flex-wrap gap-4 mt-2 p-4 bg-muted/20 rounded-xl border border-border/50 min-h-[80px]">
                {!form.subject ? (
                  <div className="w-full flex flex-col items-center justify-center py-2 text-muted-foreground italic text-xs">يرجى اختيار مادة الكورس أولاً لعرض المحاضرين المتخصصين</div>
                ) : filteredInstructorsForSelection.length === 0 ? (
                  <div className="w-full flex flex-col items-center justify-center py-2 text-destructive font-medium text-xs">لا يوجد محاضرين مسجلين لهذا التخصص حالياً</div>
                ) : filteredInstructorsForSelection.map(i => (
                  <label key={i.id} className="flex items-center gap-2 cursor-pointer group bg-background/50 hover:bg-background pr-2 pl-4 py-1.5 rounded-full border border-border/30 transition-all shadow-sm">
                    <Checkbox checked={form.instructor_ids.includes(i.id)} onCheckedChange={() => toggleInstructor(i.id)} className="rounded-full" />
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{i.full_name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-2 space-y-2 text-right">
              <Label className="font-semibold">المحتوى الدراسي (المنهج)</Label>
              <div className="relative">
                <Textarea value={form.syllabus} onChange={e => setForm({...form, syllabus: e.target.value})} placeholder="أدخل تفاصيل الدروس أو المنهج هنا..." className="bg-muted/30 min-h-[150px] text-right" />
                <BookOpen className="absolute bottom-3 left-3 h-5 w-5 text-muted-foreground/30 pointer-events-none" />
              </div>
            </div>

            <div className="col-span-2 space-y-2 text-right">
              <Label className="font-semibold">وصف الكورس</Label>
              <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-muted/30 min-h-[80px]" />
            </div>

            <DialogFooter className="col-span-2 gap-3 pt-4 border-t border-border/40">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">إلغاء</Button>
              <Button type="submit" className="flex-1 shadow-lg bg-primary hover:scale-[1.02] transition-transform">حفظ البيانات</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف "{del?.name}" نهائياً مع كل محاضراته.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <RunsDialog course={runsCourse} onClose={() => setRunsCourse(null)} />
    </AppLayout>
  );
}

type SlotDraft = { id?: string; weekday: number; start_time: string; hours: number };

const addHours = (time: string, hours: number) => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + Math.round(hours * 60);
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}`;
};

function RunsDialog({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const qc = useQueryClient();
  const { data: runs = [] } = useCourseRuns();
  const { data: schedules = [] } = useCourseRunSchedules();
  const { data: instructors = [] } = useInstructors();
  const { data: ci = [] } = useCourseInstructors();
  const { data: cs = [] } = useCourseStudents();
  const { data: students = [] } = useStudents();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CourseRun | null>(null);
  const [delRun, setDelRun] = useState<CourseRun | null>(null);
  const [assignRun, setAssignRun] = useState<CourseRun | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const [name, setName] = useState("");
  const [instructorId, setInstructorId] = useState<string>("");
  const [location, setLocation] = useState<string>("A");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [slots, setSlots] = useState<SlotDraft[]>([]);
  const [minCapacity, setMinCapacity] = useState<number>(5);
  const [maxCapacity, setMaxCapacity] = useState<number>(25);
  const [runStatus, setRunStatus] = useState<RunStatus>("open");

  const courseRuns = course ? runs.filter(r => r.course_id === course.id) : [];
  const availableInstructors = course ? instructors.filter(i => ci.some(x => x.course_id === course.id && x.instructor_id === i.id)) : [];

  const waitlistEnrolls = course ? cs.filter((x: any) => x.course_id === course.id && !x.run_id) : [];
  const waitlistStudents = waitlistEnrolls.map((e: any) => students.find(s => s.id === e.student_id)).filter(Boolean) as any[];

  const togglePick = (id: string) => setPicked(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const assignToRun = async () => {
    if (!assignRun || picked.size === 0) return;
    const ids = Array.from(picked);
    const { error } = await supabase.from("course_students").update({ run_id: assignRun.id } as any)
      .eq("course_id", assignRun.course_id).in("student_id", ids);
    if (error) { toast.error(error.message); return; }
    toast.success(`تم نقل ${ids.length} طالب لمجموعة "${assignRun.name}"`);
    setAssignRun(null); setPicked(new Set());
    qc.invalidateQueries({ queryKey: ["course_students"] });
  };

  const [totalHours, setTotalHours] = useState<number>(0);

  const resetForm = () => {
    setEditing(null);
    setName(""); setInstructorId(availableInstructors[0]?.id ?? ""); setLocation("A");
    setStartDate(""); setEndDate(""); setNotes(""); setTotalHours(0);
    setMinCapacity(5); setMaxCapacity(25); setRunStatus("open");
    setSlots([{ weekday: 1, start_time: "16:00", hours: 2 }]);
  };

  const openNew = () => { resetForm(); setShowForm(true); };
  const openEditRun = (r: CourseRun) => {
    setEditing(r);
    setName(r.name); setInstructorId(r.instructor_id ?? ""); setLocation(r.location ?? "A");
    setStartDate(r.start_date ?? ""); setEndDate(r.end_date ?? ""); setNotes(r.notes ?? "");
    setMinCapacity((r as any).min_capacity ?? 5);
    setMaxCapacity((r as any).max_capacity ?? 25);
    setRunStatus(((r as any).status ?? "open") as RunStatus);
    const sch = schedules.filter(s => s.run_id === r.id).map(s => {
      const [sh, sm] = s.start_time.slice(0,5).split(":").map(Number);
      const [eh, em] = s.end_time.slice(0,5).split(":").map(Number);
      const hrs = ((eh * 60 + em) - (sh * 60 + sm)) / 60;
      return { id: s.id, weekday: s.weekday, start_time: s.start_time.slice(0,5), hours: hrs };
    });
    setSlots(sch.length > 0 ? sch : [{ weekday: 1, start_time: "16:00", hours: 2 }]);
    setTotalHours(0);
    setShowForm(true);
  };

  const save = async () => {
    if (!course) return;
    if (!name.trim()) { toast.error("اسم المجموعة مطلوب"); return; }
    if (slots.length === 0) { toast.error("أضف موعد أسبوعي واحد على الأقل"); return; }
    for (const s of slots) if (!(s.hours > 0)) { toast.error("مدة المحاضرة لازم تكون أكبر من صفر"); return; }
    if (!startDate) { toast.error("حدد تاريخ بداية الكورس"); return; }

    const payload: any = {
      course_id: course.id,
      name: name.trim(),
      instructor_id: instructorId || null,
      location: location || null,
      start_date: startDate || null,
      end_date: endDate || null,
      notes: notes || null,
      min_capacity: Number(minCapacity) || 5,
      max_capacity: Number(maxCapacity) || 25,
      status: runStatus,
    };

    let runId = editing?.id;
    if (editing) {
      const { error } = await supabase.from("course_runs" as any).update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { data, error } = await supabase.from("course_runs" as any).insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      runId = (data as any).id;
    }

    // Replace schedules (store with computed end_time)
    await supabase.from("course_run_schedules" as any).delete().eq("run_id", runId!);
    await supabase.from("course_run_schedules" as any).insert(slots.map(s => ({
      run_id: runId, weekday: s.weekday, start_time: s.start_time, end_time: addHours(s.start_time, s.hours),
    })));

    // Auto-generate lectures: spread across weeks until totalHours met (or endDate reached)
    let generated = 0;
    let conflicts = 0;
    let hoursLeft = 0;
    if (instructorId && (totalHours > 0 || endDate)) {
      const { data: existingLectures } = await supabase.from("lectures").select("*");
      const existing = (existingLectures ?? []) as any[];
      if (editing) await supabase.from("lectures").delete().eq("run_id", runId!);
      const filteredExisting = editing ? existing.filter(l => l.run_id !== runId) : existing;

      const rowsToInsert: any[] = [];
      const start = new Date(startDate);
      const hardCap = endDate ? new Date(endDate) : new Date(start.getTime() + 365 * 24 * 3600 * 1000);
      let accumulated = 0;
      const target = totalHours > 0 ? totalHours : Infinity;

      for (let d = new Date(start); d <= hardCap && accumulated < target; d.setDate(d.getDate() + 1)) {
        const wd = d.getDay();
        const todaySlots = slots.filter(s => s.weekday === wd).sort((a,b) => a.start_time.localeCompare(b.start_time));
        for (const slot of todaySlots) {
          if (accumulated >= target) break;
          const dateStr = d.toISOString().slice(0, 10);
          const slotEnd = addHours(slot.start_time, slot.hours);
          const conflict = filteredExisting.find(l =>
            l.date === dateStr && l.location === location &&
            slot.start_time < l.end_time.slice(0,5) && slotEnd > l.start_time.slice(0,5)
          ) || rowsToInsert.find(r =>
            r.date === dateStr && r.location === location &&
            slot.start_time < r.end_time && slotEnd > r.start_time
          );
          if (conflict) { conflicts++; continue; }
          rowsToInsert.push({
            course_id: course.id, run_id: runId, instructor_id: instructorId,
            date: dateStr, start_time: slot.start_time, end_time: slotEnd, location,
          });
          accumulated += slot.hours;
        }
      }
      hoursLeft = Math.max(0, target === Infinity ? 0 : target - accumulated);
      if (rowsToInsert.length > 0) {
        const { error: lecErr } = await supabase.from("lectures").insert(rowsToInsert);
        if (lecErr) { toast.error("حفظ المجموعة تم لكن توليد المحاضرات فشل: " + lecErr.message); }
        else generated = rowsToInsert.length;
      }
    }

    toast.success(`تم الحفظ${generated ? ` — تم توليد ${generated} محاضرة` : ""}${conflicts ? ` (تخطّى ${conflicts} بسبب تعارض القاعة)` : ""}${hoursLeft > 0 ? ` — متبقي ${hoursLeft} ساعة لم تجدول` : ""}`);
    setShowForm(false);
    qc.invalidateQueries({ queryKey: ["course_runs"] });
    qc.invalidateQueries({ queryKey: ["course_run_schedules"] });
    qc.invalidateQueries({ queryKey: ["lectures"] });
  };

  const doDeleteRun = async () => {
    if (!delRun) return;
    await supabase.from("lectures").delete().eq("run_id", delRun.id);
    const { error } = await supabase.from("course_runs" as any).delete().eq("id", delRun.id);
    if (error) toast.error(error.message);
    else { toast.success("تم حذف المجموعة"); qc.invalidateQueries({ queryKey: ["course_runs"] }); qc.invalidateQueries({ queryKey: ["lectures"] }); }
    setDelRun(null);
  };

  useEffect(() => { if (!course) setShowForm(false); }, [course]);

  return (
    <>
      <Dialog open={!!course} onOpenChange={(o) => !o && onClose()}>
        <DialogContent dir="rtl" className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>مجموعات: {course?.name}</DialogTitle></DialogHeader>
          {!showForm ? (
            <div className="space-y-3">
              {(() => {
                const minBatch = (course as any)?.min_batch_size ?? 8;
                const isReady = waitlistStudents.length >= minBatch;
                return (
                  <Card className={isReady ? "border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20" : "border-amber-300/60 bg-amber-50/40 dark:bg-amber-950/20"}>
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4" /> قائمة الانتظار
                          <Badge variant={waitlistStudents.length > 0 ? "destructive" : "secondary"}>{waitlistStudents.length} / {minBatch} طالب</Badge>
                        </div>
                        {isReady && (
                          <Badge className="bg-emerald-600 hover:bg-emerald-700">✓ جاهز لفتح مجموعة جديدة</Badge>
                        )}
                      </div>
                      {waitlistStudents.length === 0 ? (
                        <p className="text-xs text-muted-foreground">مفيش طلاب في انتظار التوزيع لمجموعة.</p>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {waitlistStudents.map(s => (
                            <Badge key={s.id} variant="outline" className="text-xs">{s.full_name}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })()}

              <div className="flex justify-end">
                <Button onClick={openNew}><Plus className="ml-2 h-4 w-4" /> مجموعة جديدة</Button>
              </div>
              {courseRuns.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا توجد مجموعات بعد. اضغط "مجموعة جديدة" لبدء أول مجموعة.</p>
              ) : (
                <div className="space-y-3">
                  {courseRuns.map(r => {
                    const sch = schedules.filter(s => s.run_id === r.id);
                    const insName = instructors.find(i => i.id === r.instructor_id)?.full_name ?? "—";
                    const runStudentCount = cs.filter((x: any) => x.run_id === r.id).length;
                    const maxCap = (r as any).max_capacity ?? 25;
                    const minCap = (r as any).min_capacity ?? 5;
                    const fillPct = Math.min(100, Math.round((runStudentCount / Math.max(maxCap, 1)) * 100));
                    const runStatus = ((r as any).status ?? "open") as RunStatus;
                    const statusLabel = RUN_STATUSES.find(x => x.value === runStatus)?.label ?? runStatus;
                    const statusColor =
                      runStatus === "open"      ? "bg-blue-100 text-blue-700 border-blue-300" :
                      runStatus === "active"    ? "bg-emerald-100 text-emerald-700 border-emerald-300" :
                      runStatus === "completed" ? "bg-slate-100 text-slate-700 border-slate-300" :
                                                  "bg-red-100 text-red-700 border-red-300";
                    const barColor = fillPct >= 100 ? "bg-emerald-500" : fillPct >= 80 ? "bg-amber-500" : "bg-primary";
                    return (
                      <Card key={r.id}>
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">{r.name}</span>
                              <Badge variant="outline" className={statusColor}>{statusLabel}</Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => { setPicked(new Set()); setAssignRun(r); }} disabled={waitlistStudents.length === 0 || runStudentCount >= maxCap}>
                                <UserPlus className="h-4 w-4 ml-1" /> إضافة طلاب
                              </Button>
                              <Button size="icon" variant="ghost" onClick={() => openEditRun(r)}><Pencil className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost" onClick={() => setDelRun(r)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>التسجيل: {runStudentCount} / {maxCap} طالب (حد أدنى {minCap})</span>
                              <span>{fillPct}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className={`h-full ${barColor} transition-all`} style={{ width: `${fillPct}%` }} />
                            </div>
                            {runStudentCount >= maxCap && (
                              <p className="text-xs text-emerald-700 font-medium">✓ المجموعة مكتملة</p>
                            )}
                            {runStudentCount > 0 && runStudentCount < minCap && (
                              <p className="text-xs text-amber-700">⚠ أقل من الحد الأدنى</p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">المحاضر: {insName}</Badge>
                            <Badge variant="outline">قاعة {r.location ?? "—"}</Badge>
                            {r.start_date && r.end_date && <Badge variant="outline"><Calendar className="h-3 w-3 ml-1" />{r.start_date} → {r.end_date}</Badge>}
                          </div>
                          {sch.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {sch.map(s => (
                                <Badge key={s.id} className="bg-primary/10 text-primary hover:bg-primary/20">
                                  {WEEKDAYS_AR[s.weekday]} <span dir="ltr" className="mr-1">{s.start_time.slice(0,5)}-{s.end_time.slice(0,5)}</span>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div><Label>اسم المجموعة</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="مثال: مجموعة الصباح" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>المحاضر</Label>
                  <Select value={instructorId} onValueChange={setInstructorId}>
                    <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                    <SelectContent>
                      {availableInstructors.length === 0 ? <div className="p-2 text-xs text-muted-foreground">أضف محاضر للكورس أولاً</div> : availableInstructors.map(i => <SelectItem key={i.id} value={i.id}>{i.full_name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>القاعة</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{LOCATIONS.map(l => <SelectItem key={l} value={l}>قاعة {l}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>أقل عدد طلاب</Label><Input type="number" min="1" value={minCapacity} onChange={e => setMinCapacity(Number(e.target.value) || 0)} /></div>
                <div><Label>أقصى عدد طلاب</Label><Input type="number" min="1" value={maxCapacity} onChange={e => setMaxCapacity(Number(e.target.value) || 0)} /></div>
                <div>
                  <Label>حالة المجموعة</Label>
                  <Select value={runStatus} onValueChange={v => setRunStatus(v as RunStatus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{RUN_STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>تاريخ البداية</Label><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
                <div><Label>إجمالي ساعات الكورس</Label><Input type="number" min="0" step="0.5" value={totalHours || ""} placeholder="مثلاً 24" onChange={e => setTotalHours(Number(e.target.value) || 0)} /></div>
                <div><Label>تاريخ نهاية (اختياري)</Label><Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>أيام المحاضرات في الأسبوع</Label>
                  <Button type="button" size="sm" variant="outline" onClick={() => setSlots([...slots, { weekday: 1, start_time: "16:00", hours: 2 }])}>
                    <Plus className="ml-1 h-4 w-4" /> إضافة يوم
                  </Button>
                </div>
                <div className="space-y-2">
                  {slots.map((s, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-end p-2 border rounded">
                      <div className="col-span-4">
                        <Label className="text-xs">اليوم</Label>
                        <Select value={String(s.weekday)} onValueChange={v => setSlots(slots.map((x, idx) => idx === i ? { ...x, weekday: Number(v) } : x))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{WEEKDAYS_AR.map((d, idx) => <SelectItem key={idx} value={String(idx)}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3"><Label className="text-xs">يبدأ</Label><Input type="time" value={s.start_time} onChange={e => setSlots(slots.map((x, idx) => idx === i ? { ...x, start_time: e.target.value } : x))} /></div>
                      <div className="col-span-3"><Label className="text-xs">مدة (ساعة)</Label><Input type="number" min="0.5" step="0.5" value={s.hours} onChange={e => setSlots(slots.map((x, idx) => idx === i ? { ...x, hours: Number(e.target.value) || 0 } : x))} /></div>
                      <div className="col-span-2 flex justify-end">
                        <Button type="button" variant="ghost" size="icon" onClick={() => setSlots(slots.filter((_, idx) => idx !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
                {slots.length > 0 && totalHours > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    إجمالي ساعات أسبوعية: {slots.reduce((sum, s) => sum + (s.hours || 0), 0)} — تقريباً {Math.ceil(totalHours / Math.max(1, slots.reduce((sum, s) => sum + (s.hours || 0), 0)))} أسبوع
                  </p>
                )}
              </div>
              <div><Label>ملاحظات</Label><Textarea value={notes} onChange={e => setNotes(e.target.value)} /></div>
              {startDate && instructorId && (totalHours > 0 || endDate) && (
                <p className="text-xs text-muted-foreground p-2 bg-primary/5 rounded">
                  💡 المحاضرات هتتوزع تلقائياً من تاريخ البداية على الأيام المحددة لحد ما نخلص {totalHours > 0 ? `${totalHours} ساعة` : "تاريخ النهاية"}. لو في تعارض في القاعة هيتم تخطي المحاضرة.
                </p>
              )}
              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>إلغاء</Button>
                <Button type="button" onClick={save}>حفظ</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!delRun} onOpenChange={(o) => !o && setDelRun(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف المجموعة؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف "{delRun?.name}" مع كل المحاضرات المتولدة منها.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={doDeleteRun}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!assignRun} onOpenChange={(o) => { if (!o) { setAssignRun(null); setPicked(new Set()); } }}>
        <DialogContent dir="rtl" className="max-w-lg">
          <DialogHeader><DialogTitle>إضافة طلاب لمجموعة "{assignRun?.name}"</DialogTitle></DialogHeader>
          {waitlistStudents.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">مفيش طلاب في قائمة الانتظار.</p>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{picked.size} / {waitlistStudents.length} محدد</span>
                <Button size="sm" variant="outline" onClick={() => setPicked(new Set(waitlistStudents.map(s => s.id)))}>تحديد الكل</Button>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1 border rounded p-2">
                {waitlistStudents.map(s => (
                  <label key={s.id} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer text-sm">
                    <Checkbox checked={picked.has(s.id)} onCheckedChange={() => togglePick(s.id)} />
                    <span className="flex-1">{s.full_name}</span>
                    <span className="text-xs text-muted-foreground">{s.academic_year}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setAssignRun(null); setPicked(new Set()); }}>إلغاء</Button>
            <Button onClick={assignToRun} disabled={picked.size === 0}>نقل للمجموعة ({picked.size})</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
