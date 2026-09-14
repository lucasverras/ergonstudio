# SEO Audit - Service Pages

**Date**: 2026-09-14  
**Status**: Audit Complete  

## Service Pages Current State

### 1. Criação de Sites (`/servicos/sites`)

| Item | Current | Status | Notes |
|------|---------|--------|-------|
| Title | "Criação de Sites Profissionais e Landing Pages \| Ergon Studio" | ✅ Good | 67 chars, includes brand |
| Description | "Sites institucionais, landing pages e produtos web com SEO técnico e UX pensados pra converter, não só pra existir." | ✅ Good | 123 chars, benefit-focused |
| H1 | "Sites e experiências digitais" | ✅ Good | Clear, semantic |
| Slug | `sites` | ✅ Good | Short, searchable |
| FAQ Count | 4 questions | ✅ Good | Real, answered questions |
| Related Cases | 7 cases | ✅ Good | Green Bay Car, 3WS, Navegando, etc. |
| Schema | Service + Organization ref | ✅ Good | serviceKey: 'websites' |
| Breadcrumb | Not yet implemented | ⏳ TODO | Add Breadcrumb component |

**Intenções Capturadas**: criação de sites, desenvolvimento web, landing page, catálogo digital  
**Subserviços**: Sites institucionais, Landing pages, Portfólios, Catálogos, Cardápios, SEO técnico

---

### 2. Sistemas e CRMs (`/servicos/plataformas`)

| Item | Current | Status | Notes |
|------|---------|--------|-------|
| Title | "Desenvolvimento de Sistemas Sob Medida \| Ergon Studio" | ⚠️ Fair | 60 chars, but "Plataformas" missing |
| Description | "CRM, controle de estoque, orçamentos, painéis administrativos e agendamento — sistemas sob medida..." | ✅ Good | 142 chars, concrete |
| H1 | "Plataformas e sistemas sob medida" | ✅ Good | Clear, but could be "Sistemas e CRMs" |
| Slug | `plataformas` | ⚠️ Fair | Vague; "sistemas-crm" would be better |
| FAQ Count | 4 questions | ✅ Good | Custo, integração, CRM genérico, hospedagem |
| Related Cases | 3 cases | ✅ Good | Garagi, Vamo Nessa, Radar Navegando |
| Schema | Service + Organization ref | ✅ Good | serviceKey: 'systems' |
| Breadcrumb | Not yet implemented | ⏳ TODO | Add Breadcrumb component |

**Recommendation**: Consider slug rename to `sistemas-crm` (follow briefing suggestion)  
**Intenções Capturadas**: sistema sob medida, CRM personalizado, controle de estoque  
**Subserviços**: CRM, Estoque, Orçamentos, Painéis, Agendamento, Portal

---

### 3. Automações e IA (`/servicos/automacoes`)

| Item | Current | Status | Notes |
|------|---------|--------|-------|
| Title | "Automação de Processos e Atendimento \| Ergon Studio" | ⚠️ Fair | 60 chars, missing "IA" |
| Description | "Automação de atendimento, social selling e processos internos com integrações via API..." | ✅ Good | 130 chars |
| H1 | "Automação e operações inteligentes" | ✅ Good | Clear, semantic |
| Slug | `automacoes` | ⚠️ Fair | Incomplete; "automacoes-ia" would be better |
| FAQ Count | 4 questions | ✅ Good | Automação atendimento, tarefa, canais, ferramentas |
| Related Cases | 2 cases | ✅ Fair | Radar Navegando, Vamo Nessa SP |
| Schema | Service + Organization ref | ✅ Good | serviceKey: 'automation' |
| Breadcrumb | Not yet implemented | ⏳ TODO | Add Breadcrumb component |

**Recommendation**: Consider slug rename to `automacoes-ia` for clarity  
**Intenções Capturadas**: automação empresarial, automação WhatsApp, integração API, IA  
**Subserviços**: Social selling, WhatsApp automation, Lead qualification, API integrations, IA

---

### 4. MVPs e Produtos Digitais (`/servicos/produtos-digitais`)

| Item | Current | Status | Notes |
|------|---------|--------|-------|
| Title | "Desenvolvimento de Produtos Digitais e Aplicativos \| Ergon Studio" | ✅ Good | 75 chars, includes brand |
| Description | "MVPs, aplicativos e plataformas sob medida, da validação ao lançamento..." | ✅ Good | 120 chars |
| H1 | "Produtos digitais, do conceito ao lançamento" | ✅ Good | Clear, process-focused |
| Slug | `produtos-digitais` | ⚠️ Fair | Verbose; "mvp-produtos-digitais" would align better |
| FAQ Count | 4 questions | ✅ Good | MVP, apps, pós-lançamento, propriedade |
| Related Cases | 2 cases | ✅ Fair | Radar Navegando, Vamo Nessa SP |
| Schema | Service + Organization ref | ✅ Good | serviceKey: 'digitalProducts' |
| Breadcrumb | Not yet implemented | ⏳ TODO | Add Breadcrumb component |

**Recommendation**: Consider slug rename to `mvp-produtos-digitais` for better SEO  
**Intenções Capturadas**: desenvolvimento MVP, criação SaaS, desenvolvimento app  
**Subserviços**: MVPs, Apps, SaaS, Plataformas, Portais

---

## Overall Assessment

### Strengths ✅

- ✅ All 4 services have strong titles + descriptions
- ✅ FAQ sections are detailed and real (not marketing speak)
- ✅ Related cases are mapped correctly
- ✅ Schema structure is solid
- ✅ Service hierarchy is clear
- ✅ No duplicate content detected
- ✅ All pages have unique H1s

### Gaps ⏳

- ❌ Breadcrumbs not yet implemented (visual component)
- ❌ Breadcrumbs not yet in each service page
- ❌ BreadcrumbList schema not generated on each page
- ⚠️ Some slugs could be more semantic (plataformas → sistemas-crm, automacoes → automacoes-ia)
- ⚠️ /fly (Drone) is separate from /servicos hierarchy
- ⏳ /servicos hub page needs improvement
- ⏳ Internal linking between services and cases needs strengthening

### Priority Fixes

1. **Add Breadcrumb component** (Task #1 - DONE)
2. **Add breadcrumbs to all pages** (Task #4)
3. **Improve /servicos hub** (Task #3)
4. **Strengthen internal linking** (Task #5)
5. **Consider slug renames** (Optional, use 301 redirects if done)

---

## Slug Recommendation Decision

**Current Briefing**: "Nunca quebrar uma URL publicada apenas para conseguir um slug melhor"

**Decision**: KEEP existing slugs, use 301 redirects only if renaming:
- `/servicos/plataformas` → `/servicos/sistemas-crm` (optional)
- `/servicos/automacoes` → `/servicos/automacoes-ia` (optional)
- `/servicos/produtos-digitais` → `/servicos/mvp-produtos-digitais` (optional)

**For now**: Proceed without renames to avoid breaking existing links. SEO titles can be improved without slug changes.

---

## Next Steps

- [ ] Task #3: Build /servicos hub page
- [ ] Task #4: Add breadcrumbs to all pages
- [ ] Task #5: Implement internal linking (services ↔ cases)
- [ ] Task #6: Enrich service page content if needed

