'use client'

import { useEffect, useRef } from 'react'
import { LIQUID_GLASS_FILTER_ID } from './utils/filter-id'
import { buildThemeVars, type LiquidGlassTheme } from './utils/theme'

interface LiquidGlassProviderProps {
  theme?: LiquidGlassTheme
}

export function LiquidGlassProvider({ theme }: LiquidGlassProviderProps) {
  const rootRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!theme || !rootRef.current) return
    const vars = buildThemeVars(theme)
    const target = document.documentElement
    for (const [key, value] of Object.entries(vars)) {
      target.style.setProperty(key, value)
    }
    return () => {
      for (const key of Object.keys(vars)) {
        target.style.removeProperty(key)
      }
    }
  }, [theme])

  return (
    <svg
      ref={rootRef}
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id={LIQUID_GLASS_FILTER_ID}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="4"
            seed="8"
            stitchTiles="stitch"
            result="noise"
          />

          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
            result="grayNoise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="grayNoise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          <feGaussianBlur
            in="displaced"
            stdDeviation="0.4"
            result="softDisplaced"
          />

          <feColorMatrix
            in="softDisplaced"
            type="matrix"
            values="1 0 0 0  0.06
                    0 1 0 0  0.08
                    0 0 1 0  0.12
                    0 0 0 28 -10"
            result="specularMask"
          />

          <feBlend
            in="softDisplaced"
            in2="specularMask"
            mode="screen"
            result="withSpecular"
          />

          <feComposite
            in="withSpecular"
            in2="SourceGraphic"
            operator="in"
          />
        </filter>
      </defs>
    </svg>
  )
}
