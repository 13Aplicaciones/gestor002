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
      name: 'api-fetch',
      fileName: (format) => `api-fetch.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-redux': 'ReactRedux',
          '@reduxjs/toolkit': 'ReduxToolkit',
        },
      },
    },
  },
})
