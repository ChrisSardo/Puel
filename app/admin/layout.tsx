import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/AdminNav'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
