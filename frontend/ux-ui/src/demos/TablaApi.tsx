import {
  GearIcon,
  MagnifyingGlassIcon
} from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Tabs, Text } from "@radix-ui/themes";
import { IconComponent } from "../components/icon/IconDynamic";
import PopoverDemo from "../components/popover/Popover";

/**
 * Funcion para crear una tabla que consume un api para la generacion.
 *
 * @returns
 */
const miTablaApiDemo = () => {
  const panelAvanzdo = () => {
    return (
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">
            <MagnifyingGlassIcon
              width="14"
              height="14"
              style={{ marginRight: "var(--space-2)" }}
            />
            Busqueda
          </Tabs.Trigger>
          <Tabs.Trigger value="settings">
            <GearIcon
              width="14"
              height="14"
              style={{ marginRight: "var(--space-2)" }}
            />
            Configuracion
          </Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="account">
            <Text size="2">Make changes to your account.</Text>
          </Tabs.Content>

          <Tabs.Content value="settings">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    );
  };

  /**
   * Funcion para crear e; boton de busqueda avanzado.
   * @returns
   */
  const busquedaPersonalizada = () => {
    return (
      <Flex direction="row" gap="1" align="baseline">
        <PopoverDemo
          childrenTigger={
            <IconButton variant="outline" size="3">
              <IconComponent
                iconName="MixerHorizontalIcon"
                width="16"
                height="16"
              />
            </IconButton>
          }
          childrenContent={
            <Flex gap="1" width="20vw" direction="column">
              {panelAvanzdo()}
            </Flex>
          }
        />
      </Flex>
    );
  };

  return (
    <Flex direction="column" p="5" gap="3">
      {busquedaPersonalizada()}
    </Flex>
  );
};

export default miTablaApiDemo;
