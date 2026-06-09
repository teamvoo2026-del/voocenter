import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ws.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
async function logAction({
  action_type,
  entity_type,
  entity_id,
  old_values,
  new_values
}) {
  console.log("[AuditLogService] Function called for:", action_type);
  try {
    const userAgent = navigator.userAgent;
    const payload = {
      action_type,
      entity_type,
      entity_id: entity_id?.toString(),
      old_values,
      new_values,
      user_agent: userAgent,
      ip_address: "Client Side",
      user_name: "System Debug",
      user_role: "admin"
    };
    console.log("[AuditLogService] Inserting log:", payload);
    const { error } = await supabase.from("audit_logs").insert(payload);
    if (error) {
      console.error("[AuditLogService] Error saving log:", error.message, error.details);
    } else {
      console.log("[AuditLogService] Log inserted successfully");
    }
  } catch (err) {
    console.error("[AuditLogService] Unexpected error:", err);
  }
}
const AuthCtx = reactExports.createContext({ user: null, session: null, loading: true });
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" && s?.user) {
        logAction({ action_type: "LOGIN", new_values: { email: s.user.email } });
      } else if (event === "SIGNED_OUT") {
        logAction({ action_type: "LOGOUT" });
      }
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthCtx.Provider, { value: { user: session?.user ?? null, session, loading }, children });
}
const useAuth = () => reactExports.useContext(AuthCtx);
const appCss = "/assets/styles-DvuVRGa4.css";
const Route$k = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "مركز الدروس - نظام الإدارة" },
      { name: "description", content: "نظام إدارة مركز الدروس والكورسات" },
      { property: "og:title", content: "مركز الدروس - نظام الإدارة" },
      { name: "twitter:title", content: "مركز الدروس - نظام الإدارة" },
      { property: "og:description", content: "نظام إدارة مركز الدروس والكورسات" },
      { name: "twitter:description", content: "نظام إدارة مركز الدروس والكورسات" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/oiGvxs43PGXLyjvtam71Wfm9q4L2/social-images/social-1780762194796-VOO.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/oiGvxs43PGXLyjvtam71Wfm9q4L2/social-images/social-1780762194796-VOO.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "ar", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$k.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$i = () => import("./users-BmxMaMpU.mjs");
const Route$j = createFileRoute("/users")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./supplies-BHiMmPHC.mjs");
const Route$i = createFileRoute("/supplies")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./students-A8gWpLBz.mjs");
const Route$h = createFileRoute("/students")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./settings-DyN0KnjT.mjs");
const Route$g = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./schedule-CGEDp7Pe.mjs");
const Route$f = createFileRoute("/schedule")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./reports-BO3zUpfI.mjs");
const Route$e = createFileRoute("/reports")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./payments-LC_axDKo.mjs");
const Route$d = createFileRoute("/payments")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./login-tF8ey3pS.mjs");
const Route$c = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./instructors-UT9IdU9t.mjs");
const Route$b = createFileRoute("/instructors")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./forms-BFsOu0JM.mjs");
const Route$a = createFileRoute("/forms")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./dashboard-3nepTSGj.mjs");
const Route$9 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./courses-6js70NRR.mjs");
const Route$8 = createFileRoute("/courses")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./camps-o1UzVUXC.mjs");
const Route$7 = createFileRoute("/camps")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./audit-logs-CD7kDSYv.mjs");
const Route$6 = createFileRoute("/audit-logs")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./attendance-BzMbn_58.mjs");
const Route$5 = createFileRoute("/attendance")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$4 = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  }
});
const $$splitComponentImporter$3 = () => import("./forms.index-DhyFs2ZV.mjs");
const Route$3 = createFileRoute("/forms/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./form._slug-D-QIN-7B.mjs");
const Route$2 = createFileRoute("/form/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./forms._id.responses-bMaymkZT.mjs");
const Route$1 = createFileRoute("/forms/$id/responses")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./forms._id.edit-DVaZlJPi.mjs");
const Route = createFileRoute("/forms/$id/edit")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const UsersRoute = Route$j.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => Route$k
});
const SuppliesRoute = Route$i.update({
  id: "/supplies",
  path: "/supplies",
  getParentRoute: () => Route$k
});
const StudentsRoute = Route$h.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => Route$k
});
const SettingsRoute = Route$g.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$k
});
const ScheduleRoute = Route$f.update({
  id: "/schedule",
  path: "/schedule",
  getParentRoute: () => Route$k
});
const ReportsRoute = Route$e.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$k
});
const PaymentsRoute = Route$d.update({
  id: "/payments",
  path: "/payments",
  getParentRoute: () => Route$k
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$k
});
const InstructorsRoute = Route$b.update({
  id: "/instructors",
  path: "/instructors",
  getParentRoute: () => Route$k
});
const FormsRoute = Route$a.update({
  id: "/forms",
  path: "/forms",
  getParentRoute: () => Route$k
});
const DashboardRoute = Route$9.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$k
});
const CoursesRoute = Route$8.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$k
});
const CampsRoute = Route$7.update({
  id: "/camps",
  path: "/camps",
  getParentRoute: () => Route$k
});
const AuditLogsRoute = Route$6.update({
  id: "/audit-logs",
  path: "/audit-logs",
  getParentRoute: () => Route$k
});
const AttendanceRoute = Route$5.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const FormsIndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => FormsRoute
});
const FormSlugRoute = Route$2.update({
  id: "/form/$slug",
  path: "/form/$slug",
  getParentRoute: () => Route$k
});
const FormsIdResponsesRoute = Route$1.update({
  id: "/$id/responses",
  path: "/$id/responses",
  getParentRoute: () => FormsRoute
});
const FormsIdEditRoute = Route.update({
  id: "/$id/edit",
  path: "/$id/edit",
  getParentRoute: () => FormsRoute
});
const FormsRouteChildren = {
  FormsIndexRoute,
  FormsIdEditRoute,
  FormsIdResponsesRoute
};
const FormsRouteWithChildren = FormsRoute._addFileChildren(FormsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AttendanceRoute,
  AuditLogsRoute,
  CampsRoute,
  CoursesRoute,
  DashboardRoute,
  FormsRoute: FormsRouteWithChildren,
  InstructorsRoute,
  LoginRoute,
  PaymentsRoute,
  ReportsRoute,
  ScheduleRoute,
  SettingsRoute,
  StudentsRoute,
  SuppliesRoute,
  UsersRoute,
  FormSlugRoute
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  Route$1 as a,
  Route as b,
  logAction as l,
  router as r,
  useAuth as u
};
