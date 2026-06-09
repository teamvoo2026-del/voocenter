import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useMemo } from "react";
import { useStudents, useCourses, useCourseStudents, usePayments, type Payment } from "@/lib/data";
import { PAYMENT_METHODS } from "@/lib/constants";
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
import { Plus, Pencil, Trash2, Search, Wallet, CreditCard, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

import { logAction } from "@/lib/audit";

export const Route = createFileRoute("/payments")({ component: PaymentsPage });

const emptyPayment = {
  student_id: "",
  course_id: "",
  amount: "",
  payment_method: "كاش" as any,
  payment_date: new Date().toISOString().slice(0,10),
  notes: ""
};

function PaymentsPage() {
  const qc = useQueryClient();
  const { data: students = [] } = useStudents();
  const { data: courses = [] } = useCourses();
  const { data: courseStudents = [] } = useCourseStudents();
  const { data: payments = [] } = usePayments();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Payment | null>(null);
  const [form, setForm] = useState<any>(emptyPayment);
  const [del, setDel] = useState<Payment | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [fCourse, setFCourse] = useState("all");
  const [fMethod, setFMethod] = useState("all");

  const filteredPayments = payments.filter(p => {
    const sName = p.students?.full_name?.toLowerCase() || "";
    if (search && !sName.includes(search.toLowerCase())) return false;
    if (fCourse !== "all" && p.course_id !== fCourse) return false;
    if (fMethod !== "all" && p.payment_method !== fMethod) return false;
    return true;
  });

  // Calculate Metrics
  const metrics = useMemo(() => {
    let totalRevenue = 0;
    let expectedRevenue = 0;
    const paidByCourses: Record<string, number> = {};

    payments.forEach(p => {
      totalRevenue += Number(p.amount);
      paidByCourses[p.course_id] = (paidByCourses[p.course_id] || 0) + Number(p.amount);
    });

    courseStudents.forEach(cs => {
      const c = courses.find(x => x.id === cs.course_id);
      if (c) {
        const price = cs.agreed_price !== undefined ? cs.agreed_price : c.price;
        expectedRevenue += Math.max(0, price - (Number(cs.discount) || 0));
      }
    });

    const outstanding = Math.max(0, expectedRevenue - totalRevenue);
    const uniqueStudents = new Set(payments.map(p => p.student_id)).size;

    // Build chart data
    const topCourses = courses.map(c => ({
      name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
      revenue: paidByCourses[c.id] || 0
    })).filter(c => c.revenue > 0)
       .sort((a,b) => b.revenue - a.revenue)
       .slice(0, 10);

    return { totalRevenue, outstanding, uniqueStudents, topCourses };
  }, [payments, courseStudents, courses]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyPayment);
    setOpen(true);
  };

  const openEdit = (p: Payment) => {
    setEditing(p);
    setForm({
      student_id: p.student_id,
      course_id: p.course_id,
      amount: String(p.amount),
      payment_method: p.payment_method,
      payment_date: p.payment_date,
      notes: p.notes || ""
    });
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_id || !form.course_id || !form.amount) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    const payload = {
      ...form,
      amount: Number(form.amount),
      notes: form.notes || null,
    };
    
    if (editing) {
      // It's usually unsafe to change course or student on an existing payment invoice, but we allow it
      const { error } = await supabase.from("payments" as any).update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("تم التحديث بنجاح");
      logAction({ action_type: "UPDATE", entity_type: "payment", entity_id: editing.id, old_values: editing, new_values: payload });
    } else {
      const { data, error } = await supabase.from("payments" as any).insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      toast.success("تم تسجيل الدفعة بنجاح");
      logAction({ action_type: "CREATE", entity_type: "payment", entity_id: (data as any)?.id, new_values: payload });
    }
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["payments"] });
    qc.invalidateQueries({ queryKey: ["course_students"] }); // The trigger updates this implicitly
  };

  const doDelete = async () => {
    if (!del) return;
    const { error } = await supabase.from("payments" as any).delete().eq("id", del.id);
    if (error) toast.error(error.message); 
    else {
      toast.success("تم حذف الدفعة");
      logAction({ action_type: "DELETE", entity_type: "payment", entity_id: del.id, old_values: del });
    }
    setDel(null);
    qc.invalidateQueries({ queryKey: ["payments"] });
    qc.invalidateQueries({ queryKey: ["course_students"] });
  };

  const availableCoursesForStudent = form.student_id 
    ? courseStudents.filter(cs => cs.student_id === form.student_id).map(cs => {
        const c = courses.find(x => x.id === cs.course_id);
        const price = cs.agreed_price !== undefined ? cs.agreed_price : (c?.price ?? 0);
        const due = Math.max(0, price - (Number(cs.discount) || 0));
        const rem = Math.max(0, due - (Number(cs.paid_amount) || 0));
        return { ...c, remaining_due: rem };
      }).filter(c => c.id)
    : [];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">إدارة المدفوعات</h1>
            <p className="text-muted-foreground mt-1">تتبع الدفعات والإيرادات والمبالغ المستحقة</p>
          </div>
          <Button onClick={openAdd}><Plus className="ml-2 h-4 w-4" /> تسجيل دفعة مالية</Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الإيرادات المحصلة</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{metrics.totalRevenue.toLocaleString("ar-EG")} ج.م</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Wallet className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المبالغ المستحقة (غير محصلة)</p>
                <h3 className="text-2xl font-bold text-destructive mt-1">{metrics.outstanding.toLocaleString("ar-EG")} ج.م</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-destructive">
                <CreditCard className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">طلاب قاموا بالدفع</p>
                <h3 className="text-2xl font-bold text-blue-600 mt-1">{metrics.uniqueStudents}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3"><CardTitle className="text-base">سجل المدفوعات</CardTitle></CardHeader>
            <div className="px-6 pb-3 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث باسم الطالب..." value={search} onChange={e => setSearch(e.target.value)} className="pr-8" />
              </div>
              <Select value={fCourse} onValueChange={setFCourse}>
                <SelectTrigger className="w-1/3"><SelectValue placeholder="الكورس" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الكورسات</SelectItem>
                  {courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={fMethod} onValueChange={setFMethod}>
                <SelectTrigger className="w-1/4"><SelectValue placeholder="طريقة الدفع" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  {PAYMENT_METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <CardContent className="p-0">
              {filteredPayments.length === 0 ? (
                <p className="text-center text-muted-foreground py-12 border-t">لا يوجد مدفوعات مسجلة</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">تاريخ</TableHead>
                      <TableHead className="text-right">الطالب</TableHead>
                      <TableHead className="text-right">الكورس</TableHead>
                      <TableHead className="text-right">الدفعة</TableHead>
                      <TableHead className="text-right">الطريقة</TableHead>
                      <TableHead className="text-right">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map(p => (
                      <TableRow key={p.id}>
                        <TableCell className="text-sm">{new Date(p.payment_date).toLocaleDateString("ar-EG")}</TableCell>
                        <TableCell className="font-medium text-sm">{p.students?.full_name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{p.courses?.name}</TableCell>
                        <TableCell className="font-bold text-emerald-600">{Number(p.amount).toLocaleString("ar-EG")} ج.م</TableCell>
                        <TableCell><Badge variant="outline">{p.payment_method}</Badge></TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" onClick={() => setDel(p)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">إيرادات الكورسات</CardTitle></CardHeader>
            <CardContent>
              {metrics.topCourses.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا يوجد بيانات لعرضها</p>
              ) : (
                <div className="space-y-4">
                  {metrics.topCourses.map((c, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="font-bold text-emerald-600">{c.revenue.toLocaleString('ar-EG')} ج.م</div>
                    </div>
                  ))}
                  <div className="pt-4 mt-2 border-t">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={metrics.topCourses}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="إيرادات (ج.م)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader><DialogTitle>{editing ? "تعديل الدفعة" : "تسجيل دفعة مالية جديدة"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4 pt-4">
            <div>
              <Label>الطالب</Label>
              <Select value={form.student_id} onValueChange={v => setForm({...form, student_id: v, course_id: ""})} disabled={!!editing}>
                <SelectTrigger><SelectValue placeholder="اختر طالب أولاً" /></SelectTrigger>
                <SelectContent>
                  {students.map(s => <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>الكورس</Label>
              <Select value={form.course_id} onValueChange={v => setForm({...form, course_id: v})} disabled={!form.student_id || !!editing}>
                <SelectTrigger><SelectValue placeholder={form.student_id ? "اختر الكورس" : "اختر طالب لعرض كورساته"} /></SelectTrigger>
                <SelectContent>
                  {availableCoursesForStudent.map(c => (
                    <SelectItem key={c?.id!} value={c?.id!}>{c?.name} (متبقي: {c?.remaining_due?.toLocaleString("ar-EG")} ج.م)</SelectItem>
                  ))}
                  {/* include current course in list if editing previously un-enrolled course */}
                  {editing && !availableCoursesForStudent.some(x => x?.id === form.course_id) && courses.find(c => c.id === form.course_id) && (
                     <SelectItem value={form.course_id}>{courses.find(c => c.id === form.course_id)?.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>المبلغ الدفوع (ج.م)</Label>
                <Input type="number" required min="1" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
              </div>
              <div>
                <Label>التاريخ</Label>
                <Input type="date" required value={form.payment_date} onChange={e => setForm({...form, payment_date: e.target.value})} />
              </div>
            </div>

            <div>
              <Label>طريقة الدفع</Label>
              <Select value={form.payment_method} onValueChange={v => setForm({...form, payment_method: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div><Label>ملاحظات (اختياري)</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>

            <DialogFooter className="pt-2 gap-2">
               <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
               <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف سجل الدفع؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف هذه الدفعة نهائياً. سيؤدي هذا لتحديث حساب الطالب المتبقي تلقائياً.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete} className="bg-destructive hover:bg-destructive/90">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
