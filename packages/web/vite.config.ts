import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'RagnarWeb',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.js'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@frolda/ragnar-core',
        '@frolda/ragnar-tokens',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        'three',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@frolda/ragnar-core': 'RagnarCore',
        },
        assetFileNames: 'styles.css',
      },
    },
    cssCodeSplit: false,
  },
})
