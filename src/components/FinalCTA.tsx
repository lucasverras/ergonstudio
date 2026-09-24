import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { revealUp, viewportOnce } from '../lib/reveal'
import { GradualSpacing } from './ui/gradual-spacing'
import { TextReveal } from './ui/text-reveal'
import { WHATSAPP_URL } from '../lib/schema'

export default function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 text-center md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%]"
        style={{
          background:
            'radial-gradient(600px circle at 50% 0%, rgba(227,255,12,0.1), transparent 65%)',
        }}
      />

      <div className="grid-shell">
        <h2 className="mx-auto max-w-4xl text-3xl leading-[1.1] font-semibold tracking-tight md:max-w-6xl md:text-6xl">
          <GradualSpacing
            as="span"
            text="Tem algo na sua operação"
            className="w-full justify-center"
          />
          <GradualSpacing
            as="span"
            text="que poderia funcionar melhor?"
            className="mt-1 w-full justify-center"
            delayMultiple={0.025}
            highlight={{ word: 'melhor?', variant: 'circle', delay: 0.4 }}
          />
        </h2>
        <TextReveal
          as="p"
          per="line"
          preset="fade-in-blur"
          className="mx-auto mt-5 max-w-md text-base text-graphite md:text-lg"
        >
          Pode ser um site, um sistema, uma automação ou algo que ainda não tem nome.
        </TextReveal>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="mt-12"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group inline-flex items-center gap-3 rounded-full bg-lime px-10 py-5 text-base font-medium text-bg shadow-[0_0_0_0_rgba(227,255,12,0)] transition-shadow duration-300 hover:shadow-[0_0_40px_6px_rgba(227,255,12,0.4)] md:text-lg"
          >
            Falar sobre um projeto
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
