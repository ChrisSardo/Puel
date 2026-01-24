'use client'

import Link from 'next/link'
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface AdminProductActionsProps {
  product: any
}

export default function AdminProductActions({ product }: AdminProductActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
      return
    }

    setDeleting(true)
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (error) throw error

      router.refresh()
    } catch (error: any) {
      alert('Erro ao excluir produto: ' + error.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/produto/${product.slug}`}
        target="_blank"
        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        title="Ver no site"
      >
        <FiEye size={18} />
      </Link>
      <Link
        href={`/admin/produtos/${product.id}/editar`}
        className="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors"
        title="Editar"
      >
        <FiEdit size={18} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
        title="Excluir"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  )
}
