import { motion } from 'framer-motion'
import { revealUp, viewportOnce } from '../../lib/reveal'
import { GradualSpacing } from '../ui/gradual-spacing'
import MagicBentoCard from '../ui/MagicBentoCard'

export default function FlyCTA() {
  return (
    <section id="orcamento" className="relative section-pad border-t border-line text-center">
      <div className="grid-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="relative mx-auto md:max-w-[65%]"
        >
          <MagicBentoCard className="relative overflow-hidden rounded-[2rem] border border-lime/25 bg-bg p-8 shadow-[0_0_0_1px_rgba(227,255,15,0.06),0_0_80px_-20px_var(--fly-glow-lime)] md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(600px circle at 50% 0%, rgba(227,255,15,0.14), transparent 65%), radial-gradient(500px circle at 100% 100%, rgba(139,92,246,0.12), transparent 60%)',
              }}
            />

            <div className="relative z-10">
              <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-tight md:text-4xl">
                <GradualSpacing
                  as="span"
                  text="Solicite seu orçamento grátis"
                  className="w-full justify-center"
                  highlight={{ word: 'grátis', variant: 'circle', delay: 0.4 }}
                />
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-graphite">
                Sessão média de 2 horas, entrega em até 3 dias úteis. Gravamos em formato
                horizontal e vertical. Viajamos para qualquer cidade do Brasil.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="mailto:contato@ergonstudio.com.br"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group flex items-center gap-2 rounded-full bg-lime px-8 py-3.5 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_32px_4px_var(--fly-glow-lime)]"
                >
                  Quero orçamento
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/5511967206875"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="rounded-full border px-8 py-3.5 text-sm text-ink transition-shadow hover:shadow-[0_0_24px_2px_rgba(37,211,102,0.35)]"
                  style={{ borderColor: 'var(--fly-whatsapp)' }}
                >
                  WhatsApp
                </motion.a>
              </div>
              <p className="mt-6 text-xs tracking-[0.15em] text-graphite-dim uppercase">
                contato@ergonstudio.com.br · (11) 96720-6875 · Resposta em até 2 horas
              </p>
            </div>
          </MagicBentoCard>
        </motion.div>
      </div>
    </section>
  )
}
