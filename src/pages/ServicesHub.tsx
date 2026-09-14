import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { revealUp, revealContainer, viewportOnce } from '@/lib/reveal'
import { GradientBars } from '@/components/ui/gradient-bars-background'
import { GradualSpacing } from '@/components/ui/gradual-spacing'
import { TextReveal } from '@/components/ui/text-reveal'
import MagicBentoCard from '@/components/ui/MagicBentoCard'
import ProcessStep from '@/components/ProcessStep'
import { CaseMedia } from '@/components/case/CaseMedia'
import { ServiceFinalCTA } from '@/components/service/ServiceFinalCTA'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useSEO } from '@/lib/seo'
import { SITE_URL, SERVICES, breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { services, DISCOVER_PROCESS } from '@/services/servicesData'
import { getCaseBySlug } from '@/cases/casesData'

const CANONICAL = `${SITE_URL}/servicos`
const TITLE = 'Sites, Sistemas e Automações para Empresas | Ergon Studio'
const DESCRIPTION =
  'Criação de sites e landing pages, sistemas sob medida, CRM e painéis, automação de processos e produtos digitais — os serviços da Ergon Studio, um a um.'

const droneEntry = SERVICES.find((s) => s.key === 'drone')!

// A concrete, low-text "what this could become" grid — deliberately not
// full sentences, just the noun a client would recognize from their own
// operation. Every item here is something the studio has actually built
// (see servicesData.ts's whatWeCreate lists and casesData.ts) — not a
// generic feature-list filler.
const BUILDABLE_EXAMPLES = [
  'Website',
  'CRM',
  'Painel',
  'Sistema interno',
  'Automação',
  'Aplicativo',
  'Agendamento',
  'Cardápio digital',
  'Catálogo',
  'Social Selling',
]

const FEATURED_CASE_SLUGS = ['vamo-nessa-sp', 'garagi', 'green-bay-car', '3ws-moldes']

export default function ServicesHub() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    jsonLd: [
      // the five service cards this page actually renders — the four
      // /servicos/:slug pages plus the drone vertical at /fly
      collectionPageSchema({
        id: `${CANONICAL}/#webpage`,
        url: CANONICAL,
        name: TITLE,
        description: DESCRIPTION,
        items: [
          ...services.map((s) => ({ name: s.name, url: `${SITE_URL}/servicos/${s.slug}` })),
          { name: droneEntry.name, url: droneEntry.url },
        ],
      }),
      breadcrumbSchema([
        { name: 'Ergon', url: `${SITE_URL}/` },
        { name: 'Serviços', url: CANONICAL },
      ]),
    ],
  })

  const featuredCases = FEATURED_CASE_SLUGS.map((slug) => getCaseBySlug(slug)).filter((c) => c !== undefined)

  return (
    <main>
      <div className="grid-shell pt-8">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Serviços', url: '/servicos' }]} />
      </div>

      {/* HERO */}
      <header className="relative overflow-hidden pt-20 pb-14 md:pt-40 md:pb-20">
        <GradientBars
          numBars={15}
          gradientFrom="var(--color-violet)"
          gradientTo="transparent"
          animationDuration={2.6}
          className="opacity-[0.14]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%]"
          style={{
            background: 'radial-gradient(720px circle at 15% 0%, rgba(227,255,12,0.1), transparent 65%)',
          }}
        />

        <div className="relative z-10 grid-shell">
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={revealContainer()}>
            <motion.span
              variants={revealUp}
              className="mb-4 block text-xs tracking-[0.25em] text-lime uppercase"
            >
              Serviços / Ergon
            </motion.span>
            <motion.h1
              variants={revealUp}
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[0.02em] text-ink uppercase"
            >
              <GradualSpacing
                as="span"
                text="Produtos digitais para empresas que querem vender melhor e operar melhor."
              />
            </motion.h1>
            <TextReveal
              as="p"
              per="line"
              preset="fade-in-blur"
              className="mt-6 max-w-2xl text-base text-graphite md:text-lg"
            >
              Quatro frentes, um único jeito de pensar: entender o problema antes de propor a
              tecnologia.
            </TextReveal>
          </motion.div>
        </div>
      </header>

      {/* 4 GRANDES ÁREAS */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="grid-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealContainer(0.08)}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div key={service.slug} variants={revealUp}>
                <Link to={`/servicos/${service.slug}`} className="group block h-full">
                  <MagicBentoCard className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-md transition-colors duration-300 hover:border-lime/30 md:p-8">
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.15em] text-lime uppercase">
                        {service.categoryLabel}
                      </span>
                      <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                        {service.name}
                      </h2>
                      <p className="mt-2 text-sm text-graphite md:text-base">{service.heroBlurb}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime">
                      Conhecer
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </MagicBentoCard>
                </Link>
              </motion.div>
            ))}

            {/* drone/audiovisual keeps living at its own established /fly
                route (full SEO, FAQ schema, portfolio, already built) —
                linked here rather than duplicated as a fifth /servicos page */}
            <motion.div variants={revealUp}>
              <Link to="/fly" className="group block h-full">
                <MagicBentoCard className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-md transition-colors duration-300 hover:border-lime/30 md:p-8">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.15em] text-lime uppercase">
                      Vertente / Ergon Fly
                    </span>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                      {droneEntry.name}
                    </h2>
                    <p className="mt-2 text-sm text-graphite md:text-base">{droneEntry.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime">
                    Conhecer
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </MagicBentoCard>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* O QUE PODEMOS CONSTRUIR — concrete, low-text, recognition over explanation */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="grid-shell text-center">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="mb-4 block text-xs tracking-[0.25em] text-graphite-dim uppercase"
          >
            O que podemos construir
          </motion.span>
          <h2 className="mx-auto max-w-xl text-2xl leading-[1.15] font-semibold tracking-tight md:text-4xl">
            <GradualSpacing
              as="span"
              text="Você provavelmente já precisa de um destes."
              className="w-full justify-center"
              highlight={{ word: 'destes.', variant: 'circle', delay: 0.35 }}
            />
          </h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealContainer(0.04)}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3"
          >
            {BUILDABLE_EXAMPLES.map((item) => (
              <motion.span
                key={item}
                variants={revealUp}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-lime/40"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="grid-shell">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="mb-4 block text-xs tracking-[0.25em] text-graphite-dim uppercase"
          >
            Como trabalhamos
          </motion.span>
          <h2 className="max-w-lg text-2xl leading-[1.15] font-semibold tracking-tight md:text-4xl">
            <GradualSpacing as="span" text="Da ideia ao produto." highlight={{ word: 'produto.', variant: 'circle', delay: 0.35 }} />
          </h2>

          <div className="mt-8 grid grid-cols-2 md:mt-10 lg:grid-cols-4 lg:divide-x lg:divide-line">
            {DISCOVER_PROCESS.map((step, i) => (
              <div
                key={step.n}
                className={[
                  'p-5 lg:p-0 lg:pl-8 lg:first:pl-0',
                  i % 2 === 0 ? 'border-r border-lime lg:border-r-0' : '',
                  i < 2 ? 'border-b border-lime lg:border-b-0' : '',
                ].filter(Boolean).join(' ')}
              >
                <ProcessStep step={step} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      {featuredCases.length > 0 && (
        <section className="border-t border-line py-14 md:py-20">
          <div className="grid-shell">
            <motion.span
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="mb-4 block text-xs tracking-[0.25em] text-graphite-dim uppercase"
            >
              Projetos
            </motion.span>
            <h2 className="max-w-lg text-2xl leading-[1.15] font-semibold tracking-tight md:text-4xl">
              <GradualSpacing as="span" text="Prova, não promessa." highlight={{ word: 'promessa.', variant: 'circle', delay: 0.35 }} />
            </h2>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealContainer(0.08)}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {featuredCases.map((c) => (
                <motion.div key={c.slug} variants={revealUp}>
                  <Link to={`/portfolio/${c.slug}`} className="group block">
                    <CaseMedia asset={c.heroMedia} aspect="aspect-[4/3]" />
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink transition-colors group-hover:text-lime">
                        {c.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-graphite-dim transition-all group-hover:translate-x-0.5 group-hover:text-lime" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <ServiceFinalCTA headline="Tem algo na sua operação que poderia funcionar melhor?" />
    </main>
  )
}
