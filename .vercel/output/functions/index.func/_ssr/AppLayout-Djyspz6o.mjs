import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { u as useAuth } from "./router-B0juCGTQ.mjs";
import { T as Toaster } from "./sonner-DeNSN9-c.mjs";
import { K as LayoutDashboard, h as Users, G as GraduationCap, l as BookOpen, p as Calendar, k as ClipboardCheck, q as Tent, a as Package, C as CreditCard, t as FileText, u as ChartColumn, f as Clock, N as UserCog, x as Settings, O as LogOut } from "../_libs/lucide-react.mjs";
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
  { to: "/reports", label: "التقارير", icon: ChartColumn },
  { to: "/audit-logs", label: "سجل الأنشطة", icon: Clock },
  { to: "/users", label: "المستخدمون", icon: UserCog },
  { to: "/settings", label: "الإعدادات", icon: Settings }
];
function AppLayout({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: "جاري التحميل..." });
  if (!user) return null;
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: "rtl", className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "مركز الدروس" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mt-1", children: "نظام إدارة الكورسات" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-3 space-y-1", children: NAV.map((n) => {
        const active = location.pathname.startsWith(n.to);
        const Icon = n.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: n.to,
            className: `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground/90"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.label })
            ]
          },
          n.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleLogout,
          className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium hover:bg-sidebar-accent text-sidebar-foreground/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تسجيل الخروج" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-8 max-w-[1400px] mx-auto", children }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
export {
  AppLayout as A
};
