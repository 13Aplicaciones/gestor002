import { IconButton, Tooltip } from "@radix-ui/themes";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconComponent, IPresentationTable } from "ux-ui";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { GenericQuery } from "ux-ui/src/components/form/GenericQuery";
import { MenuTableRefresh } from "ux-ui/src/ConstantsPresentation";
import { Menus, MODULE } from "../../utils/Constants";
import queryActionsModule from "./QueryActionsModule";
import { QueryFormModule } from "./QueryFormModule";
import { tableQueryModule } from "./Structures/Presentations";
import { IRowDataModule } from "./Structures/Types";

/**
 * Tabla de Modules del sistema.
 */
const QueryModule = ({ onEditRow, onSeeRow, onCreateRow }: IQueryProps) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [t] = useTranslation ("global_gestor");

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(parameter.valueText01 + Menus.MODULE_ENDPOINT + "/paginated");
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de Modules
   */
  const configureModuleTableActions = async (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataModule) => void,
    onSeeRow?: (row: IRowDataModule) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataModule) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acciones personalizadas
    if (tableFormat.items[5]) {
      tableFormat.items[5].component = (row) =>
        queryActionsModule({
          row,
          onEditRow: (row) => {
            if (onEditRow) {
              onEditRow(row);
            }
          },
        });
    }

    return tableFormat;
  };
/**
   * Configurar el menú de la tabla de errores
   * 
   */
  const MenuTable = () => {
    return (
      <Tooltip content={t("modules." + Menus.MODULE + ".add")} side="left">
        <IconButton radius="full" variant="soft" onClick={onCreateRow}>
          <IconComponent iconName="PlusIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <GenericQuery<IRowDataModule>
      QueryForm={QueryFormModule}
      getTablePresentation={tableQueryModule}
      initialParameters={{
        size: "10",
        indexModule: "",
        name: "",
        status: "",
      }}
      configureTableActions={configureModuleTableActions}
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

export { QueryModule };
