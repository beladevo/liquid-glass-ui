export interface LiquidGlassTheme {
  borderRadius?: string
  blur?: number
  tintColor?: string
  tintOpacity?: number
  innerShadowBlur?: string
  innerShadowSpread?: string
  innerShadowColor?: string
  outerShadowBlur?: string
  specularOpacity?: number
}

export const defaultTheme: Required<LiquidGlassTheme> = {
  borderRadius: '1.4rem',
  blur: 20,
  tintColor: '255, 255, 255',
  tintOpacity: 0.14,
  innerShadowBlur: '0px',
  innerShadowSpread: '0px',
  innerShadowColor: 'rgba(255, 255, 255, 0.45)',
  outerShadowBlur: '40px',
  specularOpacity: 0.82,
}

export function buildThemeVars(theme: LiquidGlassTheme): Record<string, string> {
  const t = { ...defaultTheme, ...theme }
  return {
    '--lg-radius': t.borderRadius,
    '--lg-blur': `${t.blur}px`,
    '--lg-tint-color': t.tintColor,
    '--lg-tint-opacity': String(t.tintOpacity),
    '--lg-inner-shadow-blur': t.innerShadowBlur,
    '--lg-inner-shadow-spread': t.innerShadowSpread,
    '--lg-inner-shadow-color': t.innerShadowColor,
    '--lg-outer-shadow-blur': t.outerShadowBlur,
    '--lg-specular-opacity': String(t.specularOpacity),
  }
}

export function applyTheme(element: HTMLElement, theme: LiquidGlassTheme): void {
  const vars = buildThemeVars(theme)
  for (const [key, value] of Object.entries(vars)) {
    element.style.setProperty(key, value)
  }
}
