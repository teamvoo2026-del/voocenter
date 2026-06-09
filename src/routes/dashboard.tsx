import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, ClipboardCheck, Percent } from "lucide-react";
import { useStudents, useInstructors, useCourses, useLectures, useAttendance } from "@/lib/data";
import { LOCATION_COLORS } from "@/lib/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { data: students = [] } = useStudents();
  const { data: instructors = [] } = useInstructors();
  const { data: courses = [] } = useCourses();
  const { data: lectures = [] } = useLectures();
  const { data: attendance = [] } = useAttendance();

  const today = new Date().toISOString().slice(0, 10);
  const todaysLectures = lectures.filter((l) => l.date === today);
  const activeInstructors = instructors.filter((i) => i.is_active);
  const ongoingCourses = courses.filter((c) => lectures.some((l) => l.course_id === c.id && l.date >= today));
  const present = attendance.filter((a) => a.status === "حاضر").length;
  const attendanceRate = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

  const courseAttendance = courses.map((c) => {
    const lectureIds = lectures.filter((l) => l.course_id === c.id).map((l) => l.id);
    const recs = attendance.filter((a) => lectureIds.includes(a.lecture_id));
    const pres = recs.filter((r) => r.status === "حاضر").length;
    return { name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name, rate: recs.length ? Math.round((pres / recs.length) * 100) : 0 };
  }).filter(c => c.rate > 0).slice(0, 8);

  const stats = [
    { label: "إجمالي الطلاب", value: students.length, icon: Users, color: "text-blue-600 bg-blue-100" },
    { label: "محاضرات اليوم", value: todaysLectures.length, icon: ClipboardCheck, color: "text-purple-600 bg-purple-100" },
    { label: "المحاضرين النشطين", value: activeInstructors.length, icon: GraduationCap, color: "text-green-600 bg-green-100" },
    { label: "الكورسات الجارية", value: ongoingCourses.length, icon: BookOpen, color: "text-orange-600 bg-orange-100" },
    { label: "نسبة الحضور", value: attendanceRate + "%", icon: Percent, color: "text-pink-600 bg-pink-100" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">نظرة عامة على المركز</p>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${s.color}`}><s.icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold">{s.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>محاضرات اليوم</CardTitle></CardHeader>
            <CardContent>
              {todaysLectures.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا توجد محاضرات اليوم</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الكورس</TableHead>
                      <TableHead className="text-right">المحاضر</TableHead>
                      <TableHead className="text-right">الوقت</TableHead>
                      <TableHead className="text-right">القاعة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysLectures.map((l) => {
                      const c = courses.find((c) => c.id === l.course_id);
                      const i = instructors.find((i) => i.id === l.instructor_id);
                      return (
                        <TableRow key={l.id}>
                          <TableCell>{c?.name ?? "—"}</TableCell>
                          <TableCell>{i?.full_name ?? "—"}</TableCell>
                          <TableCell dir="ltr">{l.start_time.slice(0,5)} - {l.end_time.slice(0,5)}</TableCell>
                          <TableCell><Badge className={LOCATION_COLORS[l.location]} variant="outline">{l.location}</Badge></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>نسبة الحضور لكل كورس</CardTitle></CardHeader>
            <CardContent>
              {courseAttendance.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا توجد بيانات حضور بعد</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={courseAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="hsl(220 70% 50%)" name="نسبة الحضور %" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
