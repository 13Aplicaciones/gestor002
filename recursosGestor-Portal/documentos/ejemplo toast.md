Si deseas crear una librería de toasts que pueda ser utilizada desde otros aplicativos y que muestre el cuadro de diálogo (toast) basado en un evento o cambio de estado (por ejemplo, `open`), puedes diseñar un componente reutilizable que acepte una prop `open` y se integre con `@radix-ui/react-toast`. Aquí te muestro cómo hacerlo:

---

### Paso 1: Crear el componente de Toast reutilizable

Crea un componente `Toast` que acepte una prop `open` y maneje la lógica de mostrar/ocultar el toast.

```jsx
import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';

const CustomToast = ({ open, onOpenChange, title, description, actionText }) => {
  return (
    <Toast.Provider>
      <Toast.Root open={open} onOpenChange={onOpenChange}>
        <Toast.Title>{title}</Toast.Title>
        <Toast.Description>{description}</Toast.Description>
        {actionText && (
          <Toast.Action altText="Close" asChild>
            <button>{actionText}</button>
          </Toast.Action>
        )}
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default CustomToast;
```

---

### Paso 2: Crear un hook para manejar el estado del toast

Para que el toast sea controlable desde fuera, puedes crear un hook personalizado que maneje el estado `open` y permita mostrar/ocultar el toast.

```jsx
import { useState } from 'react';

export const useToast = () => {
  const [open, setOpen] = useState(false);

  const showToast = () => setOpen(true);
  const hideToast = () => setOpen(false);

  return { open, showToast, hideToast };
};
```

---

### Paso 3: Usar el componente y el hook en tu aplicación

Ahora puedes usar el componente `CustomToast` y el hook `useToast` en cualquier aplicación.

```jsx
import React from 'react';
import CustomToast from './CustomToast';
import { useToast } from './useToast';

const App = () => {
  const { open, showToast, hideToast } = useToast();

  return (
    <div>
      <button onClick={showToast}>Mostrar Toast</button>
      <CustomToast
        open={open}
        onOpenChange={hideToast}
        title="Notificación"
        description="Este es un mensaje de toast."
        actionText="Cerrar"
      />
    </div>
  );
};

export default App;
```

---

### Paso 4: Integrar con eventos externos

Si deseas que el toast se muestre en respuesta a un evento externo (por ejemplo, un cambio en el estado global o un evento personalizado), puedes usar el hook `useToast` para controlar el estado `open`.

#### Ejemplo con un evento personalizado:

```jsx
import React, { useEffect } from 'react';
import CustomToast from './CustomToast';
import { useToast } from './useToast';

const App = () => {
  const { open, showToast, hideToast } = useToast();

  useEffect(() => {
    const handleShowToast = () => showToast();
    document.addEventListener('show-toast', handleShowToast);

    return () => {
      document.removeEventListener('show-toast', handleShowToast);
    };
  }, [showToast]);

  return (
    <div>
      <CustomToast
        open={open}
        onOpenChange={hideToast}
        title="Notificación"
        description="Este es un mensaje de toast."
        actionText="Cerrar"
      />
    </div>
  );
};

export default App;
```

En otro archivo o aplicación, puedes disparar el evento para mostrar el toast:

```jsx
document.dispatchEvent(new CustomEvent('show-toast'));
```

---

### Paso 5: Publicar la librería (opcional)

Si deseas publicar esta librería para que otros aplicativos la usen, puedes seguir estos pasos:

1. Crea un archivo `index.js` en la raíz de tu proyecto y exporta los componentes y hooks:

```jsx
export { default as CustomToast } from './CustomToast';
export { useToast } from './useToast';
```

2. Publica tu librería en npm:

```bash
npm publish
```

1. Otros aplicativos pueden instalar y usar tu librería:

```bash
npm install tu-libreria-de-toast
```

```jsx
import { CustomToast, useToast } from 'tu-libreria-de-toast';
```

---

### Resumen

- **Componente reutilizable**: `CustomToast` acepta una prop `open` y se integra con `@radix-ui/react-toast`.
- **Hook personalizado**: `useToast` maneja el estado `open` y proporciona métodos para mostrar/ocultar el toast.
- **Integración con eventos**: Puedes usar eventos personalizados o cambios de estado global para controlar el toast.
- **Publicación**: Puedes publicar la librería para que otros aplicativos la usen.

Este enfoque es modular, reutilizable y evita el uso excesivo de `useState` o `useSelector`, delegando el control del estado a quien use la librería.