import { alertColor, Alerts, BannerInformation } from "api-fetch";
import { Avatar, Button, DropdownMenu, Flex, Heading, IconButton, SegmentedControl, TextArea } from "@radix-ui/themes";
import { CalendarIcon, ExclamationTriangleIcon, GearIcon, HamburgerMenuIcon, HomeIcon, UpdateIcon } from "@radix-ui/react-icons";
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { lazy, Suspense } from "react";
import { MainFrame, WorkFrame2 } from "./layouts/MainFrame";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import CapturarError from "./utils/CapturarError";

/**
 * Componente principal de la aplicación.
 * 
 * @author @omargo33
 * @returns 
 */
const App = () => {
  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  const [t] = useTranslation("global");
  const auth = useAuth();
  const Button = lazy(() => import("demo_remote/Button"));
  const Dashboard = lazy(() => import("dashboard_remote/Dashboard"));
  const EncabezadoWrapper = lazy(() => import("marco_remote/EncabezadoWrapper"));
  const Flujo = lazy(() => import("usuario_remote/Flujo"));
  const Footer = lazy(() => import("demo_remote/Footer"));
  const Usuario = lazy(() => import("usuario_remote/Usuario"));

  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth.isLoading) {
    return (
      <MainFrame>
        <Flex direction="row" align="center" justify="center" style={{ height: '85vh' }}>
          <Flex direction="column" align="center" gap="3"
            style={{ background: "var(--gray-a2)", padding: "3rem", borderRadius: "1rem", border: `1px solid ${alertColor({ alert: Alerts.success })}` }}>
            <UpdateIcon height="128" width="128"
              color={alertColor({ alert: Alerts.success })} />
            <BannerInformation
              alert={Alerts.success}
              message={(t("app.loading"))} />
          </Flex>
        </Flex>
      </MainFrame>
    );
  }

  if (auth.error || !auth.isAuthenticated) {
    return (
      <MainFrame>
        <Flex direction="row" align="center" justify="center" style={{ height: '85vh' }}>
          <Flex direction="column" align="center" gap="3"
            style={{ background: "var(--gray-a2)", padding: "3rem", borderRadius: "1rem", border: `1px solid ${alertColor({ alert: Alerts.warning })}` }}>
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
        </Flex>
      </MainFrame>
    );
  }
  return (
    <WorkFrame2 header={<Header />}>
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
      <TextArea rows="15"
        value={JSON.stringify(auth.user)}
      />
      <TextArea rows="15"
        value={JSON.stringify(auth.user)}
      />
    </WorkFrame2>
  );
};


const Header = () => {

  const auth = useAuth();

  return (
    <Flex direction="row" px="4" align="center" justify="between" style={{ height: '6vh', backgroundColor: 'var(--gray-a3)', borderBottom: '1px solid var(--gray-a6)' }}>
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
        <Button size="2" variant="solid" onClick={() => auth.signoutRedirect()}>Cerrar Sesión</Button>
        <Avatar size="2"
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          fallback="A"
        />
      </Flex>
    </Flex>
  );
}

export default App;
