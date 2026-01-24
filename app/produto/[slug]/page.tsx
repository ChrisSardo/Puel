import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import WhatsAppButton from '@/components/WhatsAppButton'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('slug', params.slug)
    .eq('active', true)
    .single()

  if (!product) {
    notFound()
  }

  const images = (product.images || []).sort((a: any, b: any) => a.position - b.position)
  const mainImage = images[0]?.url || 'https://via.placeholder.com/800x800?text=Sem+Imagem'

  const categoryLabels = {
    VAREJO: 'Varejo',
    ATACADO: 'Atacado',
    UNIFORME: 'Uniformes',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image: any) => (
                <div
                  key={image.id}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={`${product.name} - Imagem ${image.position + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded mb-2">
              {categoryLabels[product.category as keyof typeof categoryLabels]}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {product.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descrição</h2>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          )}

          <div className="mb-6">
            {product.show_price && product.price ? (
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatPrice(product.price)}
              </div>
            ) : product.category === 'UNIFORME' ? (
              <div className="text-lg text-gray-600 italic mb-2">
                Preço sob consulta
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <WhatsAppButton
              productName={product.name}
              category={product.category as any}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', params.slug)
    .eq('active', true)
    .single()

  if (!product) {
    return {
      title: 'Produto não encontrado - Puel',
    }
  }

  return {
    title: `${product.name} - Puel Fashion Brand`,
    description: product.description || `Confira ${product.name} no catálogo Puel`,
  }
}
