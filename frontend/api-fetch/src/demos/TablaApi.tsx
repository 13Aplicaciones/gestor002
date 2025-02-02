/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, IconButton, Tabs, Text } from "@radix-ui/themes";
import { CrearCampoBusqueda } from "../componentes/tabla/TablaBusqueda";
import { GearIcon, MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import PopoverDemo from "../componentes/popover/Popover";

/**
 * Funcion para crear una tabla que consume un api para la generacion.
 * 
 * @returns 
 */
const miTablaApiDemo = () => {
  const parametros = {
    page: '0',
    size: '10',
    sort: 'indice',
    'sort ': 'asc', // Espacio en blanco para que no lo tome como repetido, se recomienda no usarlo en la paginacion.
    indice: '',
    mensaje: '',
  };

  const presentacionItems = {
    skeleton: {
      with: "50vw",
    },
    items:
      [
        {
          nombre: "indice",
          titulo: "Indice",
          justificacion: "start",
          formato: "none",
          width: "10vw",
          accion: (row: any) => {
            console.log("indice" + JSON.stringify(row));
          },
        },
        {
          nombre: "mensaje",
          titulo: "Mensaje",
          justificacion: "start",
          formato: "none",
          width: "30vw",
        },
        {
          nombre: "usuarioFecha",
          titulo: "Fecha",
          justificacion: "start",
          formato: "date",
          width: "10vw",
          accion: (row: any) => {
            console.log("fecha " + JSON.stringify(row));
          }
        },
      ]
  };

  const panelAvanzdo = () => {
    return (
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">
            <MagnifyingGlassIcon width="14" height="14" style={{ marginRight: "var(--space-2)" }} />
            Busqueda</Tabs.Trigger>
          <Tabs.Trigger value="settings">
            <GearIcon width="14" height="14" style={{ marginRight: "var(--space-2)" }} />
            Configuracion
          </Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="account">
            <Text size="2">Make changes to your account.</Text>
          </Tabs.Content>

          <Tabs.Content value="settings">
            <Text size="2">Edit your profile or update contact information.</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    );
  }

  /**
   * Funcion para crear e; boton de busqueda avanzado.
   * @returns 
   */
  const busquedaPersonalizada = () => {
    return (
      <Flex direction="row" gap="1" align="baseline">
        <PopoverDemo childrenTigger={
          <IconButton variant="outline" size="3" >
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
  }

  return (
    <Flex direction="column" p="5" gap="3">
      <CrearCampoBusqueda
        apiUrl="http://localhost:8090/gestor-ws/api/errors/paginado"
        nombreIndice="indice"
        presentacionItem={presentacionItems}
        parametrosApi={parametros} >
        {busquedaPersonalizada()}
      </CrearCampoBusqueda>
    </Flex>
  );
}

export default miTablaApiDemo;