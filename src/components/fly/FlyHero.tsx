import { motion } from 'framer-motion'
import { revealUp, viewportOnce } from '../../lib/reveal'
import { GradualSpacing } from '../ui/gradual-spacing'
import { TextReveal } from '../ui/text-reveal'
import FlyVideo from './FlyVideo'

// the first screen is the flight itself — full-height video, nothing below
// it visible until the visitor scrolls, same weight as a real cinema hero
// fixes the audit's "droneprofissional" run-together bug from the source
// H1 — kept as two literal words with a real space, not a styled <br>
export default function FlyHero() {
  return (
    <section id="fly-top" className="relative flex h-screen min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <FlyVideo
          src="/fly/videos/hero-video.mp4"
          title="Drone sobrevoando paisagem urbana em São Paulo"
          className="h-full w-full object-cover"
        />
        {/* flat low-opacity overlay across the whole frame — sits on top of
            the footage rather than blending into its own colors, so the
            video keeps its natural tone underneath while text stays
            legible everywhere */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(12, 20, 40, 0.45)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 55% at 50% 42%, rgba(5,0,15,0.82) 0%, rgba(5,0,15,0.55) 45%, transparent 75%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-bg" />
      </div>

      <div className="grid-shell relative w-full text-center">
        <h1 className="mx-auto max-w-4xl leading-[1.05] tracking-tight">
          <GradualSpacing
            as="span"
            text="Veja além do óbvio."
            className="w-full justify-center font-semibold text-4xl italic md:text-7xl"
            duration={0.4}
          />
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="mt-1 inline-flex w-full flex-wrap justify-center font-normal text-graphite text-2xl md:text-4xl"
          >
            Conte sua história de outro ângulo.
          </motion.span>
        </h1>

        <div className="mx-auto mt-6 max-w-xl">
          <TextReveal
            as="p"
            per="line"
            preset="fade-in-blur"
            delay={0.3}
            className="text-base text-graphite md:text-lg"
          >
            Captação aérea profissional para marcas, eventos, imóveis, turismo e produções que
            precisam causar impacto.
          </TextReveal>
          <TextReveal
            as="p"
            per="line"
            preset="fade-in-blur"
            delay={0.4}
            className="mt-3 text-base text-graphite md:text-lg"
          >
            Do planejamento ao voo, entregamos conteúdo pensado para comunicar, impressionar e
            elevar a percepção da sua marca.
          </TextReveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#orcamento"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group flex items-center gap-2 rounded-full bg-lime px-8 py-3.5 text-sm font-medium text-bg shadow-[0_0_0_0_rgba(227,255,15,0)] transition-shadow duration-300 hover:shadow-[0_0_32px_4px_rgba(227,255,15,0.45)]"
          >
            Quero orçamento
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
          <motion.a
            href="#portfolio-fly"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="rounded-full border border-line px-8 py-3.5 text-sm text-ink transition-colors hover:text-violet"
          >
            Ver portfólio
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-line/60 p-1.5">
          <span className="h-1.5 w-1 rounded-full bg-lime" />
        </span>
      </motion.div>
    </section>
  )
}
