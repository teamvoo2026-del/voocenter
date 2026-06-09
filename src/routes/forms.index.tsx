import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForms, useFormResponseCounts, slugify } from "@/lib/forms";
import { supabase } from "@/integrations/supabase/client";
import { Plus, FileText, BarChart3, Copy, Trash2, Pencil, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/forms/")({ component: FormsList });

function FormsList() {
  const { data: forms = [], isLoading } = useForms();
  const { data: counts = {} } = useFormResponseCounts();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const handleNew = async () => {
    const title = "نموذج بدون عنوان";
    const { data, error } = await supabase
      .from("forms")
      .insert({ title, slug: slugify(title), fields: [] } as never)
      .select()
      .single();
    if (error) return toast.error("فشل إنشاء النموذج");
    qc.invalidateQueries({ queryKey: ["forms"] });
    navigate({ to: "/forms/$id/edit", params: { id: (data as { id: string }).id } });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا النموذج وكل إجاباته؟")) return;
    const { error } = await supabase.from("forms").delete().eq("id", id);
    if (error) return toast.error("فشل الحذف");
    toast.success("تم الحذف");
    qc.invalidateQueries({ queryKey: ["forms"] });
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/form/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("تم نسخ الرابط");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">النماذج</h1>
            <p className="text-muted-foreground mt-1">إنشاء نماذج لجمع البيانات من الطلاب</p>
          </div>
          <Button onClick={handleNew} size="lg">
            <Plus className="h-4 w-4 ml-2" /> نموذج جديد
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">جاري التحميل...</p>
        ) : forms.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">لا توجد نماذج بعد</p>
            <Button onClick={handleNew}><Plus className="h-4 w-4 ml-2" />إنشاء أول نموذج</Button>
          </Card>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((f) => (
              <Card key={f.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="h-24 relative" style={{ backgroundColor: f.header_color }}>
                  <FileText className="absolute bottom-3 right-3 h-6 w-6 text-white/80" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold truncate">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      آخر تعديل {new Date(f.updated_at).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{f.fields.length} سؤال</span>
                    <Link to="/forms/$id/responses" params={{ id: f.id }} className="flex items-center gap-1 text-primary hover:underline">
                      <BarChart3 className="h-3 w-3" /> {counts[f.id] ?? 0} إجابة
                    </Link>
                  </div>
                  <div className="flex gap-1 pt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button asChild size="sm" variant="ghost" className="flex-1">
                      <Link to="/forms/$id/edit" params={{ id: f.id }}><Pencil className="h-3.5 w-3.5" /></Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="flex-1">
                      <a href={`/form/${f.slug}`} target="_blank" rel="noreferrer"><ExternalLink className="h-3.5 w-3.5" /></a>
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1" onClick={() => copyLink(f.slug)}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1 text-destructive" onClick={() => handleDelete(f.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
