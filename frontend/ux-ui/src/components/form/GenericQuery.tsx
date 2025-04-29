import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { IQueryProps } from "../crud/Types";
import { IParametersQuery } from "../table/TableSearch";
import { IPresentationTable } from "../table/Table";
import { CreateSearchFieldOrder } from "../table/TableSearchOrder";

interface GenericQueryProps<T> extends IQueryProps {
  /** Componente del formulario de búsqueda */
  QueryForm: React.ComponentType<{ onFind: (data: IParametersQuery) => void }>;

  /** Endpoint para la API (ej: "/modules", "/errors") */
  apiUrl: string;

  /** Función para obtener la configuración de la tabla */
  getTablePresentation: () => IPresentationTable | Promise<IPresentationTable>;

  /** Parámetros iniciales para la consulta */
  initialParameters?: IParametersQuery;

  token?: string;
  getToken?: (() => Promise<string>) | undefined;

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
function GenericQuery<T>({
  QueryForm,
  apiUrl,
  getTablePresentation,
  initialParameters = { size: "10" },
  configureTableActions,
  token,
  getToken,
  onEditRow,
  onSeeRow,
}: GenericQueryProps<T>) {
  const [parametersQuery, setParametersQuery] =
    useState<IParametersQuery>(initialParameters);
  const [presentacionTabla, setPresentacionTabla] =
    useState<IPresentationTable>({} as IPresentationTable);

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
          const configuredTable = await configureTableActions(
            tableFormat,
            onEditRow,
            onSeeRow
          );
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
   * Manejar la búsqueda y actualizar los parámetros
   */
  const handleFormFind = (data: IParametersQuery) => {
    console.log("Data de mi busqueda", JSON.stringify(data));

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
      {token && apiUrl && Object.keys(presentacionTabla).length > 0 && (
        <>
          <QueryForm onFind={handleFormFind} />
          <CreateSearchFieldOrder
            apiUrl={apiUrl}
            parametersToConsult={parametersQuery}
            presentationTable={presentacionTabla}
            token={token}
            getToken={getToken}
          />
        </>
      )}
    </Flex>
  );
}

export type {GenericQueryProps};
export { GenericQuery };