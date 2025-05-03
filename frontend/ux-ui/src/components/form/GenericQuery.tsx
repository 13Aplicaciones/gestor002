import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { IQueryProps } from "../crud/Types";
import { IPresentationTable } from "../table/Table";
import { IParametersQuery } from "../table/TableSearch";
import { CreateSearchFieldOrder } from "../table/TableSearchOrder";

/**
 * Funciones de presentación de pie en los formularios y estos son resize.
 * 
 * @autor @omargo33
 * @since 2025-05-03
 */

/**
 * Funciones de presentación de Busqueda y tabla.
 * 
 *  @template T Tipo de datos del formulario
 *  
 */
interface GenericQueryProps<T> extends IQueryProps {
  /** Componente del formulario de búsqueda */
  QueryForm: React.ComponentType<{ onFind: (data: IParametersQuery) => void }>;

  /** Endpoint para la API (ej: "/modules", "/errors") */
  apiUrl: string;

  /** Función para obtener la configuración de la tabla */
  getTablePresentation: () => IPresentationTable | Promise<IPresentationTable>;

  /** Parámetros iniciales para la consulta */
  initialParameters?: IParametersQuery;

  /** Función para manejar la edición de una fila */
  token?: string;

  /** Función para obtener el token de autenticación (opcional) */
  getToken?: (() => Promise<string>) | undefined;

  /** Función para configurar acciones específicas en la tabla */
  configureTableActions?: (

    /** Configuración de la tabla */
    table: IPresentationTable,

    /** Función para manejar la edición de una fila */
    onEditRow?: (row: T) => void,
    
    /** Función para manejar la visualización de una fila */
    onSeeRow?: (row: T) => void
  ) => IPresentationTable | Promise<IPresentationTable>;
}

/**
 * Componente genérico para consultas con tabla y formulario de búsqueda
 * 
 * @param QueryForm Componente del formulario de búsqueda
 * @param apiUrl URL de la API para obtener los datos
 * @param getTablePresentation Función para obtener la configuración de la tabla
 * @param initialParameters Parámetros iniciales para la consulta
 * @param configureTableActions Función para configurar acciones específicas en la tabla
 * @param token Token de autenticación (opcional)
 * @param getToken Función para obtener el token de autenticación (opcional)
 * @param onEditRow Función para manejar la edición de una fila
 * @param onSeeRow Función para manejar la visualización de una fila
 * 
 * @returns 
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

export { GenericQuery };
export type { GenericQueryProps };
