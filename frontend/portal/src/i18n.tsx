import { global_ux_en, global_ux_es } from 'ux-ui';
import { initReactI18next } from 'react-i18next';
import global_en from './locales/en/global_portal.json';
import global_es from './locales/es/global_portal.json';
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
    fallbackLng: 'en',
    ns: ['global_portal', 'global_ux'],
    defaultNS: 'global_portal',
    resources: {
      es: {
        global_portal: global_es,
        global_ux: global_ux_es
      },
      en: {
        global_portal: global_en,
        global_ux: global_ux_en
      }
    },
  });

export default i18n;