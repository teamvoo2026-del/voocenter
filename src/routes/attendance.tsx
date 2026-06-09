import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState, useEffect, useMemo } from "react";
import { useLectures, useCourses, useInstructors, useStudents, useCourseStudents, useAttendance } from "@/lib/data";
import { ATTENDANCE_STATUSES, formatArabicDate } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

import { logAction } from "@/lib/audit";

export const Route = createFileRoute("/attendance")({ component: AttendancePage });

function AttendancePage() {
  const qc = useQueryClient();
  const { data: lectures = [] } = useLectures();
  const { data: courses = [] } = useCourses();
  const { data: instructors = [] } = useInstructors();
  const { data: students = [] } = useStudents();
  const { data: cs = [] } = useCourseStudents();
  const { data: attendance = [] } = useAttendance();

  const [lectureId, setLectureId] = useState<string>("");
  const [state, setState] = useState<Record<string, "حاضر"|"غائب"|"متأخر">>({});
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [extraEnrolled, setExtraEnrolled] = useState<Set<string>>(new Set());

  const lecture = lectures.find(l => l.id === lectureId);
  const enrolledIds = useMemo(() => {
    if (!lecture) return [];
    // If the lecture belongs to a specific run, only show students enrolled in that run.
    // Otherwise fall back to all students enrolled in the course (legacy).
    const matches = cs.filter((x: any) => {
      if (x.course_id !== lecture.course_id) return false;
      if (lecture.run_id) return x.run_id === lecture.run_id;
      return true;
    });
    const base = matches.map((x: any) => x.student_id);
    return [...new Set([...base, ...extraEnrolled])];
  }, [lecture, cs, extraEnrolled]);
  const enrolledStudents = students.filter(s => enrolledIds.includes(s.id));

  useEffect(() => {
    if (!lectureId) { setState({}); return; }
    const existing = attendance.filter(a => a.lecture_id === lectureId);
    const init: Record<string, any> = {};
    existing.forEach(a => init[a.student_id] = a.status);
    setState(init);
    setExtraEnrolled(new Set());
  }, [lectureId, attendance]);

  const setAll = (status: "حاضر"|"غائب"|"متأخر") => {
    const next: Record<string, any> = {};
    enrolledStudents.forEach(s => next[s.id] = status);
    setState(next);
  };

  const [focusIdx, setFocusIdx] = useState(0);
  useEffect(() => {
    if (!lectureId || enrolledStudents.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      const map: Record<string, "حاضر"|"غائب"|"متأخر"> = { h: "حاضر", p: "حاضر", a: "غائب", l: "متأخر" };
      if (map[key]) {
        const s = enrolledStudents[focusIdx];
        if (s) {
          setState(prev => ({ ...prev, [s.id]: map[key] }));
          setFocusIdx(i => Math.min(i + 1, enrolledStudents.length - 1));
          e.preventDefault();
        }
      } else if (e.key === "ArrowDown") { setFocusIdx(i => Math.min(i + 1, enrolledStudents.length - 1)); e.preventDefault(); }
      else if (e.key === "ArrowUp")   { setFocusIdx(i => Math.max(i - 1, 0)); e.preventDefault(); }
      else if (e.ctrlKey && key === "s") { save(); e.preventDefault(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureId, enrolledStudents, focusIdx]);

  const save = async () => {
    if (!lectureId) return;
    await supabase.from("attendance").delete().eq("lecture_id", lectureId);
    const rows = Object.entries(state).map(([student_id, status]) => ({ lecture_id: lectureId, student_id, status }));
    if (rows.length === 0) { toast.success("تم الحفظ"); qc.invalidateQueries({ queryKey: ["attendance"] }); return; }
    const { error } = await supabase.from("attendance").insert(rows);
    if (error) toast.error(error.message); 
    else { 
      toast.success("تم حفظ الحضور"); 
      logAction({ action_type: "UPDATE", entity_type: "attendance_batch", entity_id: lectureId, new_values: rows });
      qc.invalidateQueries({ queryKey: ["attendance"] }); 
    }
  };

  const enrollStudent = async (studentId: string) => {
    if (!lecture) return;
    const { error } = await supabase.from("course_students").insert({ course_id: lecture.course_id, student_id: studentId });
    if (error && !error.message.includes("duplicate")) { toast.error(error.message); return; }
    setExtraEnrolled(prev => new Set(prev).add(studentId));
    qc.invalidateQueries({ queryKey: ["course_students"] });
    toast.success("تم تسجيل الطالب في الكورس");
    logAction({ action_type: "CREATE", entity_type: "enrollment", entity_id: studentId, new_values: { course_id: lecture.course_id, lecture_id: lecture.id } });
  };

  const counts = { حاضر: 0, غائب: 0, متأخر: 0 };
  Object.values(state).forEach(s => counts[s]++);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">تسجيل الحضور</h1>

        <Card>
          <CardHeader><CardTitle>اختر المحاضرة</CardTitle></CardHeader>
          <CardContent>
            <Select value={lectureId} onValueChange={setLectureId}>
              <SelectTrigger><SelectValue placeholder="— اختر محاضرة —" /></SelectTrigger>
              <SelectContent>
                {lectures.map(l => {
                  const c = courses.find(c => c.id === l.course_id);
                  const i = instructors.find(i => i.id === l.instructor_id);
                  return <SelectItem key={l.id} value={l.id}>{formatArabicDate(l.date)} - {c?.name} ({i?.full_name})</SelectItem>;
                })}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {lecture && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{counts.حاضر}</div><div className="text-sm text-muted-foreground">حاضر</div></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{counts.غائب}</div><div className="text-sm text-muted-foreground">غائب</div></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-amber-600">{counts.متأخر}</div><div className="text-sm text-muted-foreground">متأخر</div></CardContent></Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <CardTitle>الطلاب المسجلون ({enrolledStudents.length})</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEnrollOpen(o => !o)}>{enrollOpen ? "إخفاء" : "تسجيل طلاب للكورس"}</Button>
                    <Button size="sm" onClick={save}>حفظ الحضور</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {enrollOpen && (
                  <div className="mb-4 p-3 border rounded-md bg-muted/30">
                    <p className="text-sm mb-2 font-medium">إضافة طلاب لهذا الكورس:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {students.filter(s => !enrolledIds.includes(s.id)).map(s => (
                        <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox onCheckedChange={() => enrollStudent(s.id)} />
                          <span>{s.full_name} <span className="text-xs text-muted-foreground">({s.academic_year})</span></span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-3 flex flex-wrap gap-2 items-center text-xs text-muted-foreground bg-muted/40 p-2 rounded">
                  <span className="font-semibold">اختصارات:</span>
                  <kbd className="px-2 py-0.5 bg-background border rounded">H</kbd> حاضر
                  <kbd className="px-2 py-0.5 bg-background border rounded">A</kbd> غائب
                  <kbd className="px-2 py-0.5 bg-background border rounded">L</kbd> متأخر
                  <kbd className="px-2 py-0.5 bg-background border rounded">↑↓</kbd> تنقل
                  <kbd className="px-2 py-0.5 bg-background border rounded">Ctrl+S</kbd> حفظ
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="text-green-700 border-green-300" onClick={() => setAll("حاضر")}>تحديد الكل حاضر</Button>
                  <Button size="sm" variant="outline" className="text-red-700 border-red-300" onClick={() => setAll("غائب")}>تحديد الكل غائب</Button>
                  <Button size="sm" variant="outline" className="text-amber-700 border-amber-300" onClick={() => setAll("متأخر")}>تحديد الكل متأخر</Button>
                  <Button size="sm" variant="ghost" onClick={() => setState({})}>مسح الكل</Button>
                </div>
                {enrolledStudents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">لا يوجد طلاب مسجلون في هذا الكورس بعد</p>
                ) : (
                  <div className="space-y-2">
                    {enrolledStudents.map((s, idx) => (
                      <div key={s.id}
                        onClick={() => setFocusIdx(idx)}
                        className={`flex items-center justify-between p-3 border rounded-md bg-card cursor-pointer transition ${idx === focusIdx ? "ring-2 ring-primary" : ""}`}>
                        <div>
                          <div className="font-medium">{s.full_name}</div>
                          <div className="text-xs text-muted-foreground">{s.academic_year} • {s.gender}</div>
                        </div>
                        <div className="flex gap-1">
                          {ATTENDANCE_STATUSES.map(st => (
                            <Button key={st} size="sm"
                              variant={state[s.id] === st ? "default" : "outline"}
                              onClick={() => setState({...state, [s.id]: st})}
                              className={state[s.id] === st ? (st === "حاضر" ? "bg-green-600 hover:bg-green-700" : st === "غائب" ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700") : ""}>
                              {st}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
}
