import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { GenericPreview } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataModule, IRowDataModule } from "./Structures/Types";

/**
 * Función para tener una vista previa de los Modules del sistema.
 */
const PreviewModule = ({
  onBack,
  row,
}: {
  onBack: () => void;
  row?: IRowDataModule;
}) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    getToken()
      .then((t: ITokenRoot) => setToken(t.access_token))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!row) {
      setApiUrl("");
      return;
    }

    (async () => {
      try {
        const param: IParameter = await getParameter(MODULE, "200");
        const url = `${param.valueText01}${Menus.MODULE_ENDPOINT}/${row.uuid}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  const CustomProcesses = () => {
    return (
      <Box
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Container size="4" p="4">
          <Flex gap="3" direction="column" align="start" gapY="6">
            <Heading size="3">Administracion de Estados</Heading>
            <Heading size="2">Cambio de estado</Heading>
            <Text>
              Al cambiar el estado del módulo, esto afectará a todos los
              procesos relacionados con él, por lo que se recomienda realizar
              esta acción con precaución y con conocimiento de las consecuencias
              que este proceso tiene.
            </Text>

            {row?.status === "A" ? (
              <Flex direction="row" gap="3" align="center">
                <Button variant="solid">Inactivar</Button>
                <Text>
                  Inactiva el modulo para que los usuarios con los permisos
                  adecuados no puedan acceder a él.
                </Text>
              </Flex>
            ) : (
              <Flex direction="row" gap="3" align="center">
                <Button variant="solid">Activar</Button>
                <Text>
                  Activa el modulo para que los usuarios con los permisos
                  adecuados puedan acceder a él.
                </Text>
              </Flex>
            )}
          </Flex>
        </Container>
      </Box>
    );
  };

  return (
    <>
      {!apiUrl || !token ? (
        <></>
      ) : (
        <>
          <CustomProcesses />
          <Box
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Container size="4" p="4">
              <Flex gap="3" direction="column" align="start" gapY="6">
                <Heading size="3">Información del registro</Heading>
                <Heading size="2">Detalle del registro</Heading>
                <GenericPreview<IRowDataModule>
                  apiUrl={apiUrl}
                  createEmptyData={createIRowDataModule}
                  getPresentationData={dataViewPresentation}
                  token={token}
                  getToken={refreshToken}
                  entityName="Module"
                  onBack={() => onBack()}
                />
              </Flex>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export { PreviewModule };
