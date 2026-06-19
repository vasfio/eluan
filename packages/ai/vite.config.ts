import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'RagnarAI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.js'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@vasf\/ragnar-core(\/.*)?$/,
      ],
      output: {
        banner: '"use client";',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@vasf/ragnar-core': 'RagnarCore',
        },
        assetFileNames: 'styles.css',
      },
    },
    cssCodeSplit: false,
  },
})
