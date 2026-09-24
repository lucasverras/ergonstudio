import { motion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { HandHighlight, type HandHighlightVariant, type HandHighlightColor } from './hand-highlight'

interface GradualSpacingProps {
  text: string
  duration?: number
  delayMultiple?: number
  framerProps?: Variants
  className?: string
  // which tag wraps the whole line — the original component put every
  // single character in its own <h1>, which is an SEO/accessibility
  // problem (one page should have exactly one <h1>, and a heading
  // shouldn't wrap a single letter). Here the tag wraps the full text
  // once; only the per-character <motion.span>s stagger in.
  as?: ElementType
  // marks one word (or a short phrase, e.g. "no ar") with a hand-drawn
  // accent *inside* this same word-loop — wrapping it in a separate outer
  // flex sibling instead (an earlier approach) breaks line-wrapping: when
  // that sibling lands alone on a trailing row, a justify-center on the
  // outer flex centers it across the whole width instead of continuing
  // the paragraph's left-aligned flow.
  highlight?: {
    word: string
    variant?: HandHighlightVariant
    color?: HandHighlightColor
    delay?: number
  }
}

export function GradualSpacing({
  text,
  className,
  as: Tag = 'span',
  highlight,
}: GradualSpacingProps) {
  // wrapping happens between words, never inside one — each word's letters
  // sit in their own non-wrapping unit so a narrow viewport can't split
  // "resultados" into "resul" + "tados" on separate lines
  const words = text.split(' ')
  const highlightWords = highlight ? highlight.word.split(' ') : []

  // Letters are now static: the whole heading reveals as one unit (see the
  // single motion wrapper in the return) instead of each character sliding
  // in on its own staggered delay. The per-glyph structure stays only so the
  // hand-drawn highlight can wrap an exact word without breaking line-
  // wrapping, and so the visible glyph keeps coming from CSS content
  // (attr(data-ch)) — the real, selectable text lives in the copy below.
  function renderLetters(word: string) {
    return word.split('').map((char, ci) => (
      <span
        key={ci}
        aria-hidden="true"
        data-ch={char}
        className="pointer-events-none [-webkit-user-select:none] select-none drop-shadow-sm before:content-[attr(data-ch)]"
      />
    ))
  }

  const nodes: ReactNode[] = []
  for (let wi = 0; wi < words.length; ) {
    const isHighlightStart =
      !!highlight && words.slice(wi, wi + highlightWords.length).join(' ') === highlight.word
    const span = isHighlightStart ? highlightWords.length : 1
    const groupEnd = wi + span

    const group = (
      <span className="inline-flex flex-wrap">
        {words.slice(wi, groupEnd).map((word, gi) => (
          <span key={gi} className="inline-flex whitespace-nowrap">
            {renderLetters(word)}
            {wi + gi < groupEnd - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    )

    nodes.push(
      <span key={wi} className="inline-flex whitespace-nowrap">
        {isHighlightStart ? (
          <HandHighlight variant={highlight!.variant} color={highlight!.color} delay={highlight!.delay}>
            {group}
          </HandHighlight>
        ) : (
          group
        )}
        {groupEnd < words.length && <span>&nbsp;</span>}
      </span>,
    )

    wi = groupEnd
  }

  // The per-letter spans are flex items (direct children of the inline-flex
  // word/word-group wrappers above), and browsers serialize each flex item
  // onto its own line when converting a selection to plaintext — so
  // dragging over an animated heading and copying it produces one letter
  // per line. Two fixes in one: the decorative, animated letters are
  // `aria-hidden` (screen readers would otherwise hear them spelled out)
  // and `pointer-events-none`, wrapped in `display: contents` so they add
  // no box of their own and the flex-wrap layout above is unaffected. A
  // second, invisible span holding the plain, un-split text sits on top via
  // `absolute inset-0` — that's what actually gets selected/copied/read.
  // One reveal for the whole heading: opacity + a 12px lift, 400ms, natural
  // ease — the layout below is untouched (Tag stays the flex-wrap parent so
  // wrapping is identical), only now it fades/rises as a single unit.
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.span

  return (
    <MotionTag
      className={cn('relative inline-flex flex-wrap', className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span aria-hidden="true" className="contents">
        {nodes}
      </span>
      <span className="absolute inset-0 opacity-0 select-text">{text}</span>
    </MotionTag>
  )
}
