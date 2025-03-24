import "@radix-ui/themes/styles.css";
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux'
import { store } from 'api-fetch'
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'
import i18n from "./i18n.tsx";
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
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Theme accentColor="teal" grayColor="auto" scaling="105%" panelBackground="translucent" appearance="light">
            <App />
        </Theme>
      </Provider>
    </I18nextProvider>
  </StrictMode>,
)
