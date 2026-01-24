'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { FiLogOut, FiHome } from 'react-icons/fi'

export default function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xl font-bold text-primary-600">
              Admin Puel
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <FiHome size={18} />
              Ver Site
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiLogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}
