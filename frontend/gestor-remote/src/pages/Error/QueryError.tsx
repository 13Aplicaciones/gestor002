import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
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
import {
  CreateSearchFieldOrder,
  IParametersQuery,
  IPresentationTable
} from "ux-ui";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { Menus, MODULE } from "../../utils/Constants";
import { QueryFormError } from "./QueryFormError";
import { tableQueryModule } from "./Structures/Presentations";
import { IRowDataError } from "./Structures/Types";

/**
 * Tabla de errores del sistema.
 *
 * @param onEditRow Funcion para editar una fila.
 * @param onSeeRow Funcion para ver una fila.
 * @returns
 */
const QueryError = ({ onEditRow, onSeeRow }: IQueryProps) => {
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>(
    {} as IParameter
  );
  const [parametersQuery, setParametersQuery] = useState<IParametersQuery>({
    size: "10",
    indexError: "",
    message: "",
  });
  const [presentacionTabla, setPresentacionTabla] =
    useState<IPresentationTable>({} as IPresentationTable);

  /**
   * Funcion para inicializar el token
   *
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter(MODULE, "200");
      parameter.valueText01 = parameter.valueText01 + Menus.ERROR_ENDPOINT;
      setParameterUrl(parameter);

      const tableFormat = tableQueryModule();

      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataError) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };

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

      setPresentacionTabla(tableFormat);
    };

    initializeStructure();
  }, []);

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
          <QueryFormError onFind={handleFormFind} />
          <CreateSearchFieldOrder
            apiUrl={parameterUrl?.valueText01 + "/paginated"}
            parametersToConsult={parametersQuery}
            presentationTable={presentacionTabla}
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

export { QueryError };
