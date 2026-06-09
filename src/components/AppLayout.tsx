import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, ClipboardCheck, BarChart3, LogOut, UserCog, Tent, Package, FileText, CreditCard, Settings, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

const NAV = [
  { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { to: "/students", label: "الطلاب", icon: Users },
  { to: "/instructors", label: "المحاضرين", icon: GraduationCap },
  { to: "/courses", label: "الكورسات", icon: BookOpen },
  { to: "/schedule", label: "جدول المحاضرات", icon: Calendar },
  { to: "/attendance", label: "تسجيل الحضور", icon: ClipboardCheck },
  { to: "/camps", label: "المعسكرات", icon: Tent },
  { to: "/supplies", label: "المستلزمات", icon: Package },
  { to: "/payments", label: "المالية", icon: CreditCard },
  { to: "/forms", label: "النماذج", icon: FileText },
  { to: "/reports", label: "التقارير", icon: BarChart3 },
  { to: "/audit-logs", label: "سجل الأنشطة", icon: Clock },
  { to: "/users", label: "المستخدمون", icon: UserCog },
  { to: "/settings", label: "الإعدادات", icon: Settings },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">جاري التحميل...</div>;
  if (!user) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold">مركز الدروس</h1>
          <p className="text-xs opacity-70 mt-1">نظام إدارة الكورسات</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => {
            const active = location.pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link key={n.to} to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground/90"}`}>
                <Icon className="h-4 w-4" />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium hover:bg-sidebar-accent text-sidebar-foreground/90">
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}
