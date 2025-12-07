export type Database = {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string
          nome: string
          endereco: string
          impacto: number
          preco: number
          quantidade_telas: number
          latitude: number
          longitude: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          endereco: string
          impacto: number
          preco: number
          quantidade_telas: number
          latitude: number
          longitude: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          endereco?: string
          impacto?: number
          preco?: number
          quantidade_telas?: number
          latitude?: number
          longitude?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

