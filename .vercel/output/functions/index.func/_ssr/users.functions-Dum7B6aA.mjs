import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-Pb1bteje.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-tNxzI2MB.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { W as WebSocket } from "../_libs/ws.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.warn(`[Supabase] ${message}`);
    if (!SUPABASE_URL) return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    },
    realtime: {
      transport: WebSocket
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const listUsers_createServerFn_handler = createServerRpc({
  id: "d96fc76850779782acfe0d57c8df91435fcd2dbdbbe157b34f6d9842c0ffc4b6",
  name: "listUsers",
  filename: "src/lib/users.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsers_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 200
  });
  if (error) throw new Error(error.message);
  return {
    users: data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      full_name: u.user_metadata?.full_name || "",
      created_at: u.created_at
    }))
  };
});
const createUser_createServerFn_handler = createServerRpc({
  id: "39d053ca3c166648240f19533479adb240c32f2d28b6e9dda4814e0fad8105f2",
  name: "createUser",
  filename: "src/lib/users.functions.ts"
}, (opts) => createUser.__executeServer(opts));
const createUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  email: stringType().email().max(255),
  password: stringType().min(6).max(72),
  full_name: stringType().min(2).max(255)
}).parse(d)).handler(createUser_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: data.full_name
    }
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteUser_createServerFn_handler = createServerRpc({
  id: "1b36e79fb17473cbea5838cc48bfefe7de129ef1bef3a743aa78716aa93765db",
  name: "deleteUser",
  filename: "src/lib/users.functions.ts"
}, (opts) => deleteUser.__executeServer(opts));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteUser_createServerFn_handler, async ({
  data,
  context
}) => {
  if (data.id === context.userId) throw new Error("لا يمكنك حذف حسابك");
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  createUser_createServerFn_handler,
  deleteUser_createServerFn_handler,
  listUsers_createServerFn_handler
};
