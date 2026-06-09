import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useMemo } from "react";
import { useLectures, useCourses, useStudents, useCourseStudents, useAttendance } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

function ReportsPage() {
  const { data: lectures = [] } = useLectures();
  const { data: courses = [] } = useCourses();
  const { data: students = [] } = useStudents();
  const { data: cs = [] } = useCourseStudents();
  const { data: attendance = [] } = useAttendance();

  // Absence report
  const [aCourse, setACourse] = useState("");
  const [aFrom, setAFrom] = useState("");
  const [aTo, setATo] = useState("");
  const [threshold, setThreshold] = useState(3);

  const absenceRows = useMemo(() => {
    if (!aCourse) return [];
    const lecs = lectures.filter(l => l.course_id === aCourse && (!aFrom || l.date >= aFrom) && (!aTo || l.date <= aTo));
    const lecIds = lecs.map(l => l.id);
    const studentIds = cs.filter(x => x.course_id === aCourse).map(x => x.student_id);
    return studentIds.map(sid => {
      const recs = attendance.filter(a => a.student_id === sid && lecIds.includes(a.lecture_id));
      const present = recs.filter(r => r.status === "حاضر").length;
      const absent = recs.filter(r => r.status === "غائب").length;
      const late = recs.filter(r => r.status === "متأخر").length;
      const total = lecs.length;
      const rate = total ? Math.round((present / total) * 100) : 0;
      return { student: students.find(s => s.id === sid)?.full_name ?? "—", total, present, absent, late, rate };
    });
  }, [aCourse, aFrom, aTo, lectures, cs, attendance, students]);

  const exportCSV = () => {
    const rows = [["اسم الطالب", "الغياب", "نسبة الحضور"], ...absenceRows.map(r => [r.student, String(r.absent), r.rate + "%"])];
    const csv = "\ufeff" + rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "تقرير_الغياب.csv"; a.click();
  };

  // Course summary
  const [sCourse, setSCourse] = useState("");
  const summary = useMemo(() => {
    if (!sCourse) return null;
    const c = courses.find(x => x.id === sCourse)!;
    const enrolled = cs.filter(x => x.course_id === sCourse).length;
    const lecs = lectures.filter(l => l.course_id === sCourse);
    const today = new Date().toISOString().slice(0,10);
    const completed = lecs.filter(l => l.date <= today).length;
    const upcoming = lecs.filter(l => l.date > today).length;
    const lecIds = lecs.map(l => l.id);
    const recs = attendance.filter(a => lecIds.includes(a.lecture_id));
    const avg = recs.length ? Math.round((recs.filter(r => r.status === "حاضر").length / recs.length) * 100) : 0;
    const chart = lecs.sort((a,b) => a.date.localeCompare(b.date)).map(l => {
      const r = attendance.filter(a => a.lecture_id === l.id);
      const p = r.filter(x => x.status === "حاضر").length;
      return { date: l.date.slice(5), rate: r.length ? Math.round((p / r.length) * 100) : 0 };
    });
    return { course: c, enrolled, completed, upcoming, avg, chart };
  }, [sCourse, courses, cs, lectures, attendance]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">التقارير</h1>

        <Tabs defaultValue="absence">
          <TabsList>
            <TabsTrigger value="absence">تقرير غياب الطلاب</TabsTrigger>
            <TabsTrigger value="summary">ملخص الكورس</TabsTrigger>
          </TabsList>

          <TabsContent value="absence">
            <Card>
              <CardHeader><CardTitle>تقرير غياب الطلاب</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div><Label>الكورس</Label>
                    <Select value={aCourse} onValueChange={setACourse}>
                      <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                      <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>من</Label><Input type="date" value={aFrom} onChange={e => setAFrom(e.target.value)} /></div>
                  <div><Label>إلى</Label><Input type="date" value={aTo} onChange={e => setATo(e.target.value)} /></div>
                  <div><Label>حد الغياب</Label><Input type="number" value={threshold} onChange={e => setThreshold(Number(e.target.value))} /></div>
                </div>
                {aCourse && (
                  <>
                    <div className="flex justify-end"><Button onClick={exportCSV} variant="outline"><Download className="ml-2 h-4 w-4" /> تصدير CSV</Button></div>
                    {absenceRows.length === 0 ? <p className="text-center text-muted-foreground py-8">لا يوجد طلاب مسجلين</p> : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-right">الطالب</TableHead>
                            <TableHead className="text-right">إجمالي المحاضرات</TableHead>
                            <TableHead className="text-right">حاضر</TableHead>
                            <TableHead className="text-right">غائب</TableHead>
                            <TableHead className="text-right">متأخر</TableHead>
                            <TableHead className="text-right">نسبة الحضور</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {absenceRows.map((r, i) => (
                            <TableRow key={i} className={r.absent > threshold ? "bg-red-50 text-red-900" : ""}>
                              <TableCell className="font-medium">{r.student}</TableCell>
                              <TableCell>{r.total}</TableCell>
                              <TableCell>{r.present}</TableCell>
                              <TableCell>{r.absent}</TableCell>
                              <TableCell>{r.late}</TableCell>
                              <TableCell>{r.rate}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader><CardTitle>تقرير ملخص الكورس</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Select value={sCourse} onValueChange={setSCourse}>
                  <SelectTrigger className="max-w-md"><SelectValue placeholder="اختر كورس" /></SelectTrigger>
                  <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
                {summary && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{summary.enrolled}</div><div className="text-xs text-muted-foreground">طلاب مسجلون</div></CardContent></Card>
                      <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{summary.avg}%</div><div className="text-xs text-muted-foreground">متوسط الحضور</div></CardContent></Card>
                      <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{summary.completed}</div><div className="text-xs text-muted-foreground">محاضرات منتهية</div></CardContent></Card>
                      <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{summary.upcoming}</div><div className="text-xs text-muted-foreground">محاضرات قادمة</div></CardContent></Card>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      الكورس: {summary.course.name}
                    </div>
                    {summary.chart.length > 0 && (
                      <div className="h-64">
                        <ResponsiveContainer>
                          <BarChart data={summary.chart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="rate" fill="hsl(220 70% 50%)" name="نسبة الحضور %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
