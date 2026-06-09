import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportDatabase, restoreDatabase } from "@/lib/backup";
import { toast } from "sonner";
import { logAction } from "@/lib/audit";
import { Download, Upload, AlertTriangle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const [exporting, setExporting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [showRestoreWarning, setShowRestoreWarning] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setExporting(true);
    try {
      const success = await exportDatabase();
      if (success) {
        toast.success("تم تنزيل النسخة الاحتياطية بنجاح!");
        logAction({ action_type: "CREATE", entity_type: "backup", new_values: { timestamp: new Date().toISOString() } });
      } else {
        toast.error("حدث خطأ أثناء تنزيل النسخة الاحتياطية.");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تنزيل النسخة الاحتياطية.");
    }
    setExporting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setSelectedFileContent(result);
        setShowRestoreWarning(true);
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const confirmRestore = async () => {
    setShowRestoreWarning(false);
    if (!selectedFileContent) return;

    setRestoring(true);
    toast.info("جاري استعادة النسخة الاحتياطية... برجاء عدم إغلاق الصفحة.");
    
    const success = await restoreDatabase(selectedFileContent);
    if (success) {
      toast.success("تم استعادة قاعدة البيانات بنجاح! جاري تحديث الصفحة...");
      logAction({ action_type: "UPDATE", entity_type: "database_restore", new_values: { restored_at: new Date().toISOString() } });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("فشل في استعادة قاعدة البيانات. قد يكون الملف تالفاً أو هنالك خطأ بالاتصال.");
    }
    
    setRestoring(false);
    setSelectedFileContent(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">الإعدادات</h1>
          <p className="text-muted-foreground mt-1">تكوين النظام وإدارة قاعدة البيانات</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Download className="h-5 w-5 text-emerald-600" />
                أخذ نسخة احتياطية
              </CardTitle>
              <CardDescription>
                تحميل جميع بيانات النظام الحالية (الطلاب، الكورسات، المدفوعات، إلخ) في ملف JSON.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                يُنصح بأخذ نسخة احتياطية بشكل دوري لتجنب فقدان البيانات.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleExport} disabled={exporting || restoring} className="w-full">
                {exporting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Download className="h-4 w-4 ml-2" />}
                {exporting ? "جاري التحميل..." : "تحميل نسخة احتياطية"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 bg-destructive h-full"></div>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-destructive">
                <Upload className="h-5 w-5" />
                استعادة نسخة احتياطية
              </CardTitle>
              <CardDescription>
                استعادة بيانات النظام من ملف JSON تم تحميله مسبقاً.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>
                  <strong>تحذير هام:</strong> عملية الاستعادة ستقوم بمسح جميع البيانات الحالية واستبدالها ببيانات النسخة الاحتياطية. لا يمكن التراجع عن هذه الخطوة!
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <input
                type="file"
                accept=".json"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button 
                variant="destructive" 
                onClick={() => fileInputRef.current?.click()} 
                disabled={exporting || restoring} 
                className="w-full"
              >
                {restoring ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Upload className="h-4 w-4 ml-2" />}
                {restoring ? "جاري الاستعادة..." : "استعادة البيانات (حذف و استبدال)"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <AlertDialog open={showRestoreWarning} onOpenChange={setShowRestoreWarning}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              تأكيد استعادة النظام
            </AlertDialogTitle>
            <AlertDialogDescription>
              أنت على وشك استعادة النظام من النسخة الاحتياطية.
              <br /><br />
              <strong>سيتم مسح جميع بيانات الطلاب، الكورسات، المدفوعات و الايرادات المسجلة حالياً!</strong>
              <br /><br />
              هل أنت متأكد من رغبتك بالاستمرار واستبدال قاعدة البيانات؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore} className="bg-destructive hover:bg-destructive/90">
              نعم، استعادة النظام
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
