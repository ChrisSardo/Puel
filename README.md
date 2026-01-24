# Puel - Fashion Brand

E-commerce de moda com catálogo de produtos separado por categorias (Varejo, Atacado, Uniformes) e integração com WhatsApp.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Backend (Banco de dados, Autenticação, Storage)
- **React Icons** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Conta no Vercel (para deploy, opcional)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd puel-fashion
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

4. Configure o banco de dados no Supabase:
   - Acesse o SQL Editor no Supabase
   - Execute o script em `supabase/schema.sql`
   - Isso criará as tabelas, políticas RLS e o bucket de storage

5. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
├── app/                    # Páginas (App Router)
│   ├── admin/             # Painel administrativo
│   ├── catalogo/          # Catálogo de produtos
│   ├── produto/           # Detalhe do produto
│   ├── sobre/             # Página sobre
│   ├── contato/           # Página de contato
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── WhatsAppButton.tsx
│   └── ...
├── lib/                   # Utilitários e configurações
│   ├── supabase/          # Cliente Supabase
│   └── utils.ts           # Funções auxiliares
├── supabase/              # Scripts SQL
│   └── schema.sql         # Schema do banco
└── public/                # Arquivos estáticos
```

## 🔐 Configuração do Admin

1. Acesse `/admin/login`
2. Crie um usuário no Supabase:
   - Vá em Authentication > Users
   - Clique em "Add user"
   - Defina email e senha
3. Faça login com as credenciais criadas

## 📱 Funcionalidades

### Públicas
- ✅ Home com destaques
- ✅ Catálogo com filtros (categoria, busca)
- ✅ Detalhe do produto com galeria
- ✅ Integração WhatsApp com mensagem automática
- ✅ Páginas Sobre e Contato
- ✅ Design responsivo mobile-first

### Admin
- ✅ Login com autenticação Supabase
- ✅ CRUD completo de produtos
- ✅ Upload e gerenciamento de imagens
- ✅ Organização de imagens (ordem)
- ✅ Ativação/desativação de produtos

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (opcional, apenas se necessário)
3. Deploy automático a cada push

### Outras plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- etc.

## 🔧 Configurações Adicionais

### WhatsApp
Edite o número do WhatsApp em:
- `components/WhatsAppButton.tsx` (linha 10)
- `components/Footer.tsx` (linha 47)

### Instagram
Edite o link do Instagram em:
- `components/Footer.tsx` (linha 40)
- `app/contato/page.tsx` (linha 36)

### SEO
Metadados básicos já configurados em cada página. Para melhorar:
- Adicione Open Graph tags
- Configure Google Analytics
- Adicione sitemap.xml

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 🐛 Troubleshooting

### Erro de autenticação no admin
- Verifique se o usuário foi criado no Supabase
- Confirme que as políticas RLS estão corretas

### Imagens não aparecem
- Verifique se o bucket `product-images` foi criado
- Confirme as políticas de storage no Supabase
- Verifique se as URLs estão corretas

### Erro ao fazer upload
- Verifique permissões do bucket
- Confirme que o usuário está autenticado
- Verifique o tamanho do arquivo (limite padrão: 50MB)

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Suporte

Para dúvidas ou problemas, entre em contato através do WhatsApp ou email.
