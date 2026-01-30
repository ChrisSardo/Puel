'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace('/admin/login')
        return
      }
      setChecking(false)
    }

    check()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/admin/login')
    })

    return () => sub.subscription.unsubscribe()
  }, [router])

  if (checking) return <div className="p-6">Validando sessão…</div>
  return <>{children}</>
}
