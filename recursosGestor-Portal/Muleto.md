#  Crear proyectos microfrontend

Crear proyecto
```bash
npm create vite@latest {nombre}_remote
```
 
 Opciones de Vite: react -> TypeScript + SWC

```bash
cd {nombre}_remote

npm install @vitejs/plugin-react --save-dev
npm install @originjs/vite-plugin-federation --save-dev
npm install
npm run dev
```

se puede ejecutar luego con los siguientes comandos:
``` bash
 rm -rf node_modules package-lock.json
 npm install 
```

## Configuración: 
### Package
En el archivo de package.json

```json
"scripts": {
	"dev": "vite --port {port} --strictPort",
	"build": "tsc -b && vite build",
	"lint": "eslint .",
	"preview": "vite preview --port {port} --strictPort",
	"serve": "npm run build && npm run preview"
}
```
### Vite
Cambios en vite se deben hacer conociendo la estructura del proyecto y se debe tomar en cuenta que hay elementos de "remotes" y "exposes" necesarias para la orquestación de la data

```js
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
			"./Footer": "./src/Footer",
			... //mas elementos
		},
		remotes: {
			portal: 'http://localhost:5050/assets/orchestadorRemoteEntry.js',
			... //mas elementos
		},
		shared: ["react", "react-dom", ... //mas elementos ],
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
```

## Adaptar a portal
Para adaptar al portal o un sub uso en otros componentes front, tomar en cuenta los siguientes pasos:

### Paso1: Crear un Archivo de Declaración de Tipo para el Módulo Federado

TypeScript necesita saber cómo resolver el módulo federado. Para ello, puedes crear un archivo de declaración de tipo (`.d.ts`) que le indique a TypeScript cómo manejar la importación del módulo federado.

``` ts
// globalStore.d.ts
declare module 'orchestrator_remote/globalStore' {
  import { GlobalStore } from './path/to/globalStore'; // Ajusta la ruta según tu estructura
  export const globalStore: GlobalStore;
}
```
### Paso 2: Asegurarte de que TypeScript Reconozca el Archivo de Declaración
1. **Incluir el archivo de declaración en `tsconfig.app.json`**:    
    - Asegúrate de que el archivo `globalStore.d.ts` esté incluido en la configuración de TypeScript. En tu `tsconfig.json`, verifica que la opción `include` tenga la ruta correcta:
``` json
{
  "include": ["src", "globalStore.d.ts"] // Ajusta según la ubicación del archivo
* O
* "include": ["src", "src/types"]
}
```

1. **Verificar la resolución de módulos**: {Opcional}
    - Asegúrate de que TypeScript esté configurado para resolver módulos correctamente. En tu `tsconfig.json`, verifica las siguientes opciones:
        

``` json
{
  "compilerOptions": {
    "moduleResolution": "node", // Asegúrate de que esté en "node"
    "baseUrl": ".", // Define la base para las rutas
    "paths": {
      "orchestrator_remote/*": ["path/to/orchestrator_remote/*"] 
    }
  }
}
```
### Paso 3: Verificar la Configuración de Vite
Asegúrate de que la configuración de Vite esté correctamente configurada para exponer y consumir el módulo federado.

Tanto en el vite.config.ts de microfrontend como del portal tengan sus configuraciones que hagan match en sus declaraciones de **exposes** y **remotes**

### Paso 4: Importar Correctamente el Módulo Federado

En el archivo donde estás intentando importar `globalStore`, asegúrate de que la ruta sea correcta. Por ejemplo:

``` json
import { globalStore } from 'orchestrator_remote/globalStore';
const App = () => {
  return (
    <div>
      <h1>Portal</h1>
      <p>Datos compartidos: {globalStore.getState().sharedData}</p>
    </div>
  );
};

export default App;
```

## Librerías comunes
Las librerías básicas son
```bash
npm install @vitejs/plugin-react --save-dev
npm install @originjs/vite-plugin-federation --save-dev
npm install @radix-ui/themes
npm install i18next
npm install react-i18next
npm install date-fns
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Estructura base
La estructura base [[ArquitecturaReact]]
# Errores reportados 🚩
---
## hook y toast en la consola 🐞
Si el sistema tiene problemas de hook y toast en la consola que afectan hook, y el error se debe a un problema con los useState, el problema esta dado por la falta de un link a los API.

```bash
npm remove api-fetch
npm remove ux-ui

npm install ../api-fetch
npm install ../ux-ui

npm link ../api-fetch/node_modules/react
npm link ../ux-ui/node_modules/react
```

Cuando hay problemas se debe validar mas que nada los link

```bash
npm link ../api-fetch/node_modules/react
npm link ../ux-ui/node_modules/react
```
---
# Spring

##Para usar variables de entorno o una si no esta puesta
spring.config.import=optional:configserver:${CONFIG_SERVER_URL:http://localhost:8888}
## Variable de entorno para gestor002
export COOFING_CLIENT_SECRET=a4qENAfxmaapoMzXwAiduBZuLPcF1Pl7
export COOFING_URL_KEYCLOAK=http://localhost:8080

# Pendientes

## Notas
Las dimensiones son:

- **xs**: Extra small, o extra pequeño, para dispositivos más pequeños que 768px, como teléfonos 
- **sm**: Small, o pequeño, para dispositivos más grandes o iguales a 768px, como tablets 
- **md**: Medium, o mediano, para ordenadores de mesa con más de 992px de ancho 
- **lg**: Large, o grande, para ordenadores de escritorio más grandes 
- **xl**: Extra large, o extra grande, para pantallas con más de 1200px de ancho

## Url's

### Servers
Mysql
[Kafka](http://localhost:8078/)
Redis
[Keycloak](http://localhost:8080)
[Manager-Backend](http://localhost:8100/applications)
### Portal
[Portal](http://localhost:5173)
[Gestor-Remote](http://localhost:5002)

### OpenAPI
[Gestor](http://localhost:8090/gestor-ws/swagger-ui/index.html)
[Orquestador](http://localhost:8092/orquestador-ws/swagger-ui/index.html)
[Keycloak](http://localhost:8070/keycloak-ws/swagger-ui/index.html)
