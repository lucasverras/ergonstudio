import type { Variants } from 'framer-motion'

// Kowalski-tuned defaults: a short 12px lift + fade, 400ms, natural ease.
// Motion here exists to explain that content just arrived, not to perform —
// so the displacement stays small and the duration stays inside the
// 300–450ms band that reads as "fast and intentional" rather than "watch me".
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

// Default stagger trimmed to 60ms — inside the 40–70ms band — so a row of
// children resolves quickly instead of cascading noticeably.
export const revealContainer = (stagger = 0.06): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger },
  },
})

// amount:0.2 so a section commits to its one-time reveal a touch earlier,
// and once:true guarantees it never re-runs on scroll back.
export const viewportOnce = { once: true, amount: 0.2 } as const
