import { Alerts, BannerInformation } from "api-fetch";
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { lazy, Suspense } from "react";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import CapturarError from "./utils/CapturarError";
import MainFrame from "./layouts/MainFrame";

/**
 * Componente principal de la aplicación.
 * 
 * @author @omargo33
 * @returns 
 */
const App = () => {
  const Button = lazy(() => import("demo_remote/Button"));
  const Dashboard = lazy(() => import("dashboard_remote/Dashboard"));
  const EncabezadoWrapper = lazy(() => import("marco_remote/EncabezadoWrapper"));
  const Flujo = lazy(() => import("usuario_remote/Flujo"));
  const Footer = lazy(() => import("demo_remote/Footer"));
  const Usuario = lazy(() => import("usuario_remote/Usuario"));
  const [t] = useTranslation("global");
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth.isLoading) {
    return (
      <div >
        <span ></span>
        <span >
          Loading... (it may take a while for the first time, just have some coffee~ ☕️)
        </span>
      </div>
    );
  }

  if (auth.error || !auth.isAuthenticated) {
    return (
      <div >
        {auth.error ? (        
          <BannerInformation 
            alert={Alerts.warning} 
            message='Ops, login error: ${auth.error.message} (checkout Keycloak status and configuration' />
        ) : (
          <BannerInformation 
            alert={Alerts.error} 
            message="Aún no estás autenticado y no sé por qué... ¡Quizás puedas descubrirlo!" />
        )}
      </div>
    );
  }
  return (
    <MainFrame>      
      {/*
      <CapturarError titleName="EncabezadoWrapper">
        <Suspense fallback={t("messages.loading")}>
          <EncabezadoWrapper />
        </Suspense>
      </CapturarError>
      <CapturarError titleName="Button">
        <Suspense fallback={t("messages.loading")}>
          <Button />
        </Suspense>
      </CapturarError>
      <CapturarError titleName="Usuario">
        <Suspense fallback={t("messages.loading")}>
          <Usuario />
        </Suspense>
      </CapturarError>
      <CapturarError titleName="Flujo">
        <Suspense fallback={t("messages.loading")}>
          <Flujo />
        </Suspense>
      </CapturarError>
      <CapturarError titleName="Dashboard">
        <Suspense fallback={t("messages.loading")}>
          <Dashboard />
        </Suspense>
      </CapturarError>
      <CapturarError titleName="Footer">
        <Suspense fallback={t("messages.loading")}>
          <Footer />
        </Suspense>
      </CapturarError>      
      */}
      {JSON.stringify(auth.user).substring(0, 30) + '...'}
      {JSON.stringify(auth.user)}
    </MainFrame>
  );
};

export default App;