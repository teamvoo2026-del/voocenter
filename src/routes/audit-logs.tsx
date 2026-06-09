import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Filter, RotateCcw, Clock, User, Fingerprint } from "lucide-react";
import { formatArabicDate } from "@/lib/constants";

export const Route = createFileRoute("/audit-logs")({ component: AuditLogsPage });

function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [fAction, setFAction] = useState("all");
  const [fEntity, setFEntity] = useState("all");
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const { data: logs = [], isLoading, isError, error: queryError } = useQuery({
    queryKey: ["audit_logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchSearch = 
        !search || 
        l.user_name?.toLowerCase().includes(search.toLowerCase()) || 
        l.user_email?.toLowerCase().includes(search.toLowerCase()) ||
        l.entity_id?.toLowerCase().includes(search.toLowerCase());
      
      const matchAction = fAction === "all" || l.action_type === fAction;
      const matchEntity = fEntity === "all" || l.entity_type === fEntity;
      
      return matchSearch && matchAction && matchEntity;
    });
  }, [logs, search, fAction, fEntity]);

  const uniqueEntities = useMemo(() => {
    const set = new Set(logs.map(l => l.entity_type).filter(Boolean));
    return Array.from(set).sort();
  }, [logs]);

  const resetFilters = () => {
    setSearch("");
    setFAction("all");
    setFEntity("all");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
             <Clock className="h-8 w-8 text-primary" />
             سجل الأنشطة (Audit Logs)
          </h1>
          <p className="text-muted-foreground mt-1">تتبع كل العمليات والتحركات التي تمت على النظام</p>
        </div>

        <Card className="bg-muted/30 border-none shadow-none">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Search className="h-3.5 w-3.5" /> بحث</Label>
              <Input 
                placeholder="اسم المستخدم، الإيميل، أو معرف الكيان..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Fingerprint className="h-3.5 w-3.5" /> نوع العملية</Label>
              <Select value={fAction} onValueChange={setFAction}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل العمليات</SelectItem>
                  <SelectItem value="CREATE">إضافة (CREATE)</SelectItem>
                  <SelectItem value="UPDATE">تعديل (UPDATE)</SelectItem>
                  <SelectItem value="DELETE">حذف (DELETE)</SelectItem>
                  <SelectItem value="LOGIN">دخول (LOGIN)</SelectItem>
                  <SelectItem value="LOGOUT">خروج (LOGOUT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Filter className="h-3.5 w-3.5" /> الكيان</Label>
              <Select value={fEntity} onValueChange={setFEntity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الكيانات</SelectItem>
                  {uniqueEntities.map(e => (
                    <SelectItem key={e} value={e!}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                <RotateCcw className="ml-2 h-4 w-4" /> ريست الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {isError && (
              <div className="p-6 text-center text-destructive bg-destructive/10 border-b">
                 <p className="font-bold">فشل تحميل السجلات:</p>
                 <p className="text-sm">{(queryError as any)?.message || "حدث خطأ غير معروف"}</p>
              </div>
            )}
            {isLoading ? (
              <div className="py-20 text-center text-muted-foreground italic">جاري تحميل السجلات...</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground italic">لا توجد سجلات مطابقة للبحث</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">التوقيت</TableHead>
                    <TableHead className="text-right">المستخدم</TableHead>
                    <TableHead className="text-right">العملية</TableHead>
                    <TableHead className="text-right">الكيان</TableHead>
                    <TableHead className="text-right">معرف الكيان</TableHead>
                    <TableHead className="text-right w-[100px]">التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="text-xs font-medium" dir="ltr">
                        {new Date(log.created_at).toLocaleString("ar-EG")}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{log.user_name}</span>
                          <span className="text-[10px] text-muted-foreground">{log.user_email}</span>
                          <Badge variant="outline" className="w-fit text-[9px] h-4 px-1 mt-0.5">{log.user_role}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            log.action_type === "CREATE" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" :
                            log.action_type === "UPDATE" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" :
                            log.action_type === "DELETE" ? "bg-red-500/10 text-red-600 hover:bg-red-500/20" :
                            "bg-slate-500/10 text-slate-600"
                          }
                        >
                          {log.action_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">{log.entity_type || "—"}</Badge>
                      </TableCell>
                      <TableCell className="text-[10px] font-mono text-muted-foreground">
                        {log.entity_id || "—"}
                      </TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" onClick={() => setSelectedLog(log)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedLog} onOpenChange={(o) => !o && setSelectedLog(null)}>
        <DialogContent dir="rtl" className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> تفاصيل العملية
            </DialogTitle>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground italic">المستخدم</Label>
                  <p className="text-sm font-bold flex items-center gap-1"><User className="h-3 w-3" /> {selectedLog.user_name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground italic">نوع العملية</Label>
                  <p className="text-sm font-bold">{selectedLog.action_type} / {selectedLog.entity_type || "—"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground italic">التاريخ</Label>
                  <p className="text-sm font-bold" dir="ltr">{new Date(selectedLog.created_at).toLocaleString("ar-EG")}</p>
                </div>
                <div className="col-span-full border-t pt-2 space-y-1">
                   <Label className="text-xs text-muted-foreground italic">معلومات الجهاز (User Agent)</Label>
                   <p className="text-[10px] font-mono bg-muted p-2 rounded">{selectedLog.user_agent}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t pt-4">
                <div className="space-y-2">
                  <Label className="text-blue-600 font-bold">القيم القديمة (Before)</Label>
                  <pre className="text-[10px] p-3 bg-slate-50 dark:bg-slate-900 rounded-md overflow-x-auto min-h-[100px]">
                    {JSON.stringify(selectedLog.old_values, null, 2) || "لا توجد بيانات"}
                  </pre>
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-600 font-bold">القيم الجديدة (After)</Label>
                  <pre className="text-[10px] p-3 bg-slate-50 dark:bg-slate-900 rounded-md overflow-x-auto min-h-[100px]">
                    {JSON.stringify(selectedLog.new_values, null, 2) || "لا توجد بيانات"}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
