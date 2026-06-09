import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}
