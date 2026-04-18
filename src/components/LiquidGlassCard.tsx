import type { CSSProperties, HTMLAttributes } from 'react'

interface LiquidGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
  style?: CSSProperties
}

export function LiquidGlassCard({ variant = 'light', className = '', style, children, ...rest }: LiquidGlassCardProps) {
  const variantClass = variant === 'dark' ? 'lg-surface lg-surface-dark lg-card' : 'lg-surface lg-card'
  return (
    <div className={`${variantClass} ${className}`} style={style} {...rest}>
      {children}
    </div>
  )
}
