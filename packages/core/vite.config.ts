import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { readdirSync } from 'fs'

const srcDir = path.resolve(__dirname, 'src')
const entries = Object.fromEntries(
  readdirSync(srcDir)
    .filter((file) => /\.(ts|tsx)$/.test(file))
    .map((file) => [file.replace(/\.(ts|tsx)$/, ''), path.resolve(srcDir, file)])
)

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'three',
  '@stylexjs/stylex',
  '@vasf/ragnar-tokens',
  /^@radix-ui\//,
  /^@tiptap\//,
  'cmdk',
  'countries-list',
  'date-fns',
  'embla-carousel-react',
  'lucide-react',
  'prismjs',
  'react-day-picker',
  'sonner',
]

export default defineConfig({
  plugins: [stylex.vite({ useCSSLayers: true }), tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: entries,
      name: 'RagnarCore',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => (format === 'cjs' ? `${entryName}.cjs` : `${entryName}.js`),
    },
    rollupOptions: {
      external,
      output: {
        banner: '"use client";',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'styles.css',
      },
    },
    cssCodeSplit: false,
  },
})
