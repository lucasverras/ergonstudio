import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { viewportOnce } from '../lib/reveal'
import { WHATSAPP_URL } from '../lib/schema'

// Section-local variants: opacity + a short 12px lift, 320ms, natural ease.
// Kept local (not the shared revealUp) so the answer-card choreography can
// stagger its own rows without touching the site-wide defaults.
const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const ENGINES = ['ChatGPT', 'Gemini', 'Claude', 'Google AI']

const PILLARS = [
  'Estrutura preparada para IA',
  'Schema e dados estruturados',
  'SEO técnico',
  'Conteúdo semanticamente organizado',
  'AEO — Answer Engine Optimization',
  'GEO — Generative Engine Optimization',
]

export default function AiVisibility() {
  const reduced = useReducedMotion()

  return (
    <section id="ia" className="relative border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[55%]"
        style={{
          background: 'radial-gradient(680px circle at 80% 0%, rgba(227,255,12,0.08), transparent 65%)',
        }}
      />

      <div className="grid-shell relative z-10 grid grid-cols-1 gap-12 pt-16 pb-[var(--section-gap)] lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* LEFT — message */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
        >
          <motion.span
            variants={rise}
            className="block font-mono text-xs tracking-[0.25em] text-graphite-dim uppercase"
          >
            [ AEO + GEO ]
          </motion.span>

          <motion.h2
            variants={rise}
            className="mt-4 max-w-xl text-3xl leading-[1.05] font-semibold tracking-tight text-balance md:text-5xl"
          >
            Sua empresa também precisa aparecer no{' '}
            <span className="text-lime">ChatGPT</span>.
          </motion.h2>

          <motion.p variants={rise} className="mt-5 max-w-md text-base text-graphite md:text-lg">
            Não basta mais estar no Google. Estruturamos seu site para que sua empresa seja
            encontrada, compreendida e citada por mecanismos de busca e inteligências artificiais.
          </motion.p>

          <motion.ul variants={rise} className="mt-8 flex flex-wrap gap-2.5">
            {PILLARS.map((p) => (
              <li
                key={p}
                className="rounded-full border border-line px-4 py-2 text-xs text-graphite transition-colors duration-200 hover:border-lime/40 hover:text-ink"
              >
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={rise} className="mt-10">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-8 py-4 text-base font-medium text-bg shadow-[0_0_0_0_rgba(227,255,12,0)] transition-shadow duration-300 hover:shadow-[0_0_32px_5px_rgba(227,255,12,0.35)]"
            >
              Quero aparecer nas buscas
              <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — simulated AI answer flow */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="relative"
        >
          {/* the question a real user types */}
          <motion.div
            variants={rise}
            className="rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur-sm"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-graphite-dim uppercase">
              Pergunta
            </span>
            <p className="mt-2 text-sm text-ink md:text-base">
              “Qual a melhor empresa de tecnologia e produtos digitais em São Paulo?”
            </p>
          </motion.div>

          {/* engines that answer it */}
          <motion.div variants={rise} className="mt-3 flex flex-wrap gap-2">
            {ENGINES.map((e) => (
              <span
                key={e}
                className="rounded-lg border border-line bg-bg/40 px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-graphite"
              >
                {e}
              </span>
            ))}
          </motion.div>

          {/* the answer — a generic result card with "your company" highlighted */}
          <motion.div
            variants={rise}
            className="mt-3 rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur-sm"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-graphite-dim uppercase">
              Resposta da IA
            </span>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              Entre as opções mais recomendadas em São Paulo está
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-lime/40 bg-lime/[0.06] px-4 py-3 ring-1 ring-lime/20">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime/15 font-mono text-sm font-semibold text-lime">
                ★
              </span>
              <div>
                <span className="block text-sm font-semibold text-ink">Sua empresa</span>
                <span className="block text-xs text-graphite">
                  citada como referência no seu segmento
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
