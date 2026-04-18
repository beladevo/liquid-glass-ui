'use client'

import { useRef, type CSSProperties, type HTMLAttributes, type MouseEvent } from 'react'

interface LiquidGlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
  style?: CSSProperties
}

export function LiquidGlassPanel({ variant = 'light', className = '', style, children, onMouseMove, onMouseLeave, ...rest }: LiquidGlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      ref.current.style.setProperty('--lg-x', `${x}%`)
      ref.current.style.setProperty('--lg-y', `${y}%`)
    }
    onMouseMove?.(e)
  }

  function handleMouseLeave(e: MouseEvent<HTMLDivElement>) {
    ref.current?.style.removeProperty('--lg-x')
    ref.current?.style.removeProperty('--lg-y')
    onMouseLeave?.(e)
  }

  const variantClass = variant === 'dark' ? 'lg-surface lg-surface-dark lg-panel' : 'lg-surface lg-panel'

  return (
    <div
      ref={ref}
      className={`${variantClass} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </div>
  )
}
