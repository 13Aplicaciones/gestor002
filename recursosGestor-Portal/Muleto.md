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
Cambios en vite se deben hacer conociendo la estructura del proyecto y se debe tomar en cuenta que hay elementos de remotes y exposes necesarias para la orquestación de la data
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
## Agregar librerías al proyecto
## Agregar librería común
En el archivo package.json en las entradas de dependencias agregar:
``` json
"api-fetch": "file:../api-fetch",
```
y luego ejecutar los siguientes comandos:
``` bash
 rm -rf node_modules package-lock.json
 
 npm install 
```

---
# Spring

Stamento para crear elementos
En base a la estructura sql 
<<poner estructura con los comentarios>>
No olvides tomar en cuenta en los campos varchar se usen en las anotaciones de @column -> length y usar los comentarios para documentar el objeto Request


## Para usar variables de entorno o una si no esta puesta
spring.config.import=optional:configserver:${CONFIG_SERVER_URL:http://localhost:8888}

## Variable de entorno para gestor002

export COOFING_CLIENT_SECRET=a4qENAfxmaapoMzXwAiduBZuLPcF1Pl7

export COOFING_URL_KEYCLOAK=http://localhost:8080



Pendientes!!!


/**

  

const miSelect = ({ value, setValue, data }: { value: string, setValue: (value: string) => void, data: any }) => {

  

return (

<Select.Root value={value} onValueChange={setValue}>

<Select.Trigger>{data[value]}</Select.Trigger>

<Select.Content>

{Object.entries(data).map(([key, value]) => (

<Select.Item value={key}>{value}</Select.Item>

))}

</Select.Content>

</Select.Root>

);

}

  

*

*

* const ConfiguracionBusquedas = () => {

  

const dispatch = useDispatch();

  

const configTabla = useSelector((state: RootState) => {

return state.perfilSlice;

});

  

const [miBanding, setMiBanding] = useState(false);

const [miRespuesta, setMiRespuesta] = useState(configTabla.tablas.rowNumber + "");

  

const setValue = (value: string) => {

setMiRespuesta(value);

console.log(value);

  

}

  

const data = {

"8": "8 Filas",

"10": "10 Filas",

"15": "15 Filas",

"25": "25 Filas",

"50": "50 Filas",

};

  

const grabar = () => {

dispatch(setTablas({ rowBanding: true, rowNumber: parseInt(miRespuesta) }));

}

  

const handleSwitchChange = (event: FormEventHandler<HTMLInputElement>) => {

setMiBanding(event.target.checked);

};

  

return (

<Flex direction="column" gap="1" align="baseline">

{miSelect({ value: miRespuesta, setValue: setValue, data: data })}

<Switch checked={miBanding} onChange={handleSwitchChange} />

<Button onClick={grabar}>Grabar</Button>

</Flex>

);

}

  

*/


Las dimensiones son:

- **xs**: Extra small, o extra pequeño, para dispositivos más pequeños que 768px, como teléfonos 
- **sm**: Small, o pequeño, para dispositivos más grandes o iguales a 768px, como tablets 
- **md**: Medium, o mediano, para ordenadores de mesa con más de 992px de ancho 
- **lg**: Large, o grande, para ordenadores de escritorio más grandes 
- **xl**: Extra large, o extra grande, para pantallas con más de 1200px de ancho



ALTER TABLE GS_002_01.error ADD uuid varchar(64) NULL COMMENT 'UUID para indice unico de consulta';

update GS_002_01.error
set uuid = uuid ()

ALTER TABLE GS_002_01.error MODIFY COLUMN uuid varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta';