// lib/supabase/database.types.ts
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          category: "VAREJO" | "ATACADO" | "UNIFORME"
          description: string | null
          price: number | null
          show_price: boolean
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: "VAREJO" | "ATACADO" | "UNIFORME"
          description?: string | null
          price?: number | null
          show_price?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          category?: "VAREJO" | "ATACADO" | "UNIFORME"
          description?: string | null
          price?: number | null
          show_price?: boolean
          active?: boolean
          updated_at?: string
        }
        Relationships: []
      }

      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          position: number
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          position?: number
        }
        Update: {
          product_id?: string
          url?: string
          position?: number
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
