import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Log, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from 'react-oidc-context';
import i18n from "./i18n.tsx";
import Home from "./pages/Home/Home.tsx";

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
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
          <Theme accentColor="green" grayColor="slate" scaling="100%" radius="large" panelBackground="translucent" appearance="dark">
              
              <Home />
          
          </Theme>
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode >
)

