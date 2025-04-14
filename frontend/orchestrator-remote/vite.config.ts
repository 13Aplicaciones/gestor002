import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
  base: "/",
  plugins: [
    // Plugin de React para Vite
    react(),
    // Plugin de federación de módulos
    federation({
      name: "orchestrator_remote",
      filename: "orchestratorRemoteEntry.js",
      exposes: {
        "./globalStore": "./src/store/GlobalStore",
        "./structureStore": "./src/store/StructureStore",
        "./userStore": "./src/store/UserStore",
        "./service/Parameter": "./src/service/Parameter",
        "./service/Statics": "./src/service/Statics",
        "./service/Structure": "./src/service/Structure",
        "./service/Tokens": "./src/service/Tokens",
        "./service/UserDefineCode": "./src/service/UserDefineCode",
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
