export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      complaints: {
        Row: {
          created_at: string
          id: string
          message: string
          reported_executive_id: string | null
          status: string
          subject: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          reported_executive_id?: string | null
          status?: string
          subject: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          reported_executive_id?: string | null
          status?: string
          subject?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          event_date: string
          id: string
          image_url: string | null
          location: string | null
          registration_link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          location?: string | null
          registration_link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          location?: string | null
          registration_link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      executives: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          linkedin: string | null
          name: string
          order_index: number | null
          position: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          linkedin?: string | null
          name: string
          order_index?: number | null
          position: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          linkedin?: string | null
          name?: string
          order_index?: number | null
          position?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      hall_of_fame: {
        Row: {
          achievement: string
          bio: string | null
          category: string
          created_at: string
          department: string | null
          gpa: string | null
          id: string
          image_url: string | null
          name: string
          project: string | null
          rank_position: number
          specialization: string | null
          updated_at: string
          year: string
        }
        Insert: {
          achievement: string
          bio?: string | null
          category?: string
          created_at?: string
          department?: string | null
          gpa?: string | null
          id?: string
          image_url?: string | null
          name: string
          project?: string | null
          rank_position?: number
          specialization?: string | null
          updated_at?: string
          year: string
        }
        Update: {
          achievement?: string
          bio?: string | null
          category?: string
          created_at?: string
          department?: string | null
          gpa?: string | null
          id?: string
          image_url?: string | null
          name?: string
          project?: string | null
          rank_position?: number
          specialization?: string | null
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      learning_resources: {
        Row: {
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          resource_type: string
          subject: string | null
          title: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          resource_type?: string
          subject?: string | null
          title: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          resource_type?: string
          subject?: string | null
          title?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      lecturers: {
        Row: {
          bio: string | null
          created_at: string
          department: string
          email: string | null
          id: string
          image_url: string | null
          name: string
          office_location: string | null
          specialization: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          department: string
          email?: string | null
          id?: string
          image_url?: string | null
          name: string
          office_location?: string | null
          specialization?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          department?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string
          office_location?: string | null
          specialization?: string | null
        }
        Relationships: []
      }
      past_questions: {
        Row: {
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          subject: string
          title: string
          uploaded_by: string
          year: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          subject: string
          title: string
          uploaded_by: string
          year?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          subject?: string
          title?: string
          uploaded_by?: string
          year?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          questions: Json
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          questions?: Json
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          questions?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sports: {
        Row: {
          contact_person: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          schedule: string | null
        }
        Insert: {
          contact_person?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          schedule?: string | null
        }
        Update: {
          contact_person?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          schedule?: string | null
        }
        Relationships: []
      }
      tech_giants: {
        Row: {
          achievements: string | null
          bio: string | null
          company: string
          created_at: string
          id: string
          image_url: string | null
          name: string
          position: string
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          achievements?: string | null
          bio?: string | null
          company: string
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          position: string
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          achievements?: string | null
          bio?: string | null
          company?: string
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          position?: string
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "student"
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
      user_role: ["admin", "student"],
    },
  },
} as const
