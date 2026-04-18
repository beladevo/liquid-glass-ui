import type { ButtonHTMLAttributes, CSSProperties } from 'react'

interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark'
  style?: CSSProperties
}

export function LiquidGlassButton({ variant = 'light', className = '', style, children, ...rest }: LiquidGlassButtonProps) {
  const variantClass = variant === 'dark'
    ? 'lg-surface lg-surface-dark lg-button'
    : 'lg-surface lg-button'
  return (
    <button className={`${variantClass} ${className}`} style={style} {...rest}>
      {children}
    </button>
  )
}
