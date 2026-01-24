// Layout específico para a página de login
// Isso sobrescreve o layout do admin (app/admin/layout.tsx) 
// e evita loops de redirecionamento
export const dynamic = 'force-dynamic'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Este layout não verifica autenticação
  // Permite acesso à página de login sem redirecionamentos
  return <>{children}</>
}
