import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),  
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'ux-ui',
      fileName: (format) => `ux-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom' ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
