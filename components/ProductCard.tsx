import Link from 'next/link'
import Image from 'next/image'
import { ProductWithImages } from '@/lib/supabase/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: ProductWithImages
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=Sem+Imagem'
  const categoryLabels = {
    VAREJO: 'Varejo',
    ATACADO: 'Atacado',
    UNIFORME: 'Uniformes',
  }

  return (
    <Link href={`/produto/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {categoryLabels[product.category]}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          {product.show_price && product.price && (
            <p className="text-primary-600 font-bold text-lg">
              {formatPrice(product.price)}
            </p>
          )}
          {product.category === 'UNIFORME' && (
            <p className="text-gray-500 text-sm italic">Sob consulta</p>
          )}
        </div>
      </div>
    </Link>
  )
}
