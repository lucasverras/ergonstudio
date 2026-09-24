import { useRef, type ReactNode, type MouseEvent } from 'react'
import './MagicBentoCard.css'

// Reduced to a subtle spotlight-on-hover only. The 3D tilt, cursor
// magnetism and click ripple were removed — cards that tilt and fly fight
// the content for attention. What stays is a soft border/background glow
// that tracks the cursor through CSS variables: no springs, no transforms,
// no per-frame JS. prefers-reduced-motion hides the glow via the stylesheet.
export default function MagicBentoCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    ref.current.style.setProperty('--glow-x', `${(px / rect.width) * 100}%`)
    ref.current.style.setProperty('--glow-y', `${(py / rect.height) * 100}%`)
    ref.current.style.setProperty('--glow-intensity', '1')
  }

  const handleMouseLeave = () => {
    ref.current?.style.setProperty('--glow-intensity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magic-bento-card relative ${className}`}
    >
      {children}
    </div>
  )
}
