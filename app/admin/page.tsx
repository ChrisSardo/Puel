'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Product } from '@/lib/supabase/types'

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    setProducts((data ?? []) as Product[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  const remove = async (id: string) => {
    if (!confirm('Deletar este produto?')) return
    setError('')

    const { error: imgErr } = await supabase.from('product_images').delete().eq('product_id', id)
    if (imgErr) return setError(imgErr.message)

    const { error: prodErr } = await supabase.from('products').delete().eq('id', id)
    if (prodErr) return setError(prodErr.message)

    await load()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Admin - Produtos</h1>

        <div className="flex gap-3">
          <Link href="/admin/new" className="bg-primary-600 text-white px-4 py-2 rounded-lg">
            + Novo produto
          </Link>
          <button onClick={logout} className="bg-gray-200 px-4 py-2 rounded-lg">
            Sair
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      {loading ? (
        <div>Carregando…</div>
      ) : products.length === 0 ? (
        <div className="text-gray-600">Nenhum produto cadastrado.</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Categoria</th>
                <th className="text-left p-3">Ativo</th>
                <th className="text-right p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.active ? 'Sim' : 'Não'}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link href={`/admin/edit/${p.id}`} className="bg-gray-100 px-3 py-1 rounded">
                      Editar
                    </Link>
                    <button onClick={() => remove(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
