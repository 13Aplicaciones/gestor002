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
    </>
  );
};

export default App;