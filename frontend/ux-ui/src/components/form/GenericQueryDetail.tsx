import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { IQueryProps } from "../crud/Types";
import { IPresentationTable } from "../table/Table";
import { TableDetail } from "../table/TableDetail";

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
interface GenericQueryDetailProps<T> extends IQueryProps {
  /** Endpoint para la API (ej: "/modules", "/errors") */
  apiUrl: string;

  /** Función para obtener la configuración de la tabla */
  getTablePresentation: () => IPresentationTable | Promise<IPresentationTable>;

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
 * @param configureTableActions Función para configurar acciones específicas en la tabla
 * @param token Token de autenticación (opcional)
 * @param getToken Función para obtener el token de autenticación (opcional)
 * @param onEditRow Función para manejar la edición de una fila
 * @param onSeeRow Función para manejar la visualización de una fila
 *
 * @returns
 */
function GenericQueryDetail<T>({
  apiUrl,
  getTablePresentation,
  configureTableActions,
  token,
  getToken,
  onEditRow,
  onSeeRow,
}: GenericQueryDetailProps<T>) {
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
  }, [getTablePresentation, configureTableActions, onEditRow, onSeeRow]);

  return (
    <Flex direction="column" gap="3">
      {token && apiUrl && Object.keys(presentacionTabla).length > 0 && (
        <>
          <TableDetail
            apiUrl={apiUrl}
            presentationTable={presentacionTabla}
            token={token}
            getToken={getToken}
          />
        </>
      )}
    </Flex>
  );
}

export { GenericQueryDetail };
export type { GenericQueryDetailProps };
