export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string
          id: string
          lecture_id: string
          notes: string | null
          status: Database["public"]["Enums"]["attendance_status_t"]
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lecture_id: string
          notes?: string | null
          status: Database["public"]["Enums"]["attendance_status_t"]
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lecture_id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status_t"]
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lectures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      camp_attendance: {
        Row: {
          camp_id: string
          created_at: string
          id: string
          notes: string | null
          slot_id: string
          status: Database["public"]["Enums"]["attendance_status_t"]
          student_id: string
          week_number: number
        }
        Insert: {
          camp_id: string
          created_at?: string
          id?: string
          notes?: string | null
          slot_id: string
          status: Database["public"]["Enums"]["attendance_status_t"]
          student_id: string
          week_number: number
        }
        Update: {
          camp_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          slot_id?: string
          status?: Database["public"]["Enums"]["attendance_status_t"]
          student_id?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "camp_attendance_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camp_attendance_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "camp_session_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camp_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "camp_students"
            referencedColumns: ["id"]
          },
        ]
      }
      camp_session_slots: {
        Row: {
          camp_id: string
          created_at: string
          end_time: string
          id: string
          sort_order: number
          start_time: string
          weekday: number
        }
        Insert: {
          camp_id: string
          created_at?: string
          end_time: string
          id?: string
          sort_order?: number
          start_time: string
          weekday: number
        }
        Update: {
          camp_id?: string
          created_at?: string
          end_time?: string
          id?: string
          sort_order?: number
          start_time?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "camp_session_slots_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
        ]
      }
      camp_students: {
        Row: {
          camp_id: string
          created_at: string
          email: string | null
          full_name: string
          grade: number
          id: string
          level: string
          parent_phone: string
        }
        Insert: {
          camp_id: string
          created_at?: string
          email?: string | null
          full_name: string
          grade: number
          id?: string
          level: string
          parent_phone: string
        }
        Update: {
          camp_id?: string
          created_at?: string
          email?: string | null
          full_name?: string
          grade?: number
          id?: string
          level?: string
          parent_phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_students_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
        ]
      }
      camp_subjects: {
        Row: {
          camp_id: string
          color: string
          created_at: string
          hours: number
          icon: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          camp_id: string
          color?: string
          created_at?: string
          hours?: number
          icon?: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          camp_id?: string
          color?: string
          created_at?: string
          hours?: number
          icon?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "camp_subjects_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
        ]
      }
      camps: {
        Row: {
          created_at: string
          id: string
          name: string
          sessions_per_week: number
          target_levels: string[]
          weeks: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          sessions_per_week?: number
          target_levels?: string[]
          weeks?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sessions_per_week?: number
          target_levels?: string[]
          weeks?: number
        }
        Relationships: []
      }
      course_instructors: {
        Row: {
          course_id: string
          instructor_id: string
        }
        Insert: {
          course_id: string
          instructor_id: string
        }
        Update: {
          course_id?: string
          instructor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_instructors_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructors_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      course_run_schedules: {
        Row: {
          created_at: string
          end_time: string
          id: string
          run_id: string
          start_time: string
          weekday: number
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          run_id: string
          start_time: string
          weekday: number
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          run_id?: string
          start_time?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_run_schedules_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "course_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      course_runs: {
        Row: {
          course_id: string
          created_at: string
          end_date: string | null
          id: string
          instructor_id: string | null
          location: string | null
          max_capacity: number
          min_capacity: number
          name: string
          notes: string | null
          start_date: string | null
          status: string
        }
        Insert: {
          course_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          instructor_id?: string | null
          location?: string | null
          max_capacity?: number
          min_capacity?: number
          name: string
          notes?: string | null
          start_date?: string | null
          status?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          instructor_id?: string | null
          location?: string | null
          max_capacity?: number
          min_capacity?: number
          name?: string
          notes?: string | null
          start_date?: string | null
          status?: string
        }
        Relationships: []
      }
      course_schedules: {
        Row: {
          course_id: string
          created_at: string
          end_time: string
          id: string
          instructor_id: string
          location: Database["public"]["Enums"]["location_t"]
          start_time: string
          weekday: number
        }
        Insert: {
          course_id: string
          created_at?: string
          end_time: string
          id?: string
          instructor_id: string
          location: Database["public"]["Enums"]["location_t"]
          start_time: string
          weekday: number
        }
        Update: {
          course_id?: string
          created_at?: string
          end_time?: string
          id?: string
          instructor_id?: string
          location?: Database["public"]["Enums"]["location_t"]
          start_time?: string
          weekday?: number
        }
        Relationships: []
      }
      course_students: {
        Row: {
          course_id: string
          discount: number
          paid_amount: number
          run_id: string | null
          student_id: string
        }
        Insert: {
          course_id: string
          discount?: number
          paid_amount?: number
          run_id?: string | null
          student_id: string
        }
        Update: {
          course_id?: string
          discount?: number
          paid_amount?: number
          run_id?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          level: string | null
          min_batch_size: number
          name: string
          price: number
          start_date: string | null
          subject: string
          syllabus: string | null
          target_gender: Database["public"]["Enums"]["target_gender_t"]
          target_stage: Database["public"]["Enums"]["stage_t"][]
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          level?: string | null
          min_batch_size?: number
          name: string
          price?: number
          start_date?: string | null
          subject: string
          syllabus?: string | null
          target_gender?: Database["public"]["Enums"]["target_gender_t"]
          target_stage?: Database["public"]["Enums"]["stage_t"][]
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          level?: string | null
          min_batch_size?: number
          name?: string
          price?: number
          start_date?: string | null
          subject?: string
          syllabus?: string | null
          target_gender?: Database["public"]["Enums"]["target_gender_t"]
          target_stage?: Database["public"]["Enums"]["stage_t"][]
        }
        Relationships: []
      }
      form_responses: {
        Row: {
          data: Json
          form_id: string
          id: string
          submitted_at: string
        }
        Insert: {
          data?: Json
          form_id: string
          id?: string
          submitted_at?: string
        }
        Update: {
          data?: Json
          form_id?: string
          id?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          confirmation_message: string
          created_at: string
          description: string | null
          fields: Json
          form_mode: string
          header_color: string
          id: string
          is_active: boolean
          show_progress_bar: boolean
          shuffle_questions: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          confirmation_message?: string
          created_at?: string
          description?: string | null
          fields?: Json
          form_mode?: string
          header_color?: string
          id?: string
          is_active?: boolean
          show_progress_bar?: boolean
          shuffle_questions?: boolean
          slug: string
          title?: string
          updated_at?: string
        }
        Update: {
          confirmation_message?: string
          created_at?: string
          description?: string | null
          fields?: Json
          form_mode?: string
          header_color?: string
          id?: string
          is_active?: boolean
          show_progress_bar?: boolean
          shuffle_questions?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          created_at: string
          full_name: string
          id: string
          is_active: boolean
          notes: string | null
          phone: string
          specialty: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          is_active?: boolean
          notes?: string | null
          phone: string
          specialty: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          phone?: string
          specialty?: string
        }
        Relationships: []
      }
      lectures: {
        Row: {
          course_id: string
          created_at: string
          date: string
          end_time: string
          id: string
          instructor_id: string
          location: Database["public"]["Enums"]["location_t"]
          notes: string | null
          run_id: string | null
          start_time: string
        }
        Insert: {
          course_id: string
          created_at?: string
          date: string
          end_time: string
          id?: string
          instructor_id: string
          location: Database["public"]["Enums"]["location_t"]
          notes?: string | null
          run_id?: string | null
          start_time: string
        }
        Update: {
          course_id?: string
          created_at?: string
          date?: string
          end_time?: string
          id?: string
          instructor_id?: string
          location?: Database["public"]["Enums"]["location_t"]
          notes?: string | null
          run_id?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "lectures_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lectures_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          academic_year: Database["public"]["Enums"]["academic_year_t"]
          birth_date: string
          created_at: string
          enrollment_date: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_t"]
          id: string
          marketing_source: string | null
          notes: string | null
          parent_phone: string
          payment_status: Database["public"]["Enums"]["payment_status_t"]
          stage: Database["public"]["Enums"]["stage_t"]
          status: string
          student_code: string | null
          student_phone: string | null
        }
        Insert: {
          academic_year: Database["public"]["Enums"]["academic_year_t"]
          birth_date: string
          created_at?: string
          enrollment_date?: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_t"]
          id?: string
          marketing_source?: string | null
          notes?: string | null
          parent_phone: string
          payment_status?: Database["public"]["Enums"]["payment_status_t"]
          stage: Database["public"]["Enums"]["stage_t"]
          status?: string
          student_code?: string | null
          student_phone?: string | null
        }
        Update: {
          academic_year?: Database["public"]["Enums"]["academic_year_t"]
          birth_date?: string
          created_at?: string
          enrollment_date?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_t"]
          id?: string
          marketing_source?: string | null
          notes?: string | null
          parent_phone?: string
          payment_status?: Database["public"]["Enums"]["payment_status_t"]
          stage?: Database["public"]["Enums"]["stage_t"]
          status?: string
          student_code?: string | null
          student_phone?: string | null
        }
        Relationships: []
      }
      supplies: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          total_quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          total_quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          total_quantity?: number
        }
        Relationships: []
      }
      supply_loans: {
        Row: {
          borrowed_at: string
          borrower_name: string
          borrower_phone: string | null
          created_at: string
          id: string
          notes: string | null
          quantity: number
          returned_at: string | null
          supply_id: string
        }
        Insert: {
          borrowed_at?: string
          borrower_name: string
          borrower_phone?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          quantity?: number
          returned_at?: string | null
          supply_id: string
        }
        Update: {
          borrowed_at?: string
          borrower_name?: string
          borrower_phone?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          quantity?: number
          returned_at?: string | null
          supply_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supply_loans_supply_id_fkey"
            columns: ["supply_id"]
            isOneToOne: false
            referencedRelation: "supplies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      derive_stage: {
        Args: { _y: Database["public"]["Enums"]["academic_year_t"] }
        Returns: Database["public"]["Enums"]["stage_t"]
      }
    }
    Enums: {
      academic_year_t:
        | "الصف الأول الابتدائي"
        | "الصف الثاني الابتدائي"
        | "الصف الثالث الابتدائي"
        | "الصف الرابع الابتدائي"
        | "الصف الخامس الابتدائي"
        | "الصف السادس الابتدائي"
        | "الصف الأول الإعدادي"
        | "الصف الثاني الإعدادي"
        | "الصف الثالث الإعدادي"
        | "الصف الأول الثانوي"
        | "الصف الثاني الثانوي"
        | "الصف الثالث الثانوي"
        | "الفرقة الأولى جامعة"
        | "الفرقة الثانية جامعة"
        | "الفرقة الثالثة جامعة"
        | "الفرقة الرابعة جامعة"
        | "الفرقة الخامسة جامعة"
        | "متخرج"
      attendance_status_t: "حاضر" | "غائب" | "متأخر"
      gender_t: "ذكر" | "أنثى"
      location_t: "A" | "B" | "C"
      payment_status_t: "مدفوع" | "غير مدفوع" | "مدفوع جزئياً"
      stage_t:
        | "ابتدائي صغير"
        | "ابتدائي كبير"
        | "إعدادي"
        | "ثانوي"
        | "جامعة / متخرج"
      target_gender_t: "ذكور" | "إناث" | "مختلط"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      academic_year_t: [
        "الصف الأول الابتدائي",
        "الصف الثاني الابتدائي",
        "الصف الثالث الابتدائي",
        "الصف الرابع الابتدائي",
        "الصف الخامس الابتدائي",
        "الصف السادس الابتدائي",
        "الصف الأول الإعدادي",
        "الصف الثاني الإعدادي",
        "الصف الثالث الإعدادي",
        "الصف الأول الثانوي",
        "الصف الثاني الثانوي",
        "الصف الثالث الثانوي",
        "الفرقة الأولى جامعة",
        "الفرقة الثانية جامعة",
        "الفرقة الثالثة جامعة",
        "الفرقة الرابعة جامعة",
        "الفرقة الخامسة جامعة",
        "متخرج",
      ],
      attendance_status_t: ["حاضر", "غائب", "متأخر"],
      gender_t: ["ذكر", "أنثى"],
      location_t: ["A", "B", "C"],
      payment_status_t: ["مدفوع", "غير مدفوع", "مدفوع جزئياً"],
      stage_t: [
        "ابتدائي صغير",
        "ابتدائي كبير",
        "إعدادي",
        "ثانوي",
        "جامعة / متخرج",
      ],
      target_gender_t: ["ذكور", "إناث", "مختلط"],
    },
  },
} as const
