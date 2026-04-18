'use client'

import { useRef, type ButtonHTMLAttributes, type CSSProperties, type MouseEvent } from 'react'

interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark' | 'cta'
  style?: CSSProperties
}

export function LiquidGlassButton({ variant = 'light', className = '', style, children, onMouseMove, onMouseLeave, ...rest }: LiquidGlassButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      ref.current.style.setProperty('--lg-x', `${x}%`)
      ref.current.style.setProperty('--lg-y', `${y}%`)
    }
    onMouseMove?.(e)
  }

  function handleMouseLeave(e: MouseEvent<HTMLButtonElement>) {
    ref.current?.style.removeProperty('--lg-x')
    ref.current?.style.removeProperty('--lg-y')
    onMouseLeave?.(e)
  }

  const variantClass =
    variant === 'dark' ? 'lg-surface lg-surface-dark lg-button' :
    variant === 'cta'  ? 'lg-surface lg-button lg-button-cta' :
                         'lg-surface lg-button'

  return (
    <button
      ref={ref}
      className={`${variantClass} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </button>
  )
}
