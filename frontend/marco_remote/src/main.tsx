import '@radix-ui/themes/styles.css';
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes';
import App from './App.tsx'
import global_en from './traducciones/en/global.json';
import global_es from './traducciones/es/global.json';
import i18next from 'i18next';

//Instancia de i18next
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
      <Theme className="App" accentColor="sky" grayColor="auto" radius="full" scaling="100%" panelBackground='solid'>
        <App />
      </Theme>
    </I18nextProvider>
  </StrictMode>
)