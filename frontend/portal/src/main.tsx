import "@radix-ui/themes/styles.css";
import { AuthProvider } from 'react-oidc-context';
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { Log, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes';
import { Toaster } from "api-fetch";
import App from './App.tsx'
import global_en from './locales/en/global.json';
import global_es from './locales/es/global.json';
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


/**
 * See: {@link https://authts.github.io/oidc-client-ts/classes/UserManager.html}
 */
const userManager = new UserManager({
  authority: import.meta.env.VITE_KEYCLOAK_REALM_URL,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  scope: 'openid profile',
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  //TODO: Cambiar a local storage
  //userStore: new WebStorageStateStore({ store: window.localStorage }),
  monitorSession: true, // this allows cross tab login/logout detection
  automaticSilentRenew: true
});


const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

Log.setLogger(console);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
          <Theme accentColor="ambar" grayColor="sand" scaling="110%" radius="full" panelBackground="solid" appearance="light">
            <App />
            <Toaster />
          </Theme>
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode >
)

