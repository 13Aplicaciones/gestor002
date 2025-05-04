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
import { GenericQuery, IPresentationTable, IQueryProps } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import QueryActionsUser from "./QueryActionsUser";
import { QueryFormUser } from "./QueryFormUser";
import { tableQueryUser } from "./Structures/Presentations";
import { IRowDataUser } from "./Structures/Types";

/**
 * Tabla de información del sistema.
 */
const QueryUser = ({ onEditRow, onSeeRow }: IQueryProps) => {
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
      setApiUrl(parameter.valueText01 + Menus.USER_ENDPOINT + "/paginated");
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de información
   */
  const configureUserTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataUser) => void,
    onSeeRow?: (row: IRowDataUser) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[0]) {
      tableFormat.items[0].onAction = {
        onAction: (row: IRowDataUser) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[5]) {
      tableFormat.items[5].component = (row: IRowDataUser) => (
        <QueryActionsUser
          row={row}
          onEditRow={(row: IRowDataUser) => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        />
      );
    }

    return tableFormat;
  };

  return (
    <GenericQuery<IRowDataUser>
      QueryForm={QueryFormUser}
      getTablePresentation={tableQueryUser}
      initialParameters={{
        size: "10",
        name: "",
      }}
      configureTableActions={configureUserTableActions}
      apiUrl={apiUrl}
      token={token}
      getToken={refreshToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryUser };
