-- Migração: Renomear impacto para exibicoes e adicionar pessoas_impactadas
-- Execute esta query no SQL Editor do Supabase

-- Renomear coluna impacto para exibicoes
ALTER TABLE public.locations 
RENAME COLUMN impacto TO exibicoes;

-- Adicionar nova coluna pessoas_impactadas
ALTER TABLE public.locations 
ADD COLUMN IF NOT EXISTS pessoas_impactadas INTEGER;

-- Opcional: Atualizar dados existentes com valor padrão (se necessário)
-- Descomente a linha abaixo se quiser definir um valor padrão para registros existentes
-- UPDATE public.locations 
-- SET pessoas_impactadas = 0 
-- WHERE pessoas_impactadas IS NULL;
