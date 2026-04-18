'use client'

import { useRef, type CSSProperties, type HTMLAttributes, type MouseEvent } from 'react'

interface LiquidGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
  style?: CSSProperties
}

export function LiquidGlassCard({ variant = 'light', className = '', style, children, onMouseMove, onMouseLeave, ...rest }: LiquidGlassCardProps) {
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

  const variantClass = variant === 'dark' ? 'lg-surface lg-surface-dark lg-card' : 'lg-surface lg-card'

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
