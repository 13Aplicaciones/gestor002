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
import { Menus, MODULE } from "../../../../utils/Constants";
import { QueryFormCredentials } from "./QueryFormCredentials";
import { tableQueryCredentials } from "./Structures/Presentations";
import { IRowDataCredential } from "./Structures/Types";
/**
 * Tabla de información del sistema.
 */
const QueryCredentials = ({ onEditRow, onSeeRow }: IQueryProps) => {
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
  const configureCredentialsTableActions = (
    tableFormat: IPresentationTable,
    onSeeRow?: (row: IRowDataCredential) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[0]) {
      tableFormat.items[0].onAction = {
        onAction: (row: IRowDataCredential) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    return tableFormat;
  };

  return (
    <GenericQuery<IRowDataCredential>
      QueryForm={QueryFormCredentials}
      getTablePresentation={tableQueryCredentials}
      initialParameters={{
        size: "10",
        name: "",
      }}
      configureTableActions={configureCredentialsTableActions}
      apiUrl={apiUrl}
      token={token}
      getToken={refreshToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryCredentials };
