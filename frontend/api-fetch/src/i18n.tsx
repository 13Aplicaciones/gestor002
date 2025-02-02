
import { initReactI18next } from 'react-i18next';
import global_en from './traducciones/en/global.json';
import global_es from './traducciones/es/global.json';
import i18n from 'i18next';

/**
 * Instancia de i18n para la internacionalización de la aplicación.
 * 
 * @author @omargo33
 * @since 2025-01-10
 * 
 */
i18n
    .use(initReactI18next)
    .init({
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

export default i18n;