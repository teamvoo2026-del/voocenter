import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useMemo } from "react";
import { useCourses, useInstructors, useLectures, useCourseInstructors, type Lecture } from "@/lib/data";
import { LOCATIONS, LOCATION_COLORS, formatArabicDate } from "@/lib/constants";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ChevronRight, ChevronLeft, Clock, MapPin, User } from "lucide-react";

export const Route = createFileRoute("/schedule")({ component: SchedulePage });

const empty = { course_id: "", instructor_id: "", date: new Date().toISOString().slice(0,10), start_time: "10:00", end_time: "12:00", location: "A" as const, notes: "" };

function SchedulePage() {
  const qc = useQueryClient();
  const { data: lectures = [] } = useLectures();
  const { data: courses = [] } = useCourses();
  const { data: instructors = [] } = useInstructors();
  const { data: ci = [] } = useCourseInstructors();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lecture | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [del, setDel] = useState<Lecture | null>(null);
  const [dayOpen, setDayOpen] = useState<string | null>(null);

  const [fFrom, setFFrom] = useState("");
  const [fTo, setFTo] = useState("");
  const [fLoc, setFLoc] = useState("all");
  const [fCourse, setFCourse] = useState("all");
  const [fInstr, setFInstr] = useState("all");
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));

  const filtered = lectures.filter(l => {
    if (fFrom && l.date < fFrom) return false;
    if (fTo && l.date > fTo) return false;
    if (fLoc !== "all" && l.location !== fLoc) return false;
    if (fCourse !== "all" && l.course_id !== fCourse) return false;
    if (fInstr !== "all" && l.instructor_id !== fInstr) return false;
    return true;
  });

  const availableInstructors = useMemo(() => {
    if (!form.course_id) return [];
    const ids = ci.filter(x => x.course_id === form.course_id).map(x => x.instructor_id);
    return instructors.filter(i => ids.includes(i.id));
  }, [form.course_id, ci, instructors]);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (l: Lecture) => { setEditing(l); setForm({ course_id: l.course_id, instructor_id: l.instructor_id, date: l.date, start_time: l.start_time.slice(0,5), end_time: l.end_time.slice(0,5), location: l.location, notes: l.notes || "" }); setOpen(true); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.start_time >= form.end_time) { toast.error("وقت النهاية يجب أن يكون بعد وقت البداية"); return; }
    // Conflict check: same date + same location + overlapping time
    const conflict = lectures.find(l =>
      l.id !== editing?.id &&
      l.date === form.date &&
      l.location === form.location &&
      form.start_time < l.end_time.slice(0,5) &&
      form.end_time > l.start_time.slice(0,5)
    );
    if (conflict) {
      const cName = courses.find(c => c.id === conflict.course_id)?.name ?? "محاضرة أخرى";
      toast.error(`تعارض في الحجز: قاعة ${conflict.location} محجوزة لـ "${cName}" من ${conflict.start_time.slice(0,5)} إلى ${conflict.end_time.slice(0,5)}`);
      return;
    }
    const payload = { ...form, notes: form.notes || null };
    const { error } = editing
      ? await supabase.from("lectures").update(payload).eq("id", editing.id)
      : await supabase.from("lectures").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "تم التحديث" : "تم الإضافة");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["lectures"] });
  };

  const doDelete = async () => {
    if (!del) return;
    const { error } = await supabase.from("lectures").delete().eq("id", del.id);
    if (error) toast.error(error.message); else toast.success("تم الحذف");
    setDel(null);
    qc.invalidateQueries({ queryKey: ["lectures"] });
  };

  // Calendar
  const [y, m] = month.split("-").map(Number);
  const firstDay = new Date(y, m - 1, 1);
  const daysInMonth = new Date(y, m, 0).getDate();
  const startWeekday = firstDay.getDay();
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const lecturesByDay = (d: number) => filtered.filter(l => l.date === `${month}-${String(d).padStart(2,"0")}`);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">جدول المحاضرات</h1>
          <Button onClick={openAdd}><Plus className="ml-2 h-4 w-4" /> إضافة محاضرة</Button>
        </div>

        <Card>
          <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">
            <div><Label className="text-xs">من</Label><Input type="date" value={fFrom} onChange={e => setFFrom(e.target.value)} /></div>
            <div><Label className="text-xs">إلى</Label><Input type="date" value={fTo} onChange={e => setFTo(e.target.value)} /></div>
            <div><Label className="text-xs">القاعة</Label>
              <Select value={fLoc} onValueChange={setFLoc}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">الكل</SelectItem>{LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">الكورس</Label>
              <Select value={fCourse} onValueChange={setFCourse}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">الكل</SelectItem>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">المحاضر</Label>
              <Select value={fInstr} onValueChange={setFInstr}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">الكل</SelectItem>{instructors.map(i => <SelectItem key={i.id} value={i.id}>{i.full_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4 gap-2">
              <Button variant="outline" size="icon" onClick={() => { const nd = new Date(y, m - 2, 1); setMonth(`${nd.getFullYear()}-${String(nd.getMonth()+1).padStart(2,"0")}`); }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="text-lg font-bold">
                {firstDay.toLocaleDateString("ar-EG", { month: "long", year: "numeric" })}
              </div>
              <Button variant="outline" size="icon" onClick={() => { const nd = new Date(y, m, 1); setMonth(`${nd.getFullYear()}-${String(nd.getMonth()+1).padStart(2,"0")}`); }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
              {["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"].map(d => <div key={d} className="p-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((d, i) => {
                if (!d) return <div key={i} className="min-h-28" />;
                const dateStr = `${month}-${String(d).padStart(2,"0")}`;
                const dayLectures = lecturesByDay(d);
                const isToday = dateStr === new Date().toISOString().slice(0,10);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setDayOpen(dateStr)}
                    className={`min-h-28 border rounded p-1.5 text-xs bg-card hover:bg-accent transition text-right ${isToday ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className={`font-bold mb-1 ${isToday ? "text-primary" : ""}`}>{d}</div>
                    <div className="space-y-1">
                      {dayLectures.slice(0, 3).map(l => (
                        <div key={l.id} className={`px-1.5 py-0.5 rounded text-[10px] truncate ${LOCATION_COLORS[l.location]}`}>
                          {l.start_time.slice(0,5)} {courses.find(c => c.id === l.course_id)?.name}
                        </div>
                      ))}
                      {dayLectures.length > 3 && (
                        <div className="text-[10px] text-muted-foreground">+{dayLectures.length - 3} المزيد</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

      </div>

      <Dialog open={!!dayOpen} onOpenChange={(o) => !o && setDayOpen(null)}>
        <DialogContent dir="rtl" className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>محاضرات يوم {dayOpen && formatArabicDate(dayOpen)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {(() => {
              const list = dayOpen ? filtered.filter(l => l.date === dayOpen).sort((a,b) => a.start_time.localeCompare(b.start_time)) : [];
              if (list.length === 0) return <p className="text-center text-muted-foreground py-8">لا توجد محاضرات في هذا اليوم</p>;
              return list.map(l => (
                <Card key={l.id}>
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold">{courses.find(c => c.id === l.course_id)?.name ?? "—"}</div>
                      <Badge className={LOCATION_COLORS[l.location]} variant="outline">
                        <MapPin className="h-3 w-3 ml-1" />قاعة {l.location}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /><span dir="ltr">{l.start_time.slice(0,5)} - {l.end_time.slice(0,5)}</span></span>
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{instructors.find(i => i.id === l.instructor_id)?.full_name ?? "—"}</span>
                    </div>
                    {l.notes && <p className="text-sm text-muted-foreground">{l.notes}</p>}
                    <div className="flex gap-1 pt-1">
                      <Button size="sm" variant="ghost" onClick={() => { setDayOpen(null); openEdit(l); }}><Pencil className="h-3.5 w-3.5 ml-1" />تعديل</Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDayOpen(null); setDel(l); }}><Trash2 className="h-3.5 w-3.5 ml-1 text-destructive" />حذف</Button>
                    </div>
                  </CardContent>
                </Card>
              ));
            })()}
          </div>
        </DialogContent>
      </Dialog>



      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl">
          <DialogHeader><DialogTitle>{editing ? "تعديل محاضرة" : "إضافة محاضرة"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div><Label>الكورس</Label>
              <Select value={form.course_id} onValueChange={v => setForm({...form, course_id: v, instructor_id: ""})}>
                <SelectTrigger><SelectValue placeholder="اختر كورس" /></SelectTrigger>
                <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>المحاضر</Label>
              <Select value={form.instructor_id} onValueChange={v => setForm({...form, instructor_id: v})} disabled={!form.course_id}>
                <SelectTrigger><SelectValue placeholder={form.course_id ? "اختر محاضر" : "اختر الكورس أولاً"} /></SelectTrigger>
                <SelectContent>
                  {availableInstructors.length === 0 ? <div className="p-2 text-xs text-muted-foreground">لا يوجد محاضرين لهذا الكورس</div> : availableInstructors.map(i => <SelectItem key={i.id} value={i.id}>{i.full_name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>التاريخ</Label><Input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div><Label>وقت البداية</Label><Input type="time" required value={form.start_time} onChange={e => setForm({...form, start_time: e.target.value})} /></div>
              <div><Label>وقت النهاية</Label><Input type="time" required value={form.end_time} onChange={e => setForm({...form, end_time: e.target.value})} /></div>
            </div>
            <div><Label>المكان</Label>
              <Select value={form.location} onValueChange={v => setForm({...form, location: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{LOCATIONS.map(l => <SelectItem key={l} value={l}>قاعة {l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>ملاحظات</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
              <Button type="submit" disabled={!form.course_id || !form.instructor_id}>حفظ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف المحاضرة وكل سجلات الحضور المرتبطة بها.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
