import { LIQUID_GLASS_FILTER_ID } from './utils/filter-id'

export function LiquidGlassProvider() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <defs>
        {/*
          Main refraction filter.
          Applied via backdrop-filter: url(#liquid-glass-filter) — Chrome only.
          Safari / Firefox receive the backdrop-filter blur fallback only.

          Pipeline:
            1. feTurbulence  — organic displacement field (low-freq, 3 octaves)
            2. feColorMatrix — desaturate noise to pure luminance displacement
            3. feDisplacementMap — warp backdrop using R/G channels as X/Y offset
            4. feGaussianBlur — soften displacement artefacts
            5. feColorMatrix (threshold) — extract high-contrast specular edge mask
            6. feBlend (screen) — composite rim highlight over displaced image
            7. feComposite (in) — clip result back to original element shape
        */}
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
