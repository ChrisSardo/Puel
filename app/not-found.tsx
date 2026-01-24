import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-8">
        A página que você está procurando não existe.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
      >
        Voltar para Home
      </Link>
    </div>
  )
}
