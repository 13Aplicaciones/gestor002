import { defineConfig } from 'vite'
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),    
    federation({
      name: "portal",      
      remotes: {        
        demo_remote: "http://localhost:5001/assets/demoRemoteEntry.js",        
        gestor_remote: "http://localhost:5002/assets/assets/gestorRemoteEntry.js",        
        orchestrator_remote: "http://localhost:5050/assets/orchestratorRemoteEntry.js",        
      },      
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});