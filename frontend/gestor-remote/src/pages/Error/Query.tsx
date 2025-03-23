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
import { FormQuery } from "./FormQuery";
import { useTranslation } from "react-i18next";

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
 * @param onEditRow Funcion para editar una fila.
 * @param onSeeRow Funcion para ver una fila.
 * @returns
 */
const Query = ({ onEditRow, onSeeRow }: ITablaProps) => {
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>(
    {} as IParameter
  );
  const [parametersQuery, setParametersQuery] = useState<IParametersQuery>({
    size: "10",
    indexError: "",
    message: "",
  });

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

      // TODO: Implementar la consulta de Indices definidos por el usuario.
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
        title: t("modules.GS-ER-001.fields.indexError.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.desc,
        orderNameColumn: "index_error",
      },
      {
        name: "message",
        title: t("modules.GS-ER-001.fields.message.title"),
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
        title: t("modules.GS-ER-001.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "40vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-ER-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "acciones",
        title: t("modules.GS-ER-001.fields.acciones.abrev"),
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

  /**
   * Funcion para manejar la busqueda de los datos y pasar los datos al componente de busqueda.
   * 
   * @param data 
   */
  const handleFormFind = (data: IParametersQuery) => {
    parametersQuery.indexError = data.indexError;
    parametersQuery.message = data.message;
    setParametersQuery({ ...parametersQuery });
  };

  return (
    <Flex direction="column" gap="3">
      {token?.access_token && parameterUrl?.valueText01 && (
        <>
          <FormQuery onFind={handleFormFind} />
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
