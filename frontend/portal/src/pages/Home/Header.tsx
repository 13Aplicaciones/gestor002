/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, DropdownMenu, Flex, Heading, IconButton, SegmentedControl, Text } from "@radix-ui/themes";
import { AvatarIcon, CalendarIcon, EnvelopeOpenIcon, ExitIcon, GearIcon, HamburgerMenuIcon, HomeIcon } from "@radix-ui/react-icons";
import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { useStructureStore } from "../../context/StoreHook";

const MenuApp = ({ sharedStructure }: { sharedStructure: any }) => {
  console.log("MenuApp", sharedStructure);
  return (
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
  );
};

const Header = () => {
  const auth = useAuth();
  const [name, setName] = useState<string | "o.velez">();
  const [abreviatura, setAbreviatura] = useState<string>("Ov");
  const [avatarUrl] = useState<string>("https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop");
  const sharedStructure = useStructureStore();

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
     <MenuApp sharedStructure={sharedStructure} /> 
      <Flex direction="row" align="center" justify="center" gap="2">
        <Text>{name}</Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar size="3" src={avatarUrl} fallback={abreviatura || "Ov"} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => console.log("mi final token pasado")}>
              <AvatarIcon height="18" width="18" />
              Perfil {name}
            </DropdownMenu.Item>
            <DropdownMenu.Item color="red" onClick={() => auth.signoutRedirect()}>
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
};

export default Header;