import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'
import { revealUp, revealContainer, viewportOnce } from '@/lib/reveal'
import { GradientBars } from '@/components/ui/gradient-bars-background'
import { GradualSpacing } from '@/components/ui/gradual-spacing'
import { WHATSAPP_URL } from '@/lib/schema'
import type { ServiceStudy } from '@/services/servicesData'

export function ServiceHero({ service }: { service: ServiceStudy }) {
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
              to="/servicos"
              className="group mb-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-graphite-dim uppercase transition-colors hover:text-ink"
            >
              <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Serviços
            </Link>
          </motion.div>

          <motion.span variants={revealUp} className="mb-4 block text-xs tracking-[0.25em] text-lime uppercase">
            {service.eyebrow}
          </motion.span>

          <motion.span
            variants={revealUp}
            className="mb-5 inline-block rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.15em] text-graphite-dim uppercase"
          >
            {service.categoryLabel}
          </motion.span>

          <motion.h1
            variants={revealUp}
            className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[0.02em] text-ink uppercase"
          >
            <GradualSpacing as="span" text={service.name} className="w-full" />
          </motion.h1>

          <motion.p variants={revealUp} className="mt-6 max-w-2xl text-base text-graphite md:text-lg">
            {service.heroBlurb}
          </motion.p>

          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Falar sobre um projeto
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/portfolio"
              className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-lime/40"
            >
              Ver projetos
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
