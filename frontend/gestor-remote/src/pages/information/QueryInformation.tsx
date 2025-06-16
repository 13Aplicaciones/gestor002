import { IconButton, Tooltip } from "@radix-ui/themes";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GenericQuery, IconComponent, IPresentationTable, IQueryProps } from "ux-ui";
import { MenuTableRefresh } from "ux-ui/src/ConstantsPresentation";
import { Menus, MODULE } from "../../utils/Constants";
import { QueryFormInformation } from "./QueryFormInformation";
import { tableQueryInformation } from "./structures/Presentations";
import { IRowDataInformation } from "./structures/Types";

/**
 * Tabla de información del sistema.
 */
const QueryInformation = ({ onEditRow, onSeeRow, onCreateRow }: IQueryProps) => {
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
        parameter.valueText01 + Menus.INFORMATION_ENDPOINT + "/paginated"
      );
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de información
   */
  const configureInformationTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataInformation) => void,
    onSeeRow?: (row: IRowDataInformation) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataInformation) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[3]) {
      tableFormat.items[3].component = (row: IRowDataInformation) => (
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
      <Tooltip content={t("modules."+Menus.INFORMATION+".add")} side="left">
        <IconButton  variant="soft" onClick={onCreateRow}>
          <IconComponent iconName="PlusIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <GenericQuery<IRowDataInformation>
      QueryForm={QueryFormInformation}
      getTablePresentation={tableQueryInformation}
      initialParameters={{
        name: "",
      }}
      configureTableActions={configureInformationTableActions}
      apiUrl={apiUrl}
      token={token}
      menuTableRefresh={MenuTableRefresh.refresh}
      childrenMenu={<MenuTable />}

      getToken={refreshToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
      onCreateRow={onCreateRow}
    />
  );
};

export { QueryInformation };
