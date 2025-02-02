import { I18nextProvider } from 'react-i18next';
import { ReactNode } from "react";
import { Theme } from '@radix-ui/themes';
import Encabezado from './Encabezado';
import global_en from './traducciones/en/global.json';
import global_es from './traducciones/es/global.json';
import i18next from 'i18next';

// Instancia de i18next
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

const EncabezadoWrapper = ({ children }: { children?: ReactNode }) => (
  <I18nextProvider i18n={i18next}>
    <Theme className="App" accentColor="sky" grayColor="auto" radius="full" scaling="100%" panelBackground='solid'>
      <Encabezado >
        {children}
        </Encabezado>
    </Theme>
  </I18nextProvider>
);

export default EncabezadoWrapper;