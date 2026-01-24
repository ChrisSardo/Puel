import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/ProductForm'

interface EditProductPageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Produto</h1>
      <ProductForm product={product} />
    </div>
  )
}
