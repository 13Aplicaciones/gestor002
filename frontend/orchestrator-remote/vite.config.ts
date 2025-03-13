import { defineConfig } from 'vite'
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react'

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
			name: "orchestrator_remote",
			filename: "orchestratorRemoteEntry.js",
			exposes: {
				"./globalStore": 		"./src/store/GlobalStore",
				"./structureStore": 	"./src/store/StructureStore",
				"./userStore": 			"./src/store/UserStore",
				"./service/Statics": 	"./src/service/Statics",
				"./service/Structure": 	"./src/service/Structure",
				"./service/Tokens": 	"./src/service/Tokens",
				"./service/Parameter": "./src/service/Parameter",
				/*
				"./contex": "./src/context/StoreContext",
				"./provider": "./src/context/StoreProvider",
				"./use": "./src/context/StoreHook",
				*/
			},
			/*
			remotes: {
				portal: 'http://localhost:5050/assets/orchestratorRemoteEntry.js',
			},
			*/
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
}
);