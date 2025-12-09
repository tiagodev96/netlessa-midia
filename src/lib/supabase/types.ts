export type Database = {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string
          nome: string
          endereco: string
          pessoas_impactadas: number
          preco: number
          quantidade_telas: number
          latitude: number
          longitude: number
          tipo: string
          imagem_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          endereco: string
          pessoas_impactadas: number
          preco: number
          quantidade_telas: number
          latitude: number
          longitude: number
          tipo?: string
          imagem_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          endereco?: string
          pessoas_impactadas?: number
          preco?: number
          quantidade_telas?: number
          latitude?: number
          longitude?: number
          tipo?: string
          imagem_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

