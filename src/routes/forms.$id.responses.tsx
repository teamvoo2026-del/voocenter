import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, useFormResponses, type FormField, type FormRow, type FormResponseRow } from "@/lib/forms";
import { ArrowRight, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/forms/$id/responses")({ component: ResponsesPage });

const PIE_COLORS = ["#673AB7","#2196F3","#4CAF50","#FF9800","#F44336","#9C27B0","#009688","#FF5722"];

function ResponsesPage() {
  const { id } = Route.useParams();
  const { data: form } = useForm(id);
  const { data: responses = [] } = useFormResponses(id);

  const exportCsv = () => {
    if (!form) return;
    const headers = ["تاريخ الإرسال", ...form.fields.map(f => f.title)];
    const rows = responses.map(r => [
      new Date(r.submitted_at).toLocaleString("ar-EG"),
      ...form.fields.map(f => {
        const v = (r.data as Record<string, unknown>)[f.id];
        return Array.isArray(v) ? v.join("؛ ") : (v ?? "");
      })
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${form.title}-responses.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!form) return <AppLayout><p className="text-muted-foreground">جاري التحميل...</p></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Button asChild variant="ghost" size="sm" className="mb-2">
              <Link to="/forms"><ArrowRight className="h-4 w-4 ml-1" />رجوع</Link>
            </Button>
            <h1 className="text-2xl font-bold">{form.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">{responses.length} إجابة</p>
          </div>
          <Button onClick={exportCsv} variant="outline" disabled={responses.length === 0}>
            <Download className="h-4 w-4 ml-2" />تصدير CSV
          </Button>
        </div>

        <Tabs defaultValue="summary">
          <TabsList>
            <TabsTrigger value="summary">ملخص</TabsTrigger>
            <TabsTrigger value="individual">إجابات فردية</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4 mt-4">
            {responses.length === 0 ? (
              <Card className="p-12 text-center text-muted-foreground">لا توجد إجابات بعد</Card>
            ) : (
              form.fields.map(f => (
                <Card key={f.id} className="p-5">
                  <h3 className="font-semibold mb-3">{f.title}</h3>
                  <QuestionSummary field={f} responses={responses} />
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="individual" className="space-y-3 mt-4">
            {responses.length === 0 ? (
              <Card className="p-12 text-center text-muted-foreground">لا توجد إجابات بعد</Card>
            ) : (
              <IndividualResponses form={form} responses={responses} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

function QuestionSummary({ field, responses }: { field: FormField; responses: FormResponseRow[] }) {
  const values = responses.map(r => (r.data as Record<string, unknown>)[field.id]).filter(v => v !== undefined && v !== null && v !== "");

  if (["multiple_choice", "dropdown", "checkboxes", "linear_scale"].includes(field.type)) {
    const counts: Record<string, number> = {};
    for (const v of values) {
      if (Array.isArray(v)) v.forEach(x => { counts[String(x)] = (counts[String(x)] ?? 0) + 1; });
      else counts[String(v)] = (counts[String(v)] ?? 0) + 1;
    }
    const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

    if (field.type === "multiple_choice" || field.type === "dropdown") {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
              {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" /><YAxis /><Tooltip />
          <Bar dataKey="value" fill="#673AB7" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {values.length === 0 ? <p className="text-muted-foreground text-sm">لا توجد إجابات</p> :
        values.map((v, i) => <div key={i} className="p-2 bg-muted/50 rounded text-sm">{String(v)}</div>)}
    </div>
  );
}

function IndividualResponses({ form, responses }: { form: FormRow; responses: FormResponseRow[] }) {
  const [page, setPage] = useState(0);
  const r = responses[page];
  const total = responses.length;

  return (
    <>
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm text-muted-foreground">
            إجابة {page + 1} من {total} · {new Date(r.submitted_at).toLocaleString("ar-EG")}
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>السابق</Button>
            <Button size="sm" variant="outline" onClick={() => setPage(p => Math.min(total - 1, p + 1))} disabled={page === total - 1}>التالي</Button>
          </div>
        </div>
        <div className="space-y-3">
          {form.fields.map(f => {
            const v = (r.data as Record<string, unknown>)[f.id];
            return (
              <div key={f.id}>
                <p className="text-sm font-medium">{f.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Array.isArray(v) ? v.join("، ") : (v !== undefined && v !== null && v !== "" ? String(v) : "—")}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
