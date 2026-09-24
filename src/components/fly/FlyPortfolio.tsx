import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { revealUp, revealContainer, viewportOnce } from '../../lib/reveal'
import { GradualSpacing } from '../ui/gradual-spacing'
import MagicBentoCard from '../ui/MagicBentoCard'

const clips = [
  {
    id: 'imagens-rurais',
    title: 'Imagens Rurais',
    description: 'Capturas aéreas de paisagens e propriedades rurais.',
    src: '/fly/videos/portfolio-imagens-rurais.mp4',
    poster: '/fly/images/portfolio-imagens-rurais-poster.webp',
    accent: 'lime',
  },
  {
    id: 'natureza',
    title: 'Natureza',
    description: 'A beleza natural vista de uma perspectiva única.',
    src: '/fly/videos/portfolio-natureza.mp4',
    poster: '/fly/images/portfolio-natureza-poster.webp',
    accent: 'violet',
  },
  {
    id: 'logistica',
    title: 'Logística',
    description: 'Monitoramento e inspeção de operações logísticas.',
    src: '/fly/videos/portfolio-logistica.mp4',
    poster: '/fly/images/portfolio-logistica-poster.jpg',
    accent: 'violet',
  },
  {
    id: 'avenidas',
    title: 'Avenidas',
    description: 'Vistas aéreas de vias urbanas e infraestrutura.',
    src: '/fly/videos/portfolio-avenidas.mp4',
    poster: '/fly/images/portfolio-avenidas-poster.jpg',
    accent: 'lime',
  },
] as const

function PortfolioCard({ clip }: { clip: (typeof clips)[number] }) {
  const [playing, setPlaying] = useState(false)

  return (
    <MagicBentoCard
      className={`group overflow-hidden rounded-2xl border p-0 text-left transition-colors ${
        clip.accent === 'lime' ? 'border-lime/20 hover:border-lime/50' : 'border-violet/20 hover:border-violet/50'
      }`}
    >
      <button
        type="button"
        onClick={() => setPlaying((v) => !v)}
        aria-label={playing ? `Pausar ${clip.title}` : `Reproduzir ${clip.title}`}
        className="relative block aspect-video w-full overflow-hidden"
      >
        {playing ? (
          <video
            className="h-full w-full object-cover"
            src={clip.src}
            poster={clip.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={clip.poster}
            alt={`${clip.title} — quadro do voo`}
            className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        {!playing && (
          <motion.span
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full ${
              clip.accent === 'lime' ? 'bg-lime text-bg' : 'bg-violet text-ink'
            }`}
          >
            <Play size={20} fill="currentColor" strokeWidth={0} className="ml-0.5" />
          </motion.span>
        )}
      </button>
      <div className="p-5">
        <h3
          className={`text-lg font-semibold transition-colors ${
            clip.accent === 'lime' ? 'text-ink group-hover:text-lime' : 'text-ink group-hover:text-violet'
          }`}
        >
          {clip.title}
        </h3>
        <p className="mt-1 text-sm text-graphite">{clip.description}</p>
      </div>
    </MagicBentoCard>
  )
}

export default function FlyPortfolio() {
  return (
    <section id="portfolio-fly" className="relative section-pad border-t border-line">
      <div className="grid-shell text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="mx-auto max-w-2xl text-2xl leading-[1.1] font-semibold tracking-tight md:text-4xl"
        >
          <GradualSpacing
            as="span"
            text="Confira nossos últimos voos"
            className="w-full justify-center"
            highlight={{ word: 'voos', variant: 'circle', delay: 0.4 }}
          />
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealContainer(0.1)}
          className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2"
        >
          {clips.map((clip) => (
            <motion.div key={clip.id} variants={revealUp}>
              <PortfolioCard clip={clip} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
