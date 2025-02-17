import "@radix-ui/themes/styles.css";
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes'
import { ToastContextProvider } from "api-fetch";
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
      <Theme accentColor="green" grayColor="auto" scaling="90%" radius="medium" panelBackground="translucent" appearance="dark">
        <ToastContextProvider >
          <App />
        </ToastContextProvider>
      </Theme>
    </I18nextProvider>
  </StrictMode>,
)
