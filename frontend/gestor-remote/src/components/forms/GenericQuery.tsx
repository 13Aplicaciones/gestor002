import { Flex } from "@radix-ui/themes";
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
import { MODULE } from "../../utils/Constants";

export interface GenericQueryProps<T> extends IQueryProps {
  /** Componente del formulario de búsqueda */
  QueryForm: React.ComponentType<{ onFind: (data: IParametersQuery) => void }>;
  
  /** Endpoint para la API (ej: "/modules", "/errors") */
  endpoint: string;
  
  /** Función para obtener la configuración de la tabla */
  getTablePresentation: () => IPresentationTable | Promise<IPresentationTable>;
  
  /** Parámetros iniciales para la consulta */
  initialParameters?: IParametersQuery;
  
  /** Función para configurar acciones específicas en la tabla */
  configureTableActions?: (
    table: IPresentationTable, 
    onEditRow?: (row: T) => void, 
    onSeeRow?: (row: T) => void
  ) => IPresentationTable | Promise<IPresentationTable>;
}

/**
 * Componente genérico para consultas con tabla y formulario de búsqueda
 */
export function GenericQuery<T>({
  QueryForm,
  endpoint,
  getTablePresentation,
  initialParameters = { size: "10" },
  configureTableActions,
  onEditRow,
  onSeeRow
}: GenericQueryProps<T>) {
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>({} as IParameter);
  const [parametersQuery, setParametersQuery] = useState<IParametersQuery>(initialParameters);
  const [presentacionTabla, setPresentacionTabla] = useState<IPresentationTable>({} as IPresentationTable);

  /**
   * Inicializar configuración de tabla
   */
  useEffect(() => {
    const initializeTable = async () => {
      try {
        // Obtener la configuración base de la tabla
        const tableFormat = await getTablePresentation();
        
        // Si hay una función para configurar acciones específicas, usarla
        if (configureTableActions) {
          const configuredTable = await configureTableActions(tableFormat, onEditRow, onSeeRow);
          setPresentacionTabla(configuredTable);
        } else {
          setPresentacionTabla(tableFormat);
        }
      } catch (error) {
        console.error("Error initializing table:", error);
      }
    };

    initializeTable();
  }, [getTablePresentation, configureTableActions]);

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      try {
        const tokenTemp: ITokenRoot = await getToken();
        setToken(tokenTemp);

        const parameter: IParameter = await getParameter(MODULE, "200");
        parameter.valueText01 = parameter.valueText01 + endpoint;
        setParameterUrl(parameter);
      } catch (error) {
        console.error("Error initializing structure:", error);
      }
    };

    initializeStructure();
  }, [endpoint]);

  /**
   * Manejar la búsqueda y actualizar los parámetros
   */
  const handleFormFind = (data: IParametersQuery) => {

    console.log("Data de mi busqueda", JSON.stringify(data));

    /*setParametersQuery({
      ...parametersQuery,
      ...data
    });*/

    setParametersQuery((prevParameters) => {
      const updatedParameters = {
      ...prevParameters,
      ...data,
      };

      // Trigger a refresh by updating the key prop or state
      setPresentacionTabla((prevTable) => ({
      ...prevTable,
      refreshKey: Date.now(), // Add a unique key to force re-render
      }));

      return updatedParameters;
    });

  };

  return (
    <Flex direction="column" gap="3">
      {token?.access_token && parameterUrl?.valueText01 && Object.keys(presentacionTabla).length > 0 && (
        <>
          <QueryForm onFind={handleFormFind} />
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
}