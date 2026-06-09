import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { listUsers, createUser, deleteUser } from "@/lib/users.functions";
import { useAuth } from "@/lib/auth";
import { formatArabicDate } from "@/lib/constants";
import { logAction } from "@/lib/audit";

export const Route = createFileRoute("/users")({ component: UsersPage });

function UsersPage() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const fnList = useServerFn(listUsers);
  const fnCreate = useServerFn(createUser);
  const fnDelete = useServerFn(deleteUser);

  const { data } = useQuery({ queryKey: ["users"], queryFn: () => fnList() });
  const users = data?.users ?? [];

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [del, setDel] = useState<{ id: string; email: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fnCreate({ data: { email, password, full_name: fullName } });
      toast.success("تم إضافة المستخدم");
      logAction({ action_type: "CREATE", entity_type: "user", new_values: { email, full_name: fullName } });
      setOpen(false); setEmail(""); setPassword(""); setFullName("");
      qc.invalidateQueries({ queryKey: ["users"] });
    } catch (err: any) { toast.error(err.message || "حدث خطأ"); }
    setBusy(false);
  };

  const doDelete = async () => {
    if (!del) return;
    try {
      await fnDelete({ data: { id: del.id } });
      toast.success("تم حذف المستخدم");
      logAction({ action_type: "DELETE", entity_type: "user", entity_id: del.id, old_values: { email: del.email } });
      qc.invalidateQueries({ queryKey: ["users"] });
    } catch (err: any) { toast.error(err.message || "حدث خطأ"); }
    setDel(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">المستخدمون</h1>
          <Button onClick={() => setOpen(true)}><Plus className="ml-2 h-4 w-4" /> إضافة مستخدم</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            {users.length === 0 ? <p className="text-center text-muted-foreground py-12">لا يوجد مستخدمون</p> : (
              <Table>
                <TableHeader><TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {users.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>{(u as any).full_name || "—"}</TableCell>
                      <TableCell dir="ltr">{u.email}</TableCell>
                      <TableCell>{formatArabicDate(u.created_at)}</TableCell>
                      <TableCell>
                        {u.id !== user?.id && (
                          <Button size="icon" variant="ghost" onClick={() => setDel({ id: u.id, email: u.email })}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                        {u.id === user?.id && <span className="text-xs text-muted-foreground">(أنت)</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl">
          <DialogHeader><DialogTitle>إضافة مستخدم جديد</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div><Label>الاسم الكامل</Label><Input required value={fullName} onChange={e => setFullName(e.target.value)} /></div>
            <div><Label>البريد الإلكتروني</Label><Input type="email" required value={email} onChange={e => setEmail(e.target.value)} dir="ltr" /></div>
            <div><Label>كلمة المرور</Label><Input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} dir="ltr" /></div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
              <Button type="submit" disabled={busy}>{busy ? "..." : "إضافة"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف المستخدم "{del?.email}" نهائياً.</AlertDialogDescription>
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
