import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { revealUp, revealContainer } from '../lib/reveal'
import { GradualSpacing } from './ui/gradual-spacing'

// Pure presentational 404 body — no useSEO call of its own, so it can be
// reused both by the /* catch-all route (pages/NotFound.tsx) and by
// CaseStudy.tsx for an unresolved :slug, each of which owns its own single
// useSEO call (rules of hooks: a component can't call the hook twice with
// two different noindex values depending on a branch).
export function NotFoundContent() {
  return (
    <main className="grid-shell flex min-h-svh flex-col items-center justify-center py-32 text-center">
      <motion.div initial="hidden" animate="show" variants={revealContainer()}>
        <motion.span
          variants={revealUp}
          className="mb-4 block font-display text-lime"
          style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}
        >
          404
        </motion.span>
        <motion.h1 variants={revealUp} className="mx-auto max-w-xl text-2xl leading-[1.2] font-semibold tracking-tight md:text-4xl">
          <GradualSpacing as="span" text="Essa página não existe." className="w-full justify-center" />
        </motion.h1>
        <motion.p variants={revealUp} className="mx-auto mt-4 max-w-md text-base text-graphite">
          O endereço pode ter mudado ou nunca existiu. Volte para a home e continue por lá.
        </motion.p>
        <motion.div variants={revealUp} className="mt-8 flex justify-center">
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Voltar para a home
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
