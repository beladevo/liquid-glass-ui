import { forwardRef, type InputHTMLAttributes } from 'react'

interface LiquidGlassSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  variant?: 'light' | 'dark'
}

export const LiquidGlassSearchBar = forwardRef<HTMLInputElement, LiquidGlassSearchBarProps>(
  ({ icon, variant = 'light', className = '', style, ...rest }, ref) => {
    const variantClass = variant === 'dark' ? 'lg-surface lg-surface-dark lg-input-wrapper' : 'lg-surface lg-input-wrapper'
    return (
      <div className={`${variantClass} ${className}`} style={style}>
        {icon}
        <input ref={ref} className="lg-input" {...rest} />
      </div>
    )
  }
)

LiquidGlassSearchBar.displayName = 'LiquidGlassSearchBar'
