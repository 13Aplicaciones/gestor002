import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { GenericQuery, IPresentationTable, IQueryProps } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { QueryFormError } from "./QueryFormError";
import { tableQueryModule } from "./Structures/Presentations";
import { IRowDataError } from "./Structures/Types";

/**
 * Tabla de errores del sistema.
 */
const QueryError = ({ onEditRow, onSeeRow }: IQueryProps) => {
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
      setApiUrl(parameter.valueText01 + Menus.ERROR_ENDPOINT + "/paginated");
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de errores
   */
  const configureErrorTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataError) => void,
    onSeeRow?: (row: IRowDataError) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataError) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[4]) {
      tableFormat.items[4].component = (row: IRowDataError) => (
        <Button
          size="1"
          variant="ghost"
          onClick={() => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        >
          <DotsVerticalIcon width="16" height="16" />
        </Button>
      );
    }

    return tableFormat;
  };

  return (
    <GenericQuery<IRowDataError>
      QueryForm={QueryFormError}
      getTablePresentation={tableQueryModule}
      initialParameters={{
        size: "10",
        indexError: "",
        message: "",
      }}
      configureTableActions={configureErrorTableActions}
      apiUrl={apiUrl}
      token={token}
      getToken={getToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryError };
