import { Button, Flex } from "@radix-ui/themes";
import {
  CreateSearchFieldOrder,
  IParametersQuery,
  IPresentationTable,
} from "ux-ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { IRowDataError } from "./Types";
import { TextFormat, JustificationText, SortColumn } from "ux-ui";
import { useState, useEffect } from "react";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { QueryForm } from "./QueryForm";

/**
 * Propiedades de la tabla de errores.
 */
interface ITablaProps {
  onEditRow: (row: IRowDataError) => void;
  onSeeRow: (row: IRowDataError) => void;
}

/**
 * Tabla de errores del sistema.
 *
 * @param param0
 * @returns
 */

const Query = ({ onEditRow, onSeeRow }: ITablaProps) => {
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>(
    {} as IParameter
  );
  /*const [parametersQuery, setParametersQuery] = useState<IParametersQuery>({
    size: "3",
    indexError: "",
    message: "",
  });*/

  const [parametersQuery, setParametersQuery] = useState<IParametersQuery>({} as IParametersQuery);


  /**
   * Funcion para inicializar el token
   *
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter("GS_001_00", "200");
      setParameterUrl(parameter);

      //setParametersQuery({} as IParametersQuery);
    };

    initializeStructure();
  }, []);

  /**
   * Presentación de los items de la tabla.
   */
  const presentationItems: IPresentationTable = {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "96vw",
    items: [
      {
        name: "indexError",
        title: "Indice",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.desc,
        orderNameColumn: "index_error",
      },
      {
        name: "message",
        title: "Mensaje que hay",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        onAction: {
          onAction: (row: IRowDataError) => {
            if (onSeeRow) {
              onSeeRow(row);
            }
          },
        },
      },
      {
        name: "description",
        title: "Descripción",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "40vw",
      },
      {
        name: "userDate",
        title: "Fecha",
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "acciones",
        title: "Acci.",
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
        component: (row: IRowDataError) => (
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
        ),
      },
    ],
  };

  const handleFormFind = (data: any) => {
    const p: IParametersQuery = {
      size: data.size,
      indexError: data.indexError,
      message: data.message,
    };
    setParametersQuery(p);
  };

  return (
    <Flex direction="column" gap="3">
      {token?.access_token && parameterUrl?.valueText01 && (
        <>
          <QueryForm onFind={handleFormFind} />
          <CreateSearchFieldOrder
            apiUrl={parameterUrl?.valueText01 + "/paginated"}
            parametersToConsult={parametersQuery}
            presentationTable={presentationItems}
            token={token.access_token}
            getToken={async () => {
              return await refreshToken();
            }}
          />
        </>
      )}
    </Flex>
  );
};

export { Query };
