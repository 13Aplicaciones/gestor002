import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
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
      name: "gestor_remote",
      filename: "gestorRemoteEntry.js",
      exposes: {
        "./Orgin": "./src/pages/Origin",
        "./Translation": "./src/utils/getTranslation",
      },
      remotes: {
        orchestrator_remote: "http://localhost:5050/assets/orchestratorRemoteEntry.js",
      },
      shared: ["react", "react-dom"],
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