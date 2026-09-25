import { services } from '@/services/servicesData'
import { cases } from '@/cases/casesData'

/** Every public, indexable route, in one place. Drives the prerenderer,
 * the sitemap and the SEO audit script, so those three can never drift
 * apart from each other or from the real route table in App.tsx.
 *
 * The portfolio hub and case pages are deliberately NOT here: they're
 * prerendered (so they work on-site and stay linkable as proof from the
 * service pages) but kept out of the sitemap and marked noindex, so a
 * search for a client's name never surfaces our case page. */
export const PUBLIC_ROUTES: string[] = [
  '/',
  '/servicos',
  ...services.map((s) => `/servicos/${s.slug}`),
  '/fly',
]

/** Prerendered but deliberately noindex: the 404 body, plus the whole
 * portfolio (hub + every case) so it renders for visitors but is excluded
 * from Google — reinforced by noindex meta in the pages and an
 * X-Robots-Tag header on /portfolio in vercel.json. */
export const NOINDEX_ROUTES: string[] = [
  '/404',
  '/portfolio',
  ...cases.map((c) => `/portfolio/${c.slug}`),
]
