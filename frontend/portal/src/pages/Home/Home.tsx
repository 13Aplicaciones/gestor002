/* eslint-disable @typescript-eslint/no-explicit-any */
import { addToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { alertColor, Alerts, BannerInformation, useToastContext } from "ux-ui";
import { Card, Flex } from "@radix-ui/themes";
import { ExclamationTriangleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { getStructure, setSelectModule } from "orchestrator_remote/service/Structure";
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { MainFrame, WorkFrame } from "../../layouts/MainFrame";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Body from "./Body";
import Header from "./Header";

/**
 * Componente principal de la aplicación.
 * 
 * @author @omargo33
 * @returns 
 */
const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar el refresco
  
  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  const [t] = useTranslation("global_portal");
  const { showToast } = useToastContext();
  const auth = useAuth();

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
   * Use effect para manejar el estado compartido de datos de usuario y tokens
   * 
   * Al iniciar el componente se obtienen los datos del usuario desde el auth
   * Al unSuscribirse al userStore se pasa los datos vacios
   * 
   */
  useEffect(() => {
    const fetchToken = async () => {
      if (auth.user) {
        const iToken: ITokenRoot = {
          user: auth.user?.profile?.preferred_username || "",
          accessToken: auth.user?.access_token || "",
          refreshToken: auth.user?.refresh_token || "",
          expiresAt: auth.user?.expires_at || 0,
          idToken: auth.user?.id_token || "",
          email: auth.user?.profile?.email || "",
          name: auth.user?.profile?.name || ""
        };

        await addToken({ token: iToken });
      }
    }
    fetchToken();
  }, [auth.user]);


  /**
   * Use effect para manejar el estado compartido de la estructura
   * 
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStructure();
      if (data?.error) {
        showToast(
          data.error + " (" + data.status + ") ",
          data.statusDescription || "",
          Alerts.error
        );
      } else {
        await setSelectModule("0");
      }
    };
    fetchData();
  }, [showToast]);


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

const handleOnSelect = () => {
  setRefreshKey((prevKey) => prevKey + 1); // Forzar el refresco de MenuModule
}

  return (
    <WorkFrame header={<Header onSelect={handleOnSelect}/>}>
        <Body refreshModule={refreshKey}/>
    </WorkFrame>
  );
};

export default Home;
