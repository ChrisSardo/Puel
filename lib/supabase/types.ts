export type ProductCategory = 'VAREJO' | 'ATACADO' | 'UNIFORME'

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  description: string | null
  price: number | null
  show_price: boolean
  active: boolean
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  position: number
  created_at: string
}

export interface ProductWithImages extends Product {
  images: ProductImage[]
}
