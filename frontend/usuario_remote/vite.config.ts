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
* @date 2025-01-08
*/
export default defineConfig({
  base: '/assets',
  plugins: [
    // Plugin de React para Vite
    react(),
    // Plugin de federación de módulos
    federation({
      name: "usuario_remote",
      filename: "usuarioRemoteEntry.js",
      exposes: {
        "./Usuario": "./src/Usuario", // Usuario        
        "./Flujo": "./src/Flujo", // Flujo
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
