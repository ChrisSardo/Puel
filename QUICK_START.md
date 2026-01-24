# 🚀 Quick Start - Puel Fashion Brand

## Instalação Rápida (5 minutos)

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Supabase

1. Crie conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a URL e as chaves de API

### 3. Configurar Variáveis

Crie `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

### 4. Configurar Banco de Dados

1. No Supabase, vá em **SQL Editor**
2. Cole e execute o conteúdo de `supabase/schema.sql`
3. Vá em **Storage** e confirme que o bucket `product-images` foi criado

### 5. Criar Usuário Admin

1. No Supabase, vá em **Authentication > Users**
2. Clique em **Add user**
3. Defina email e senha
4. Use essas credenciais em `/admin/login`

### 6. Rodar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📝 Próximos Passos

1. **Configurar WhatsApp**: Edite `components/WhatsAppButton.tsx` (linha 10)
2. **Configurar Instagram**: Edite `components/Footer.tsx` (linha 40)
3. **Adicionar Produtos**: Acesse `/admin/login` e comece a cadastrar

## 🎯 Estrutura de URLs

- `/` - Home
- `/catalogo` - Catálogo de produtos
- `/produto/[slug]` - Detalhe do produto
- `/sobre` - Sobre a marca
- `/contato` - Contato
- `/admin` - Painel administrativo
- `/admin/login` - Login admin

## ✅ Checklist de Funcionalidades

- ✅ Home com destaques
- ✅ Catálogo com filtros
- ✅ Detalhe do produto
- ✅ Integração WhatsApp
- ✅ Admin com CRUD
- ✅ Upload de imagens
- ✅ Design responsivo
- ✅ SEO básico

## 🐛 Problemas Comuns

**Erro ao fazer login no admin?**
- Verifique se o usuário foi criado no Supabase
- Confirme que as políticas RLS estão ativas

**Imagens não aparecem?**
- Verifique se o bucket foi criado
- Confirme políticas de storage

**Erro ao fazer upload?**
- Verifique autenticação
- Confirme permissões do bucket

## 📚 Documentação Completa

Veja `README.md` para documentação detalhada.
