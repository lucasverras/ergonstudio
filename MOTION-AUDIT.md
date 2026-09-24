# Motion Audit & Reduction — Ergon Studio

**Data:** 2026-09-24
**Filosofia aplicada:** Emil Kowalski — *fast, intentional, responsive, subtle, physical, clear.*
Motion só permanece quando explica mudança de estado, dá feedback, cria continuidade ou direciona atenção.

---

## 1. Nova seção: Sua empresa nas IAs (AEO/GEO)

- Componente: `src/components/AiVisibility.tsx`, inserido **logo após o Hero** na Home.
- Hierarquia: **benefício → como funciona → tecnologia** (não vira aula de SEO).
- Headline: "Sua empresa também precisa aparecer no ChatGPT."
- Visualização: pergunta do usuário → engines (ChatGPT/Gemini/Claude/Google AI) → card "Sua empresa" destacado (interface simulada, não copia o ChatGPT).
- 6 pontos (Estrutura para IA, Schema, SEO técnico, Conteúdo semântico, AEO, GEO).
- CTA "Quero aparecer nas buscas" → mesmo fluxo de contato (WhatsApp).
- **Confirmada no HTML prerenderizado** (visível a crawlers/LLMs sem depender de JS); sem imagens/vídeos pesados, não impacta o carregamento inicial.

---

## 2. Animações REMOVIDAS / neutralizadas

| Elemento | Antes | Agora | Motivo |
|---|---|---|---|
| **DarkVeil** (fundo Hero) | Shader WebGL (ogl) rodando a cada frame + parallax do mouse | **Removido** — fica só o glow radial em CSS | Item mais pesado do site; decorativo puro. Dependência `ogl` removida do bundle |
| **SmoothCursor** | Cursor customizado girando/escalando em cada mousemove | **Removido** — cursor nativo restaurado | "Motion porque dá" clássico; prejudicava usabilidade e performance |
| **CircularText** (badge Hero) | Rotação infinita 22s + acelera no hover | **Estático** | Loop infinito sem função no topo da página |
| **GradientBars** (~30 na Home) | 15 barras × várias seções pulsando `scaleY` infinitamente | **Estáticas** | Animação infinita mesmo fora da viewport |
| **Blur animado** (TextReveal) | `filter: blur(12px)→0` em reveals do site inteiro | **Removido** — só opacity (+12px) | Blur é caro (raster off-thread) e o briefing pede evitá-lo |
| **GradualSpacing** (títulos) | Cada letra desliza `x:-20` com stagger acumulado | Título revela como **bloco único** (opacity + y:12) | "Letra-por-letra" é o reveal mais frequente do app; agora rápido e limpo |
| **CaseHero** ponto de status | `opacity 0.4↔1` infinito | **Estático** | Pulso decorativo |
| **FlyHero** scroll cue | `y:[0,8,0]` infinito | **Estático** | Loop decorativo |
| **Hero** scroll cue | `y:[0,4,0]` infinito | **Estático** | Loop decorativo |
| **MagicBentoCard** | Tilt 3D ±6°, magnetismo, ripple no clique | **Só brilho sutil de borda** seguindo o cursor | Cards inclinando/voando disputam atenção com o conteúdo |

## 3. Timing recalibrado (padrão Kowalski)

- **`reveal.ts`** (base de todo o site): duração 600ms → **400ms**, deslocamento y:16 → **12px**, stagger 80ms → **60ms**, easing `[0.22,1,0.36,1]`, `viewport once` sempre.
- **Hero**: orquestração de entrada encurtada — stagger 140ms → 60ms; delays de 0,6–1,0s → 0,2–0,35s.
- **Hovers normalizados** para o teto sutil **0.98–1.02** (antes 1.04–1.10): Navbar, FlyHero, FlyCTA, FlyPortfolio, FinalCTA, ServiceHero, NotFound, CaseNextProject.

## 4. Animações MANTIDAS (têm função)

| Elemento | Por quê |
|---|---|
| Reveals de entrada de seção (opacity + y:12, uma vez) | Sinalizam que o conteúdo chegou; agora rápidos e sutis |
| Slideshow do Hero (crossfade) | Mostra portfólio; já é `once`/IntersectionObserver/reduced-motion-gated |
| ClientsMarquee | Faixa de logos é UX esperada; pausa no hover + gated por reduced-motion |
| FaqAccordion (height/opacity) | **Feedback de mudança de estado** (abrir/fechar) — Kowalski aprova |
| HandHighlight (traço à mão) | Acento one-shot deliberado no highlight dos títulos |
| Hover de borda/brilho nos cards | Micro-interação sutil, sem transform pesado |
| FlyVideo (vídeo de fundo) | Conteúdo audiovisual real da vertente drone, não decoração |

## 5. prefers-reduced-motion

- `MotionConfig reducedMotion="user"` (global no `App.tsx`) já cobre transforms declarativos.
- Reset global em `@media (prefers-reduced-motion: reduce)` no `index.css` zera durações/loops CSS.
- Com os loops infinitos agora **estáticos por padrão**, a experiência reduzida ficou ainda mais próxima da normal (menos diferença = menos surpresa).

## 6. Performance / limpeza

- **Dependência `ogl` (WebGL) removida** do `package.json`; arquivos mortos deletados: `dark-veil.tsx`, `smooth-cursor.tsx`.
- Bundle final: **514 KB (gzip 154 KB)** num único chunk — o chunk lazy do shader deixou de existir.
- CSS `cursor: none` removido (não faz sentido sem cursor customizado).
- Todas as animações restantes usam **transform/opacity** (nunca width/height/top/left/filter).
- Mobile: os maiores custos (WebGL, cursor, loops infinitos) eram os que mais pesavam no mobile — todos eliminados.

## 7. Verificação

- `tsc -b` sem erros · `npm run build` sem erros · sitemap 17 URLs.
- HTML prerenderizado: títulos intactos, **0 ocorrências de `blur()`**, seção AEO presente.
- Verificação visual (Hero + /servicos): headings corretos, badge estático, barras estáticas, cards limpos, cursor nativo.
