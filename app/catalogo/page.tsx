import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import CatalogFilters from '@/components/CatalogFilters'

interface CatalogPageProps {
  searchParams: { categoria?: string; busca?: string }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const supabase = await createClient()
  const categoria = searchParams.categoria as 'VAREJO' | 'ATACADO' | 'UNIFORME' | undefined
  const busca = searchParams.busca

  let query = supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('active', true)

  if (categoria) {
    query = query.eq('category', categoria)
  }

  if (busca) {
    query = query.ilike('name', `%${busca}%`)
  }

  const { data: products } = await query.order('created_at', { ascending: false })

  const productsWithImages = (products || []).map((product: any) => ({
    ...product,
    images: product.images || [],
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Catálogo de Produtos</h1>
        <p className="text-gray-600">
          Explore nossa coleção completa de peças
        </p>
      </div>

      <Suspense fallback={<div>Carregando filtros...</div>}>
        <CatalogFilters currentCategory={categoria} currentSearch={busca} />
      </Suspense>

      {productsWithImages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {productsWithImages.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Nenhum produto encontrado. Tente ajustar os filtros.
          </p>
        </div>
      )}
    </div>
  )
}

export const metadata = {
  title: 'Catálogo - Puel Fashion Brand',
  description: 'Explore nosso catálogo completo de peças em Varejo, Atacado e Uniformes.',
}
