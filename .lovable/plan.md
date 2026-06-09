# خطة التطوير الشاملة — نظام إدارة المركز

## 1. تحليل المشاكل الجذرية

| # | المشكلة | السبب الجذري |
|---|---------|--------------|
| 1 | الطالب مجبر يختار Batch وقت التسجيل | `course_students.run_id` nullable لكن الـ UX بيدفع الاختيار |
| 2 | المدفوعات سطحية | حقلين فقط على `course_students`: `paid_amount` + `payment_status` على `students` |
| 3 | Dashboard فقير | 5 KPIs فقط، مفيش تنبيهات ولا حسابات مالية |
| 4 | الحضور بطيء | إدخال فردي بدون Bulk/Shortcuts |
| 5 | مفيش بحث موحد | كل صفحة بحث محلي |
| 6 | Batch بدون سعة/حالة | `course_runs` ما فيهاش min/max/status |
| 7 | Student status مفقود | مفيش عمود `status` على `students` |
| 8 | مفيش إشعارات | لا يوجد نظام أصلاً |
| 9 | تقارير ضعيفة | `reports.tsx` أساسية |

---

## 2. تصميم قاعدة البيانات (التغييرات)

### 2.1 جداول جديدة

```sql
-- نظام مدفوعات احترافي
CREATE TABLE public.payments (
  id UUID PK,
  student_id UUID NOT NULL,
  course_id UUID NOT NULL,
  run_id UUID NULL,                    -- اختياري
  amount NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL,         -- cash/instapay/visa/transfer
  receipt_number TEXT UNIQUE,
  paid_at TIMESTAMPTZ DEFAULT now(),
  installment_number INT,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ
);

-- خطط الأقساط
CREATE TABLE public.payment_plans (
  id UUID PK,
  student_id UUID, course_id UUID,
  total_amount NUMERIC, discount NUMERIC DEFAULT 0,
  installments_count INT DEFAULT 1,
  status TEXT DEFAULT 'active'         -- active/completed/cancelled
);

CREATE TABLE public.payment_schedule (
  id UUID PK,
  plan_id UUID, due_date DATE,
  amount_due NUMERIC, amount_paid NUMERIC DEFAULT 0,
  status TEXT                          -- pending/paid/overdue/partial
);

-- الإشعارات
CREATE TABLE public.notifications (
  id UUID PK,
  type TEXT,                           -- payment_due/absence/batch_full/lecture_reminder
  severity TEXT,                       -- info/warning/critical
  title TEXT, body TEXT,
  related_entity_type TEXT,            -- student/course/run
  related_entity_id UUID,
  target_user_id UUID NULL,            -- NULL = admins
  read_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ
);
```

### 2.2 تعديلات على جداول قائمة

```sql
-- حالة الطالب
ALTER TABLE students ADD COLUMN status TEXT 
  DEFAULT 'active' CHECK (status IN ('active','inactive','graduated','suspended'));
ALTER TABLE students ADD COLUMN student_code TEXT UNIQUE;  -- ST001, ST002 ...
ALTER TABLE students ADD COLUMN marketing_source TEXT;

-- سعة وحالة المجموعات
ALTER TABLE course_runs ADD COLUMN min_capacity INT DEFAULT 5;
ALTER TABLE course_runs ADD COLUMN max_capacity INT DEFAULT 25;
ALTER TABLE course_runs ADD COLUMN status TEXT DEFAULT 'open'
  CHECK (status IN ('open','active','completed','cancelled'));
ALTER TABLE course_runs ADD COLUMN total_lectures INT DEFAULT 0;

-- حد أدنى لفتح Batch لكل كورس
ALTER TABLE courses ADD COLUMN min_batch_size INT DEFAULT 8;
ALTER TABLE courses ADD COLUMN level TEXT;  -- beginner/intermediate/advanced
ALTER TABLE courses ADD COLUMN total_hours INT;
```

### 2.3 Views للأداء

```sql
CREATE VIEW v_run_progress AS
SELECT r.id, r.course_id, r.max_capacity,
  COUNT(DISTINCT cs.student_id) AS enrolled,
  ROUND(100.0 * COUNT(cs.student_id) / NULLIF(r.max_capacity,0), 1) AS fill_pct,
  COUNT(DISTINCT l.id) AS lectures_count
FROM course_runs r
LEFT JOIN course_students cs ON cs.run_id = r.id
LEFT JOIN lectures l ON l.run_id = r.id
GROUP BY r.id;

CREATE VIEW v_student_balance AS
SELECT cs.student_id, cs.course_id,
  c.price - cs.discount AS total_due,
  COALESCE(SUM(p.amount),0) AS total_paid,
  (c.price - cs.discount) - COALESCE(SUM(p.amount),0) AS remaining
FROM course_students cs
JOIN courses c ON c.id = cs.course_id
LEFT JOIN payments p ON p.student_id = cs.student_id AND p.course_id = cs.course_id
GROUP BY cs.student_id, cs.course_id, c.price, cs.discount;
```

### 2.4 ERD مبسط

```text
students ──< course_students >── courses
                │                    │
                │                    └──< course_runs ──< lectures ──< attendance
                │                              ↑                          ↑
                └──< payments >─────payment_plans                         │
                                          └──< payment_schedule          │
                                                                          │
notifications (polymorphic via related_entity)──────────────────────────┘
```

### Backward Compatibility
- كل التعديلات `ADD COLUMN` بـ DEFAULT → لا تكسر بيانات.
- البيانات القديمة في `paid_amount` تتنقل عبر migration script لـ `payments` كقيد واحد.

---

## 3. Backend (Server Functions)

كل العمليات الحساسة تتحول لـ `createServerFn` مع `requireSupabaseAuth`:

```
src/lib/
├── payments.functions.ts     # createPayment, listPayments, getBalance
├── batches.functions.ts      # promoteWaitlist, openBatch, closeBatch
├── notifications.functions.ts # listNotifications, markRead, generateAlerts
├── dashboard.functions.ts    # getExecutiveKpis
├── search.functions.ts       # globalSearch(q)
└── reports.functions.ts      # financialReport, attendanceReport, ...
```

مثال:
```ts
export const promoteWaitlistToBatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({
    runId: z.string().uuid(),
    studentIds: z.array(z.string().uuid()).min(1).max(100),
  }).parse)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { error } = await supabase.from("course_students")
      .update({ run_id: data.runId })
      .in("student_id", data.studentIds)
      .is("run_id", null);
    if (error) throw new Error(error.message);
    return { moved: data.studentIds.length };
  });
```

---

## 4. Frontend — الشاشات الجديدة/المعدّلة

| الشاشة | التغيير |
|--------|---------|
| `students.tsx` | فصل التسجيل: اختيار الكورس فقط (الـ Batch تختفي)، عمود Status + Filter، حقل كود الطالب |
| `courses.tsx` | كارت كل Batch يعرض Progress Bar (enrolled/max)، Status Badge، زر "نقل دفعة من Waitlist" |
| `attendance.tsx` | أزرار: "تحديد الكل حاضر/غائب"، Keyboard shortcuts (H/A/L/سهم لأسفل)، عداد مباشر |
| `dashboard.tsx` | صف KPIs مالية + Alerts Panel + Top Courses + Batches قاربت تكتمل |
| `payments.tsx` (جديد) | سجل دفعات، إنشاء دفعة، خطة أقساط، رصيد متبقي |
| `notifications.tsx` (جديد) | قائمة + Filter بالنوع + Mark read |
| `reports.tsx` | 5 تابات: مالي / حضور / طلاب / مدربين / كورسات |
| `AppLayout.tsx` | Global Search (Cmd+K Dialog) + Bell icon |

### User Flow الجديد (تسجيل → Batch)
```
[تسجيل طالب] → اختيار الكورس → Waitlist
                                  ↓
                  [Dashboard: 12 طالب جاهزين لكورس X]
                                  ↓
                       [فتح Batch جديد + مواعيد]
                                  ↓
                    [اختيار الطلاب جماعياً → نقل]
                                  ↓
                       [Batch ACTIVE + محاضرات تتولد]
```

---

## 5. مراحل التنفيذ (6 مراحل)

### المرحلة 1 — Quick Wins (لا تغييرات DB كبيرة) — ⚡
- Bulk Attendance + Shortcuts
- Mark All Present/Absent
- Empty states + Loading skeletons
- إصلاح فصل التسجيل عن Batch في `students.tsx` (run_id = null دائماً)

### المرحلة 2 — Schema الأساسي
- Migration: `students.status`, `student_code`, `course_runs.min/max/status`, `courses.min_batch_size`
- Filter بالحالة في صفحة الطلاب
- Batch Progress Bar + Status Badge في صفحة الكورسات
- تنبيه "Waitlist وصل للحد الأدنى" داخل `courses.tsx`

### المرحلة 3 — نظام المدفوعات
- Migration: `payments` + `payment_plans` + `payment_schedule` + Views
- Migration script: نقل `paid_amount` لـ payment واحد
- `payments.functions.ts` + شاشة Payments
- Receipt number generator (sequence)

### المرحلة 4 — Dashboard التنفيذي + Global Search
- `dashboard.functions.ts` يجمع كل الـ KPIs في call واحد
- Refactor `dashboard.tsx`
- `search.functions.ts` + Cmd+K Dialog في AppLayout

### المرحلة 5 — الإشعارات
- جدول `notifications` + Server fn
- Cron عبر pg_cron (يومياً):
  - يحسب طلاب غابوا 3+
  - يحسب دفعات متأخرة
  - يحسب Batches اكتملت
- Bell icon + Dropdown + صفحة كاملة

### المرحلة 6 — التقارير الاحترافية
- 5 تقارير + Export CSV/PDF
- Charts (Recharts) للإيرادات الشهرية، نسبة الحضور، أداء المدرب

---

## 6. الأمان (Security)

- كل الجداول الجديدة: RLS enabled + policy `auth.uid() IS NOT NULL` (نفس النمط الحالي)
- GRANT للـ `authenticated` و `service_role` فقط
- Server functions: `requireSupabaseAuth` على كل operation حساسة
- Input validation بـ Zod على كل server fn (min/max lengths)
- Payments: `created_by = auth.uid()` للـ audit trail
- Receipt numbers: عبر Postgres sequence (atomic, لا duplicates)

## 7. Scalability

- **Indexes**: على `payments(student_id, course_id)`, `attendance(lecture_id)`, `notifications(target_user_id, read_at)`, `course_students(course_id, run_id)`
- **Views** بدل JOINs المتكررة في الـ frontend
- **Pagination** على كل القوائم (>100 صف) — React Query + range
- **Batch operations**: استخدام `.in()` بدل loops
- **pg_cron** للحسابات الدورية (تنبيهات) بدل real-time queries
- Server functions تحت 100ms متوسط (Worker runtime)

---

## 8. القرار المطلوب

أقترح أبدأ تنفيذ **المرحلتين 1 و 2 معاً** في هذا اللوب (Quick Wins + Schema الأساسي + Student Status + Batch Capacity)، لأنها:
- بتحل أكتر مشكلتين يومياً (الحضور البطيء + فصل التسجيل عن Batch)
- ما بتكسرش حاجة موجودة
- بتمهّد للمدفوعات والـ Dashboard في المرحلة اللي بعدها

**وافق على البدء بالمرحلة 1+2، أو حدد لي مرحلة معينة تحب نبدأ بيها.**
