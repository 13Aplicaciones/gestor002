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
* @date 2024-01-05
*/
export default defineConfig({
  base: '/assets',
  plugins: [
    // Plugin de React para Vite
    react(),
    // Plugin de federación de módulos
    federation({
      name: "marco_remote",
      filename: "marcoRemoteEntry.js",
      exposes: {
        "./EncabezadoWrapper": "./src/EncabezadoWrapper", // Encabezado 
        "./Pie": "./src/Pie", // Pie de página
        "./Encabezado": "./src/Encabezado", // Encabezado
        //"./storageBus": "./src/storageBus", // Bus de data de almacenamiento
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
