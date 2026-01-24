import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/AdminNav'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The middleware handles authentication and redirects
  // This layout just renders the admin UI if user is authenticated
  // For login page, the layout.tsx in /admin/login/ will override this
  
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // If no user, just render children (middleware will handle redirect if needed)
    if (!user) {
      return <>{children}</>
    }

    // User is authenticated, show admin layout with nav
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    )
  } catch (error) {
    // If error (e.g., missing env vars), just render children
    return <>{children}</>
  }
}
