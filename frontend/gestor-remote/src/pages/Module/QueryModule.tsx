import { IPresentationTable } from "ux-ui";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { GenericQuery } from "ux-ui/src/components/form/GenericQuery";
import { Menus, MODULE } from "../../utils/Constants";
import queryActionsModule from "./QueryActionsModule";
import { QueryFormModule } from "./QueryFormModule";
import { tableQueryModule } from "./Structures/Presentations";
import { IRowDataModule } from "./Structures/Types";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";

/**
 * Tabla de Modules del sistema.
 */
const QueryModule = ({ onEditRow, onSeeRow }: IQueryProps) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

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
      getToken={getToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryModule };
