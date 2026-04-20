import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    mkdirSync('dist/styles', { recursive: true })
    copyFileSync('src/styles/liquid-glass.css', 'dist/styles/liquid-glass.css')
    copyFileSync('src/styles/liquid-glass.css.d.ts', 'dist/styles/liquid-glass.css.d.ts')
  },
})
