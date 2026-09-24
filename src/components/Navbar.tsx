import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import logo from '../assets/logo.svg'
import { WHATSAPP_URL } from '../lib/schema'
import { services } from '../services/servicesData'

const links = [
  { label: 'Projetos', href: '/portfolio' },
  { label: 'Método', href: '/#processo' },
  { label: 'Clientes', href: '/#clientes' },
]

// route links (starting with "/") need client-side navigation via
// react-router's Link; in-page anchors (starting with "#") stay as plain
// <a> so they keep scrolling within the current page — same classes either
// way so the two render identically
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className?: string
  onClick?: () => void
  children: ReactNode
}) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

// small hover dropdown under "Serviços" — the 4 real pillars, not a
// megamenu. Desktop only; mobile just links straight to /servicos, which
// already lists the same 4 with fuller descriptions.
function ServicesDropdown({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        to="/servicos"
        className={`flex items-center gap-1 text-graphite transition-colors hover:text-ink ${
          scrolled ? 'text-xs' : 'text-sm'
        }`}
      >
        Serviços
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 z-20 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-bg/95 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <ul className="divide-y divide-line">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/servicos/${s.slug}`}
                    className="block px-4 py-3 transition-colors hover:bg-surface"
                  >
                    <span className="block text-sm font-medium text-ink">{s.categoryLabel}</span>
                    <span className="mt-0.5 block text-xs text-graphite">{s.homeDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// two bars that rotate into an X — same currentColor language as
// BrandIcons.tsx rather than a Unicode glyph
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <motion.span
        className="absolute h-[1.4px] w-4 rounded-full bg-current"
        animate={open ? { y: 0, rotate: 45 } : { y: -4, rotate: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="absolute h-[1.4px] w-4 rounded-full bg-current"
        animate={open ? { y: 0, rotate: -45 } : { y: 4, rotate: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  )
}

// once scrolled, the header detaches from the hero and becomes an inset
// floating bar — toggled by a single boolean and animated purely with CSS
// transitions, since the properties involved (backdrop-filter, box-shadow,
// border-radius) aren't things Framer Motion interpolates natively
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ticking = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        ticking.current = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on Escape and lock page scroll behind the open drawer
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [menuOpen])

  // a route change or resize past the breakpoint should never leave the
  // drawer open and the underlying page scroll-locked
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      // absolute, not fixed: it overlays the hero content right from y=0
      // (no gap pushing the hero down) but still scrolls away normally
      // with the page instead of staying pinned to the viewport
      className="absolute inset-x-0 top-0 z-[var(--z-navbar)] md:fixed"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div
        className={`mx-auto transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'mt-4 max-w-4xl rounded-2xl border border-line bg-bg/70 px-3 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md'
            : 'mt-0 max-w-none rounded-none border border-transparent bg-transparent px-0 shadow-none'
        }`}
        style={{ width: scrolled ? 'calc(100% - 24px)' : '100%' }}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? 'h-16 px-3' : 'grid-shell h-24 py-5 md:h-28'
          }`}
        >
          {/* mobile-only spacer matching the hamburger button's own w-10
              footprint — with justify-between and two equal-width end
              pieces, the logo between them lands genuinely centered
              instead of drifting left once the CTA button is gone */}
          <div className="w-10 md:hidden" aria-hidden="true" />

          <Link to="/#top" className="flex items-center">
            <img
              src={logo}
              alt="Ergon"
              className={`w-auto transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                scrolled ? 'h-7' : 'h-8 md:h-12'
              }`}
            />
          </Link>

          <ul
            className={`hidden items-center md:flex transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled ? 'gap-6' : 'gap-10'
            }`}
          >
            <li>
              <ServicesDropdown scrolled={scrolled} />
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <NavLink
                  href={l.href}
                  className={`text-graphite transition-colors hover:text-ink ${
                    scrolled ? 'text-xs' : 'text-sm'
                  }`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`group hidden items-center gap-2 rounded-full bg-lime font-medium text-bg shadow-[0_0_0_0_rgba(227,255,12,0)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_24px_2px_rgba(227,255,12,0.35)] md:flex ${
                scrolled ? 'px-5 py-2.5 text-xs' : 'px-6 py-3 text-sm'
              }`}
            >
              Falar sobre um projeto
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </motion.a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-lime/40 md:hidden"
            >
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid-shell mt-3 md:hidden"
          >
            <nav
              aria-label="Navegação principal"
              className="overflow-hidden rounded-2xl border border-line bg-bg/95 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <ul className="divide-y divide-line">
                <li>
                  <NavLink
                    href="/servicos"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-5 py-4 text-base text-graphite transition-colors hover:text-ink"
                  >
                    Serviços
                  </NavLink>
                </li>
                {links.map((l) => (
                  <li key={l.href}>
                    <NavLink
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-5 py-4 text-base text-graphite transition-colors hover:text-ink"
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-5 py-4 text-base text-lime"
                  >
                    Falar sobre um projeto
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
