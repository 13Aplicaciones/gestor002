/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, DropdownMenu, Flex, Heading, IconButton, SegmentedControl, Text } from "@radix-ui/themes";
import { AvatarIcon, EnvelopeOpenIcon, ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { getIconComponent } from "ux-ui";
import { getStructure } from "orchestrator_remote/service/Structure";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";

/**
 * Interfaz para manejar los modulos, menus y usuario
 * 
 * @author omargo33
 * @since 2025-03-02
 * 
 */

/**
 * Interfaz para manejar los modulos
 */
export interface IModuleRoot {
  index: string;
  icon: string;
  name: string;
  menus: [
    {
      index: string;
      name: string;
      taskFlow: string;
      icon: string;
      create: string;
      update: string;
      delete: string;
      audit: string;
    }
  ]
}

/**
 * Funcion para mostrar el menú de aplicaciones centrales
 * 
 * @param dataModule datos de los modulos
 * @param selectModule modulo seleccionado
 * @param onClick función para manejar el evento click
 * @returns 
 */
const MenuApp = (
  { dataModule, selectModule, onClick }:
    { dataModule: Record<string, IModuleRoot>, selectModule: string, onClick: (index: string) => void }
) => {

  return (
    <SegmentedControl.Root defaultValue={selectModule}>
      {Object.keys(dataModule).map((key, index) => (
        <SegmentedControl.Item
          key={index}
          value={key}
          onClick={() => onClick(key)}>
          <Flex align="center" gap="2">
            <Tooltip content={dataModule[key].name} >
              {getIconComponent(dataModule[key].icon, "24", "24")}
            </Tooltip>
          </Flex>
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  );
};

/**
 * Funcion para mostrar el menú de modulos
 * 
 * @param dataModule datos de los modulos
 * @param selectModule modulo seleccionado
 * @returns 
 */
const MenuModule = (
  { dataModule, selectModule }:
    { dataModule: Record<string, IModuleRoot>, selectModule: string, }
) => {
  const title = dataModule[selectModule]?.name || "Portal";

  return (
    <Flex direction="row" align="center" gap="2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="3" variant="ghost">
            <HamburgerMenuIcon width="24" height="24" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {dataModule[selectModule]?.menus.map((menu) => (
            <DropdownMenu.Item key={menu.index} onClick={() => console.log(menu.taskFlow)}>
              {getIconComponent(menu.icon, "18", "18")}
              {menu.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Flex justify="start" width={"190px"}>
        <Heading size="4" truncate>{title}</Heading>
      </Flex>
    </Flex>
  );
}

/**
 * Función para mostrar el menú de usuario
 * 
 * @returns 
 */
const MenuUser = () => {
  const auth = useAuth();
  const [name, setName] = useState<string | "Omar Velez">();
  const [userName, setUserName] = useState<string | "o.velez">();
  const [abreviatura, setAbreviatura] = useState<string>("Ov");
  const [avatarUrl] = useState<string>("https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop");

  useEffect(() => {
    setName(auth.user?.profile?.name || "o.velez");
    setUserName(auth.user?.profile?.preferred_username || "Omar Velez");
    setAbreviatura(auth.user?.profile?.name?.split(" ").map((n) => n[0]).join("") || "Ov");
  }, [auth.user]);

  return (
    <Flex direction="row" align="center" justify="end" gap="2" width={"190px"}>
      <Flex direction="column" align="end" >
        <Text size="2" truncate>{name}</Text>
        <Text size="1" weight="bold" truncate>{userName}</Text>
      </Flex>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar size="3" src={avatarUrl} fallback={abreviatura || "Ov"} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => console.log("mi final token pasado")}>
            <AvatarIcon height="18" width="18" />Perfil</DropdownMenu.Item>
          <DropdownMenu.Item>
            <EnvelopeOpenIcon height="18" width="18" />Enviar Comentario</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red" onClick={() => auth.signoutRedirect()}>
            <ExitIcon height="18" width="18" />
            Salir
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}

/**
 * Función que representa el header de la aplicación
 * 
 * @returns 
 */
const Header = () => {
  const [dataModule, setDataModule] = useState<Record<string, IModuleRoot>>({});
  const [selectModule, setSelectModule] = useState("0");

  useEffect(() => {
    const queryModules = async () => {
      const token: ITokenRoot = getToken();
      await getStructure({ token: token.accessToken }).then((data) => {
        setDataModule(data.response.modules);
      });
    }
    queryModules();
  }, []);

  const handleSelectModule = (index: string) => {
    setSelectModule(index);
  }

  return (
    <Flex direction="row" px="4" align="center" justify="between" style={{ height: '6vh', backgroundColor: 'var(--gray-a2)', borderBottom: '1px solid var(--gray-a6)' }}>
      <MenuModule dataModule={dataModule} selectModule={selectModule} />
      <MenuApp dataModule={dataModule} selectModule={selectModule} onClick={handleSelectModule} />
      <MenuUser />
    </Flex>
  );
};

export default Header;