import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import WhatsAppButton from '@/components/WhatsAppButton'
import { FiShoppingBag, FiPackage, FiUsers } from 'react-icons/fi'

export default async function Home() {
  const supabase = await createClient()
  
  // Buscar produtos em destaque (6 mais recentes)
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const productsWithImages = (products || []).map((product: any) => ({
    ...product,
    images: product.images || [],
  }))

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Puel Fashion Brand</h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Moda com qualidade e estilo para todos os momentos
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/catalogo?categoria=VAREJO"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center group"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <FiShoppingBag size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Varejo</h3>
              <p className="text-gray-600">
                Peças únicas para seu guarda-roupa pessoal
              </p>
            </Link>

            <Link
              href="/catalogo?categoria=ATACADO"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center group"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <FiPackage size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atacado</h3>
              <p className="text-gray-600">
                Ideal para lojistas e revendedores
              </p>
            </Link>

            <Link
              href="/catalogo?categoria=UNIFORME"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center group"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <FiUsers size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uniformes</h3>
              <p className="text-gray-600">
                Soluções personalizadas para empresas
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {productsWithImages.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Destaques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsWithImages.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/catalogo"
                className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Ver todos os produtos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Entre em contato conosco pelo WhatsApp
          </p>
          <WhatsAppButton
            productName="catálogo completo"
            category="VAREJO"
            className="bg-white text-primary-600 hover:bg-gray-100"
          />
        </div>
      </section>
    </div>
  )
}
