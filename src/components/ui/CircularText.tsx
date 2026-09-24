import './CircularText.css'

// ported from React Bits' CircularText, then reduced to a static wordmark:
// the letters stay laid out around the ring, but the infinite rotation and
// the hover speed-up were removed — a badge that spins forever is motion
// without a job, and it ran at the very top of the page on every load.
// Props kept for call-site compatibility; spin/hover are intentionally inert.

export type CircularTextHover = 'slowDown' | 'speedUp' | 'pause' | 'goBonkers'

interface CircularTextProps {
  text: string
  spinDuration?: number
  onHover?: CircularTextHover
  className?: string
}

export default function CircularText({ text, className = '' }: CircularTextProps) {
  const letters = Array.from(text)

  return (
    <div className={`circular-text ${className}`}>
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i
        const factor = Math.PI / letters.length
        const x = factor * i
        const y = factor * i
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        )
      })}
    </div>
  )
}
