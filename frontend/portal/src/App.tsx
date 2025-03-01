/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertColor, Alerts, BannerInformation, useToastContext } from "ux-ui";
import { Card, Flex, TextArea, } from "@radix-ui/themes";
import { ExclamationTriangleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { getStructure } from "./services/APIPortal";
import { globalStore } from "orchestrator_remote/globalStore";
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { lazy, Suspense } from "react";
import { MainFrame, WorkFrame } from "./layouts/MainFrame";
import { structureStore } from "orchestrator_remote/structureStore";
import { StructureStoreProvider } from "./context/StoreProvider";
import { useEffect, useState } from 'react';
import { userStore, State as StateUser } from "orchestrator_remote/userStore";
import { useTranslation } from "react-i18next";
import CatchErrorLoadElement from "./utils/CatchErrorLoadElement";
import Header from "./pages/Home/Header";
import { useStructureStore } from "./context/StoreHook";

/**
 * Componente principal de la aplicación.
 * 
 * @author @omargo33
 * @returns 
 */
const App = () => {
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const [sharedGlobal, setSharedGlobal] = useState(globalStore.getState().sharedGlobal);
  const [sharedUser, setSharedUser] = useState(userStore.getState());
  const [sharedStructure, setSharedStructure] = useState(structureStore.getState().sharedStructure);
  //const [setSharedStructure1] = useStructureStore();


  const [t] = useTranslation("global");
  const auth = useAuth();

  const Button = lazy(() => import("demo_remote/Button"));
  const Dashboard = lazy(() => import("dashboard_remote/Dashboard"));
  const EncabezadoWrapper = lazy(() => import("marco_remote/EncabezadoWrapper"));
  const Flujo = lazy(() => import("usuario_remote/Flujo"));
  const Footer = lazy(() => import("demo_remote/Footer"));
  const Usuario = lazy(() => import("usuario_remote/Usuario"));

  const { showToast } = useToastContext();
  
  

  /**
   * Use effect para manejar la autenticación
   */
  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  /**
   * Use effect para manejar el estado compartido de datos genericos
   * 
   * Al unSuscribirse al globalStore se pasa los datos vacios
   * 
   */
  useEffect(() => {
    const unsubscribe = globalStore.subscribe((state: { sharedGlobal: any; }) => {
      setSharedGlobal(state.sharedGlobal);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Use effect para manejar el estado compartido de datos de usuario y tokens
   * 
   * Al iniciar el componente se obtienen los datos del usuario desde el auth
   * Al unSuscribirse al userStore se pasa los datos vacios
   * 
   */
  useEffect(() => {
    if (auth.user) {
      const sharedState: StateUser = {
        sharedUser: auth.user?.profile?.preferred_username || "",
        sharedAccessTolken: auth.user?.access_token || "",
        sharedRefreshTolken: auth.user?.refresh_token || "",
        sharedExpiresAt: auth.user?.expires_at || 0,
        sharedIdToken: auth.user?.id_token || "",
        sharedEmail: auth.user?.profile?.email || "",
        sharedName: auth.user?.profile?.name || ""
      };

      setSharedUser(sharedState);
    }

    const unsubscribe = userStore.subscribe((state: StateUser) => {
      setSharedUser(state);
    });

    return () => unsubscribe();
  }, [auth.user]);


  /**
   * Use effect para manejar el estado compartido de la estructura
   * 
   */
  useEffect(() => {
    if (sharedUser.sharedAccessTolken) {
      const fetchData = async () => {
        const data = await getStructure({ token: sharedUser.sharedAccessTolken +"123" });
        if (data) {
          if (data.error) {
            showToast(
              data.error + " (" + data.status + ") " ,
              data.statusDescription || "",
              Alerts.error
            );
          } else {
            setSharedStructure(data.response);
            //setSharedStructure1(data.response);
          }
        }
      };
      fetchData();
    }

    const unsubscribe = structureStore.subscribe((state: { sharedStructure: any; }) => {
      setSharedStructure(state.sharedStructure);
    });

    return () => unsubscribe();
  }, [sharedUser.sharedAccessTolken, showToast]);


  if (auth.isLoading) {
    return (
      <MainFrame>
        <Flex direction="row" align="center" justify="center" height="85vh">
          <Card variant="surface" size="5" >
            <Flex direction="column" align="center" style={{ minWidth: '30vw' }}>
              <UpdateIcon height="128" width="128"
                color={alertColor({ alert: Alerts.success })} />
              <BannerInformation
                alert={Alerts.success}
                message={(t("app.loading"))} />
            </Flex>
          </Card>
        </Flex>
      </MainFrame>
    );
  }

  if (auth.error || !auth.isAuthenticated) {
    return (
      <MainFrame>
        <Flex direction="row" align="center" justify="center" height="85vh">
          <Card variant="surface" size="5" >
            <Flex direction="column" align="center" style={{ minWidth: '30vw' }}>
              <ExclamationTriangleIcon height="128" width="128"
                color={alertColor({ alert: Alerts.warning })} />
              {auth.error ? (
                <BannerInformation
                  alert={Alerts.warning}
                  message={(t("app.error.error", { error: auth.error.message }))} />
              ) : (
                <BannerInformation
                  alert={Alerts.warning}
                  message={(t("app.error.no_authorization"))} />
              )}
            </Flex>
          </Card>
        </Flex>
      </MainFrame>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    globalStore.setState({ sharedGlobal: e.target.value });
  };

  return (
    <StructureStoreProvider>
      <WorkFrame header={<Header />}>
        <input
          type="text"
          value={sharedGlobal}
          onChange={handleChange}
          placeholder="Escribe algo..."
        />

        <p>Datos compartidos: {sharedGlobal}</p>

        <TextArea rows={15} variant="soft"
          value={JSON.stringify(sharedUser)}
          readOnly
        />

        <TextArea rows={15} variant="soft"
          value={JSON.stringify(sharedStructure)}
          readOnly
        />
        {/* 
          <CatchErrorLoadElement titleName="Button">
            <Suspense fallback={t("messages.loading")}>
              <Button />
            </Suspense>
          </CatchErrorLoadElement>

          <CatchErrorLoadElement titleName="EncabezadoWrapper">
            <Suspense fallback={t("messages.loading")}>
              <EncabezadoWrapper />
            </Suspense>
          </CatchErrorLoadElement>

          <CatchErrorLoadElement titleName="Usuario">
            <Suspense fallback={t("messages.loading")}>
              <Usuario />
            </Suspense>
          </CatchErrorLoadElement>

          <CatchErrorLoadElement titleName="Flujo">
            <Suspense fallback={t("messages.loading")}>
              <Flujo />
            </Suspense>
          </CatchErrorLoadElement>

          <CatchErrorLoadElement titleName="Dashboard">
            <Suspense fallback={t("messages.loading")}>
              <Dashboard />
            </Suspense>
          </CatchErrorLoadElement>

          <CatchErrorLoadElement titleName="Footer">
            <Suspense fallback={t("messages.loading")}>
              <Footer />
            </Suspense>
          </CatchErrorLoadElement>

          */}
      </WorkFrame>
    </StructureStoreProvider>
  );
};

export default App;
