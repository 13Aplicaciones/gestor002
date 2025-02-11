import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

/**
 * Configuración de Vite para el proyecto remoto.
 * 
 * Esta configuración incluye:
 * - Plugin de React para soporte de JSX y otras características de React.
 * - Plugin de federación de módulos para exponer componentes y hooks a otros proyectos.
 * 
 * @author @omargo33
 * @date 2025-01-04
 */
export default defineConfig({
  base: '/',
  plugins: [
    // Plugin de React para Vite
    react(),
    // Plugin de federación de módulos
    federation({
      name: "demo_remote",
      filename: "demoRemoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
        "./store": "./src/store",
        // "./storeAtom": "./src/storeAtom",
        "./Footer": "./src/Footer",
      },
      shared: ["react", "react-dom", "jotai"],
    }),
  ],

  // Configuración de construcción
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },

});