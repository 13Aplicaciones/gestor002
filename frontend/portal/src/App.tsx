/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertColor, Alerts, BannerInformation } from "api-fetch";
import { Avatar, Card, DropdownMenu, Flex, Heading, IconButton, SegmentedControl, Text, TextArea, } from "@radix-ui/themes";
import { AvatarIcon, CalendarIcon, ExclamationTriangleIcon, EnvelopeOpenIcon, GearIcon, HamburgerMenuIcon, HomeIcon, UpdateIcon, ExitIcon } from "@radix-ui/react-icons";
import { globalStore } from "orchestrator_remote/globalStore";
import { userStore, State as StateUser } from "orchestrator_remote/userStore";
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { lazy, Suspense } from "react";
import { MainFrame, WorkFrame } from "./layouts/MainFrame";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import CatchErrorLoadElement from "./utils/CatchErrorLoadElement";

/**
 * Componente principal de la aplicación.
 * 
 * @author @omargo33
 * @returns 
 */
const App = () => {
  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  const [sharedData, setSharedData] = useState(globalStore.getState().sharedData);
  const [sharedUser, setSharedUser] = useState(userStore.getState());
  const [sharedState] = useState<StateUser>({
    sharedUser: "",
    sharedAccessTolken: "",
    sharedRefreshTolken: "",
    sharedExpiresAt: 0,
    sharedIdToken: "",
    sharedEmail: "",
    sharedName: ""
  });

  const [t] = useTranslation("global");
  const auth = useAuth();
  const Button = lazy(() => import("demo_remote/Button"));
  const Dashboard = lazy(() => import("dashboard_remote/Dashboard"));
  const EncabezadoWrapper = lazy(() => import("marco_remote/EncabezadoWrapper"));
  const Flujo = lazy(() => import("usuario_remote/Flujo"));
  const Footer = lazy(() => import("demo_remote/Footer"));
  const Usuario = lazy(() => import("usuario_remote/Usuario"));



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
   */
  useEffect(() => {
    const unsubscribe = globalStore.subscribe((state: { sharedData: any; }) => {
      setSharedData(state.sharedData);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Use effect para manejar el estado compartido de datos de usuario y tokens
   * 
   * Al suscribirse al userStore se pasa los datos vacios
   * Al iniciar el componente se obtienen los datos del usuario desde el auth
   * 
   */
  useEffect(() => {    
    
    console.log("Data shared 001: ", JSON.stringify(auth.user?.profile));
    console.log("Data shared 002: ", JSON.stringify(sharedUser));


    const unsubscribe = userStore.subscribe((state: StateUser) => {      
      state.sharedUser = "";
      state.sharedAccessTolken =  "";
      state.sharedRefreshTolken ="";
      state.sharedExpiresAt = 0;
      state.sharedIdToken = "";
      state.sharedEmail = "";
      state.sharedName = "";
      setSharedUser(state);
    });

    sharedState.sharedUser = auth.user?.profile?.preferred_username || "";
    sharedState.sharedAccessTolken = auth.user?.access_token || "";
    sharedState.sharedRefreshTolken = auth.user?.refresh_token || "";
    sharedState.sharedExpiresAt = auth.user?.expires_at || 0;
    sharedState.sharedIdToken = auth.user?.id_token || "";
    sharedState.sharedEmail = auth.user?.profile?.email || "";
    sharedState.sharedName = auth.user?.profile?.name || "";
    setSharedUser(sharedState);
    
    return () => unsubscribe();
  }, []);

  

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
    globalStore.setState({ sharedData: e.target.value });
  };

  return (
    <WorkFrame header={<Header />}>
      <input
        type="text"
        value={sharedData}
        onChange={handleChange}
        placeholder="Escribe algo..."
      />
      <p>Datos compartidos: {sharedData}</p>
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

      <TextArea rows={15} variant="soft"
        value={JSON.stringify(auth)}
      />

      <CatchErrorLoadElement titleName="Footer">
        <Suspense fallback={t("messages.loading")}>
          <Footer />
        </Suspense>
      </CatchErrorLoadElement>

    </WorkFrame>
  );
};


const Header = () => {
  const auth = useAuth();
  const [name, setName] = useState<string | "o.velez">();
  const [abreviatura, setAbreviatura] = useState<string>("Ov");
  const [avatarUrl, setAvatarUrl] = useState<string>("https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop");

  useEffect(() => {
    setName(auth.user?.profile?.preferred_username);
    if (name) {
      setAbreviatura(name.substring(0, 2));
      // TODO: fetchApi para obtener la imagen del avatar
      // setAvatarUrl(`https://avatars.dicebear.com/api/avataaars/${name}.svg`);
    }
  }, [auth.user?.profile?.preferred_username, name]);

  return (
    <Flex direction="row" px="4" align="center" justify="between" style={{ height: '6vh', backgroundColor: 'var(--gray-a2)', borderBottom: '1px solid var(--gray-a6)' }}>
      <Flex direction="row" align="center" gap="2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton size="3" variant="ghost">
              <HamburgerMenuIcon width="24" height="24" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Heading size="5">Portal</Heading>
      </Flex>

      <SegmentedControl.Root defaultValue="inbox">
        <SegmentedControl.Item value="inbox">
          <Flex align="center" gap="2">
            <HomeIcon height="22" width="22" />
          </Flex>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="drafts">
          <Flex align="center" gap="2">
            <CalendarIcon height="22" width="22" />
          </Flex>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="sent">
          <Flex align="center" gap="2">
            <GearIcon height="22" width="22" />
          </Flex>
        </SegmentedControl.Item>
      </SegmentedControl.Root>

      <Flex direction="row" align="center" justify="center" gap="2">

        <Text>{name}</Text>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar size="3"
              src={avatarUrl}
              fallback={abreviatura || "Ov"}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item

              onClick={() => console.log("mi final token pasado")}
            >
              <AvatarIcon height="18" width="18" />
              Perfil {name}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              color="red"
              onClick={() => auth.signoutRedirect()}>
              <ExitIcon height="18" width="18" />
              Salir
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <EnvelopeOpenIcon height="18" width="18" />
              Enviar Comentario
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Flex>
  );
}

export default App;
