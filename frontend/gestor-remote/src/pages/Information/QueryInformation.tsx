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
import { QueryFormInformation } from "./QueryFormInformation";
import { tableQueryInformation } from "./Structures/Presentations";
import { IRowDataInformation } from "./Structures/Types";

/**
 * Tabla de información del sistema.
 */
const QueryInformation = ({ onEditRow, onSeeRow }: IQueryProps) => {
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
    <GenericQuery<IRowDataInformation>
      QueryForm={QueryFormInformation}
      getTablePresentation={tableQueryInformation}
      initialParameters={{
        size: "10",
        name: "",
      }}
      configureTableActions={configureInformationTableActions}
      apiUrl={apiUrl}
      token={token}
      getToken={getToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryInformation };
