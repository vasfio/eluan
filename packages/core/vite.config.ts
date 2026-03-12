import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'

// All @radix-ui/* packages used by core — externalized so consumers install them
const radixPackages = [
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-select',
  '@radix-ui/react-separator',
  '@radix-ui/react-slider',
  '@radix-ui/react-slot',
  '@radix-ui/react-switch',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip',
]

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'RagnarCore',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.js'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@ragnar/tokens',
        ...radixPackages,
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        'cmdk',
        'date-fns',
        'embla-carousel-react',
        'prismjs',
        'react-day-picker',
        'sonner',
        '@tiptap/react',
        '@tiptap/starter-kit',
        '@tiptap/extension-placeholder',
      ],
      output: {
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
