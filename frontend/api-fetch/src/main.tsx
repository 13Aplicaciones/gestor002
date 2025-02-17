import "@radix-ui/themes/styles.css";
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/ConfigStore.tsx';
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'
import { ToastContextProvider } from "./components/toast/ToastContextProvider.tsx";

/**
 * Componente principal de la aplicación
 * 
 * Para ver el uso de compontes toas ver el siguiente link
 * @link ./demos/Toast.tsx
 * 
 * @author @omargo33
 * @since 2025-01-10
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Theme accentColor="teal" grayColor="auto" scaling="105%" panelBackground="translucent" appearance="light">
        <ToastContextProvider >
          <App />
        </ToastContextProvider >
      </Theme>
    </Provider>
  </StrictMode>,
)
