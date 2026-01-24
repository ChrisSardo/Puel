# Guia de Deploy - Puel Fashion Brand

## 📋 Checklist Pré-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados Supabase configurado (schema executado)
- [ ] Bucket de storage criado
- [ ] Usuário admin criado no Supabase
- [ ] Número do WhatsApp atualizado
- [ ] Link do Instagram atualizado

## 🚀 Deploy no Vercel

### Passo 1: Preparação

1. Faça push do código para um repositório Git (GitHub, GitLab, Bitbucket)

### Passo 2: Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta
3. Clique em "Add New Project"
4. Importe seu repositório

### Passo 3: Configurar Variáveis de Ambiente

No Vercel, adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key (opcional)
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

### Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Acesse a URL fornecida

### Passo 5: Configurar Domínio (Opcional)

1. Vá em Settings > Domains
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruções

## 🔧 Configuração do Supabase

### 1. Criar Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e as chaves de API

### 2. Executar Schema

1. Vá em SQL Editor
2. Cole o conteúdo de `supabase/schema.sql`
3. Execute o script

### 3. Criar Usuário Admin

1. Vá em Authentication > Users
2. Clique em "Add user"
3. Defina email e senha
4. Use essas credenciais para fazer login em `/admin/login`

### 4. Verificar Storage

1. Vá em Storage
2. Verifique se o bucket `product-images` existe
3. Confirme que está público

## 📱 Configurações Finais

### WhatsApp

Edite os arquivos:
- `components/WhatsAppButton.tsx` (linha 10)
- `components/Footer.tsx` (linha 47)

Substitua `5511999999999` pelo número real (formato: código do país + DDD + número, sem espaços ou caracteres especiais)

### Instagram

Edite os arquivos:
- `components/Footer.tsx` (linha 40)
- `app/contato/page.tsx` (linha 36)

Substitua `https://instagram.com/puel` pelo link real

### Endereço (Opcional)

Edite `app/contato/page.tsx` e adicione o endereço real se disponível.

## ✅ Testes Pós-Deploy

- [ ] Site carrega corretamente
- [ ] Navegação funciona
- [ ] Catálogo exibe produtos
- [ ] Filtros funcionam
- [ ] Detalhe do produto funciona
- [ ] Botão WhatsApp abre com mensagem correta
- [ ] Admin login funciona
- [ ] CRUD de produtos funciona
- [ ] Upload de imagens funciona
- [ ] Site é responsivo no mobile

## 🔒 Segurança

- ✅ RLS (Row Level Security) habilitado no Supabase
- ✅ Autenticação obrigatória para admin
- ✅ Políticas de storage configuradas
- ✅ HTTPS automático no Vercel

## 📊 Monitoramento

### Vercel Analytics (Opcional)

1. Vá em Settings > Analytics
2. Ative Vercel Analytics
3. Monitore performance e erros

### Supabase Logs

1. Acesse Logs no Supabase
2. Monitore queries e erros
3. Configure alertas se necessário

## 🐛 Troubleshooting

### Erro 500 no deploy

- Verifique variáveis de ambiente
- Confirme que o schema foi executado
- Verifique logs do Vercel

### Imagens não aparecem

- Verifique permissões do bucket
- Confirme políticas de storage
- Verifique CORS no Supabase

### Admin não funciona

- Confirme que o usuário foi criado
- Verifique políticas RLS
- Confirme autenticação no Supabase

## 📞 Suporte

Em caso de problemas, verifique:
1. Logs do Vercel
2. Logs do Supabase
3. Console do navegador
4. Network tab do DevTools
