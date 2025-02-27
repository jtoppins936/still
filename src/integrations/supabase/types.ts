export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      auctions: {
        Row: {
          acres: number
          auction_url: string
          county: string
          created_at: string | null
          current_bid: number | null
          cusip: string | null
          description: string
          expiration_date: string
          id: string
          image_url: string
          interest_rate: number | null
          maturity_date: string | null
          security_type: string | null
          source: string
          starting_bid: number
          state: string
          title: string
          updated_at: string | null
        }
        Insert: {
          acres: number
          auction_url: string
          county: string
          created_at?: string | null
          current_bid?: number | null
          cusip?: string | null
          description: string
          expiration_date: string
          id?: string
          image_url: string
          interest_rate?: number | null
          maturity_date?: string | null
          security_type?: string | null
          source: string
          starting_bid: number
          state: string
          title: string
          updated_at?: string | null
        }
        Update: {
          acres?: number
          auction_url?: string
          county?: string
          created_at?: string | null
          current_bid?: number | null
          cusip?: string | null
          description?: string
          expiration_date?: string
          id?: string
          image_url?: string
          interest_rate?: number | null
          maturity_date?: string | null
          security_type?: string | null
          source?: string
          starting_bid?: number
          state?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blocked_sites: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          site_domain: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          site_domain: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          site_domain?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blocking_schedules: {
        Row: {
          created_at: string | null
          days_of_week: string[]
          end_time: string
          id: string
          is_active: boolean | null
          start_time: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          days_of_week: string[]
          end_time: string
          id?: string
          is_active?: boolean | null
          start_time: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          days_of_week?: string[]
          end_time?: string
          id?: string
          is_active?: boolean | null
          start_time?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blocking_statistics: {
        Row: {
          blocked_count: number | null
          created_at: string | null
          id: string
          site_domain: string
          total_time_blocked: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blocked_count?: number | null
          created_at?: string | null
          id?: string
          site_domain: string
          total_time_blocked?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blocked_count?: number | null
          created_at?: string | null
          id?: string
          site_domain?: string
          total_time_blocked?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration_minutes: number
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration_minutes: number
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration_minutes?: number
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      declutter_items: {
        Row: {
          category: string
          completed: boolean | null
          created_at: string | null
          id: string
          item_name: string
          reflection: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          completed?: boolean | null
          created_at?: string | null
          id?: string
          item_name: string
          reflection?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          completed?: boolean | null
          created_at?: string | null
          id?: string
          item_name?: string
          reflection?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string | null
          entry_type: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          entry_type: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          entry_type?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mindfulness_program: {
        Row: {
          category: string
          created_at: string | null
          day_number: number
          duration_minutes: number
          id: string
          practice: string
          reflection_prompt: string
          scripture: string
          theme: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          day_number: number
          duration_minutes: number
          id?: string
          practice: string
          reflection_prompt: string
          scripture: string
          theme: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          day_number?: number
          duration_minutes?: number
          id?: string
          practice?: string
          reflection_prompt?: string
          scripture?: string
          theme?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mindfulness_reflections: {
        Row: {
          created_at: string | null
          id: string
          program_day_id: string
          reflection_content: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          program_day_id: string
          reflection_content: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          program_day_id?: string
          reflection_content?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mindfulness_reflections_program_day_id_fkey"
            columns: ["program_day_id"]
            isOneToOne: false
            referencedRelation: "mindfulness_program"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          timezone: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id: string
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      reflective_activities: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration_minutes: number
          id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration_minutes: number
          id?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration_minutes?: number
          id?: string
          title?: string
        }
        Relationships: []
      }
      sabbath_preferences: {
        Row: {
          created_at: string | null
          duration_hours: number
          id: string
          is_active: boolean
          start_day: string
          start_time: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_hours?: number
          id?: string
          is_active?: boolean
          start_day?: string
          start_time?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_hours?: number
          id?: string
          is_active?: boolean
          start_day?: string
          start_time?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      saved_auctions: {
        Row: {
          auction_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          auction_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          auction_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_auctions_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          status: string
          tier: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          status: string
          tier: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          status?: string
          tier?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_id: string
          completed: boolean | null
          created_at: string | null
          id: string
          scheduled_for: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activity_id: string
          completed?: boolean | null
          created_at?: string | null
          id?: string
          scheduled_for?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activity_id?: string
          completed?: boolean | null
          created_at?: string | null
          id?: string
          scheduled_for?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "reflective_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          reflection_note: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          reflection_note?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          reflection_note?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mindfulness_progress: {
        Row: {
          created_at: string | null
          current_day: number | null
          id: string
          last_completed_at: string | null
          selected_category: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_day?: number | null
          id?: string
          last_completed_at?: string | null
          selected_category: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_day?: number | null
          id?: string
          last_completed_at?: string | null
          selected_category?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          max_acres: number | null
          max_price: number | null
          min_acres: number | null
          min_price: number | null
          notifications_enabled: boolean | null
          states: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_acres?: number | null
          max_price?: number | null
          min_acres?: number | null
          min_price?: number | null
          notifications_enabled?: boolean | null
          states?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          max_acres?: number | null
          max_price?: number | null
          min_acres?: number | null
          min_price?: number | null
          notifications_enabled?: boolean | null
          states?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
