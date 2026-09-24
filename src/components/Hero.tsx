import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  useReducedMotion,
  motion,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import MagicBentoCard from './ui/MagicBentoCard'
import CircularText from './ui/CircularText'
import { GradualSpacing } from './ui/gradual-spacing'
import { TextReveal } from './ui/text-reveal'
import { useIsMobile } from '@/lib/useIsMobile'

// small preview loop for the hero slideshow — kept local and short (not the
// full case-study data from Portfolio.tsx) since this is a glance, not the
// portfolio section itself
const previews = [
  { name: 'GBC', category: 'Website & Digital Experience', image: '/portfolio/green-bay-car/desktop-hero.webp' },
  { name: 'Garagi', category: 'Automotive Digital Experience', image: '/portfolio/garagi/desktop-hero.webp' },
  { name: 'Cardápio Franco', category: 'Digital Menu', image: '/images/portfolio/cardapio-franco.webp' },
]

const circularLabel = 'VISUAL DESIGN STUDIO - VISUAL DESIGN STUDIO - '

// DarkVeil pulls in ogl (WebGL) — about a fifth of the app bundle for a
// decorative background. Loading it after mount keeps it out of the bundle
// the browser must parse before it can hydrate and paint the headline.
// Renders nothing server-side and nothing on the client's first pass, so
// there's no hydration mismatch to recover from. It also self-disables under
// prefers-reduced-motion and pauses on a hidden tab.
type DarkVeilProps = React.ComponentProps<typeof import('./ui/dark-veil')['DarkVeil']>

function useDeferredDarkVeil() {
  const [Veil, setVeil] = useState<ComponentType<DarkVeilProps> | null>(null)
  useEffect(() => {
    let alive = true
    import('./ui/dark-veil').then((m) => {
      if (alive) setVeil(() => m.DarkVeil)
    })
    return () => {
      alive = false
    }
  }, [])
  return Veil
}

function PortfolioSlideshow() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !isVisible) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % previews.length)
    }, 3200)
    return () => clearInterval(id)
  }, [reduced, isVisible])

  const project = previews[active]

  return (
    <Link
      ref={ref}
      to="/portfolio"
      className="block h-40 w-60 sm:h-44 sm:w-72"
    >
    <MagicBentoCard className="group relative h-full w-full overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-md transition-colors hover:border-lime/30">
      <AnimatePresence mode="wait">
        <motion.img
          key={project.name}
          src={project.image}
          alt=""
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 font-mono text-[10px] tracking-widest text-graphite-dim uppercase">
        <span>({String(active + 1).padStart(2, '0')}) Portfólio</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={project.category}
            initial={reduced ? undefined : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-ink"
          >
            {project.name}
            <span className="mt-0.5 block text-xs font-normal text-graphite">
              {project.category}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>
    </MagicBentoCard>
    </Link>
  )
}

// rotating circular wordmark — a placeholder ring while the icon-only logo
// mark isn't ready yet (per Lucas: "ainda vamos adicionar"). Swap the glow
// ball in the center for the real mark once it exists; the ring/text stay.
// CircularText's own letter-placement math assumes a 200px box, so it's
// scaled down via a fixed-size wrapper + CSS transform rather than
// rewriting that math for a smaller badge.
function CircularBadge() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
      <div className="h-[200px] w-[200px] scale-[0.62] sm:scale-[0.68]">
        <CircularText text={circularLabel} spinDuration={22} onHover="speedUp" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="h-5 w-5 rounded-full bg-lime shadow-[0_0_28px_8px_rgba(227,255,12,0.65)]" />
      </div>
    </div>
  )
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}


export default function Hero() {
  const isMobile = useIsMobile()
  const DarkVeil = useDeferredDarkVeil()

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-bg pt-24 md:pt-28"
    >
      {/* CSS radial glow — always present, gives the lime bloom even before WebGL
          initialises, and stays visible on reduced-motion / very old devices */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(227,255,12,0.08) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(227,255,12,0.04) 0%, transparent 60%)',
        }}
      />
      {/* WebGL scanline/noise shader — desktop full res; mobile at 0.3
          resolution (far fewer pixels) so the GPU load stays low while the
          atmospheric look is preserved. Self-disables under reduced-motion. */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-70">
        {DarkVeil && <DarkVeil
          hueShift={0}
          noiseIntensity={isMobile ? 0.1 : 0.17}
          scanlineIntensity={isMobile ? 0.6 : 1}
          speed={isMobile ? 2 : 3}
          scanlineFrequency={5}
          resolutionScale={isMobile ? 0.3 : 1}
        />}
      </div>

      {/* real content sits on its own explicit stacking layer above decoration/background.
          Headline lives in the top-left, right under the navbar — a real
          grid column (1/8), not absolute/percentage offsets, so it starts on
          the same line as every other section. */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid-shell grid-cols relative z-[var(--z-content)] pt-10 sm:pt-16"
      >
        {/* headline: smaller and wider than before — each fixed line now
            comfortably fits more text, so it reads as long confident lines
            rather than a stacked wall of giant type. The dynamic word still
            gets its own line (unconstrained width, whitespace-nowrap) so
            "em operação" never wraps or reflows the line above it. */}
        <h1 className="col-headline font-display text-[clamp(4.05rem,8.8vw,9.3rem)] leading-[1.02] tracking-[0.02em] uppercase md:text-[clamp(3rem,6.5vw,6.875rem)]">
          <GradualSpacing as="span" text="Ergon" className="w-full text-lime" />
          <GradualSpacing as="span" text="Product Studio" className="mt-1 w-full" delayMultiple={0.03} />
        </h1>
      </motion.div>

      {/* circular wordmark, top-right corner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[220px] z-[var(--z-content)] hidden md:block"
        style={{ right: 'calc(var(--grid-margin) + 2.5rem)' }}
      >
        <CircularBadge />
      </motion.div>

      {/* portfolio slideshow preview, bottom-left corner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 z-[var(--z-content)] hidden sm:block"
        style={{ left: 'var(--grid-margin)' }}
      >
        <PortfolioSlideshow />
      </motion.div>

      {/* support copy, bottom-right corner — in the CTA's old spot */}
      <div
        className="absolute bottom-10 z-[var(--z-content)] max-w-[58%] sm:max-w-xs"
        style={{ right: 'var(--grid-margin)' }}
      >
        <TextReveal
          as="p"
          per="line"
          preset="fade"
          delay={0.35}
          className="text-right text-sm text-graphite sm:text-base"
        >
          Somos um product studio dedicado a tirar ideias do papel. Da
          estratégia de UX à interface final, desenhamos e construímos
          produtos digitais pensados para o ritmo de transformação que a
          tecnologia impõe&nbsp;hoje.
        </TextReveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="pointer-events-none absolute bottom-10 left-1/2 z-[var(--z-decorative)] hidden -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-surface/60 py-2 pr-3 pl-4 font-mono text-[10px] tracking-widest text-graphite-dim uppercase backdrop-blur-sm lg:flex"
      >
        scroll
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime/10 text-lime">
          ↓
        </span>
      </motion.div>
    </section>
  )
}
