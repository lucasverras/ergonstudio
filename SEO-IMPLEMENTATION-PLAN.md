# SEO + Service Architecture Implementation Plan
## Ergon Studio

**Data**: 2026-09-14  
**Status**: Planning Phase  
**Objetivo**: Transformar arquitetura de serviços para máxima clareza semântica (Google + LLMs + usuários)

---

## 1. AUDITORIA ATUAL ✅

### Estado Encontrado

✅ **Framework**: Vite + React (SSG prerender)  
✅ **Router**: React Router, rotas dinâmicas em `/lib/routes.ts`  
✅ **Services**: Estruturados em `/services/servicesData.ts` (4 pilares)  
✅ **Schema**: JSON-LD completo em `/lib/schema.ts`  
✅ **Sitemap**: Automático via prerender + script  
✅ **Robots.txt**: Bem configurado, sitemap registrado  
✅ **llms.txt**: Existe  
✅ **Breadcrumbs**: Implementados em schema, ainda sem UI em todas páginas  
✅ **Canônicas**: Implementadas dinamicamente  

### Serviços Atuais (URLs)

1. `/servicos/sites` → "Sites & Experiences"
2. `/servicos/plataformas` → "Digital Platforms"  
3. `/servicos/automacoes` → "Intelligent Operations"
4. `/servicos/produtos-digitais` → "Product Launch"
5. `/fly` → "Ergon Fly" (separado, fora de /servicos)

### Problema Principal

Slugs atuais não refletem claramente a intenção de busca:
- `plataformas` vs `sistemas-crm` (briefing pede renomear)
- `automacoes` vs `automacoes-ia` (incompleto)
- `/fly` separado de `/servicos` (fragmenta hierarquia)

**DECISÃO**: Manter URLs existentes + adicionar redirects 301 apenas se necessário  
(Briefing: "Nunca quebrar uma URL publicada apenas para conseguir um slug melhor")

---

## 2. ESTRATÉGIA DE IMPLEMENTAÇÃO

### Fase 1: Reorganizar /servicos (Hub)
- [ ] Criar página `/servicos` como SERVICE HUB central
- [ ] Apontar para 5 pilares (incluir `/fly` semanticamente)
- [ ] Adicionar breadcrumbs visuais
- [ ] Implementar BreadcrumbList JSON-LD
- [ ] Internal linking robusto para cada pilar

### Fase 2: Melhorar Páginas de Serviço Existentes
- [ ] Verificar SEO técnico (title, description, H1)
- [ ] Adicionar breadcrumbs visuais
- [ ] Enriquecer conteúdo com subserviços
- [ ] Adicionar cases relacionados com links semânticos
- [ ] FAQ com respostas reais
- [ ] Service schema atualizado

### Fase 3: Internal Linking (cases ↔ services)
- [ ] Auditar casos existentes
- [ ] Adicionar labels de capacidades (Website, CRM, UX/UI, etc.)
- [ ] Linkar casos para páginas de serviço
- [ ] Linkar páginas de serviço para casos

### Fase 4: Validação + Deployments
- [ ] SEO audit final
- [ ] Mobile testing
- [ ] Lighthouse check
- [ ] Search Console ready
- [ ] Deploy + request indexing

---

## 3. DETALHAMENTO POR PILAR

### Pilar 1: Criação de Sites
**URL Atual**: `/servicos/sites`  
**Title Sugerido**: "Criação de Sites para Empresas | Ergon Studio"  
**H1**: "Sites feitos para apresentar melhor o seu negócio"  
**Meta**: "Criamos sites rápidos, estratégicos e sob medida..."  
**Intenções**: criação de sites, desenvolvimento web, site profissional, landing page  
**Subserviços**: Website, Landing Page, Catálogo, Site B2B, Sites para Restaurantes, Lançamentos  
**Cases**: Green Bay Car, Green Bay Car Estética, 3WS Moldes, Navegando MKT, Franco Gastrobar

### Pilar 2: Sistemas e CRMs
**URL Atual**: `/servicos/plataformas`  
**Renomear Slug?**: Considerar `sistemas-crm` (melhor SEO)  
**Title Sugerido**: "Sistemas e CRMs Sob Medida | Ergon Studio"  
**H1**: "Sistemas construídos para a sua operação"  
**Meta**: "Desenvolvemos sistemas, CRMs e dashboards sob medida..."  
**Intenções**: sistema sob medida, CRM personalizado, software personalizado  
**Subserviços**: CRM, Dashboard, Estoque, Orçamentos, Agendamento, Portal, Painéis  
**Cases**: Garagi CRM, Navegando, Garagi

### Pilar 3: Automações e IA
**URL Atual**: `/servicos/automacoes`  
**Renomear Slug?**: Considerar `automacoes-ia` (melhor completude)  
**Title Sugerido**: "Automações e IA para Empresas | Ergon Studio"  
**H1**: "Operações que não dependem de alguém apertando cada botão"  
**Meta**: "Criamos automações, integrações e fluxos com IA..."  
**Intenções**: automação empresarial, integração de sistemas, automação WhatsApp  
**Subserviços**: Integrações, APIs, WhatsApp, Instagram, Social Selling, n8n, IA  
**Cases**: Projetos com automação

### Pilar 4: MVPs e Produtos Digitais
**URL Atual**: `/servicos/produtos-digitais`  
**Renomear Slug?**: Considerar `mvp-produtos-digitais`  
**Title Sugerido**: "MVPs e Produtos Digitais | Ergon Studio"  
**H1**: "Da ideia até um produto funcionando"  
**Meta**: "Transformamos ideias em MVPs, SaaS e produtos digitais..."  
**Intenções**: desenvolvimento MVP, criação SaaS, produto digital  
**Subserviços**: MVP, SaaS, App, Plataforma, Portal, Produto Digital  
**Processo**: Discover → Design → Build → Evolve  
**Cases**: Projetos de produtos próprios/clientes

### Pilar 5: Drone (Ergon Fly)
**URL Atual**: `/fly`  
**Considerar**: `/servicos/drone` ou deixar `/fly` (marca estabelecida)  
**Title Sugerido**: "Filmagem e Captação com Drone | Ergon Fly"  
**H1**: "Captação aérea que valoriza sua marca"  
**Meta**: "Captação profissional com drones para marcas, imóveis..."  
**Intenções**: filmagem com drone, captação aérea, vídeo profissional  
**Aplicações**: Marcas, Imóveis, Indústria, Eventos, Conteúdo  
**Nota**: Manter nome/URL consolidado

---

## 4. PÁGINA HUB /servicos

### Estrutura

```
H1: "Sites, Sistemas e Automações sob Medida"
Intro: 1-2 parágrafos explicando proposta Ergon

Cards (5 pilares):
01 - Sites & Experiences / Criação de Sites
02 - Digital Platforms / Sistemas & CRMs
03 - Intelligent Operations / Automações & IA
04 - Product Launch / MVPs & Produtos Digitais
05 - Ergon Fly / Drone & Captação Aérea

Cada card:
- Nome visual + nome semântico
- Descrição breve
- Principais entregas
- Link HTML rastreável <a href="...">
- Case relacionado (quando possível)
```

### Breadcrumb
```
Home > Serviços
```

### Internal Links
- Cada pilar → sua página específica
- Footer: seção "Serviços" com lista de links
- Menu: Submenu em Serviços (se não existir)

---

## 5. TAREFAS ESPECÍFICAS

### ✅ Já Implementado
- [x] Schema global completo (Organization, WebSite, Services)
- [x] Sitemap automático com priority/changefreq
- [x] JSON-LD estruturado
- [x] Robots.txt correto
- [x] llms.txt
- [x] Canônicas dinâmicas
- [x] Prerender SSG

### ⏳ A Fazer

#### 1. Auditar e Validar Páginas de Serviço Existentes
- [ ] Verificar title/H1/description cada página
- [ ] Validar breadcrumb HTML em cada página
- [ ] Testar canonical URLs
- [ ] Verificar internal links

#### 2. Implementar Breadcrumbs Visuais
- [ ] Criar componente Breadcrumb reutilizável
- [ ] Adicionar a /servicos e todas as /servicos/*
- [ ] Adicionar a /portfolio/*
- [ ] Adicionar JSON-LD BreadcrumbList

#### 3. Criar/Melhorar Página /servicos (Hub)
- [ ] Layout com 5 pilares
- [ ] Links HTML rastreáveis
- [ ] Breadcrumbs
- [ ] Schema CollectionPage + ItemList

#### 4. Internal Linking (Cases ↔ Services)
- [ ] Adicionar labels de capacidades em cada case
- [ ] Linkar labels → páginas de serviço
- [ ] Adicionar seção "Serviços Utilizados" em cases

#### 5. Enriquecer Páginas de Serviço
- [ ] Verificar e melhorar conteúdo
- [ ] Adicionar subserviços claros
- [ ] Adicionar FAQ (3-6 perguntas reais)
- [ ] Adicionar processo (Discover/Design/Build/Evolve)
- [ ] Listar cases relacionados com links semânticos
- [ ] CTA final

#### 6. Meta + Open Graph
- [ ] Auditar todas as descriptions
- [ ] Auditar og:image, og:title, og:description
- [ ] Garantir uniqueness

#### 7. Validação Final
- [ ] Build completo sem erros
- [ ] Lint + typecheck
- [ ] Testar todas as rotas (desktop + mobile)
- [ ] Validar JSON-LD em cada página
- [ ] Verificar canonical, robots, sitemap
- [ ] Lighthouse score
- [ ] URL inspection em Search Console
- [ ] Request indexing para páginas principais

---

## 6. PRIORIZAÇÃO

**CRITICAL** (Semana 1):
- Breadcrumbs visuais + schema
- Página /servicos hub
- Validação de SEO técnico (title/description/canonical)

**HIGH** (Semana 2):
- Internal linking cases ↔ services
- Enriquecimento de conteúdo em páginas existentes
- Meta + Open Graph

**MEDIUM** (Semana 3):
- Validação completa
- Search Console ready
- Documentação final

---

## 7. NÃO FAZER (Conforme Briefing)

❌ Redesenhar o site  
❌ Quebrar URLs existentes sem redirect 301  
❌ Criar páginas duplicadas por subserviço  
❌ Keyword stuffing  
❌ Artificial local SEO  
❌ Remover motion/GSAP  
❌ Fazer mega menu desnecessário

---

## 8. RESULTADOS ESPERADOS

✅ Sitelinks no Google para: "ergon studio" busca  
✅ Google compreende clara hierarquia: ERGON → SERVIÇOS → PILAR → CASES  
✅ LLMs entendem: Organization + Services bem definidos  
✅ Usuários navegam: Serviços → Cases relacionados ↔ Back to Services  
✅ Arquitetura semântica fortíssima (H1 → breadcrumb → cases)

---

## 9. MÉTRICAS DE SUCESSO

- Google Search Console: 5 serviços principais indexados
- Sitelinks appearing em "ergon studio" branded search
- CTR de serviços aumenta
- Internal link click-through entre serviços/cases
- Core Web Vitals mantém acima de 90
- Schema validation: 0 erros

---

**Próximo Passo**: Começar **Fase 1: Reorganização /servicos**

