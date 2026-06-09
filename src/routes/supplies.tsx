import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, HandHelping, Pencil, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/supplies")({ component: SuppliesPage });

type Supply = { id: string; name: string; total_quantity: number; notes: string | null };
type Loan = {
  id: string; supply_id: string; borrower_name: string; borrower_phone: string | null;
  quantity: number; borrowed_at: string; returned_at: string | null; notes: string | null;
};

function SuppliesPage() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const [supplyDlg, setSupplyDlg] = useState(false);
  const [editing, setEditing] = useState<Supply | null>(null);
  const [sName, setSName] = useState("");
  const [sQty, setSQty] = useState("1");
  const [sNotes, setSNotes] = useState("");

  const [loanDlg, setLoanDlg] = useState(false);
  const [lSupply, setLSupply] = useState("");
  const [lBorrower, setLBorrower] = useState("");
  const [lPhone, setLPhone] = useState("");
  const [lQty, setLQty] = useState("1");
  const [lNotes, setLNotes] = useState("");

  const load = async () => {
    setLoading(true);
    const [s, l] = await Promise.all([
      supabase.from("supplies").select("*").order("name"),
      supabase.from("supply_loans").select("*").order("borrowed_at", { ascending: false }),
    ]);
    if (s.error) toast.error(s.error.message); else setSupplies(s.data as Supply[]);
    if (l.error) toast.error(l.error.message); else setLoans(l.data as Loan[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const availability = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of supplies) map.set(s.id, s.total_quantity);
    for (const l of loans) {
      if (!l.returned_at) map.set(l.supply_id, (map.get(l.supply_id) ?? 0) - l.quantity);
    }
    return map;
  }, [supplies, loans]);

  const activeLoans = loans.filter(l => !l.returned_at);
  const history = loans.filter(l => l.returned_at);
  const supplyName = (id: string) => supplies.find(s => s.id === id)?.name ?? "—";

  const openAddSupply = () => {
    setEditing(null); setSName(""); setSQty("1"); setSNotes(""); setSupplyDlg(true);
  };
  const openEditSupply = (s: Supply) => {
    setEditing(s); setSName(s.name); setSQty(String(s.total_quantity)); setSNotes(s.notes ?? ""); setSupplyDlg(true);
  };
  const saveSupply = async () => {
    if (!sName.trim()) return toast.error("اكتب اسم القطعة");
    const qty = Number(sQty); if (!Number.isFinite(qty) || qty < 0) return toast.error("الكمية غير صحيحة");
    const payload = { name: sName.trim(), total_quantity: qty, notes: sNotes.trim() || null };
    const res = editing
      ? await supabase.from("supplies").update(payload).eq("id", editing.id)
      : await supabase.from("supplies").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("تم الحفظ"); setSupplyDlg(false); load();
  };
  const deleteSupply = async (id: string) => {
    if (!confirm("حذف القطعة وكل سجلات استعارتها؟")) return;
    const { error } = await supabase.from("supplies").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف"); load();
  };

  const openAddLoan = (supplyId?: string) => {
    setLSupply(supplyId ?? ""); setLBorrower(""); setLPhone(""); setLQty("1"); setLNotes(""); setLoanDlg(true);
  };
  const saveLoan = async () => {
    if (!lSupply) return toast.error("اختار القطعة");
    if (!lBorrower.trim()) return toast.error("اكتب اسم المستعير");
    const qty = Number(lQty); if (!Number.isFinite(qty) || qty <= 0) return toast.error("الكمية غير صحيحة");
    const avail = availability.get(lSupply) ?? 0;
    if (qty > avail) return toast.error(`المتاح حالياً: ${avail}`);
    const { error } = await supabase.from("supply_loans").insert({
      supply_id: lSupply, borrower_name: lBorrower.trim(), borrower_phone: lPhone.trim() || null,
      quantity: qty, notes: lNotes.trim() || null,
    });
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل الاستعارة"); setLoanDlg(false); load();
  };
  const returnLoan = async (id: string) => {
    const { error } = await supabase.from("supply_loans").update({ returned_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل الإرجاع"); load();
  };
  const deleteLoan = async (id: string) => {
    if (!confirm("حذف سجل الاستعارة؟")) return;
    const { error } = await supabase.from("supply_loans").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">المستلزمات</h1>
            <p className="text-sm text-muted-foreground">إدارة العُهد والاستعارات</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => openAddLoan()}><HandHelping className="h-4 w-4" />تسجيل استعارة</Button>
            <Button onClick={openAddSupply}><Plus className="h-4 w-4" />إضافة قطعة</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">إجمالي القطع</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{supplies.length}</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">استعارات نشطة</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{activeLoans.length}</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الكميات</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{supplies.reduce((a, s) => a + s.total_quantity, 0)}</div></CardContent></Card>
        </div>

        <Tabs defaultValue="inventory">
          <TabsList>
            <TabsTrigger value="inventory"><Package className="h-4 w-4 ml-1" />المخزون</TabsTrigger>
            <TabsTrigger value="active"><HandHelping className="h-4 w-4 ml-1" />الاستعارات الحالية</TabsTrigger>
            <TabsTrigger value="history">السجل</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <Card><CardContent className="pt-6">
              {loading ? <div className="text-center py-8">جاري التحميل...</div> : supplies.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">لا توجد قطع — اضغط "إضافة قطعة"</div>
              ) : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>الاسم</TableHead><TableHead>الإجمالي</TableHead><TableHead>المتاح</TableHead>
                    <TableHead>الحالة</TableHead><TableHead>ملاحظات</TableHead><TableHead className="text-left">إجراءات</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {supplies.map(s => {
                      const avail = availability.get(s.id) ?? 0;
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{s.name}</TableCell>
                          <TableCell>{s.total_quantity}</TableCell>
                          <TableCell><span className={avail === 0 ? "text-destructive font-bold" : avail < s.total_quantity ? "text-amber-600 font-semibold" : "text-emerald-600 font-semibold"}>{avail}</span></TableCell>
                          <TableCell>
                            {avail === 0 ? <Badge variant="destructive">غير متاحة</Badge>
                              : avail < s.total_quantity ? <Badge className="bg-amber-500">جزئياً</Badge>
                              : <Badge className="bg-emerald-600">متاحة</Badge>}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{s.notes ?? "—"}</TableCell>
                          <TableCell><div className="flex gap-1 justify-end">
                            <Button size="sm" variant="outline" disabled={avail === 0} onClick={() => openAddLoan(s.id)}><HandHelping className="h-3.5 w-3.5" /></Button>
                            <Button size="sm" variant="outline" onClick={() => openEditSupply(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                            <Button size="sm" variant="outline" onClick={() => deleteSupply(s.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="active">
            <Card><CardContent className="pt-6">
              {activeLoans.length === 0 ? <div className="text-center py-8 text-muted-foreground">لا توجد استعارات حالية</div> : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>القطعة</TableHead><TableHead>المستعير</TableHead><TableHead>الهاتف</TableHead>
                    <TableHead>الكمية</TableHead><TableHead>تاريخ الاستعارة</TableHead><TableHead className="text-left">إجراءات</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {activeLoans.map(l => (
                      <TableRow key={l.id}>
                        <TableCell className="font-medium">{supplyName(l.supply_id)}</TableCell>
                        <TableCell>{l.borrower_name}</TableCell>
                        <TableCell>{l.borrower_phone ?? "—"}</TableCell>
                        <TableCell>{l.quantity}</TableCell>
                        <TableCell>{new Date(l.borrowed_at).toLocaleDateString("ar-EG")}</TableCell>
                        <TableCell><div className="flex gap-1 justify-end">
                          <Button size="sm" onClick={() => returnLoan(l.id)}><RotateCcw className="h-3.5 w-3.5" />إرجاع</Button>
                          <Button size="sm" variant="outline" onClick={() => deleteLoan(l.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="history">
            <Card><CardContent className="pt-6">
              {history.length === 0 ? <div className="text-center py-8 text-muted-foreground">لا يوجد سجل</div> : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>القطعة</TableHead><TableHead>المستعير</TableHead>
                    <TableHead>الكمية</TableHead><TableHead>الاستعارة</TableHead><TableHead>الإرجاع</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {history.map(l => (
                      <TableRow key={l.id}>
                        <TableCell className="font-medium">{supplyName(l.supply_id)}</TableCell>
                        <TableCell>{l.borrower_name}</TableCell>
                        <TableCell>{l.quantity}</TableCell>
                        <TableCell>{new Date(l.borrowed_at).toLocaleDateString("ar-EG")}</TableCell>
                        <TableCell>{l.returned_at ? new Date(l.returned_at).toLocaleDateString("ar-EG") : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={supplyDlg} onOpenChange={setSupplyDlg}>
        <DialogContent dir="rtl">
          <DialogHeader><DialogTitle>{editing ? "تعديل قطعة" : "إضافة قطعة"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>الاسم</Label><Input value={sName} onChange={e => setSName(e.target.value)} /></div>
            <div><Label>الكمية الإجمالية</Label><Input type="number" min="0" value={sQty} onChange={e => setSQty(e.target.value)} /></div>
            <div><Label>ملاحظات</Label><Textarea value={sNotes} onChange={e => setSNotes(e.target.value)} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setSupplyDlg(false)}>إلغاء</Button><Button onClick={saveSupply}>حفظ</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={loanDlg} onOpenChange={setLoanDlg}>
        <DialogContent dir="rtl">
          <DialogHeader><DialogTitle>تسجيل استعارة</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>القطعة</Label>
              <Select value={lSupply} onValueChange={setLSupply}>
                <SelectTrigger><SelectValue placeholder="اختر القطعة" /></SelectTrigger>
                <SelectContent>
                  {supplies.map(s => {
                    const a = availability.get(s.id) ?? 0;
                    return <SelectItem key={s.id} value={s.id} disabled={a === 0}>{s.name} (متاح: {a})</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div><Label>اسم المستعير</Label><Input value={lBorrower} onChange={e => setLBorrower(e.target.value)} /></div>
            <div><Label>رقم الهاتف (اختياري)</Label><Input value={lPhone} onChange={e => setLPhone(e.target.value)} /></div>
            <div><Label>الكمية</Label><Input type="number" min="1" value={lQty} onChange={e => setLQty(e.target.value)} /></div>
            <div><Label>ملاحظات</Label><Textarea value={lNotes} onChange={e => setLNotes(e.target.value)} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setLoanDlg(false)}>إلغاء</Button><Button onClick={saveLoan}>حفظ</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
