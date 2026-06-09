import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useMemo } from "react";
import { useInstructors, useCourseInstructors, type Instructor } from "@/lib/data";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Sparkles, BookOpen, Code, Palette, Music, FlaskConical, Calculator, Globe, Dumbbell, Heart, Zap, Users, Check } from "lucide-react";

import { logAction } from "@/lib/audit";

export const Route = createFileRoute("/instructors")({ component: InstructorsPage });

/* ── Specialty color/icon mapping ── */
const SPECIALTY_PALETTE = [
  { gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", glow: "rgba(99,102,241,.45)" },
  { gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)", glow: "rgba(20,184,166,.45)" },
  { gradient: "linear-gradient(135deg, #f43f5e, #ec4899)", glow: "rgba(244,63,94,.45)" },
  { gradient: "linear-gradient(135deg, #f59e0b, #f97316)", glow: "rgba(245,158,11,.45)" },
  { gradient: "linear-gradient(135deg, #3b82f6, #6366f1)", glow: "rgba(59,130,246,.45)" },
  { gradient: "linear-gradient(135deg, #10b981, #34d399)", glow: "rgba(16,185,129,.45)" },
  { gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)", glow: "rgba(139,92,246,.45)" },
  { gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)", glow: "rgba(6,182,212,.45)" },
  { gradient: "linear-gradient(135deg, #ef4444, #f97316)", glow: "rgba(239,68,68,.45)" },
  { gradient: "linear-gradient(135deg, #a855f7, #6366f1)", glow: "rgba(168,85,247,.45)" },
  { gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)", glow: "rgba(14,165,233,.45)" },
];

function getSpecialtyIcon(_specialty: string) {
  return Sparkles; // Unified default icon as requested
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) | 0; }
  return Math.abs(h);
}

function getSpecialtyStyle(specialty: string) {
  const idx = hashString(specialty) % SPECIALTY_PALETTE.length;
  const palette = SPECIALTY_PALETTE[idx];
  return { ...palette, icon: getSpecialtyIcon(specialty) };
}

/* ── Specialty Badge Component ── */
function SpecialtyBadge({ specialty }: { specialty: string }) {
  const style = getSpecialtyStyle(specialty);
  const Icon = style.icon;
  return (
    <span
      className="specialty-badge"
      style={{ "--badge-bg": style.gradient, "--badge-glow": style.glow } as React.CSSProperties}
    >
      <Icon className="h-3.5 w-3.5" style={{ flexShrink: 0 }} />
      {specialty}
    </span>
  );
}

/* ── Specialty Card Selector ── */
function SpecialtyCardSelector({ value, onChange, suggestions }: { value: string; onChange: (v: string) => void; suggestions: string[]; }) {
  const [custom, setCustom] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const selectedList = useMemo(() => value ? value.split(",").map(s => s.trim()).filter(Boolean) : [], [value]);
  
  const toggleSpecialty = (s: string) => {
    const newList = selectedList.includes(s) ? selectedList.filter(item => item !== s) : [...selectedList, s];
    onChange(newList.join(", "));
  };

  const displaySpecialties = useMemo(() => [...new Set([...suggestions, ...selectedList])].sort(), [suggestions, selectedList]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">تخصصات المحاضر (يمكن اختيار أكثر من واحد)</Label>
        <Button type="button" variant="ghost" size="sm" className="text-xs text-primary" onClick={() => setIsAddingCustom(!isAddingCustom)}>
          {isAddingCustom ? "إلغاء" : "+ تخصص جديد"}
        </Button>
      </div>

      {isAddingCustom && (
        <div className="flex gap-2 animate-fadeInUp">
          <Input value={custom} onChange={e => setCustom(e.target.value)} className="bg-muted/30" autoFocus />
          <Button type="button" onClick={() => { if (custom.trim()) toggleSpecialty(custom.trim()); setCustom(""); setIsAddingCustom(false); }}>إضافة</Button>
        </div>
      )}

      <div className="specialty-selector-grid">
        {displaySpecialties.map(s => {
          const style = getSpecialtyStyle(s);
          const Icon = style.icon;
          const isActive = selectedList.includes(s);
          return (
            <div key={s} className={`specialty-selection-card ${isActive ? 'active' : ''}`} onClick={() => toggleSpecialty(s)}>
              <div className="icon-wrapper" style={{ "--badge-bg": style.gradient } as any}>
                {isActive ? <Check className="h-5 w-5 animate-in zoom-in-50" /> : <Icon className="h-5 w-5" />}
              </div>
              <span className="text-xs font-bold truncate w-full px-1">{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main page ── */
function InstructorsPage() {
  const qc = useQueryClient();
  const { data: instructors = [] } = useInstructors();
  const { data: ci = [] } = useCourseInstructors();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Instructor | null>(null);
  const [form, setForm] = useState({ full_name: "", specialty: "", phone: "", is_active: true, notes: "" });
  const [del, setDel] = useState<Instructor | null>(null);
  const [filter, setFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = instructors.filter(i => {
    const matchesStatus = filter === "all" ? true : filter === "active" ? i.is_active : !i.is_active;
    const specialtyList = i.specialty ? i.specialty.split(",").map(s => s.trim()) : [];
    const matchesSpecialty = specialtyFilter === "all" || specialtyList.includes(specialtyFilter);
    const matchesSearch = i.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || i.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSpecialty && matchesSearch;
  });

  const uniqueSpecialties = useMemo(() => [...new Set(instructors.flatMap(i => i.specialty ? i.specialty.split(",").map(s => s.trim()) : []))].filter(Boolean).sort(), [instructors]);

  const openAdd = () => { setEditing(null); setForm({ full_name: "", specialty: "", phone: "", is_active: true, notes: "" }); setOpen(true); };
  const openEdit = (i: Instructor) => { setEditing(i); setForm({ full_name: i.full_name, specialty: i.specialty, phone: i.phone, is_active: i.is_active, notes: i.notes || "" }); setOpen(true); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.specialty) { toast.error("يرجى اختيار تخصص واحد على الأقل"); return; }
    const payload = { ...form, notes: form.notes || null };
    const { data, error } = editing
      ? await supabase.from("instructors").update(payload).eq("id", editing.id).select().single()
      : await supabase.from("instructors").insert(payload).select().single();
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "تم تحديث بيانات المحاضر" : "تم إضافة محاضر جديد");
    logAction({ action_type: editing ? "UPDATE" : "CREATE", entity_type: "instructor", entity_id: editing ? editing.id : (data as any)?.id, old_values: editing || null, new_values: payload });
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["instructors"] });
  };

  const toggleActive = async (i: Instructor) => {
    const { error } = await supabase.from("instructors").update({ is_active: !i.is_active }).eq("id", i.id);
    if (error) toast.error(error.message); 
    else { 
      toast.success("تم تحديث حالة المحاضر"); 
      logAction({ action_type: "UPDATE", entity_type: "instructor", entity_id: i.id, old_values: { is_active: i.is_active }, new_values: { is_active: !i.is_active } });
      qc.invalidateQueries({ queryKey: ["instructors"] }); 
    }
  };

  const doDelete = async () => {
    if (!del) return;
    const { error } = await supabase.from("instructors").delete().eq("id", del.id);
    if (error) toast.error(error.message); 
    else { toast.success("تم الحذف بنجاح"); logAction({ action_type: "DELETE", entity_type: "instructor", entity_id: del.id, old_values: del }); }
    setDel(null); qc.invalidateQueries({ queryKey: ["instructors"] });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">إدارة المحاضرين</h1>
            <p className="text-muted-foreground mt-1 text-right">تنظيم وتعديل بيانات الطاقم التعليمي بالمركز</p>
          </div>
          <Button onClick={openAdd} className="shadow-md hover:shadow-lg transition-all"><Plus className="ml-2 h-4 w-4" /> إضافة محاضر جديد</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-muted/30 p-4 rounded-xl border border-border/50">
          <Input placeholder="بحث بالاسم أو التخصص..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 min-w-[200px] bg-background shadow-sm" />
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-48 bg-background shadow-sm"><SelectValue placeholder="تصفية بالتخصص" /></SelectTrigger>
            <SelectContent><SelectItem value="all">كل التخصصات</SelectItem>{uniqueSpecialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-background shadow-sm"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">كل الحالات</SelectItem><SelectItem value="active">نشط</SelectItem><SelectItem value="inactive">غير نشط</SelectItem></SelectContent>
          </Select>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-muted rounded-full p-4 mb-4"><Users className="h-8 w-8 text-muted-foreground" /></div>
                <p className="text-xl font-semibold">لا يوجد محاضرين</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="text-right py-4 font-bold">المحاضر</TableHead>
                      <TableHead className="text-right py-4 font-bold">التخصصات</TableHead>
                      <TableHead className="text-right py-4 font-bold">رقم التواصل</TableHead>
                      <TableHead className="text-right py-4 font-bold">الحالة</TableHead>
                      <TableHead className="text-center py-4 font-bold">الكورسات</TableHead>
                      <TableHead className="text-left py-4 font-bold">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((i, idx) => (
                      <TableRow key={i.id} className="instructor-row group border-border/40" style={{ animationDelay: `${idx * 60}ms` }}>
                        <TableCell className="font-semibold py-4">{i.full_name}</TableCell>
                        <TableCell className="py-4"><div className="flex flex-wrap gap-1.5 max-w-[250px]">{i.specialty ? i.specialty.split(",").map(s => <SpecialtyBadge key={s.trim()} specialty={s.trim()} />) : "-"}</div></TableCell>
                        <TableCell dir="ltr" className="py-4 text-muted-foreground group-hover:text-foreground transition-colors">{i.phone}</TableCell>
                        <TableCell className="py-4"><div className="flex items-center gap-3"><Switch checked={i.is_active} onCheckedChange={() => toggleActive(i)} /><Badge variant="outline" className={i.is_active ? "border-emerald-500/50 text-emerald-600 bg-emerald-50" : "border-slate-300 text-slate-500 bg-slate-50"}>{i.is_active ? "نشط" : "غير نشط"}</Badge></div></TableCell>
                        <TableCell className="py-4 text-center"><span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs">{ci.filter(x => x.instructor_id === i.id).length}</span></TableCell>
                        <TableCell className="py-4">
                          <div className="flex gap-2 justify-start opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => openEdit(i)}><Pencil className="h-3.5 w-3.5" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => setDel(i)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="sm:max-w-[600px] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader><DialogTitle className="text-2xl font-bold flex items-center gap-2">{editing ? <Pencil className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}{editing ? "تعديل بيانات المحاضر" : "إضافة محاضر جديد"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-6 pt-4">
            <div className="space-y-2"><Label className="text-sm font-semibold">الاسم الكامل</Label><Input required value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="bg-muted/30" /></div>
            <SpecialtyCardSelector value={form.specialty} onChange={v => setForm({ ...form, specialty: v })} suggestions={uniqueSpecialties} />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-sm font-semibold">رقم التليفون</Label><Input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} dir="ltr" className="bg-muted/30" /></div>
              <div className="space-y-2"><Label className="text-sm font-semibold block mb-2">الحالة</Label><div className="flex items-center gap-3 h-10 px-3 rounded-md bg-muted/30 border border-transparent"><Switch checked={form.is_active} onCheckedChange={v => setForm({...form, is_active: v})} /><span className="text-sm font-medium">{form.is_active ? "نشط" : "غير نشط"}</span></div></div>
            </div>
            <div className="space-y-2"><Label className="text-sm font-semibold">ملاحظات إضافية</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="bg-muted/30 min-h-[100px]" /></div>
            <DialogFooter className="gap-3 pt-4"><Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">إلغاء</Button><Button type="submit" className="flex-1 shadow-md">حفظ البيانات</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader><AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle><AlertDialogDescription>سيتم حذف "{del?.full_name}" نهائياً من سجلات المركز.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>إلغاء</AlertDialogCancel><AlertDialogAction onClick={doDelete}>حذف</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
