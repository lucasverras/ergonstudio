import type { CSSProperties } from 'react'

interface GradientBarsProps {
  numBars?: number
  gradientFrom?: string
  gradientTo?: string
  animationDuration?: number
  className?: string
}

export function GradientBars({
  numBars = 15,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  className = '',
}: GradientBarsProps) {
  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1)
    const maxHeight = 100
    const minHeight = 30

    const center = 0.5
    const distanceFromCenter = Math.abs(position - center)
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2)

    return minHeight + (maxHeight - minHeight) * heightPercentage
  }

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <div
        className="flex h-full"
        style={{
          width: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* static bar field — the varying heights carry the visual on their
            own; the infinite scaleY pulse (15 bars × several instances per
            page, animating even off-screen) was removed for performance. */}
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars)
          return (
            <div
              key={index}
              style={
                {
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: '100%',
                  background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${height / 100})`,
                  transformOrigin: 'bottom',
                  outline: '1px solid rgba(0, 0, 0, 0)',
                  boxSizing: 'border-box',
                } as CSSProperties
              }
            />
          )
        })}
      </div>
    </div>
  )
}
