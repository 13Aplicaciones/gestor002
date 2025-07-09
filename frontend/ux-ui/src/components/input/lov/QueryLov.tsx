/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuTableRefresh } from "../../../ConstantsPresentation";
import { GenericQuery } from "../../form/GenericQuery";
import { IPresentationTable } from "../../table/Table";
import { IQueryLovProps } from "./PopUpLov";
import { QueryFormLov } from "./QueryFormLov";
import { tableQueryLov } from "./structure/Presentations";
import { IRowDataLov } from "./structure/Types";

/**
 * Componente QueryLov para manejar la consulta de ComboItemes.
 *
 * @param onSeeRow - Callback para ver los detalles de una fila.
 * @param getToken - Función para obtener el token de autenticación.
 * @param token - Token de autenticación.
 * @param apiUrlLov - URL de la API para consultar los datos de Lov.
 * @param presentations - Configuración de presentaciones para la tabla.
 *
 * @returns
 */
const QueryLov = ({
  onSeeRow,
  getToken,
  token,
  apiUrlLov,
  presentations = {
    valueInteger: false,
    valueDecimal: false,
    labelAlternative: false,
  },
}: IQueryLovProps) => {
  /**
   * Configurar las acciones específicas para la tabla de ComboItemes
   */
  const configureLovTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataLov) => void,
    onSeeRowCallback?: (row: IRowDataLov) => void
  ) => {
   if (tableFormat.items[0]) {
      tableFormat.items[0].onAction = {
        onAction: (row: IRowDataLov) => {
          console.log("onAction ejecutado en QueryLov:", row);
          // Usar el callback que viene de GenericQuery (que es el onSeeRow del PopUpLov)
          if (onSeeRowCallback) {
            console.log("Ejecutando onSeeRowCallback:", row);
            onSeeRowCallback(row);
          }
        },
      };
    }

    return tableFormat;
  };

  /**
   * Filtrar la presentación de la tabla de Lov según las opciones seleccionadas.
   *
   * @returns
   */
  const filterTableQueryLov = () => {
    let modifiedTableQueryLov: IPresentationTable = tableQueryLov();

    if (!presentations.valueInteger && modifiedTableQueryLov.items) {
      modifiedTableQueryLov = {
        ...modifiedTableQueryLov,
        items: modifiedTableQueryLov.items.filter(
          (item) => item.name !== "value"
        ),
      };
    }

    if (!presentations.valueDecimal && modifiedTableQueryLov.items) {
      modifiedTableQueryLov = {
        ...modifiedTableQueryLov,
        items: modifiedTableQueryLov.items.filter(
          (item) => item.name !== "doubleValue"
        ),
      };
    }

    if (!presentations.labelAlternative && modifiedTableQueryLov.items) {
      modifiedTableQueryLov = {
        ...modifiedTableQueryLov,
        items: modifiedTableQueryLov.items.filter(
          (item) => item.name !== "labelAlternative"
        ),
      };
    }

    return modifiedTableQueryLov;
  };

  const handleFind = (data: any) => {
    // Esta función maneja los parámetros de búsqueda
    console.log("Parámetros de búsqueda:", data);
  };

  const QueryFormComponent = () => {
    return <QueryFormLov onFind={handleFind} presentations={presentations} />;
  };

  return (
    <GenericQuery<IRowDataLov>
      apiUrl={apiUrlLov}
      configureTableActions={configureLovTableActions}
      getTablePresentation={filterTableQueryLov}
      getToken={getToken}
      initialParameters={{}}
      menuTableRefresh={MenuTableRefresh.none}
      onSeeRow={onSeeRow}
      QueryForm={QueryFormComponent}
      token={token}
    />
  );
};

export { QueryLov };
