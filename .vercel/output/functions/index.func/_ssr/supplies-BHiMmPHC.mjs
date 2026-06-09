import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout } from "./AppLayout-Djyspz6o.mjs";
import { s as supabase } from "./client-CtBVxJGa.mjs";
import { B as Button } from "./button-DFq6wyQb.mjs";
import { I as Input } from "./input-DwLOemhC.mjs";
import { L as Label } from "./label-D5ZaGqke.mjs";
import { T as Textarea } from "./textarea-CKmLuS07.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CaankBVl.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bcc_pQtT.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-C9L4k44O.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D8TlrQb-.mjs";
import { B as Badge } from "./badge-D8UhsIhM.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BP4zpGrs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/ws.mjs";
import { H as HandHelping, P as Plus, a as Package, b as Pencil, T as Trash2, R as RotateCcw } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./router-B0juCGTQ.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./sonner-DeNSN9-c.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
function SuppliesPage() {
  const [supplies, setSupplies] = reactExports.useState([]);
  const [loans, setLoans] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [supplyDlg, setSupplyDlg] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [sName, setSName] = reactExports.useState("");
  const [sQty, setSQty] = reactExports.useState("1");
  const [sNotes, setSNotes] = reactExports.useState("");
  const [loanDlg, setLoanDlg] = reactExports.useState(false);
  const [lSupply, setLSupply] = reactExports.useState("");
  const [lBorrower, setLBorrower] = reactExports.useState("");
  const [lPhone, setLPhone] = reactExports.useState("");
  const [lQty, setLQty] = reactExports.useState("1");
  const [lNotes, setLNotes] = reactExports.useState("");
  const load = async () => {
    setLoading(true);
    const [s, l] = await Promise.all([supabase.from("supplies").select("*").order("name"), supabase.from("supply_loans").select("*").order("borrowed_at", {
      ascending: false
    })]);
    if (s.error) toast.error(s.error.message);
    else setSupplies(s.data);
    if (l.error) toast.error(l.error.message);
    else setLoans(l.data);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const availability = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const s of supplies) map.set(s.id, s.total_quantity);
    for (const l of loans) {
      if (!l.returned_at) map.set(l.supply_id, (map.get(l.supply_id) ?? 0) - l.quantity);
    }
    return map;
  }, [supplies, loans]);
  const activeLoans = loans.filter((l) => !l.returned_at);
  const history = loans.filter((l) => l.returned_at);
  const supplyName = (id) => supplies.find((s) => s.id === id)?.name ?? "—";
  const openAddSupply = () => {
    setEditing(null);
    setSName("");
    setSQty("1");
    setSNotes("");
    setSupplyDlg(true);
  };
  const openEditSupply = (s) => {
    setEditing(s);
    setSName(s.name);
    setSQty(String(s.total_quantity));
    setSNotes(s.notes ?? "");
    setSupplyDlg(true);
  };
  const saveSupply = async () => {
    if (!sName.trim()) return toast.error("اكتب اسم القطعة");
    const qty = Number(sQty);
    if (!Number.isFinite(qty) || qty < 0) return toast.error("الكمية غير صحيحة");
    const payload = {
      name: sName.trim(),
      total_quantity: qty,
      notes: sNotes.trim() || null
    };
    const res = editing ? await supabase.from("supplies").update(payload).eq("id", editing.id) : await supabase.from("supplies").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("تم الحفظ");
    setSupplyDlg(false);
    load();
  };
  const deleteSupply = async (id) => {
    if (!confirm("حذف القطعة وكل سجلات استعارتها؟")) return;
    const {
      error
    } = await supabase.from("supplies").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };
  const openAddLoan = (supplyId) => {
    setLSupply(supplyId ?? "");
    setLBorrower("");
    setLPhone("");
    setLQty("1");
    setLNotes("");
    setLoanDlg(true);
  };
  const saveLoan = async () => {
    if (!lSupply) return toast.error("اختار القطعة");
    if (!lBorrower.trim()) return toast.error("اكتب اسم المستعير");
    const qty = Number(lQty);
    if (!Number.isFinite(qty) || qty <= 0) return toast.error("الكمية غير صحيحة");
    const avail = availability.get(lSupply) ?? 0;
    if (qty > avail) return toast.error(`المتاح حالياً: ${avail}`);
    const {
      error
    } = await supabase.from("supply_loans").insert({
      supply_id: lSupply,
      borrower_name: lBorrower.trim(),
      borrower_phone: lPhone.trim() || null,
      quantity: qty,
      notes: lNotes.trim() || null
    });
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل الاستعارة");
    setLoanDlg(false);
    load();
  };
  const returnLoan = async (id) => {
    const {
      error
    } = await supabase.from("supply_loans").update({
      returned_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل الإرجاع");
    load();
  };
  const deleteLoan = async (id) => {
    if (!confirm("حذف سجل الاستعارة؟")) return;
    const {
      error
    } = await supabase.from("supply_loans").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "المستلزمات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "إدارة العُهد والاستعارات" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => openAddLoan(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandHelping, { className: "h-4 w-4" }),
            "تسجيل استعارة"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAddSupply, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "إضافة قطعة"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "إجمالي القطع" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: supplies.length }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "استعارات نشطة" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: activeLoans.length }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "إجمالي الكميات" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: supplies.reduce((a, s) => a + s.total_quantity, 0) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "inventory", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "inventory", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 ml-1" }),
            "المخزون"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandHelping, { className: "h-4 w-4 ml-1" }),
            "الاستعارات الحالية"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "history", children: "السجل" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "inventory", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: "جاري التحميل..." }) : supplies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: 'لا توجد قطع — اضغط "إضافة قطعة"' }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الاسم" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الإجمالي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "المتاح" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الحالة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ملاحظات" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-left", children: "إجراءات" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: supplies.map((s) => {
            const avail = availability.get(s.id) ?? 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.total_quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: avail === 0 ? "text-destructive font-bold" : avail < s.total_quantity ? "text-amber-600 font-semibold" : "text-emerald-600 font-semibold", children: avail }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: avail === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "غير متاحة" }) : avail < s.total_quantity ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500", children: "جزئياً" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-600", children: "متاحة" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: s.notes ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", disabled: avail === 0, onClick: () => openAddLoan(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandHelping, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => openEditSupply(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteSupply(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] }) })
            ] }, s.id);
          }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: activeLoans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "لا توجد استعارات حالية" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "القطعة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "المستعير" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الهاتف" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الكمية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "تاريخ الاستعارة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-left", children: "إجراءات" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: activeLoans.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: supplyName(l.supply_id) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.borrower_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.borrower_phone ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(l.borrowed_at).toLocaleDateString("ar-EG") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => returnLoan(l.id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
                "إرجاع"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteLoan(l.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] }) })
          ] }, l.id)) })
        ] }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "لا يوجد سجل" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "القطعة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "المستعير" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الكمية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الاستعارة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الإرجاع" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: history.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: supplyName(l.supply_id) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.borrower_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(l.borrowed_at).toLocaleDateString("ar-EG") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.returned_at ? new Date(l.returned_at).toLocaleDateString("ar-EG") : "—" })
          ] }, l.id)) })
        ] }) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: supplyDlg, onOpenChange: setSupplyDlg, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "تعديل قطعة" : "إضافة قطعة" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الاسم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: sName, onChange: (e) => setSName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الكمية الإجمالية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: sQty, onChange: (e) => setSQty(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ملاحظات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: sNotes, onChange: (e) => setSNotes(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setSupplyDlg(false), children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveSupply, children: "حفظ" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: loanDlg, onOpenChange: setLoanDlg, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "تسجيل استعارة" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "القطعة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: lSupply, onValueChange: setLSupply, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "اختر القطعة" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: supplies.map((s) => {
              const a = availability.get(s.id) ?? 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, disabled: a === 0, children: [
                s.name,
                " (متاح: ",
                a,
                ")"
              ] }, s.id);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "اسم المستعير" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: lBorrower, onChange: (e) => setLBorrower(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "رقم الهاتف (اختياري)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: lPhone, onChange: (e) => setLPhone(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "الكمية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: lQty, onChange: (e) => setLQty(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ملاحظات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: lNotes, onChange: (e) => setLNotes(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setLoanDlg(false), children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveLoan, children: "حفظ" })
      ] })
    ] }) })
  ] });
}
export {
  SuppliesPage as component
};
