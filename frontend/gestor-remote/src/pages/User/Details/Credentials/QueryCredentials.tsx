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
import {
  GenericQuery,
  IconComponent,
  IPresentationTable,
  IQueryProps,
} from "ux-ui";
import { Menus, MODULE } from "../../../../utils/Constants";
import { QueryFormCredentials } from "./QueryFormCredentials";
import { tableQueryCredentials } from "./Structures/Presentations";
import { IRowDataCredential } from "./Structures/Types";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { MenuTableRefresh } from "ux-ui/src/ConstantsPresentation";
/**
 * Tabla de información del sistema.
 */
const QueryCredentials = ({
  onEditRow,
  onSeeRow,
  onCreateRow,
  initialRow,
}: IQueryProps) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [t] = useTranslation("global_gestor");

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(
        parameter.valueText01 + Menus.CREDENTIALS_ENDPOINT + "/paginated"
      );
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de información
   */
  const configureCredentialsTableActions = (
    tableFormat: IPresentationTable,
  ) => {
    // Configurar acción de edición
    if (tableFormat.items[3]) {
      tableFormat.items[3].component = (row: IRowDataCredential) => (
        <IconButton
          size="1"
          variant="ghost"
          onClick={() => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        >
          <IconComponent iconName="DotsVerticalIcon" width="16" height="16" />
        </IconButton>
      );
    }

    return tableFormat;
  };

  /**
   * Configurar el menú de la tabla de errores
   *
   */
  const MenuTable = () => {
    return (
      <Tooltip content={t("modules." + Menus.ERROR + ".add")} side="left">
        <IconButton variant="soft" onClick={onCreateRow}>
          <IconComponent iconName="PlusIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <GenericQuery<IRowDataCredential>
      QueryForm={QueryFormCredentials}
      getTablePresentation={tableQueryCredentials}
      initialParameters={{
        size: "10",
        name: "",
        uuidUser: initialRow?.uuid ?? "",
      }}
      configureTableActions={configureCredentialsTableActions}
      apiUrl={apiUrl}
      token={token}
      menuTableRefresh={MenuTableRefresh.refresh}
      childrenMenu={<MenuTable />}
      getToken={refreshToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
      onCreateRow={onCreateRow}
      initialRow={initialRow}
    />
  );
};

export { QueryCredentials };
