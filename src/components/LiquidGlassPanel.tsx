import type { CSSProperties, HTMLAttributes } from 'react'

interface LiquidGlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
  style?: CSSProperties
}

export function LiquidGlassPanel({ variant = 'light', className = '', style, children, ...rest }: LiquidGlassPanelProps) {
  const variantClass = variant === 'dark' ? 'lg-surface lg-surface-dark lg-panel' : 'lg-surface lg-panel'
  return (
    <div className={`${variantClass} ${className}`} style={style} {...rest}>
      {children}
    </div>
  )
}
