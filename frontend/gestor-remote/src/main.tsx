import "@radix-ui/themes/styles.css";
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { Provider } from "react-redux";
import { store } from "api-fetch";
import { ToastContextProvider } from "ux-ui"; 
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'
import global_en from './locales/en/global.json';
import global_es from './locales/es/global.json';
import i18next from 'i18next';

/**
 * Inicialización de i18next.
 */
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <Theme
          accentColor="teal"
          grayColor="auto"
          scaling="100%"
          radius="medium"
          panelBackground="translucent"
          appearance="light">
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </Theme>
      </Provider>
    </I18nextProvider>
  </StrictMode>,
)
