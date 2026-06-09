import { Link, createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { useStudents, useCourses, useCourseStudents, STUDENT_STATUSES, type Student, type StudentStatus } from "@/lib/data";
import { ACADEMIC_YEARS, STAGES, GENDERS, PAYMENT_STATUSES, deriveStage, calcAge, type AcademicYear } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Wallet, BookPlus, CreditCard } from "lucide-react";

import { logAction } from "@/lib/audit";

export const Route = createFileRoute("/students")({ component: StudentsPage });

const emptyStudent = {
  full_name: "", birth_date: "", gender: "ذكر" as const,
  academic_year: ACADEMIC_YEARS[0] as AcademicYear, parent_phone: "", student_phone: "",
  enrollment_date: new Date().toISOString().slice(0,10),
  payment_status: "غير مدفوع" as const, notes: "",
  status: "active" as StudentStatus, marketing_source: "",
};

type EnrollRow = { course_id: string; discount: string; paid_amount: string; payment_method: string; agreed_price?: number; };

function StudentsPage() {
  const qc = useQueryClient();
  const { data: students = [] } = useStudents();
  const { data: courses = [] } = useCourses();
  const { data: cs = [] } = useCourseStudents();
  

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<any>(emptyStudent);
  const [enrollRows, setEnrollRows] = useState<EnrollRow[]>([]);
  const [del, setDel] = useState<Student | null>(null);
  const [finance, setFinance] = useState<Student | null>(null);
  const [quickEnroll, setQuickEnroll] = useState<Student | null>(null);


  // filters
  const [search, setSearch] = useState("");
  const [fStage, setFStage] = useState<string>("all");
  const [fYear, setFYear] = useState<string>("all");
  const [fGender, setFGender] = useState<string>("all");
  const [fPay, setFPay] = useState<string>("all");
  const [fCourse, setFCourse] = useState<string>("all");
  const [fStatus, setFStatus] = useState<string>("all");

  const filtered = students.filter(s => {
    if (search && !s.full_name.includes(search) && !(s.student_code || "").toLowerCase().includes(search.toLowerCase())) return false;
    if (fStage !== "all" && s.stage !== fStage) return false;
    if (fYear !== "all" && s.academic_year !== fYear) return false;
    if (fGender !== "all" && s.gender !== fGender) return false;
    if (fPay !== "all" && s.payment_status !== fPay) return false;
    if (fStatus !== "all" && (s.status || "active") !== fStatus) return false;
    if (fCourse !== "all") {
      const enrolled = cs.filter(x => x.course_id === fCourse).map(x => x.student_id);
      if (!enrolled.includes(s.id)) return false;
    }
    return true;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyStudent);
    setEnrollRows([{ course_id: "", discount: "0", paid_amount: "0", payment_method: "كاش" }]);
    setOpen(true);
  };
  const openEdit = (s: Student) => {
    setEditing(s);
    setForm({ full_name: s.full_name, birth_date: s.birth_date, gender: s.gender, academic_year: s.academic_year, parent_phone: s.parent_phone, student_phone: s.student_phone || "", enrollment_date: s.enrollment_date, payment_status: s.payment_status, notes: s.notes || "", status: s.status || "active", marketing_source: s.marketing_source || "" });
    setEnrollRows([]);
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validEnrolls = enrollRows.filter(r => r.course_id);
    if (!editing && validEnrolls.length === 0) {
      toast.error("لازم تختار كورس واحد على الأقل للطالب");
      return;
    }
    const courseIds = validEnrolls.map(r => r.course_id);
    if (new Set(courseIds).size !== courseIds.length) {
      toast.error("لا يمكن تكرار نفس الكورس");
      return;
    }
    const payload: any = { ...form, student_phone: form.student_phone || null, notes: form.notes || null, stage: deriveStage(form.academic_year) };
    let studentId = editing?.id;
    if (editing) {
      const { error } = await supabase.from("students").update(payload).eq("id", editing.id);
      if (error) { toast.error("خطأ: " + error.message); return; }
      logAction({ action_type: "UPDATE", entity_type: "student", entity_id: editing.id, old_values: editing, new_values: payload });
    } else {
      const { data, error } = await supabase.from("students").insert(payload).select("id").single();
      if (error || !data) { toast.error("خطأ: " + (error?.message || "")); return; }
      studentId = data.id;
      logAction({ action_type: "CREATE", entity_type: "student", entity_id: studentId, new_values: payload });
    }
    if (validEnrolls.length > 0 && studentId) {
      const rows = validEnrolls.map(r => ({
        student_id: studentId!,
        course_id: r.course_id,
        run_id: null,
        discount: Number(r.discount) || 0,
        paid_amount: 0, // Will be updated by payments trigger
      }));
      const { error: enrErr } = await supabase.from("course_students").insert(rows as any);
      if (enrErr) { 
        toast.error("تم حفظ الطالب لكن فشل التسجيل في الكورس: " + enrErr.message); 
      } else {
        logAction({ action_type: "CREATE", entity_type: "enrollment", entity_id: studentId, new_values: rows });
        
        // Record payments
        for (const r of validEnrolls) {
          const amount = Number(r.paid_amount) || 0;
          if (amount > 0) {
            const { error: payErr } = await supabase.from("payments").insert({
              student_id: studentId!,
              course_id: r.course_id,
              amount,
              payment_method: r.payment_method as any,
              payment_date: payload.enrollment_date,
              notes: "دفعة أولى عند التسجيل"
            });
            if (payErr) {
              toast.error("فشل تسجيل الدفعة المالية: " + payErr.message);
            } else {
              logAction({ action_type: "CREATE", entity_type: "payment", entity_id: studentId, new_values: { amount, course_id: r.course_id } });
            }
          }
        }
      }
    }
    toast.success(editing ? "تم تحديث الطالب" : "تم إضافة الطالب وتسجيله في الكورسات");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["students"] });
    qc.invalidateQueries({ queryKey: ["course_students"] });
  };


  const doDelete = async () => {
    if (!del) return;
    const { error } = await supabase.from("students").delete().eq("id", del.id);
    if (error) toast.error(error.message); 
    else {
      toast.success("تم حذف الطالب");
      logAction({ action_type: "DELETE", entity_type: "student", entity_id: del.id, old_values: del });
    }
    setDel(null);
    qc.invalidateQueries({ queryKey: ["students"] });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">الطلاب</h1>
          <Button onClick={openAdd}><Plus className="ml-2 h-4 w-4" /> إضافة طالب</Button>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">الفلاتر</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
            <div className="relative">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث بالاسم/الكود" value={search} onChange={e => setSearch(e.target.value)} className="pr-8" />
            </div>
            <Select value={fStatus} onValueChange={setFStatus}>
              <SelectTrigger><SelectValue placeholder="حالة الطالب" /></SelectTrigger>
              <SelectContent><SelectItem value="all">كل الحالات</SelectItem>{STUDENT_STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={fStage} onValueChange={setFStage}>
              <SelectTrigger><SelectValue placeholder="المرحلة" /></SelectTrigger>
              <SelectContent><SelectItem value="all">كل المراحل</SelectItem>{STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={fYear} onValueChange={setFYear}>
              <SelectTrigger><SelectValue placeholder="السنة الدراسية" /></SelectTrigger>
              <SelectContent><SelectItem value="all">كل السنوات</SelectItem>{ACADEMIC_YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={fGender} onValueChange={setFGender}>
              <SelectTrigger><SelectValue placeholder="الجنس" /></SelectTrigger>
              <SelectContent><SelectItem value="all">الكل</SelectItem>{GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={fPay} onValueChange={setFPay}>
              <SelectTrigger><SelectValue placeholder="حالة الدفع" /></SelectTrigger>
              <SelectContent><SelectItem value="all">الكل</SelectItem>{PAYMENT_STATUSES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={fCourse} onValueChange={setFCourse}>
              <SelectTrigger><SelectValue placeholder="الكورس" /></SelectTrigger>
              <SelectContent><SelectItem value="all">كل الكورسات</SelectItem>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">لا يوجد طلاب مسجلين</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الكود</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">السن</TableHead>
                    <TableHead className="text-right">السنة الدراسية</TableHead>
                    <TableHead className="text-right">المرحلة</TableHead>
                    <TableHead className="text-right">رقم ولي الأمر</TableHead>
                    <TableHead className="text-right">حالة الدفع</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => {
                    const st = STUDENT_STATUSES.find(x => x.value === (s.status || "active"));
                    return (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono text-xs">{s.student_code || "—"}</TableCell>
                      <TableCell className="font-medium">{s.full_name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span className={`h-2 w-2 rounded-full ${st?.color}`} />
                          {st?.label}
                        </span>
                      </TableCell>
                      <TableCell>{calcAge(s.birth_date)}</TableCell>
                      <TableCell>{s.academic_year}</TableCell>
                      <TableCell><Badge variant="secondary">{s.stage}</Badge></TableCell>
                      <TableCell dir="ltr">{s.parent_phone}</TableCell>
                      <TableCell>
                        <Badge variant={s.payment_status === "مدفوع" ? "default" : s.payment_status === "غير مدفوع" ? "destructive" : "secondary"}>{s.payment_status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" title="إضافة لكورس" onClick={() => setQuickEnroll(s)}><BookPlus className="h-4 w-4 text-blue-600" /></Button>
                          <Button size="icon" variant="ghost" title="المالية والكورسات" onClick={() => setFinance(s)}><Wallet className="h-4 w-4 text-emerald-600" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => setDel(s)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );})}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader><DialogTitle>{editing ? "تعديل طالب" : "إضافة طالب جديد"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <div><Label>الاسم الكامل</Label><Input required value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
            <div><Label>تاريخ الميلاد</Label><Input type="date" required value={form.birth_date} onChange={e => setForm({...form, birth_date: e.target.value})} /></div>
            <div><Label>الجنس</Label>
              <Select value={form.gender} onValueChange={v => setForm({...form, gender: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>السنة الدراسية</Label>
              <Select value={form.academic_year} onValueChange={v => setForm({...form, academic_year: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{ACADEMIC_YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>المرحلة (تلقائي)</Label><Input value={deriveStage(form.academic_year)} readOnly className="bg-muted" /></div>
            <div><Label>تاريخ التسجيل</Label><Input type="date" required value={form.enrollment_date} onChange={e => setForm({...form, enrollment_date: e.target.value})} /></div>
            <div><Label>رقم ولي الأمر</Label><Input required value={form.parent_phone} onChange={e => setForm({...form, parent_phone: e.target.value})} dir="ltr" /></div>
            <div><Label>رقم الطالب (اختياري)</Label><Input value={form.student_phone} onChange={e => setForm({...form, student_phone: e.target.value})} dir="ltr" /></div>
            <div><Label>حالة الدفع</Label>
              <Select value={form.payment_status} onValueChange={v => setForm({...form, payment_status: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{PAYMENT_STATUSES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>حالة الطالب</Label>
              <Select value={form.status} onValueChange={v => setForm({...form, status: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STUDENT_STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>مصدر التسويق (اختياري)</Label><Input value={form.marketing_source || ""} onChange={e => setForm({...form, marketing_source: e.target.value})} placeholder="فيسبوك، صديق، إعلان..." /></div>
            <div className="col-span-2"><Label>ملاحظات</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>

            {!editing && (
              <div className="col-span-2 space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">الكورسات المسجل فيها <span className="text-destructive">*</span></Label>
                  <Button type="button" size="sm" variant="outline" onClick={() => setEnrollRows([...enrollRows, { course_id: "", discount: "0", paid_amount: "0", payment_method: "كاش" }])}>
                    <Plus className="h-4 w-4 ml-1" /> إضافة كورس
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  💡 الطالب يدخل قائمة انتظار الكورس. توزيع المجموعات يتم لاحقاً من صفحة الكورسات.
                </p>
                {enrollRows.length === 0 && <p className="text-sm text-muted-foreground">لازم تختار كورس واحد على الأقل</p>}
                {enrollRows.map((r, idx) => {
                  const c = courses.find(x => x.id === r.course_id);
                  const originalPrice = c?.price ?? 0;
                  const price = r.agreed_price !== undefined ? r.agreed_price : originalPrice;
                  const remaining = Math.max(0, price - (Number(r.discount) || 0) - (Number(r.paid_amount) || 0));
                  const usedIds = enrollRows.filter((_, i) => i !== idx).map(x => x.course_id);
                  return (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-end p-2 border rounded-md">
                      <div className="col-span-4">
                        <Label className="text-xs">الكورس</Label>
                        <Select value={r.course_id} onValueChange={v => setEnrollRows(rows => rows.map((x, i) => i === idx ? { ...x, course_id: v } : x))}>
                          <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                          <SelectContent>
                            {courses.filter(co => !usedIds.includes(co.id)).map(co => (
                              <SelectItem key={co.id} value={co.id}>{co.name} — {co.price?.toLocaleString("ar-EG")} ج.م</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2"><Label className="text-xs">السعر</Label><Input readOnly value={price.toLocaleString("ar-EG")} className="bg-muted" /></div>
                      <div className="col-span-2"><Label className="text-xs">الخصم</Label><Input type="number" min="0" value={r.discount} onChange={e => setEnrollRows(rows => rows.map((x, i) => i === idx ? { ...x, discount: e.target.value } : x))} /></div>
                      <div className="col-span-1"><Label className="text-xs">المدفوع</Label><Input type="number" min="0" value={r.paid_amount} onChange={e => setEnrollRows(rows => rows.map((x, i) => i === idx ? { ...x, paid_amount: e.target.value } : x))} /></div>
                      <div className="col-span-2">
                        <Label className="text-xs">الطريقة</Label>
                        <Select value={r.payment_method} onValueChange={v => setEnrollRows(rows => rows.map((x, i) => i === idx ? { ...x, payment_method: v } : x))}>
                          <SelectTrigger className="h-8 text-[10px] px-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="كاش">كاش</SelectItem>
                            <SelectItem value="فودافون كاش">فودافون</SelectItem>
                            <SelectItem value="إنستاباي">إنستاباي</SelectItem>
                            <SelectItem value="تحويل بنكي">بنك</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-1 text-xs"><Label className="text-xs">المتبقي</Label><div className={`pt-2 font-medium ${remaining > 0 ? "text-destructive" : "text-emerald-600"}`}>{remaining.toLocaleString("ar-EG")}</div></div>
                      <div className="col-span-1"><Button type="button" size="icon" variant="ghost" onClick={() => setEnrollRows(rows => rows.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4 text-destructive" /></Button></div>
                    </div>
                  );
                })}
              </div>
            )}

            <DialogFooter className="col-span-2 gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف الطالب "{del?.full_name}" نهائياً.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <FinanceDialog student={finance} onClose={() => setFinance(null)} />
      <QuickEnrollDialog student={quickEnroll} onClose={() => setQuickEnroll(null)} />
    </AppLayout>
  );
}

function QuickEnrollDialog({ student, onClose }: { student: Student | null; onClose: () => void }) {
  const qc = useQueryClient();
  const { data: courses = [] } = useCourses();
  const { data: cs = [] } = useCourseStudents();
  const [courseId, setCourseId] = useState("");
  const [discount, setDiscount] = useState("0");
  const [paid, setPaid] = useState("0");
  const [method, setMethod] = useState("كاش");

  const enrolled = student ? cs.filter((x: any) => x.student_id === student.id).map((x: any) => x.course_id) : [];
  const available = courses.filter(c => !enrolled.includes(c.id));
  const selected = courses.find(c => c.id === courseId);
  const isEnrolled = !!cs.find((x: any) => x.student_id === student?.id && x.course_id === selected?.id);
  const existingSub = isEnrolled ? cs.find((x: any) => x.student_id === student?.id && x.course_id === selected?.id) : null;
  const originalPrice = selected?.price ?? 0;
  const price = existingSub?.agreed_price !== undefined ? existingSub.agreed_price : originalPrice;
  const remaining = Math.max(0, price - (Number(discount) || 0) - (Number(paid) || 0));

  const reset = () => { setCourseId(""); setDiscount("0"); setPaid("0"); };

  const save = async () => {
    if (!student || !courseId) { toast.error("اختر كورس"); return; }
    const { error } = await supabase.from("course_students").insert({
      student_id: student.id, course_id: courseId,
      discount: Number(discount) || 0, 
      paid_amount: 0, // Updated by trigger
    } as any);
    if (error) { toast.error(error.message); return; }

    const amount = Number(paid) || 0;
    if (amount > 0) {
      await supabase.from("payments").insert({
        student_id: student.id, course_id: courseId,
        amount, payment_method: method as any,
        payment_date: new Date().toISOString().slice(0,10),
        notes: "دفعة أولى عند التسجيل السريع"
      });
      logAction({ action_type: "CREATE", entity_type: "payment", entity_id: student.id, new_values: { amount, course_id: courseId } });
    }

    toast.success(`تم تسجيل ${student.full_name} في الكورس`);
    logAction({ action_type: "CREATE", entity_type: "enrollment", entity_id: student.id, new_values: { course_id: courseId, paid: amount } });
    qc.invalidateQueries({ queryKey: ["course_students"] });
    qc.invalidateQueries({ queryKey: ["payments"] });
    reset(); onClose();
  };

  return (
    <Dialog open={!!student} onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}>
      <DialogContent dir="rtl">
        <DialogHeader><DialogTitle>إضافة {student?.full_name} لكورس</DialogTitle></DialogHeader>
        {available.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">الطالب مسجل في كل الكورسات المتاحة</p>
        ) : (
          <div className="space-y-3">
            <div>
              <Label>الكورس</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger><SelectValue placeholder="اختر كورس" /></SelectTrigger>
                <SelectContent>
                  {available.map(c => <SelectItem key={c.id} value={c.id}>{c.name} — {c.price?.toLocaleString("ar-EG")} ج.م</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div><Label className="text-xs">السعر</Label><Input readOnly value={price.toLocaleString("ar-EG")} className="bg-muted" /></div>
              <div><Label className="text-xs">الخصم</Label><Input type="number" min="0" value={discount} onChange={e => setDiscount(e.target.value)} /></div>
              <div><Label className="text-xs">المدفوع</Label><Input type="number" min="0" value={paid} onChange={e => setPaid(e.target.value)} /></div>
              <div>
                <Label className="text-xs">الطريقة</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="كاش">كاش</SelectItem>
                    <SelectItem value="فودافون كاش">فودافون</SelectItem>
                    <SelectItem value="إنستاباي">إنستاباي</SelectItem>
                    <SelectItem value="تحويل بنكي">بنك</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm">المتبقي: <span className={remaining > 0 ? "text-destructive font-bold" : "text-emerald-600 font-bold"}>{remaining.toLocaleString("ar-EG")} ج.م</span></div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={save} disabled={!courseId || available.length === 0}>تسجيل</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FinanceDialog({ student, onClose }: { student: Student | null; onClose: () => void }) {
  const qc = useQueryClient();
  const { data: courses = [] } = useCourses();
  const { data: cs = [] } = useCourseStudents();
  const [addCourseId, setAddCourseId] = useState<string>("");
  const [rows, setRows] = useState<Record<string, { discount: string; paid_amount: string }>>({});

  const open = !!student;
  const enrollments = student ? cs.filter((x: any) => x.student_id === student.id) : [];

  const getRow = (cid: string) => {
    if (rows[cid]) return rows[cid];
    const e: any = enrollments.find((x: any) => x.course_id === cid);
    return { discount: String(e?.discount ?? 0), paid_amount: String(e?.paid_amount ?? 0), agreed_price: e?.agreed_price };
  };

  const setRow = (cid: string, patch: Partial<{ discount: string; paid_amount: string }>) => {
    setRows(r => ({ ...r, [cid]: { ...getRow(cid), ...patch } }));
  };

  const save = async (cid: string) => {
    const r = getRow(cid);
    const { error } = await supabase.from("course_students").update({
      discount: Number(r.discount) || 0,
    } as any).eq("student_id", student!.id).eq("course_id", cid);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحفظ");
    qc.invalidateQueries({ queryKey: ["course_students"] });
  };

  const enroll = async () => {
    if (!addCourseId || !student) return;
    const { error } = await supabase.from("course_students").insert({ student_id: student.id, course_id: addCourseId } as any);
    if (error) { toast.error(error.message); return; }
    toast.success("تم التسجيل في الكورس");
    setAddCourseId("");
    qc.invalidateQueries({ queryKey: ["course_students"] });
  };

  const unenroll = async (cid: string) => {
    const { error } = await supabase.from("course_students").delete().eq("student_id", student!.id).eq("course_id", cid);
    if (error) { toast.error(error.message); return; }
    toast.success("تم إلغاء التسجيل");
    qc.invalidateQueries({ queryKey: ["course_students"] });
  };

  const available = courses.filter(c => !enrollments.some((e: any) => e.course_id === c.id));

  const totals = enrollments.reduce((acc, e: any) => {
    const c = courses.find(x => x.id === e.course_id);
    const r = rows[e.course_id];
    const price = e.agreed_price ?? c?.price ?? 0;
    const discount = r ? Number(r.discount) || 0 : e.discount;
    const paid = r ? Number(r.paid_amount) || 0 : e.paid_amount;
    const due = Math.max(0, price - discount);
    acc.total += due;
    acc.paid += paid;
    acc.remaining += Math.max(0, due - paid);
    return acc;
  }, { total: 0, paid: 0, remaining: 0 });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader><DialogTitle>المالية — {student?.full_name}</DialogTitle></DialogHeader>

        <div className="grid grid-cols-3 gap-3 my-4">
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground">إجمالي المستحق</div><div className="text-xl font-bold">{totals.total.toLocaleString("ar-EG")} ج.م</div></CardContent></Card>
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground">المدفوع</div><div className="text-xl font-bold text-emerald-600">{totals.paid.toLocaleString("ar-EG")} ج.م</div></CardContent></Card>
          <Card><CardContent className="pt-4"><div className="text-xs text-muted-foreground">المتبقي</div><div className="text-xl font-bold text-destructive">{totals.remaining.toLocaleString("ar-EG")} ج.م</div></CardContent></Card>
        </div>

        <div className="flex gap-2 items-end mb-3">
          <div className="flex-1">
            <Label>تسجيل في كورس جديد</Label>
            <Select value={addCourseId} onValueChange={setAddCourseId}>
              <SelectTrigger><SelectValue placeholder="اختر كورس" /></SelectTrigger>
              <SelectContent>
                {available.length === 0 ? <div className="px-2 py-1 text-sm text-muted-foreground">لا يوجد كورسات متاحة</div> :
                  available.map(c => <SelectItem key={c.id} value={c.id}>{c.name} — {c.price?.toLocaleString("ar-EG")} ج.م</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={enroll} disabled={!addCourseId}>تسجيل</Button>
        </div>

        {enrollments.length === 0 ? <p className="text-center text-muted-foreground py-8">الطالب غير مسجل في أي كورس</p> : (
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-right">الكورس</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الخصم</TableHead>
              <TableHead className="text-right">المدفوع</TableHead>
              <TableHead className="text-right">المتبقي</TableHead>
              <TableHead className="text-right">إجراءات</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {enrollments.map((e: any) => {
                const c = courses.find(x => x.id === e.course_id);
                const r = getRow(e.course_id);
                const price = e.agreed_price ?? c?.price ?? 0;
                const due = Math.max(0, price - (Number(r.discount) || 0));
                const remaining = Math.max(0, due - (Number(r.paid_amount) || 0));
                return (
                  <TableRow key={e.course_id}>
                    <TableCell className="font-medium">{c?.name || "—"}</TableCell>
                    <TableCell>{price.toLocaleString("ar-EG")}</TableCell>
                    <TableCell><Input type="number" min="0" step="0.01" className="w-24" value={r.discount} onChange={ev => setRow(e.course_id, { discount: ev.target.value })} /></TableCell>
                    <TableCell className="font-bold text-emerald-600">{Number(e.paid_amount || 0).toLocaleString("ar-EG")}</TableCell>
                    <TableCell className={remaining > 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium"}>{remaining.toLocaleString("ar-EG")}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => save(e.course_id)}>حفظ</Button>
                        <Button size="icon" variant="ghost" onClick={() => unenroll(e.course_id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        <DialogFooter className="flex items-center justify-between mt-4 border-t pt-4">
          <Link to="/payments" className="text-sm font-medium text-emerald-600 hover:underline flex items-center gap-1">
            <CreditCard className="h-4 w-4" /> الذهاب لصفحة تسجيل المدفوعات
          </Link>
          <Button variant="outline" onClick={onClose}>إغلاق</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

