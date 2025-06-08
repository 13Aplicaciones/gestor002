import { Box, Tabs, Text } from "@radix-ui/themes";
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
import { useTranslation } from "react-i18next";
import { GenericWork, PageCrud } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataModule, IRowDataModule } from "./Structures/Types";
import { FormEditCombo } from "./Work/Combo/FormEditCombo";
import { QueryCombo } from "./Work/Combo/QueryCombo";
import { createIRowDataCombo } from "./Work/Combo/Structures/Types";
import { ChangeStatus } from "./Work/Procesos/Panels";

/**
 * Función para tener una vista previa de los Modules del sistema.
 */
const WorkModule = ({
  onBack,
  row,
}: {
  onBack: () => void;
  row?: IRowDataModule;
}) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [t] = useTranslation("global_gestor");

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

  return (
    <>
      {!apiUrl || !token ? (
        <></>
      ) : (
        <>
          <GenericWork<IRowDataModule>
            apiUrl={apiUrl}
            createEmptyData={createIRowDataModule}
            getPresentationData={dataViewPresentation}
            token={token}
            row={row}
            getToken={refreshToken}
            entityName="Module"
            onBack={() => onBack()}
          />

          <Tabs.Root defaultValue="process">
            <Tabs.List>
              <Tabs.Trigger value="process">Procesos</Tabs.Trigger>
              <Tabs.Trigger value="menus">Menus</Tabs.Trigger>
              <Tabs.Trigger value="cdu">
                {t("modules.GS-CB-001.title")}
              </Tabs.Trigger>
              <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
              <Tabs.Trigger value="parameters">Parametros</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              <Tabs.Content value="process">
                <ChangeStatus row={row} />
              </Tabs.Content>
              <Tabs.Content value="menus">
                <Text size="2">Work Menus</Text>
              </Tabs.Content>
              <Tabs.Content value="cdu">
                <PageCrud
                  tranlation={Menus.COMBO}
                  createIRowDataCustom={createIRowDataCombo}
                  QueryPanel={QueryCombo}
                  FormPanel={FormEditCombo}
                  initialRow={{ uuidModule: row?.uuid }}
                />
              </Tabs.Content>
              <Tabs.Content value="roles">
                <Text size="2">Work Roles</Text>
              </Tabs.Content>
              <Tabs.Content value="parameters">
                <Text size="2">Work Parameters</Text>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </>
      )}
    </>
  );
};

export { WorkModule };
