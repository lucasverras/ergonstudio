import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowUpRight } from 'lucide-react'
import { revealUp, revealContainer, viewportOnce } from '@/lib/reveal'
import { GradientBars } from '@/components/ui/gradient-bars-background'
import type { CaseStudy } from '@/cases/casesData'
import { CaseMedia } from './CaseMedia'

export function CaseHero({ study }: { study: CaseStudy }) {
  // some names carry their own " — subtitle"; the attribution line wants
  // just the client
  const clientName = study.name.split(' — ')[0]

  return (
    <header className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
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
          background: 'radial-gradient(720px circle at 85% 0%, rgba(227,255,12,0.1), transparent 65%)',
        }}
      />

      <div className="relative z-10 grid-shell">
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={revealContainer()}>
          <motion.div variants={revealUp}>
            <Link
              to="/portfolio"
              className="group mb-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-graphite-dim uppercase transition-colors hover:text-ink"
            >
              <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Portfólio
            </Link>
          </motion.div>

          <motion.span
            variants={revealUp}
            className="mb-4 flex items-center gap-2 text-xs tracking-[0.25em] text-lime uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_2px_rgba(227,255,12,0.6)]" />
            Case · Ergon Studio
          </motion.span>

          <motion.h1
            variants={revealUp}
            className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.98] text-ink"
          >
            {study.name}
          </motion.h1>

          <motion.p variants={revealUp} className="mt-6 max-w-2xl text-base text-graphite md:text-lg">
            {study.headline}
          </motion.p>

          {/* One plain, unambiguous line of attribution. A case page ranks
              for the client's name, so it has to say in body copy — not just
              in an eyebrow — whose work this is and whose site it isn't. */}
          <motion.p variants={revealUp} className="mt-4 max-w-2xl text-sm text-graphite-dim">
            Projeto desenvolvido pela{' '}
            <Link to="/" className="text-graphite underline underline-offset-4 transition-colors hover:text-lime">
              Ergon Studio
            </Link>
            . Esta é a página do case, não o site oficial de {clientName}.
          </motion.p>

          {study.ctaUrl && study.ctaLabel && (
            <motion.div variants={revealUp} className="mt-6">
              {study.ctaUrl.startsWith('/') ? (
                <Link
                  to={study.ctaUrl}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-lime"
                >
                  Ver projeto
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <a
                  href={study.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-lime"
                >
                  Ver projeto
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="mt-14"
        >
          <CaseMedia asset={study.heroMedia} eager aspect="aspect-[16/9]" />
        </motion.div>
      </div>
    </header>
  )
}
