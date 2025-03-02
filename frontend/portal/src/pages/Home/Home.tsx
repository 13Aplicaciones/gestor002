/* eslint-disable @typescript-eslint/no-explicit-any */
import { addToken, getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { alertColor, Alerts, BannerInformation, CardGrid, GridDashboard, useToastContext } from "ux-ui";
import { Card, Flex, TextArea, } from "@radix-ui/themes";
import { ExclamationTriangleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { getFirtsModule, getStructure } from "orchestrator_remote/service/Structure";
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { MainFrame, WorkFrame } from "../../layouts/MainFrame";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Header, { IModuleRoot } from "./Header";

/**
 * Componente principal de la aplicación.
 * 
 * @author @omargo33
 * @returns 
 */
const Home = () => {
  const [dataUser, setDataUser] = useState({});
  const [dataModule, setDataModule] = useState({});
  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  const [t] = useTranslation("global");
  const { showToast } = useToastContext();
  const auth = useAuth();

  const [dataModuleSelect, setDataModuleSelect] = useState<Record<string, IModuleRoot>>({});


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
    const je = async () => {
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

        setDataUser(auth.user);
        await addToken({ token: iToken });
      }
    }
    je();
  }, [auth.user]);


  /**
   * Use effect para manejar el estado compartido de la estructura
   * 
   */

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();

      if (token) {
        const data = await getStructure({ token: token.accessToken });
        if (data?.error) {
          showToast(
            data.error + " (" + data.status + ") ",
            data.statusDescription || "",
            Alerts.error
          );
        }

        const module = await getStructure({ token: token.accessToken });
        if (module) {
          setDataModule(module);
        }

        const moduleSelect = await getFirtsModule({ token: token.accessToken });
        if (moduleSelect) {
          setDataModuleSelect(moduleSelect);

          console.log("data" + JSON.stringify( moduleSelect.menus));
        }
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

  return (
    <WorkFrame header={<Header />}>

      <p>Datos compartidos:</p>

      <TextArea rows={5} variant="soft"
        value={JSON.stringify(dataUser).substring(0, 200)}
        readOnly
      />

      <TextArea rows={15} variant="soft"
        value={JSON.stringify(dataModule)}
        readOnly
      />

      {
        
      <GridDashboard >
        {Array.isArray(dataModuleSelect.menus) && dataModuleSelect.menus.map((item, index) => {
          return (
            <CardGrid
              key={index}
              title={"item.index"}
              description={"item.name"}
              iconName={"item.icon"}
              data={[]} />
          );
        })}
      </GridDashboard>
        
    }
    </WorkFrame>
  );
};

export default Home;
