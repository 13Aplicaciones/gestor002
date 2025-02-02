import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import CapturarError from "./utils/CapturarError";

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

  return (
    <>
      <CapturarError tituloName="EncabezadoWrapper">
        <Suspense fallback={t("mensajes.loading")}>
          <EncabezadoWrapper />
        </Suspense>
      </CapturarError>

      <CapturarError tituloName="Button">
        <Suspense fallback={t("mensajes.loading")}>
          <Button />
        </Suspense>
      </CapturarError>


      <CapturarError tituloName="Usuario">
        <Suspense fallback={t("mensajes.loading")}>
          <Usuario />
        </Suspense>
      </CapturarError>

      <CapturarError tituloName="Flujo">
        <Suspense fallback={t("mensajes.loading")}>
          <Flujo />
        </Suspense>
      </CapturarError>

      <CapturarError tituloName="Dashboard">
        <Suspense fallback={t("mensajes.loading")}>
          <Dashboard />
        </Suspense>
      </CapturarError>

      <CapturarError tituloName="Footer">
        <Suspense fallback={t("mensajes.loading")}>
          <Footer />
        </Suspense>
      </CapturarError>
    </>
  );
};

export default App;