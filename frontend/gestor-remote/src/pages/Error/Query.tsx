import { Button, Flex } from "@radix-ui/themes";
import { CreateSearchField, IPresentationTable } from "ux-ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { IRowDataError, parametersQuery } from "./Types";
import { TextFormat, JustificationText, SortColumn } from "ux-ui";
import { useState, useEffect } from "react";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";

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
  const [parameter, setParameter] = useState<IParameter>({} as IParameter);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameterTemp: IParameter = await getParameter("GS_001_00", "200");
      setParameter(parameterTemp);
    };

    fetchToken();
  }, []);
  /**
   * Presentación de los items de la tabla.
   */
  const presentationItems: IPresentationTable = {
    banding: false,
    headers: true,
    numberLinea: false,
    skeletonWidth: "96vw",
    items: [
      {
        name: "index",
        title: "Indice",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.asc,
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
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.desc,
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

  return (
    <Flex direction="column" gap="3">
      {token?.access_token && parameter?.valueText01 && (
        <CreateSearchField
          apiUrl={parameter?.valueText01 + "/paginado"}
          nameIndex="index"
          presentationTable={presentationItems}
          parametersApi={parametersQuery}
          token={token.access_token}
          getToken={async () => {
            return await refreshToken();
          }}
        />
      )}
    </Flex>
  );
};

export { Query };
