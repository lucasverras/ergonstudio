import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { getCaseBySlug, getNextCase } from '@/cases/casesData'
import { servicesForCase } from '@/services/servicesData'
import { useSEO } from '@/lib/seo'
import { SITE_URL, SERVICE_IDS, breadcrumbSchema, webPageSchema, caseWorkSchema } from '@/lib/schema'
import { Breadcrumb } from '@/components/Breadcrumb'
import { revealUp, revealContainer, viewportOnce } from '@/lib/reveal'
import { CaseHero } from '@/components/case/CaseHero'
import { CaseQuickInfo } from '@/components/case/CaseQuickInfo'
import { CaseMedia } from '@/components/case/CaseMedia'
import { CaseNextProject } from '@/components/case/CaseNextProject'
import { NotFoundContent } from '@/components/NotFoundContent'

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.span
      variants={revealUp}
      className="block text-xs tracking-[0.25em] text-graphite-dim uppercase"
    >
      {children}
    </motion.span>
  )
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseBySlug(slug) : undefined

  // hook must run unconditionally on every render (rules of hooks) — an
  // unresolved slug is a real 404 (noindex), not silently redirected to
  // home, which would otherwise read as a soft-404 to crawlers
  const canonical = `${SITE_URL}/portfolio/${slug ?? ''}`
  // "[Cliente] — [solução] | Case Ergon" so the SERP result can never be
  // mistaken for the client's own site — the case framing is in the title
  // itself, not only in the body copy.
  // a couple of case names already carry their own " — subtitle" (e.g.
  // "Garagi — CRM + Website"); the title only needs the client name in
  // front of the solution, or it reads as two dashes in a row.
  const clientName = study?.name.split(' — ')[0]
  const title = study
    ? `${clientName} — ${study.solution} | Case Ergon`
    : 'Página não encontrada | Ergon Studio'
  const description = study ? study.metaDescription : 'Este case não existe ou foi movido.'
  const relatedServices = study ? servicesForCase(study.slug) : []
  const ogImage = study?.heroMedia.kind === 'real' ? `${SITE_URL}${study.heroMedia.src}` : undefined

  useSEO({
    title,
    description,
    canonical: study ? canonical : `${SITE_URL}/404`,
    ogImage,
    noindex: !study,
    jsonLd: study
      ? [
          webPageSchema({
            id: `${canonical}/#webpage`,
            url: canonical,
            name: title,
            description,
            primaryImage: ogImage,
            about: relatedServices.map((s) => SERVICE_IDS[s.serviceKey]),
          }),
          breadcrumbSchema([
            { name: 'Ergon', url: `${SITE_URL}/` },
            { name: 'Portfólio', url: `${SITE_URL}/portfolio` },
            { name: study.name, url: canonical },
          ]),
          // the case study itself as a work Ergon authored — the client is
          // the subject of it, never its publisher
          caseWorkSchema({
            url: canonical,
            name: study.name,
            clientName: clientName!,
            description: study.headline,
            image: ogImage,
            about: study.servicos,
            serviceIds: relatedServices.map((s) => SERVICE_IDS[s.serviceKey]),
          }),
        ]
      : [],
  })

  if (!study) {
    return <NotFoundContent />
  }

  const next = getNextCase(study.slug)

  return (
    <main>
      <div className="grid-shell pt-8">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Projetos', url: '/portfolio' },
            { name: study.name, url: `/portfolio/${study.slug}` },
          ]}
        />
      </div>
      <CaseHero study={study} />
      <CaseQuickInfo servicos={study.servicos} tecnologias={study.tecnologias} entrega={study.entrega} />

      {/* desafio + construímos side by side — two short paragraphs don't
          need two separate full-width sections */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={revealContainer(0.1)}
        className="border-t border-line py-14 md:py-20"
      >
        <div className="grid-shell">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <SectionLabel>O desafio</SectionLabel>
              <motion.p variants={revealUp} className="mt-4 text-lg leading-relaxed text-graphite md:text-xl">
                {study.challenge}
              </motion.p>
            </div>
            <div>
              <SectionLabel>O que construímos</SectionLabel>
              {study.built.kind === 'dual' ? (
                <div className="mt-4 space-y-4">
                  {study.built.intro && (
                    <motion.p variants={revealUp} className="font-medium text-ink">
                      {study.built.intro}
                    </motion.p>
                  )}
                  <motion.p variants={revealUp} className="text-lg leading-relaxed text-graphite md:text-xl">
                    <span className="text-ink">Website —</span> {study.built.website}
                  </motion.p>
                  <motion.p variants={revealUp} className="text-lg leading-relaxed text-graphite md:text-xl">
                    <span className="text-ink">Sistema interno —</span> {study.built.internal}
                  </motion.p>
                </div>
              ) : (
                <motion.p variants={revealUp} className="mt-4 text-lg leading-relaxed text-graphite md:text-xl">
                  {study.built.text}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* entregas + visual side by side too — a short checklist and the
          screenshots share the same row instead of stacking as their own
          full-width sections */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={revealContainer(0.1)}
        className="border-t border-line py-14 md:py-20"
      >
        <div className="grid-shell">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <SectionLabel>Principais entregas</SectionLabel>
              <ul className="mt-4 space-y-3">
                {study.deliverables.map((item) => (
                  <motion.li key={item} variants={revealUp} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-lime" strokeWidth={2.5} />
                    <span className="text-base text-graphite md:text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {study.gallery.length > 0 && (
              <div>
                <SectionLabel>Visual</SectionLabel>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  {study.gallery.map((asset, i) => (
                    <motion.div key={i} variants={revealUp}>
                      <CaseMedia asset={asset} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {relatedServices.length > 0 && (
        <section className="border-t border-line py-10">
          <div className="grid-shell">
            <span className="mb-3 block text-xs tracking-[0.25em] text-graphite-dim uppercase">
              Serviços utilizados neste projeto
            </span>
            <div className="flex flex-wrap gap-2">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  to={`/servicos/${s.slug}`}
                  className="rounded-full border border-line px-3 py-1 text-xs text-graphite-dim transition-colors hover:border-lime/40 hover:text-lime"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {study.result && (
        <section className="border-t border-line py-14 md:py-20">
          <div className="grid-shell">
            <span className="mb-4 block text-xs tracking-[0.25em] text-graphite-dim uppercase">
              Resultado
            </span>
            <p className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] text-lime">
              {study.result.metric}
            </p>
            <p className="mt-2 max-w-md text-base text-graphite md:text-lg">{study.result.desc}</p>
          </div>
        </section>
      )}

      <CaseNextProject next={next} />
    </main>
  )
}
