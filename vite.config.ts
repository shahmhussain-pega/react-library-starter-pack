import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'TestReactLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `test-react-library.${format}.js`,
    },
    rollupOptions: {
      // Exclude peer deps (so users use their own React)
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})