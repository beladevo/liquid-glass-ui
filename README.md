# liquid-glass-ui

Frosted-glass React component library with SVG displacement-map refraction — buttons, cards, panels, and search inputs with Apple-style liquid glass aesthetics.

---

<!-- SCREENSHOT: Full demo — all components on a gradient/image background showing the glass effect -->

---

## Installation

```bash
npm install liquid-glass-ui
# or
pnpm add liquid-glass-ui
```

**Peer dependencies:** React ≥ 18

---

## Setup

Wrap your app (or the section where you want glass effects) with `LiquidGlassProvider`, and import the stylesheet.

```tsx
import { LiquidGlassProvider } from 'liquid-glass-ui'
import 'liquid-glass-ui/src/styles/liquid-glass.css'

export function App() {
  return (
    <LiquidGlassProvider>
      {/* your content */}
    </LiquidGlassProvider>
  )
}
```

> The provider injects an invisible SVG filter into the DOM that powers the refraction effect. Without it, components render as plain frosted glass without the displacement distortion.

---

## Components

### `LiquidGlassButton`

A button with three visual variants.

```tsx
<LiquidGlassButton variant="light">Default</LiquidGlassButton>
<LiquidGlassButton variant="dark">Dark</LiquidGlassButton>
<LiquidGlassButton variant="cta">Call to Action</LiquidGlassButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'light' \| 'dark' \| 'cta'` | `'light'` | Visual style |

Accepts all standard `<button>` HTML attributes.

<!-- SCREENSHOT: Three button variants side by side on a gradient background -->

---

### `LiquidGlassCard`

A card container for grouping content.

```tsx
<LiquidGlassCard variant="light">
  <h3>Title</h3>
  <p>Some content here.</p>
</LiquidGlassCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'light' \| 'dark'` | `'light'` | Visual style |

Accepts all standard `<div>` HTML attributes.

<!-- SCREENSHOT: Card with content on a blurred/image background -->

---

### `LiquidGlassPanel`

Like `LiquidGlassCard` but with more padding — intended for larger content sections.

```tsx
<LiquidGlassPanel variant="dark">
  <h2>Panel Title</h2>
  <p>Larger content block.</p>
</LiquidGlassPanel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'light' \| 'dark'` | `'light'` | Visual style |

---

### `LiquidGlassSearchBar`

An input wrapped in a glass surface with an optional icon slot.

```tsx
import { SearchIcon } from 'lucide-react'

<LiquidGlassSearchBar
  icon={<SearchIcon size={16} />}
  placeholder="Search..."
  variant="light"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'light' \| 'dark'` | `'light'` | Visual style |
| `icon` | `React.ReactNode` | — | Icon rendered on the left |

Accepts all standard `<input>` HTML attributes. Supports `ref` forwarding.

<!-- SCREENSHOT: Search bar with icon, light and dark variants -->

---

## Theming

Pass a `theme` object to `LiquidGlassProvider` to customize the look globally.

```tsx
import { LiquidGlassProvider, LiquidGlassTheme } from 'liquid-glass-ui'

const theme: LiquidGlassTheme = {
  borderRadius: '1rem',
  blur: 25,
  tintColor: '45, 108, 223',   // RGB, no alpha
  tintOpacity: 0.15,
  specularOpacity: 0.9,
  outerShadowBlur: '50px',
}

<LiquidGlassProvider theme={theme}>
  {/* components pick up the new theme automatically */}
</LiquidGlassProvider>
```

| Token | Type | Default | Description |
|-------|------|---------|-------------|
| `borderRadius` | `string` | `'1.4rem'` | Corner radius of all surfaces |
| `blur` | `number` | `20` | Backdrop blur in px |
| `tintColor` | `string` | `'255, 255, 255'` | RGB tint color (no alpha) |
| `tintOpacity` | `number` | `0.14` | Tint alpha |
| `specularOpacity` | `number` | `0.82` | Intensity of the specular highlight |
| `outerShadowBlur` | `string` | `'40px'` | Outer drop-shadow spread |
| `innerShadowBlur` | `string` | `'0px'` | Inner glow blur |
| `innerShadowSpread` | `string` | `'0px'` | Inner glow spread |
| `innerShadowColor` | `string` | `'rgba(255,255,255,0.45)'` | Inner glow color |

### Dynamic theming (e.g. brand color)

```tsx
const hex = brandColor.replace('#', '')
const r = parseInt(hex.slice(0, 2), 16)
const g = parseInt(hex.slice(2, 4), 16)
const b = parseInt(hex.slice(4, 6), 16)

const theme: LiquidGlassTheme = {
  tintColor: `${r}, ${g}, ${b}`,
  tintOpacity: 0.12,
  innerShadowColor: `rgba(${r}, ${g}, ${b}, 0.22)`,
}
```

<!-- SCREENSHOT: Same component with 3 different brand-color themes side by side -->

---

## Utilities

For cases where you need the CSS classes directly (e.g. styling a third-party component):

```tsx
import { liquidGlassClasses } from 'liquid-glass-ui'

<SomeComponent className={liquidGlassClasses.card} />
```

Available class presets: `surface`, `button`, `cta`, `card`, `panel`, `modal`, `dark`, `darkButton`, `darkCard`.

---

## License

MIT
