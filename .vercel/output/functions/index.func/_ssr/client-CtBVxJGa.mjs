import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { W as WebSocket } from "../_libs/ws.mjs";
const SUPABASE_URL = "https://krvccttxjtnbhnglcgjs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mAuxb2HN4O06XnaAiL1pgA_nuaLwNVX";
const isServer = typeof window === "undefined";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: isServer ? void 0 : window.localStorage,
    persistSession: true,
    autoRefreshToken: true
  },
  realtime: isServer ? { transport: WebSocket } : {}
});
export {
  supabase as s
};
