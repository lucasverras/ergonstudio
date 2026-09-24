import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { GradientBars } from '@/components/ui/gradient-bars-background'
import type { CaseStudy } from '@/cases/casesData'
import { CaseMedia } from './CaseMedia'

export function CaseNextProject({ next }: { next: CaseStudy }) {
  return (
    <section className="relative overflow-hidden border-t border-line py-14 md:py-20">
      <GradientBars
        numBars={15}
        gradientFrom="var(--color-lime)"
        gradientTo="transparent"
        animationDuration={3}
        className="opacity-[0.08]"
      />
      <div className="relative z-10 grid-shell">
        <Link
          to={`/portfolio/${next.slug}`}
          className="group grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]"
        >
          <div>
            <span className="text-xs tracking-[0.25em] text-graphite-dim uppercase">
              Próximo projeto
            </span>
            <h2 className="mt-3 flex items-center gap-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-ink transition-colors group-hover:text-lime">
              {next.name}
              <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
            </h2>
          </div>
          <div className="w-full max-w-xs overflow-hidden rounded-2xl md:w-64">
            <div className="transition-transform duration-500 group-hover:scale-[1.02]">
              <CaseMedia asset={next.heroMedia} aspect="aspect-[16/10]" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
