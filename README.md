# Netlessa Mídia

> **Propriedade da Netlessa**  
> Este é um repositório privado e confidencial. Todo o código, documentação e recursos são propriedade exclusiva da Netlessa.  
> **Acesso não autorizado, distribuição ou uso deste código é estritamente proibido.**

---

## Sobre o Projeto

Aplicação web desenvolvida em Next.js para gerenciamento e apresentação da plataforma de mídia em elevadores da Netlessa. O sistema inclui landing page institucional, formulário de captação de leads, mapa interativo de localizações e painel administrativo.

## Stack Tecnológica

- **Framework:** Next.js 15.2.4 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **UI Components:** Radix UI
- **Banco de Dados:** Supabase
- **Mapas:** MapLibre GL
- **E-mail:** Resend
- **Deploy:** Vercel

## Pré-requisitos

- Node.js 18+ ou superior
- npm, yarn, pnpm ou bun
- Conta Supabase configurada
- Conta Resend configurada (para envio de e-mails)

## Instalação

1. Clone o repositório (acesso restrito):
   ```bash
   git clone <repository-url>
   cd netlessa-midia
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env` (se existir)
   - Configure todas as variáveis necessárias (consulte a seção de configuração)

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm dev
   # ou
   yarn dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Configuração de Variáveis de Ambiente

⚠️ **IMPORTANTE:** Nunca commite arquivos `.env` ou informações sensíveis no repositório.

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (E-mail)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_email

# Outras variáveis conforme necessário
```

### Obtenção de Credenciais

**Supabase:**
- Acesse o dashboard do seu projeto Supabase
- Navegue até Settings > API
- Copie a URL e as chaves necessárias

**Resend:**
- Acesse [Resend Dashboard](https://resend.com/api-keys)
- Crie uma API Key
- Configure um domínio verificado ou use o e-mail padrão para desenvolvimento

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
netlessa-midia/
├── src/
│   ├── app/              # Rotas e páginas (App Router)
│   │   ├── api/          # API Routes
│   │   ├── admin/        # Painel administrativo
│   │   └── localizacoes/ # Página de localizações
│   ├── components/        # Componentes React
│   │   ├── admin/        # Componentes do admin
│   │   └── ui/           # Componentes de UI reutilizáveis
│   ├── lib/              # Utilitários e helpers
│   ├── data/             # Dados estáticos
│   └── hooks/            # Custom hooks
├── public/               # Arquivos estáticos
└── supabase-schema.sql   # Schema do banco de dados
```

## Segurança

### Boas Práticas Implementadas

- ✅ Variáveis de ambiente para credenciais sensíveis
- ✅ `.env` incluído no `.gitignore`
- ✅ Validação de dados em formulários
- ✅ Sanitização de inputs
- ✅ Autenticação e autorização no painel admin
- ✅ Rate limiting nas APIs (quando aplicável)

### Recomendações

- **Nunca** commite credenciais ou chaves de API
- Use variáveis de ambiente para todas as configurações sensíveis
- Mantenha as dependências atualizadas
- Revise regularmente as permissões de acesso ao repositório
- Use HTTPS em produção
- Configure CORS adequadamente

## Deploy

### Vercel (Recomendado)

1. Conecte o repositório à Vercel
2. Configure as variáveis de ambiente no dashboard da Vercel
3. O deploy será automático a cada push na branch principal

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Certifique-se de configurar todas as variáveis de ambiente necessárias.

## Desenvolvimento

### Convenções de Código

- Use TypeScript para type safety
- Siga os padrões do ESLint configurado
- Componentes devem ser funcionais e reutilizáveis
- Use componentes do Radix UI quando possível
- Mantenha comentários em inglês (quando necessário)

### Contribuindo

Este é um repositório privado. Contribuições são restritas a membros autorizados da equipe Netlessa.

## Suporte

Para questões técnicas ou problemas, entre em contato com a equipe de desenvolvimento da Netlessa.

## Licença

Copyright © 2025 Netlessa. Todos os direitos reservados.

Este software e sua documentação são propriedade exclusiva da Netlessa. É proibida a reprodução, distribuição ou uso não autorizado.

---

**Última atualização:** 2025
