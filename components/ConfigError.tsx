export default function ConfigError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-yellow-800">
          ⚠️ Configuração Necessária
        </h1>
        <div className="space-y-4 text-yellow-700">
          <p>
            As variáveis de ambiente do Supabase não estão configuradas.
          </p>
          <div className="bg-yellow-100 p-4 rounded border border-yellow-300">
            <p className="font-semibold mb-2">Para corrigir:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Acesse seu projeto no Vercel</li>
              <li>Vá em <strong>Settings → Environment Variables</strong></li>
              <li>Adicione as seguintes variáveis:</li>
            </ol>
            <div className="mt-3 space-y-1 text-xs font-mono bg-yellow-200 p-2 rounded">
              <div>NEXT_PUBLIC_SUPABASE_URL</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY</div>
            </div>
            <p className="mt-3 text-sm">
              Após adicionar, faça um novo deploy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
