import { supabase } from "@/integrations/supabase/client";

export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "PASSWORD_CHANGE" | "ROLE_CHANGE";

export interface LogActionParams {
  action_type: AuditAction;
  entity_type?: string;
  entity_id?: string;
  old_values?: any;
  new_values?: any;
}

/**
 * AuditLogService
 * Centralized service to record application actions.
 */
export async function logAction({
  action_type,
  entity_type,
  entity_id,
  old_values,
  new_values,
}: LogActionParams) {
  console.log("[AuditLogService] Function called for:", action_type);
  try {
    const userAgent = navigator.userAgent;
    
    // Fallback to anonymous if auth is causing issues
    const payload = {
      action_type,
      entity_type,
      entity_id: entity_id?.toString(),
      old_values,
      new_values,
      user_agent: userAgent,
      ip_address: "Client Side",
      user_name: "System Debug",
      user_role: "admin",
    };

    console.log("[AuditLogService] Inserting log:", payload);
    const { error } = await supabase
      .from("audit_logs")
      .insert(payload);

    if (error) {
      console.error("[AuditLogService] Error saving log:", error.message, error.details);
    } else {
      console.log("[AuditLogService] Log inserted successfully");
    }
  } catch (err) {
    console.error("[AuditLogService] Unexpected error:", err);
  }
}
