import { defineConfig } from 'vite'
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "portal",
      remotes: {
        dashboard_remote: "http://localhost:5000/assets/assets/dashboardRemoteEntry.js",
        demo_remote: "http://localhost:5001/assets/demoRemoteEntry.js",
        marco_remote: "http://localhost:5002/assets/assets/marcoRemoteEntry.js",        
        usuario_remote: "http://localhost:5003/assets/assets/usuarioRemoteEntry.js",
      },
      shared: ["react", "react-dom", "jotai"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});