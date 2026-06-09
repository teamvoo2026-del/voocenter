import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// High-level dependent tables must be deleted first to prevent Foreign Key constraint errors.
const DELETE_ORDER = [
  "camp_attendance",
  "attendance",
  "lectures",
  "course_instructors",
  "course_students",
  "payments",
  "supply_loans",
  "form_responses",
  "camp_students",
  "camp_session_slots",
  "camp_subjects",
  "courses",
  "students",
  "instructors",
  "forms",
  "supplies",
  "camps"
];

// Independent tables go first. Dependents follow.
const INSERT_ORDER = [
  "camps",
  "courses",
  "students",
  "instructors",
  "forms",
  "supplies",
  "camp_subjects",
  "camp_session_slots",
  "camp_students",
  "lectures",
  "form_responses",
  "supply_loans",
  "course_instructors",
  "course_students",
  "payments",
  "attendance",
  "camp_attendance"
];

export async function exportDatabase() {
  try {
    const backup: Record<string, any[]> = {};
    
    // Fetch all tables
    for (const table of INSERT_ORDER) {
      const { data, error } = await supabase.from(table as any).select("*");
      if (error) throw error;
      backup[table] = data || [];
    }

    // Convert to JSON and trigger download
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `voocenter_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error: any) {
    console.error("Backup error:", error);
    toast.error("فشل في إنشاء النسخة الاحتياطية: " + error.message);
    return false;
  }
}

export async function restoreDatabase(jsonString: string) {
  try {
    const backup = JSON.parse(jsonString);
    
    // 1. Verify it looks like a valid backup
    const tablesInBackup = Object.keys(backup);
    if (!tablesInBackup.includes("students") || !tablesInBackup.includes("courses")) {
      throw new Error("ملف النسخة الاحتياطية غير صالح أو تالف.");
    }

    // 2. Wipe existing data in reverse dependency order
    for (const table of DELETE_ORDER) {
      // Bulk delete using a condition that matches everything.
      // RLS must allow this. neq id to 'dummy' typically works.
      const { error } = await supabase.from(table as any).delete().neq("id", "00000000-0000-0000-0000-000000000000");
      if (error) {
         console.error(`Error deleting table ${table}:`, error);
         throw new Error(`فشل في مسح بيانات الجدول: ${table} - ` + error.message);
      }
    }

    // 3. Insert data from backup in forward dependency order
    for (const table of INSERT_ORDER) {
      const rows = backup[table];
      if (rows && rows.length > 0) {
        // We can use UPSERT or just INSERT since table is empty
        const { error } = await supabase.from(table as any).insert(rows);
        if (error) {
           console.error(`Error inserting into ${table}:`, error);
           throw new Error(`فشل في استرجاع بيانات الجدول: ${table} - ` + error.message);
        }
      }
    }

    return true;
  } catch (error: any) {
    console.error("Restore error:", error);
    toast.error("فشل في الاسترجاع: " + (error.message || "خطأ غير معروف"));
    return false;
  }
}
