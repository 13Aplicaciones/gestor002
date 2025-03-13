/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, IconButton, Tabs, Text } from "@radix-ui/themes";
import { CreateSearchField, IParameters } from "../components/table/TableSearch";
import { IPresentationTable } from "../components/table/Table";
import {
  GearIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import PopoverDemo from "../components/popover/Popover";
import { JustificationText, TextFormat } from "../ConstantsPresentation";

/**
 * Funcion para crear una tabla que consume un api para la generacion.
 *
 * @returns
 */
const miTablaApiDemo = () => {
  const parametros: IParameters = {
    page: 0,
    size: 10,
    sort: "index",
    "sort ": "asc", // Espacio en blanco para que no lo tome como repetido, se recomienda no usarlo en la paginacion.
    index: "",
    message: "",
  };

  const presentationItems: IPresentationTable = {
    banding: false,
    headers: true,
    numberLinea: false,
    skeletonWidth: "50vw",
    items: [
      {
        name: "indice",
        title: "Indice",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        onAction: {
          onAction: (row: any) => {
            console.log("indice" + JSON.stringify(row));
          },
        },
      },
      {
        name: "message",
        title: "Mensaje",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "30vw",
      },
      {
        name: "usuarioFecha",
        title: "Fecha",
        justification: JustificationText.start,
        format: TextFormat.date,
        width: "10vw",
        onAction: {
          onAction: (row: any) => {
            console.log("indice" + JSON.stringify(row));
          },
        },
      },
    ],
  };

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
              <MixerHorizontalIcon width="16" height="16" />
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
      <CreateSearchField
        apiUrl="http://localhost:8090/gestor-ws/api/errors/paginado"
        nameIndex="indice"
        parametersApi={parametros}
        presentationTable={presentationItems}
      >
        {busquedaPersonalizada()}
      </CreateSearchField>
    </Flex>
  );
};

export default miTablaApiDemo;
