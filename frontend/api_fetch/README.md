# API_FETCH

El API_FETCH es una librería que permite realizar peticiones a una API de terceros y otros elementos de UI para mostrar la información obtenida así como elementos comunes de una aplicación web para 13 Aplicaciones.

Este producto se desarrolla continuamente para mejorar la experiencia del usuario y la facilidad de uso y reducir la _deuda técnica_.

## Características/fetures

**Versión 0.0.2**

- **API REST**: Permite realizar peticiones a una API de terceros, controlar las respuestas y mostrar la información obtenida.
- **UI**: Elementos de UI para mostrar la información obtenida de la API.
- [X] Botones:
  - BotonFlotante  
- [X] Callout
  - BannerInformation, para mostrar información relevante.
  - InformationPanelRegistration, para mostrar información relevante del registro y la generalidad del usuario.
- [X] Dialog
  - DialogForm, para mostrar un formulario en un dialog.
  - DialogAlerts, para mostrar alertas en un dialog.
- [X] Form
  - FormState, formulario con estado.
  - FooterForm, pie de formulario.
- [X] Input
  - InputSearchDynamic, para realizar búsquedas dinámicas.
  - InputField, para mostrar un campo de texto.
  - InputSecretField, para mostrar un campo de texto secreto como contraseñas.
  - AreaField, para mostrar un campo de texto de área.
  - InputFieldDate, para mostrar un campo de fecha.
  - InputSubmit, para mostrar un botón de envío.
- [ ] Popover
  - PopoverInformation, para mostrar información relevante.
- [X] Table
  - TableConfigurable, Tabla configurable para su presentación.
  - TableSkeleton, Tabla con esqueleto.
  - CreateSearchField, para realizar búsquedas en la tabla con una API.
- [X] Toast
  - ToastContextProvider, proveedor de contexto para mostrar mensajes.
  - useToastContext, hook para mostrar mensajes.

## Descripción

A grandes rasgos, la configuración de la librería API_FETCH es sencilla, solo se necesita instalar la librería y configurarla en el archivo principal de la aplicación, por lo que se explica las más importantes.

### React 18.3.1 o superior.

React es una librería de JavaScript para construir interfaces de usuario, por lo que es necesario tener instalado React en la aplicación.

### Vite

Vite es un _bundler_ de JavaScript que permite construir aplicaciones web modernas, por lo que es necesario tener instalado Vite en la aplicación.

### Radix UI last version.

Radix UI es una librería de componentes de interfaz de usuario, por lo que es necesario tener instalado Radix UI en la aplicación.

### Redux last version.

Redux es una librería de JavaScript para manejar el estado de la aplicación, por lo que es necesario tener instalado Redux en la aplicación.


## Comandos

**Para instalar** la librería API_FETCH se debe ejecutar el siguiente comando:

```bash
npm install
```

**Para ejecutar** la librería API_FETCH se debe ejecutar el siguiente comando:

```bash
npm run dev
```
Y verificar en el navegador la dirección `http://localhost:3000`.

**Para construir** la librería API_FETCH se debe ejecutar el siguiente comando:

```bash
npm run build
```

**Para limpiar** la librería API_FETCH se debe ejecutar el siguiente comando:

```bash
rm -rf dist node_modules package-lock.json
```

## Instalación

Para instalar la librería API_FETCH en las aplicaciones que se están desarrollando, se debe ejecutar los siguientes comandos, y debe estar la carpeta *${WORK_PATH}/api-fetch/dist*

```bash
npm install ../api-fetch
npm link ../api-fetch/node_modules/react
```

> Nota: El producto se encuentra en constante desarrollo y actualización, para evitar problemas de compatibilidad se recomienda revisar la documentación de la versión que se está utilizando.

---

![logo](./src/assets/13_128x128.png)

**#omargo33**

**Actualizado: 2025-02-18**.
